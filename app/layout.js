import "./globals.css";
export const metadata = {
  title: { default: "Bharat Tech Solutions | Refurbished Laptops & Repairs", template: "%s | Bharat Tech Solutions" },
  description: "Quality-checked refurbished laptops and dependable laptop repair services."
};
export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
