import type { Metadata } from "next";
import { studioDb } from "../../db/studio";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
export const dynamic="force-dynamic";
export const metadata: Metadata={
  title:"Neue Online-Tools, Rechner & Ratgeber",
  description:"Entdecke neue kostenlose Online-Rechner, praktische Tools und verständliche Ratgeber für Finanzen, Alltag, Lernen, SEO und mehr.",
  alternates:{canonical:"/seiten"},
  openGraph:{title:"Neue Online-Tools, Rechner & Ratgeber | SofortTools",description:"Neue kostenlose Rechner, praktische Tools und verständliche Ratgeber – direkt online nutzbar.",url:"/seiten",type:"website"}
};
export default async function Pages(){
  const db=await studioDb();
  const result=await db.prepare("SELECT slug,published FROM studio_pages WHERE published IS NOT NULL ORDER BY updated DESC").all();
  const rows=(result.results ?? []) as Array<{slug:string;published:string}>;
  return <><SiteHeader/><main className="shell" style={{paddingBlock:40}}><h1>Neue Tools und Ratgeber</h1><div className="guide-grid">{rows.map(r=>{const p=JSON.parse(r.published);return <a key={r.slug} className="guide-card" href={'/seiten/'+r.slug}><p>{p.kind}</p><h3>{p.title}</h3><span>{p.description}</span></a>;})}</div>{!rows.length&&<p>Hier erscheinen die nächsten veröffentlichten Seiten.</p>}</main><SiteFooter/></>;
}
