import { getChatGPTUser } from "../../chatgpt-auth";
import { studioDb } from "../../../db/studio";
import { validateDraft } from "../../studio/model";
export const dynamic = "force-dynamic";
const json = (value: unknown, status = 200) => Response.json(value, { status, headers: { "Cache-Control": "no-store" } });
async function authorized() { return (await getChatGPTUser())?.email.toLowerCase() === "mielerik@gmail.com"; }
export async function GET() {
  if (!await authorized()) return json({error:"Bitte mit dem freigegebenen Konto anmelden."},403);
  try { const db = await studioDb(); return json((await db.prepare("SELECT * FROM studio_pages ORDER BY updated DESC").all()).results); }
  catch { return json({error:"Seiten konnten nicht geladen werden. Bitte später erneut versuchen."},503); }
}
export async function POST(request: Request) {
  if (!await authorized()) return json({error:"Kein Zugriff."},403);
  if (request.headers.get("origin") !== new URL(request.url).origin) return json({error:"Ungültiger Ursprung."},403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return json({error:"JSON erforderlich."},415);
  const raw = await request.text();
  if (raw.length > 220000) return json({error:"Die Seite ist zu groß."},413);
  let input, draft;
  try { input=JSON.parse(raw); draft=validateDraft(input.draft); if(!["save","publish","unpublish"].includes(input.action) || !Number.isInteger(input.revision) || input.revision < 0) throw new Error("Ungültige Aktion."); }
  catch(e) { return json({error:e instanceof Error ? e.message : "Ungültige Daten."},400); }
  try {
    const db=await studioDb(), data=JSON.stringify(draft), now=new Date().toISOString();
    let result;
    if(input.revision === 0) {
      result=await db.prepare("INSERT INTO studio_pages (slug,draft,published,revision,updated) VALUES (?,?,?,1,?) ON CONFLICT(slug) DO NOTHING").bind(draft.slug,data,input.action === "publish" ? data : null,now).run();
    } else {
      result=await db.prepare("UPDATE studio_pages SET draft=?, published=CASE WHEN ?='publish' THEN ? WHEN ?='unpublish' THEN NULL ELSE published END, revision=revision+1,updated=? WHERE slug=? AND revision=?").bind(data,input.action,data,input.action,now,draft.slug,input.revision).run();
    }
    if (!result.meta.changes) return json({error:"Die URL existiert bereits oder die Seite wurde zwischenzeitlich geändert. Bitte die Liste neu laden; dein Text bleibt im Editor erhalten."},409);
    return json({revision:input.revision+1});
  } catch { return json({error:"Speichern fehlgeschlagen. Dein Entwurf bleibt im Editor erhalten."},503); }
}
