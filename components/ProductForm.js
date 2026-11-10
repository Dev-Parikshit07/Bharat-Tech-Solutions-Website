 "use client";
import { useState } from "react";
export default function ProductForm({ initial = {} }) {
  const [data,setData]=useState({name:"",brand:"",processor:"",ram:"",storage:"",display:"",condition:"Good",warranty:"",price:"",description:"",photos:[],in_stock:true,featured:false,...initial});
  const [busy,setBusy]=useState(false); const [error,setError]=useState("");
  function change(e){const {name,value,type,checked}=e.target;setData(d=>({...d,[name]:type==="checkbox"?checked:value}));}
  async function upload(e){
    const files=[...e.target.files]; if(files.length+data.photos.length>8){setError("Maximum eight photos.");return;}
    setBusy(true);setError("");
    try{
      const urls=[];
      for(const file of files){
        const compressed=await new Promise((resolve,reject)=>{
          const img=new Image(),url=URL.createObjectURL(file);
          img.onload=()=>{let w=img.width,h=img.height,scale=Math.min(1,1600/Math.max(w,h));w=Math.round(w*scale);h=Math.round(h*scale);const c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(img,0,0,w,h);c.toBlob(b=>{URL.revokeObjectURL(url);b?resolve(new File([b],file.name.replace(/\.[^.]+$/,"")+".jpg",{type:"image/jpeg"})):reject(new Error("Image conversion failed"));},"image/jpeg",.82);};
          img.onerror=()=>{URL.revokeObjectURL(url);reject(new Error("Could not read image"));};img.src=url;
        });
        const fd=new FormData();fd.append("file",compressed);
        const res=await fetch("/api/admin/upload",{method:"POST",body:fd});const json=await res.json();if(!res.ok)throw new Error(json.error);urls.push(json.url);
      }
      setData(d=>({...d,photos:[...d.photos,...urls]}));
    }catch(e){setError(e.message)}finally{setBusy(false);e.target.value="";}
  }
  async function submit(e){e.preventDefault();setBusy(true);setError("");const method=initial.id?"PUT":"POST";const url=initial.id?`/api/admin/products/${initial.id}`:"/api/admin/products";
    try{const r=await fetch(url,{method,headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,price:Number(data.price)})});const j=await r.json();if(!r.ok)throw new Error(j.error||"Save failed");location.href="/admin";}catch(e){setError(e.message);setBusy(false);}
  }
  return <form onSubmit={submit}><div className="form-grid">
    {["name","brand","processor","ram","storage","display","warranty","price"].map(k=><div className="field" key={k}><label>{k[0].toUpperCase()+k.slice(1)}{["name","brand","price"].includes(k)?" *":""}</label><input name={k} value={data[k]??""} onChange={change} required={["name","brand","price"].includes(k)} type={k==="price"?"number":"text"} min={k==="price"?"0":undefined}/></div>)}
    <div className="field"><label>Condition</label><select name="condition" value={data.condition} onChange={change}>{["Excellent","Good","Fair"].map(x=><option key={x}>{x}</option>)}</select></div>
  </div>
  <div className="field"><label>Description</label><textarea name="description" rows="4" value={data.description||""} onChange={change}/></div>
  <div className="field"><label>Photos (up to 8; JPG, PNG, WEBP; compressed before upload)</label><input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={upload}/></div>
  <div className="specs">{data.photos.map((p,i)=><span key={p} style={{display:"inline-flex",alignItems:"center",gap:5}}><img src={p} alt="" width="44" height="36" style={{objectFit:"cover"}}/><button type="button" onClick={()=>setData(d=>({...d,photos:d.photos.filter((_,j)=>j!==i)}))}>Remove</button></span>)}</div>
  <p><label><input type="checkbox" name="in_stock" checked={!!data.in_stock} onChange={change}/> In stock</label> &nbsp; <label><input type="checkbox" name="featured" checked={!!data.featured} onChange={change}/> Show on homepage</label></p>
  {error&&<div className="notice">{error}</div>}<button disabled={busy}>{busy?"Saving...":"Save laptop"}</button> <a className="button secondary" href="/admin">Cancel</a>
  </form>;
}
