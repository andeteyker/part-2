export type PageDraft = { slug: string; title: string; description: string; kind: "ratgeber" | "rechner" | "tool"; body: string; code: string };
export type PageRecord = { slug: string; draft: string; published: string | null; revision: number; updated: string };
export const emptyDraft: PageDraft = { slug: "", title: "", description: "", kind: "ratgeber", body: "", code: "" };
export function validateDraft(value: unknown): PageDraft {
  if (!value || typeof value !== "object") throw new Error("Seitendaten fehlen.");
  const p = value as PageDraft;
  for (const field of ["slug", "title", "description", "body", "code"] as const) {
    if (typeof p[field] !== "string") throw new Error("Ungültiges Feld: " + field);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug) || p.slug.length > 90) throw new Error("Die URL darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten.");
  if (!p.title.trim() || p.title.length > 160) throw new Error("Bitte einen Titel mit höchstens 160 Zeichen eingeben.");
  if (!p.description.trim() || p.description.length > 400) throw new Error("Bitte eine kurze Beschreibung mit höchstens 400 Zeichen eingeben.");
  if (!["ratgeber", "rechner", "tool"].includes(p.kind)) throw new Error("Unbekannter Seitentyp.");
  if (p.body.length > 80000 || p.code.length > 120000) throw new Error("Die Seite ist zu groß.");
  return { slug:p.slug, title:p.title, description:p.description, body:p.body, code:p.code, kind:p.kind };
}
export function sandboxDocument(code: string) {
  return '<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; script-src \'unsafe-inline\'; style-src \'unsafe-inline\'; img-src data:; connect-src \'none\'; form-action \'none\'; base-uri \'none\'"><style>body{font:16px system-ui;color:#071a31;margin:16px}input,button,select{font:inherit;padding:10px;margin:5px;max-width:100%;box-sizing:border-box}button{background:#b8ef2c;border:0;border-radius:8px;cursor:pointer}output{display:block;font-size:24px;margin:16px 0}</style></head><body>' + code + '</body></html>';
}
export const calculatorTemplate = `<h2>Prozentwert berechnen</h2>
<label>Grundwert <input id="base" type="number" value="200"></label>
<label>Prozentsatz <input id="rate" type="number" value="15"></label>
<output id="result" aria-live="polite"></output>
<script>
function calculate() {
  const base = document.getElementById('base');
  const rate = document.getElementById('rate');
  document.getElementById('result').textContent = base.value === '' || rate.value === '' ? 'Bitte beide Werte eingeben.' : (Number(base.value) * Number(rate.value) / 100).toLocaleString('de-DE');
}
document.addEventListener('input', calculate);
calculate();
</script>`;
