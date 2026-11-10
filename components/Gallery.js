 "use client";
import { useState } from "react";
export default function Gallery({ photos = [], name }) {
  const [active,setActive] = useState(0);
  return <div><div className="gallery-main">{photos.length ? <img src={photos[active]} alt={name} style={{width:"100%",height:"100%",objectFit:"contain"}}/> : "💻"}</div>
  {photos.length > 1 && <div className="thumbs">{photos.map((p,i)=><button key={p} className="secondary" onClick={()=>setActive(i)} aria-label={`Show image ${i+1}`}><img src={p} alt=""/></button>)}</div>}</div>;
}
