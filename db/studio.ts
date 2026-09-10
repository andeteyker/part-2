import type { PageRecord } from "../app/studio/model";
export async function studioDb() {
  const { env } = await import("cloudflare:workers");
  if (!env.DB) throw new Error("Die Speicherung ist derzeit nicht erreichbar.");
  return env.DB;
}
export async function publishedPage(slug: string) {
  const db = await studioDb();
  return db.prepare("SELECT * FROM studio_pages WHERE slug = ? AND published IS NOT NULL").bind(slug).first<PageRecord>();
}
