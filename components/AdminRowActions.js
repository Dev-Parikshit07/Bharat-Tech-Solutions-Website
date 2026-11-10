"use client";
export default function AdminRowActions({ product, refresh }) {
  async function patch(data){ const r=await fetch(`/api/admin/products/${product.id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)}); if(!r.ok) alert((await r.json()).error || "Action failed"); else refresh(); }
  async function remove(){ if(!confirm("Delete this laptop?")) return; const r=await fetch(`/api/admin/products/${product.id}`,{method:"DELETE"}); if(!r.ok) alert("Delete failed"); else refresh(); }
  return <div style={{display:"flex",gap:7,flexWrap:"wrap"}}><a className="button secondary" href={`/admin/products/${product.id}`}>Edit</a><button className="secondary" onClick={()=>patch({in_stock:!product.in_stock})}>{product.in_stock?"Mark sold":"Back in stock"}</button><button className="secondary" onClick={()=>patch({featured:!product.featured})}>{product.featured?"Unfeature":"Feature"}</button><button onClick={remove}>Delete</button></div>;
}
