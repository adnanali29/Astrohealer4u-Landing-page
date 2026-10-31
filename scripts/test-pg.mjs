import dns from "node:dns";
import dnsPromises from "node:dns/promises";

const resolver = new dnsPromises.Resolver();
resolver.setServers(["8.8.8.8", "1.1.1.1"]);

const originalLookup = dns.lookup;
dns.lookup = function (hostname, options, callback) {
  const cb = typeof options === "function" ? options : callback;
  const opt = typeof options === "object" ? options : {};

  resolver
    .resolve4(hostname)
    .then((addresses) => {
      if (addresses && addresses.length > 0) {
        if (opt.all) {
          cb(null, addresses.map((addr) => ({ address: addr, family: 4 })));
        } else {
          cb(null, addresses[0], 4);
        }
      } else {
        originalLookup(hostname, options, callback);
      }
    })
    .catch(() => {
      originalLookup(hostname, options, callback);
    });
};

import pg from "pg";
const { Pool } = pg;

const connectionString =
  "postgresql://neondb_owner:npg_siSvQp6j4GXH@ep-cold-field-b4b7h0rk-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require";

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
    servername: "ep-cold-field-b4b7h0rk-pooler.c-6.us-east-2.aws.neon.tech",
  },
});

async function run() {
  console.log("Connecting via pg with DNS monkey-patch...");
  const client = await pool.connect();
  console.log("Connected to Neon DB successfully!");

  // Create tables
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
  `);
  console.log("✓ 'bookings' table created/verified.");

  await client.query(`
    CREATE TABLE IF NOT EXISTS admin_config (
      id INT PRIMARY KEY DEFAULT 1,
      admin_id VARCHAR(100) NOT NULL DEFAULT '1',
      admin_password VARCHAR(255) NOT NULL DEFAULT '1',
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log("✓ 'admin_config' table created/verified.");

  await client.query(`
    INSERT INTO admin_config (id, admin_id, admin_password, updated_at)
    VALUES (1, '1', '1', CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO NOTHING;
  `);
  console.log("✓ 'admin_config' default credentials verified.");

  // Delete old demo leads
  const deleteRes = await client.query(`DELETE FROM bookings;`);
  console.log(`✓ Deleted old demo leads. Row count: ${deleteRes.rowCount}`);

  const countRes = await client.query(`SELECT COUNT(*) as count FROM bookings;`);
  console.log(`✓ Current active bookings count in Neon DB: ${countRes.rows[0].count}`);

  const adminRes = await client.query(`SELECT id, admin_id, updated_at FROM admin_config WHERE id = 1;`);
  console.log("✓ Current Admin credentials config in Neon DB:", adminRes.rows[0]);

  client.release();
  await pool.end();
  console.log("ALL COMPLETE! Neon PostgreSQL is live, schema created, and demo leads deleted.");
}

run().catch((err) => {
  console.error("PG Connection error:", err);
  process.exit(1);
});
