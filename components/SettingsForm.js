"use client";
import { useState } from "react";
export default function SettingsForm({ initial }) {
  const [data,setData]=useState(initial);const [msg,setMsg]=useState("");
  function change(e){setData(d=>({...d,[e.target.name]:e.target.value}));}
  async function submit(e){e.preventDefault();setMsg("Saving...");const r=await fetch("/api/admin/settings",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});const j=await r.json();setMsg(r.ok?"Settings saved.":j.error||"Could not save.");}
  return <form onSubmit={submit}>{Object.entries({shop_name:"Shop name",whatsapp_number:"WhatsApp number",phone:"Phone",address:"Address",hours:"Opening hours",email:"Email"}).map(([k,label])=><div className="field" key={k}><label>{label}</label><input name={k} value={data[k]||""} onChange={change}/></div>)}{msg&&<p>{msg}</p>}<button>Save settings</button></form>;
}
