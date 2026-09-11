import { getChatGPTUser } from "../../chatgpt-auth";
import { studioDb } from "../../../db/studio";
import { validateDraft } from "../../studio/model";
export const dynamic = "force-dynamic";
const json = (value: unknown, status = 200) => Response.json(value, { status, headers: { "Cache-Control": "no-store" } });

type AuthMode = "studio" | "api" | null;

function secureEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return difference === 0;
}

async function configuredApiKey() {
  try {
    const runtime = await import("cloudflare:workers");
    const value = (runtime.env as unknown as Record<string, unknown>).STUDIO_API_KEY;
    if (typeof value === "string" && value.length >= 32) return value;
  } catch {
    // Lokale Entwicklungsumgebungen haben kein Cloudflare-Runtime-Modul.
  }
  return process.env.STUDIO_API_KEY;
}

async function authorize(request: Request): Promise<AuthMode> {
  const authorization = request.headers.get("authorization");
  if (authorization?.startsWith("Bearer ")) {
    const expected = await configuredApiKey();
    const supplied = authorization.slice(7);
    if (expected && secureEqual(supplied, expected)) return "api";
  }
  return (await getChatGPTUser())?.email.toLowerCase() === "mielerik@gmail.com" ? "studio" : null;
}

export async function GET(request: Request) {
  if (!await authorize(request)) return json({error:"Anmeldung oder gültiger API-Schlüssel erforderlich."},403);
  try { const db = await studioDb(); return json((await db.prepare("SELECT * FROM studio_pages ORDER BY updated DESC").all()).results); }
  catch { return json({error:"Seiten konnten nicht geladen werden. Bitte später erneut versuchen."},503); }
}
export async function POST(request: Request) {
  const authMode = await authorize(request);
  if (!authMode) return json({error:"Anmeldung oder gültiger API-Schlüssel erforderlich."},403);
  if (authMode === "studio" && request.headers.get("origin") !== new URL(request.url).origin) return json({error:"Ungültiger Ursprung."},403);
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
