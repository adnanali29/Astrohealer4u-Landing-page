import dns from "node:dns";
import dnsPromises from "node:dns/promises";
import pg from "pg";
import fs from "fs/promises";
import path from "path";

const { Pool } = pg;

// Ensure public DNS resolver is used for cloud hosts if local ISP fails
try {
  const resolver = new dnsPromises.Resolver();
  resolver.setServers(["8.8.8.8", "1.1.1.1"]);
  const dnsAny = dns as any;
  const originalLookup = dnsAny.lookup;
  dnsAny.lookup = function (hostname: string, options: any, callback: any) {
    const cb = typeof options === "function" ? options : callback;
    const opt = typeof options === "object" ? options : {};

    resolver
      .resolve4(hostname)
      .then((addresses) => {
        if (addresses && addresses.length > 0) {
          if (opt && opt.all) {
            cb(null, addresses.map((addr: string) => ({ address: addr, family: 4 })));
          } else {
            cb(null, addresses[0], 4);
          }
        } else {
          originalLookup.call(dns, hostname, options, callback);
        }
      })
      .catch(() => {
        originalLookup.call(dns, hostname, options, callback);
      });
  };
} catch {
  // ignore
}

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_siSvQp6j4GXH@ep-cold-field-b4b7h0rk-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require";

let pool: pg.Pool | null = null;

function getPool(): pg.Pool {
  if (!pool) {
    pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false,
        servername: "ep-cold-field-b4b7h0rk-pooler.c-6.us-east-2.aws.neon.tech",
      },
      max: 10,
      idleTimeoutMillis: 30000,
    });
  }
  return pool;
}

export interface Booking {
  id: string;
  name: string;
  consultation: string;
  dob: string;
  tob: string;
  pob: string;
  phone: string;
  appointmentDate: string;
  appointmentTime: string;
  email?: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  source?: string;
  notes?: string;
  createdAt: string;
}

// Fallback JSON paths
const JSON_BOOKINGS = path.join(process.cwd(), "src", "data", "bookings.json");
const JSON_CONFIG = path.join(process.cwd(), "src", "data", "admin-config.json");

