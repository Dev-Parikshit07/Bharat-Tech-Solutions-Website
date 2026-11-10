import { cookies } from "next/headers";
import { verifySession } from "./session";

export async function isOwner() {
  const token = cookies().get("bts_session")?.value;
  const session = await verifySession(token);
  return !!session && session.role === "owner";
}
export async function requireOwner() {
  if (!(await isOwner())) {
    const error = new Error("401 Please log in first");
    error.status = 401;
    throw error;
  }
}
