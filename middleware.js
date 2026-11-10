import { NextResponse } from "next/server";
import { verifySession } from "@/lib/session";

const PUBLIC = new Set(["/admin/login", "/api/admin/login"]);

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  if (PUBLIC.has(pathname)) return NextResponse.next();
  const session = await verifySession(request.cookies.get("bts_session")?.value);
  if (session?.role === "owner") return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "401 Please log in first" }, { status: 401 });
  }
  const url = new URL("/admin/login", request.url);
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"]
};
