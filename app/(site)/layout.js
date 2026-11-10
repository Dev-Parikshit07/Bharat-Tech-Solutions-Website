import Link from "next/link";
import { getSettings } from "@/lib/settings";
export const dynamic = "force-dynamic";
export default async function SiteLayout({ children }) {
  const s = await getSettings();
  const wa = `https://wa.me/${(s.whatsapp_number || "").replace(/\D/g,"")}`;
  return <>
    <header className="site-header"><div className="container nav">
      <Link className="brand" href="/">{s.shop_name || "Bharat Tech Solutions"}<small>REFURBISHED • REPAIRED • RELIABLE</small></Link>
      <nav className="navlinks"><Link href="/">Home</Link><Link href="/laptops">Laptops</Link><Link href="/repair">Repair</Link><Link href="/contact">Contact</Link></nav>
    </div></header>
    {children}
    <footer className="footer"><div className="container footer-grid">
      <div><div className="brand" style={{color:"white"}}>{s.shop_name || "Bharat Tech Solutions"}</div><p>Dependable refurbished laptops and practical repair services, backed by personal support.</p></div>
      <div><b>Visit & contact</b><p>{s.address || "Contact us for shop address"}<br/>{s.hours || ""}</p><p><a href={`tel:${s.phone || ""}`}>{s.phone || ""}</a></p></div>
      <div><b>Get in touch</b><p><a href={wa} target="_blank" rel="noreferrer">WhatsApp us</a><br/>{s.email ? <a href={`mailto:${s.email}`}>{s.email}</a> : null}</p><p><Link href="/laptops">Browse laptops</Link></p></div>
    </div><div className="container" style={{borderTop:"1px solid #ffffff20",marginTop:30,paddingTop:18,fontSize:12,color:"#a9bfba"}}>© {new Date().getFullYear()} {s.shop_name || "Bharat Tech Solutions"}. All rights reserved.</div></footer>
    <a className="button mobile-wa" href={wa} target="_blank" rel="noreferrer">WhatsApp</a>
  </>;
}
