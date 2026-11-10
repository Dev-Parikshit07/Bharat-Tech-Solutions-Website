import { getProducts } from "@/lib/products";
import { q } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
export const dynamic = "force-dynamic";
export const metadata = { title: "Refurbished Laptops", description: "Browse available refurbished laptops." };
export default async function Laptops({ searchParams }) {
  const search=searchParams?.q||"",brand=searchParams?.brand||"";
  const [products,brands]=await Promise.all([getProducts({search,brand}),q("SELECT DISTINCT brand FROM products WHERE brand IS NOT NULL AND brand <> '' ORDER BY brand")]);
  return <><section className="page-hero"><div className="container"><h1>Find your next laptop.</h1><p className="muted">Explore refurbished devices selected for value and reliability.</p></div></section><section className="section"><div className="container">
    <form className="filters"><input name="q" placeholder="Search laptop or processor" defaultValue={search} style={{padding:12,border:"1px solid #cfd9d4",borderRadius:10,minWidth:220}}/><select name="brand" defaultValue={brand} style={{padding:12,border:"1px solid #cfd9d4",borderRadius:10}}><option value="">All brands</option>{brands.map(b=><option key={b.brand} value={b.brand}>{b.brand}</option>)}</select><button>Search</button><a className="button secondary" href="/laptops">Clear</a></form>
    {products.length?<div className="grid">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="service"><h3>No laptops found</h3><p className="muted">Try a different search or contact us for current stock.</p></div>}
  </div></section></>;
}
