require("dotenv").config({ path: ".env.local" });
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

async function main() {
  const { DATABASE_URL, OWNER_EMAIL, OWNER_PASSWORD } = process.env;
  if (!DATABASE_URL || !OWNER_EMAIL || !OWNER_PASSWORD) throw new Error("DATABASE_URL, OWNER_EMAIL and OWNER_PASSWORD are required");
  if (OWNER_PASSWORD.length < 10) throw new Error("OWNER_PASSWORD must be at least 10 characters");
  const pool = new Pool({ connectionString: DATABASE_URL, max: 1, ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false } });
  try {
    const schema = fs.readFileSync(path.join(__dirname, "..", "schema.sql"), "utf8");
    await pool.query(schema);
    const hash = await bcrypt.hash(OWNER_PASSWORD, 12);
    await pool.query(
      `INSERT INTO owner (id, email, password_hash) VALUES (1, $1, $2)
       ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, password_hash = EXCLUDED.password_hash`,
      [OWNER_EMAIL.toLowerCase().trim(), hash]
    );
    console.log("Database schema ready and owner account configured.");
  } finally { await pool.end(); }
}
main().catch(e => { console.error("Setup failed:", e.message); process.exit(1); });