// Ensure tables exist
export async function ensureDbReady() {
  try {
    const client = await getPool().connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS bookings (
          id VARCHAR(50) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          consultation VARCHAR(255) NOT NULL,
          dob VARCHAR(50),
          tob VARCHAR(50),
          pob VARCHAR(255),
          phone VARCHAR(50) NOT NULL,
          appointment_date VARCHAR(50),
          appointment_time VARCHAR(50),
          email VARCHAR(255),
          status VARCHAR(50) DEFAULT 'Pending',
          source VARCHAR(100) DEFAULT 'Hero Form',
          notes TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS admin_config (
          id INT PRIMARY KEY DEFAULT 1,
          admin_id VARCHAR(100) NOT NULL DEFAULT '1',
          admin_password VARCHAR(255) NOT NULL DEFAULT '1',
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        INSERT INTO admin_config (id, admin_id, admin_password, updated_at)
        VALUES (1, '1', '1', CURRENT_TIMESTAMP)
        ON CONFLICT (id) DO NOTHING;
      `);
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("ensureDbReady notice (using fallback if unavailable):", err);
  }
}

// Get next sequential booking ID: AH4U-01, AH4U-02 ... AH4U-n
export async function getNextBookingId(): Promise<string> {
  try {
    await ensureDbReady();
    const res = await getPool().query(
      `SELECT id FROM bookings WHERE id ILIKE 'AH4U-%'`
    );
    let maxNum = 0;
    for (const row of res.rows) {
      const match = String(row.id).match(/^AH4U-(\d+)$/i);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) maxNum = num;
      }
    }
    if (maxNum === 0) {
      const countRes = await getPool().query(`SELECT COUNT(*) as count FROM bookings`);
      maxNum = parseInt(countRes.rows[0].count, 10) || 0;
    }
    const nextNum = maxNum + 1;
    const padded = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;
    return `AH4U-${padded}`;
  } catch (err) {
    console.error("Failed to query next booking ID from DB:", err);
    try {
      const data = await fs.readFile(JSON_BOOKINGS, "utf-8");
      const list: Booking[] = JSON.parse(data);
      let maxNum = 0;
      for (const item of list) {
        const match = String(item.id).match(/^AH4U-(\d+)$/i);
        if (match) {
          const num = parseInt(match[1], 10);
          if (num > maxNum) maxNum = num;
        }
      }
      const nextNum = (maxNum || list.length) + 1;
      const padded = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;
      return `AH4U-${padded}`;
    } catch {
      return "AH4U-01";
    }
  }
}

// Get all bookings (Postgres primary, JSON fallback)
export async function getBookingsFromDb(): Promise<Booking[]> {
  try {
    await ensureDbReady();
    const res = await getPool().query(
      `SELECT id, name, consultation, dob, tob, pob, phone, 
              appointment_date as "appointmentDate", 
              appointment_time as "appointmentTime", 
              email, status, source, notes, 
              created_at as "createdAt"
       FROM bookings 
       ORDER BY created_at DESC`
    );

    return res.rows.map((r) => ({
      ...r,
      createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
    }));
  } catch (err) {
    console.error("DB query failed, reading from local JSON backup:", err);
    try {
      const data = await fs.readFile(JSON_BOOKINGS, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
}

// Insert booking
export async function insertBookingToDb(b: Booking): Promise<Booking> {
  try {
    await ensureDbReady();
    await getPool().query(
      `INSERT INTO bookings (id, name, consultation, dob, tob, pob, phone, appointment_date, appointment_time, email, status, source, notes, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
      [
        b.id,
        b.name,
        b.consultation,
        b.dob,
        b.tob,
        b.pob,
        b.phone,
        b.appointmentDate,
        b.appointmentTime,
        b.email || "",
        b.status || "Pending",
        b.source || "Hero Form",
        b.notes || "",
        b.createdAt,
      ]
    );
  } catch (err) {
    console.error("Postgres insert failed, storing in JSON backup:", err);
  }

  // Also update local JSON backup
  try {
    const list: Booking[] = [];
    try {
      const data = await fs.readFile(JSON_BOOKINGS, "utf-8");
      list.push(...JSON.parse(data));
    } catch {
      // ignore
    }
    list.unshift(b);
    await fs.writeFile(JSON_BOOKINGS, JSON.stringify(list, null, 2), "utf-8");
  } catch {
    // ignore
  }

  return b;
}

// Update status
export async function updateBookingStatusInDb(
  id: string,
  status: string,
  notes?: string
) {
  try {
    await ensureDbReady();
    if (notes !== undefined) {
      await getPool().query(
        `UPDATE bookings SET status = $1, notes = $2 WHERE id = $3`,
        [status, notes, id]
      );
    } else {
      await getPool().query(`UPDATE bookings SET status = $1 WHERE id = $2`, [
        status,
        id,
      ]);
    }
  } catch (err) {
    console.error("Postgres status update failed:", err);
  }

  // Also update JSON backup
  try {
    const data = await fs.readFile(JSON_BOOKINGS, "utf-8");
    const list: Booking[] = JSON.parse(data);
    const item = list.find((x) => x.id === id);
    if (item) {
      item.status = status as Booking["status"];
      if (notes !== undefined) item.notes = notes;
      await fs.writeFile(JSON_BOOKINGS, JSON.stringify(list, null, 2), "utf-8");
    }
  } catch {
    // ignore
  }
}

// Delete booking
export async function deleteBookingFromDb(id: string) {
  try {
    await ensureDbReady();
    await getPool().query(`DELETE FROM bookings WHERE id = $1`, [id]);
  } catch (err) {
    console.error("Postgres delete failed:", err);
  }

  // Also update JSON backup
  try {
    const data = await fs.readFile(JSON_BOOKINGS, "utf-8");
    let list: Booking[] = JSON.parse(data);
    list = list.filter((x) => x.id !== id);
    await fs.writeFile(JSON_BOOKINGS, JSON.stringify(list, null, 2), "utf-8");
  } catch {
    // ignore
  }
}

// Admin Credentials
export async function getAdminConfigFromDb(): Promise<{
  adminId: string;
  adminPassword: string;
}> {
  try {
    await ensureDbReady();
    const res = await getPool().query(
      `SELECT admin_id as "adminId", admin_password as "adminPassword" FROM admin_config WHERE id = 1`
    );
    if (res.rows.length > 0) {
      return res.rows[0];
    }
  } catch (err) {
    console.error("Postgres admin read failed, reading JSON config:", err);
  }

  try {
    const data = await fs.readFile(JSON_CONFIG, "utf-8");
    return JSON.parse(data);
  } catch {
    return { adminId: "1", adminPassword: "1" };
  }
}

export async function updateAdminConfigInDb(
  newAdminId: string,
  newPassword: string
) {
  try {
    await ensureDbReady();
    await getPool().query(
      `UPDATE admin_config SET admin_id = $1, admin_password = $2, updated_at = CURRENT_TIMESTAMP WHERE id = 1`,
      [newAdminId, newPassword]
    );
  } catch (err) {
    console.error("Postgres admin update failed:", err);
  }

  try {
    await fs.writeFile(
      JSON_CONFIG,
      JSON.stringify(
        {
          adminId: newAdminId,
          adminPassword: newPassword,
          updatedAt: new Date().toISOString(),
        },
        null,
        2
      ),
      "utf-8"
    );
  } catch {
    // ignore
  }
}
