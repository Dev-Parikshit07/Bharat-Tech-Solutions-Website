import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";
import { getSettings, waLink, productMessage } from "@/lib/settings";
import Gallery from "@/components/Gallery";
export const dynamic = "force-dynamic";
export async function generateMetadata({params}){const p=await getProduct(params.id);return {title:p?.name||"Laptop not found",description:p?.description||"Laptop details"};}
export default async function LaptopDetail({params}) {
  if(!/^\d+$/.test(params.id)) notFound();
  const [p,s]=await Promise.all([getProduct(params.id),getSettings()]);if(!p)notFound();
  const specs=[["Brand",p.brand],["Processor",p.processor],["RAM",p.ram],["Storage",p.storage],["Display",p.display],["Condition",p.condition],["Warranty",p.warranty]].filter(x=>x[1]);
  return <section className="section"><div className="container detail-grid"><Gallery photos={p.photos||[]} name={p.name}/><div><div className="eyebrow">{p.brand}</div><h1 style={{font:"800 38px Manrope"}}>{p.name}</h1><div className="price" style={{fontSize:30}}>₹{Number(p.price).toLocaleString("en-IN")}</div><p><span className="pill">{p.in_stock?"Available":"Sold out"}</span></p><p className="muted">{p.description}</p><h3>Specifications</h3><table className="spec-table"><tbody>{specs.map(x=><tr key={x[0]}><td>{x[0]}</td><td>{x[1]}</td></tr>)}</tbody></table>{p.in_stock?<a className="button" href={waLink(s.whatsapp_number,productMessage(p))} target="_blank" rel="noreferrer">Enquire on WhatsApp</a>:<button disabled>This laptop has been sold</button>}</div></div></section>;
}
