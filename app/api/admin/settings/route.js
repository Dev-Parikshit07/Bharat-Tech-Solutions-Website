import { NextResponse } from "next/server";
import { isOwner } from "@/lib/auth";
import { q } from "@/lib/db";
import { normalizePhone } from "@/lib/settings";
const allowed=["shop_name","whatsapp_number","phone","address","hours","email"];
export async function PUT(req){
 const origin=req.headers.get("origin");const host=req.headers.get("host");if(origin&&host&&new URL(origin).host!==host)return NextResponse.json({error:"Origin rejected"},{status:403});try{if(!(await isOwner()))return NextResponse.json({error:"401 Please log in first"},{status:401});const body=await req.json();for(const k of Object.keys(body))if(!allowed.includes(k))return NextResponse.json({error:"Unsupported setting"}, {status:400});for(const k of allowed){if(body[k]!==undefined){let v=String(body[k]).slice(0,1000);if(k==="whatsapp_number")v=normalizePhone(v);await q("INSERT INTO settings(key,value) VALUES($1,$2) ON CONFLICT(key) DO UPDATE SET value=EXCLUDED.value",[k,v]);}}return NextResponse.json({ok:true});}catch(e){return NextResponse.json({error:"Could not save settings"},{status:500});}}
