import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";
import ProductForm from "@/components/ProductForm";
export const dynamic = "force-dynamic";
export default async function EditProduct({params}){const p=await getProduct(params.id);if(!p)notFound();return <main className="container admin-content"><h1 style={{font:"800 32px Manrope"}}>Edit laptop</h1><div className="service"><ProductForm initial={p}/></div></main>;}
