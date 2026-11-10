import Link from "next/link";
export default function ProductCard({ product }) {
  const photo = product.photos?.[0];
  return <article className="card">
    <Link href={`/laptops/${product.id}`}><div className="product-image">{photo ? <img src={photo} alt={product.name} style={{width:"100%",height:"100%",objectFit:"contain"}}/> : "💻"}</div></Link>
    <div className="card-body"><div className="muted" style={{fontSize:12}}>{product.brand}</div><h3><Link href={`/laptops/${product.id}`}>{product.name}</Link></h3>
      <div className="specs">{[product.processor,product.ram,product.storage].filter(Boolean).map(x=><span key={x}>{x}</span>)}</div>
      <div className="card-foot"><div className="price">₹{Number(product.price).toLocaleString("en-IN")}</div><span className="pill">{product.in_stock ? "In stock" : "Sold"}</span></div>
    </div>
  </article>;
}
