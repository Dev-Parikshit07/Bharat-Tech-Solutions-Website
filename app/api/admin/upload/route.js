import { NextResponse } from "next/server";
import { isOwner } from "@/lib/auth";
import { uploadImage } from "@/lib/storage";
export async function POST(req){const origin=req.headers.get("origin");const host=req.headers.get("host");if(origin&&host&&new URL(origin).host!==host)return NextResponse.json({error:"Origin rejected"},{status:403});try{if(!(await isOwner()))return NextResponse.json({error:"401 Please log in first"},{status:401});const form=await req.formData();const file=form.get("file");if(!file||typeof file.arrayBuffer!=="function")return NextResponse.json({error:"Image file is required"},{status:400});const url=await uploadImage(file);return NextResponse.json({url});}catch(e){return NextResponse.json({error:e.message||"Upload failed"},{status:400});}}
