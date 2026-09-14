import type { PageRecord } from "../app/studio/model";

type StudioStatement = {
  bind: (...values: unknown[]) => StudioStatement;
  first: () => Promise<unknown>;
  all: () => Promise<{ results?: unknown[] }>;
  run: () => Promise<{ meta: { changes?: number } }>;
};

type StudioDatabase = {
  prepare: (query: string) => StudioStatement;
};

export async function studioDb(): Promise<StudioDatabase> {
  try {
    const runtime = await (Function("return import('cloudflare:workers')")() as Promise<{ env?: Record<string, unknown> }>);
    const db = runtime.env?.DB;
    if (db) return db as StudioDatabase;
  } catch {
    // Vercel and local builds do not expose the Cloudflare runtime module.
  }
  throw new Error("Die Speicherung ist derzeit nicht erreichbar.");
}

export async function publishedPage(slug: string) {
  const db = await studioDb();
  const result = await db.prepare("SELECT * FROM studio_pages WHERE slug = ? AND published IS NOT NULL").bind(slug).first();
  return result as PageRecord | null;
}
