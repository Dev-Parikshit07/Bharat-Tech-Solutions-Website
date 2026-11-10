 "use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import AdminRowActions from "@/components/AdminRowActions";
export default function AdminDashboard(){const [data,setData]=useState({products:[],stats:{}});const [error,setError]=useState("");
async function load(){const r=await fetch("/api/admin/products");const j=await r.json();if(r.ok)setData(j);else setError(j.error||"Could not load products");}
useEffect(()=>{load();},[]);
return <><header className="admin-top"><div className="container" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><b style={{font:"800 20px Manrope"}}>BTS / Owner dashboard</b><div style={{display:"flex",gap:10}}><Link className="button secondary" href="/admin/settings" style={{color:"white",borderColor:"#ffffff66"}}>Shop settings</Link><LogoutButton/></div></div></header><main className="container admin-content"><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><h1 style={{font:"800 32px Manrope"}}>Inventory overview</h1><p className="muted">Manage your laptop listings and availability.</p></div><Link className="button" href="/admin/products/new">+ Add laptop</Link></div>
{error&&<div className="notice">{error}</div>}<div className="stat-grid">{[["Total laptops",data.stats.total],["In stock",data.stats.stock],["Sold",data.stats.sold],["Featured",data.stats.featured]].map(x=><div className="stat" key={x[0]}><span className="muted">{x[0]}</span><strong>{x[1]??"—"}</strong></div>)}</div>
<div className="table-wrap"><table className="admin-table"><thead><tr><th>Photo</th><th>Laptop</th><th>Price</th><th>Availability</th><th>Featured</th><th>Actions</th></tr></thead><tbody>{data.products.map(p=><tr key={p.id}><td>{p.photos?.[0]?<img src={p.photos[0]} width="54" height="42" style={{objectFit:"cover"}}/>:"💻"}</td><td><b>{p.name}</b><br/><span className="muted">{p.brand}</span></td><td>₹{Number(p.price).toLocaleString("en-IN")}</td><td>{p.in_stock?"In stock":"Sold"}</td><td>{p.featured?"Yes":"No"}</td><td><AdminRowActions product={p} refresh={load}/></td></tr>)}</tbody></table></div></main></>;
}
