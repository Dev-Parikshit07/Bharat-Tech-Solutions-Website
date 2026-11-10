import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { q } from "@/lib/db";
import { createSession, sessionCookie } from "@/lib/session";
const DUMMY="$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";
function ipOf(req){return (req.headers.get("x-forwarded-for")||"unknown").split(",")[0].trim().slice(0,80);}
export async function POST(req){const origin=req.headers.get("origin");const host=req.headers.get("host");if(origin&&host&&new URL(origin).host!==host)return NextResponse.json({error:"Origin rejected"},{status:403});
 try{
  const ip=ipOf(req);const recent=await q("SELECT COUNT(*)::int AS count FROM login_attempts WHERE ip=$1 AND at > NOW()-INTERVAL '15 minutes'",[ip]);
  if(recent[0].count>=5)return NextResponse.json({error:"Too many login attempts. Try again in 15 minutes."},{status:429});
  const body=await req.json();const email=String(body.email||"").toLowerCase().trim().slice(0,254);const password=String(body.password||"").slice(0,200);
  const owners=await q("SELECT email,password_hash FROM owner WHERE id=1");const owner=owners[0];
  const valid=await bcrypt.compare(password,owner?.password_hash||DUMMY);
  if(!owner||owner.email!==email||!valid){await q("INSERT INTO login_attempts(ip) VALUES($1)",[ip]);return NextResponse.json({error:"Invalid email or password"},{status:401});}
  await q("DELETE FROM login_attempts WHERE ip=$1",[ip]);
  const token=await createSession({role:"owner",email:owner.email});
  const response=NextResponse.json({ok:true});response.cookies.set(sessionCookie.name,token,sessionCookie.options);return response;
 }catch(e){return NextResponse.json({error:"Unable to sign in. Check server configuration."},{status:500});}
}
