import { neon } from "@neondatabase/serverless";

const connectionString = "postgresql://neondb_owner:npg_siSvQp6j4GXH@ep-cold-field-b4b7h0rk-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
const sql = neon(connectionString);

async function run() {
  console.log("Connecting to Neon PostgreSQL...");

  // Create tables
  await sql`
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
  `;
  console.log("✓ 'bookings' table created/verified.");

  await sql`
    CREATE TABLE IF NOT EXISTS admin_config (
      id INT PRIMARY KEY DEFAULT 1,
      admin_id VARCHAR(100) NOT NULL DEFAULT '1',
      admin_password VARCHAR(255) NOT NULL DEFAULT '1',
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log("✓ 'admin_config' table created/verified.");

  await sql`
    INSERT INTO admin_config (id, admin_id, admin_password, updated_at)
    VALUES (1, '1', '1', CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO NOTHING;
  `;
  console.log("✓ 'admin_config' default credentials verified.");

  // Delete old demo leads
  const deleted = await sql`DELETE FROM bookings RETURNING id;`;
  console.log(`✓ Deleted ${deleted.length} old demo leads. Table is now clean!`);

  // Verify empty count
  const count = await sql`SELECT COUNT(*) as count FROM bookings;`;
  console.log(`✓ Current active bookings count in Neon DB: ${count[0].count}`);

  const admin = await sql`SELECT id, admin_id, updated_at FROM admin_config WHERE id = 1;`;
  console.log("✓ Admin config in Neon DB:", admin[0]);

  console.log("SUCCESS: Neon Database fully configured and clean!");
}

run().catch((err) => {
  console.error("Database setup failed:", err);
  process.exit(1);
});

