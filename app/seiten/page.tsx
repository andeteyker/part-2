import { studioDb } from "../../db/studio";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
export const dynamic="force-dynamic";
export const metadata={title:"Neue Tools und Ratgeber",alternates:{canonical:"/seiten"}};
export default async function Pages(){
  const db=await studioDb();const result=await db.prepare("SELECT slug,published FROM studio_pages WHERE published IS NOT NULL ORDER BY updated DESC").all<{slug:string;published:string}>();
  return <><SiteHeader/><main className="shell" style={{paddingBlock:40}}><h1>Neue Tools und Ratgeber</h1><div className="guide-grid">{result.results.map(r=>{const p=JSON.parse(r.published);return <a key={r.slug} className="guide-card" href={'/seiten/'+r.slug}><p>{p.kind}</p><h3>{p.title}</h3><span>{p.description}</span></a>;})}</div>{!result.results.length&&<p>Hier erscheinen die nächsten veröffentlichten Seiten.</p>}</main><SiteFooter/></>;
}
