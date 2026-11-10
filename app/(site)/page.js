import Link from "next/link";
import { featuredProducts } from "@/lib/products";
import { getSettings, waLink } from "@/lib/settings";
import ProductCard from "@/components/ProductCard";
import Hero3D from "@/components/Hero3D";
export const dynamic = "force-dynamic";
export default async function Home() {
  const [products,s]=await Promise.all([featuredProducts(),getSettings()]);
  return <>
    <section className="hero"><div className="container hero-grid"><div><div className="eyebrow">Smarter tech. Better value.</div><h1>Reliable laptops.<br/>Remarkable value.</h1><p>Explore quality-checked refurbished laptops and dependable repair services from a team that puts practical technology first.</p><div className="hero-actions"><Link className="button" href="/laptops">Explore laptops</Link><a className="button secondary" href={waLink(s.whatsapp_number,"Hello, I would like to know more about your laptops and services.")} target="_blank" rel="noreferrer">Ask on WhatsApp</a></div></div><Hero3D/></div></section>
    <section className="section"><div className="container"><div className="section-head"><div><div className="eyebrow">Our selection</div><h2>Featured laptops</h2><p className="muted">Carefully selected devices for work, study and everyday use.</p></div><Link className="button secondary" href="/laptops">View all laptops</Link></div>
      {products.length?<div className="grid">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<p className="muted">New laptop listings are coming soon. Contact us for current availability.</p>}</div></section>
    <section className="section" style={{background:"#eef2ed"}}><div className="container"><div className="section-head"><div><div className="eyebrow">The BTS standard</div><h2>Confidence in every connection</h2></div></div><div className="trust">{[["✓","Fully tested","Devices are checked before being listed."],["◷","Warranty included","Warranty details are shown with each listing."],["⌘","In-house repair","Practical support for common laptop issues."]].map(x=><article key={x[1]}><div className="iconbox">{x[0]}</div><b>{x[1]}</b><span className="muted">{x[2]}</span></article>)}</div></div></section>
    <section className="section"><div className="container"><div className="cta"><div><div className="eyebrow">Need a repair?</div><h2>Get your laptop working again.</h2><p className="muted">Talk to us about diagnostics, upgrades and repairs.</p></div><Link className="button dark" href="/repair">Explore repair services</Link></div></div></section>
    <section className="section"><div className="container"><div className="eyebrow">Customer experience</div><h2>Service built on trust</h2><p className="sample">Illustrative sample statements — replace with verified customer reviews before publishing.</p><div className="grid">{["Clear advice and helpful support throughout the purchase.","A straightforward experience from enquiry to collection.","Practical guidance on choosing the right device."].map((x,i)=><article className="service" key={i}><div style={{color:"#e36414",fontSize:20}}>★★★★★</div><p>{x}</p><b>Sample review {i+1}</b><div className="sample">Not a verified customer testimonial</div></article>)}</div></div></section>
  </>;
}
