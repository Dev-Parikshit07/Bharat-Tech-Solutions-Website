import { NextResponse } from "next/server";
import { sessionCookie } from "@/lib/session";
export async function POST(req){const origin=req.headers.get("origin");const host=req.headers.get("host");if(origin&&host&&new URL(origin).host!==host)return NextResponse.json({error:"Origin rejected"},{status:403});const r=NextResponse.json({ok:true});r.cookies.set(sessionCookie.name,"",{...sessionCookie.options,maxAge:0});return r;}
