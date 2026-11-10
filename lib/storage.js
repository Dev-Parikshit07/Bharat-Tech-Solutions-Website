import { randomBytes } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const MAX = 4 * 1024 * 1024;
function detect(buffer) {
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return "image/jpeg";
  if (buffer.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) return "image/png";
  if (buffer.length >= 12 && buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP") return "image/webp";
  return null;
}
export async function uploadImage(file) {
  if (!file || file.size > MAX) throw new Error("Each image must be 4 MB or smaller");
  const buffer = Buffer.from(await file.arrayBuffer());
  const mime = detect(buffer);
  if (!mime) throw new Error("Only valid JPEG, PNG, and WEBP images are allowed");
  const ext = mime === "image/jpeg" ? "jpg" : mime.split("/")[1];
  const name = `${Date.now()}-${randomBytes(6).toString("hex")}.${ext}`;
  const base = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  const bucket = process.env.SUPABASE_BUCKET || "laptop-photos";

  if (base && key) {
    const response = await fetch(`${base}/storage/v1/object/${bucket}/${name}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, apikey: key, "Content-Type": mime, "x-upsert": "false" },
      body: buffer
    });
    if (!response.ok) throw new Error("Supabase Storage upload failed");
    return `${base}/storage/v1/object/public/${bucket}/${name}`;
  }
  if (process.env.VERCEL) throw new Error("Configure Supabase Storage before uploading on Vercel");
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), buffer);
  return `/uploads/${name}`;
}
