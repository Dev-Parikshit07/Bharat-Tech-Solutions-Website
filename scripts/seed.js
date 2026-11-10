require("dotenv").config({ path: ".env.local" });
require("dotenv").config();
const { Pool } = require("pg");
async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1, ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false } });
  const samples = [
    ["Dell Latitude 5490","Dell","Intel Core i5","8GB","256GB SSD","14-inch","Good","3 Months",18500,"Reliable refurbished business laptop."],
    ["HP EliteBook 840 G5","HP","Intel Core i5 8th Gen","8GB","256GB SSD","14-inch","Good","3 Months",22500,"Professional laptop with a durable design."],
    ["Lenovo ThinkPad T480","Lenovo","Intel Core i5 8th Gen","8GB","256GB SSD","14-inch","Good","3 Months",23900,"Business-class ThinkPad with comfortable keyboard."]
  ];
  try {
    for (const p of samples) {
      await pool.query(
        `INSERT INTO products (name,brand,processor,ram,storage,display,condition,warranty,price,description)
         SELECT $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
         WHERE NOT EXISTS (SELECT 1 FROM products WHERE LOWER(name)=LOWER($1) AND LOWER(brand)=LOWER($2))`,
        p
      );
    }
    console.log("Sample products added where missing.");
  } finally { await pool.end(); }
}
main().catch(e => { console.error("Seed failed:", e.message); process.exit(1); });
