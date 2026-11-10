import pg from "pg";
const { Pool } = pg;
const globalForPg = globalThis;
function createPool() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured");
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 3,
    ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false }
  });
}
function getPool() {
  if (!globalForPg.__btsPool) globalForPg.__btsPool = createPool();
  return globalForPg.__btsPool;
}
export async function q(text, params = []) {
  const result = await getPool().query(text, params);
  return result.rows;
}
