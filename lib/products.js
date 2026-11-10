import { q } from "./db";

export async function getProducts({ search = "", brand = "" } = {}) {
  return q(
    `SELECT * FROM products
     WHERE ($1 = '' OR name ILIKE '%' || $1 || '%' OR processor ILIKE '%' || $1 || '%')
       AND ($2 = '' OR LOWER(brand) = LOWER($2))
     ORDER BY in_stock DESC, created_at DESC`,
    [search.slice(0, 100), brand.slice(0, 80)]
  );
}
export async function getProduct(id) {
  if (!/^\d+$/.test(String(id))) return null;
  const rows = await q("SELECT * FROM products WHERE id = $1", [Number(id)]);
  return rows[0] || null;
}
export async function featuredProducts() {
  const featured = await q("SELECT * FROM products WHERE in_stock = TRUE AND featured = TRUE ORDER BY created_at DESC LIMIT 6");
  if (featured.length >= 3) return featured;
  return q("SELECT * FROM products WHERE in_stock = TRUE ORDER BY created_at DESC LIMIT 6");
}
