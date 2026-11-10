import { q } from "./db";

export async function getSettings() {
  const rows = await q("SELECT key, value FROM settings");
  return Object.fromEntries(rows.map(r => [r.key, r.value]));
}
export function normalizePhone(value = "") {
  let digits = String(value).replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  if (digits.length === 10) digits = "91" + digits;
  return digits;
}
export function waLink(number, message = "") {
  const phone = normalizePhone(number);
  return phone ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}` : "#";
}
export function productMessage(p) {
  const lines = [
    `Hello, I am interested in this laptop: ${p.name || ""}`,
    `Brand: ${p.brand || ""}`,
    `Price: ${p.price == null ? "" : `₹${Number(p.price).toLocaleString("en-IN")}`}`,
    `Processor: ${p.processor || ""}`,
    `RAM: ${p.ram || ""}`,
    `Storage: ${p.storage || ""}`,
    `Condition: ${p.condition || ""}`,
    `Warranty: ${p.warranty || ""}`,
    "Please confirm availability."
  ];
  return lines.filter(line => !line.endsWith(": ")).join("\n");
}
