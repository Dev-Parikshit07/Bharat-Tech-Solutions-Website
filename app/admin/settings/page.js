import { getSettings } from "@/lib/settings";
import SettingsForm from "@/components/SettingsForm";
export const dynamic = "force-dynamic";
export default async function Settings(){const s=await getSettings();return <main className="container admin-content"><h1 style={{font:"800 32px Manrope"}}>Shop settings</h1><div className="service" style={{maxWidth:650}}><SettingsForm initial={s}/></div></main>;}
