import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

async function cloudflareEnv(): Promise<Record<string, unknown>> {
  try {
    const runtime = await (Function("return import('cloudflare:workers')")() as Promise<{ env?: Record<string, unknown> }>);
    return runtime.env ?? {};
  } catch {
    return {};
  }
}

export async function getDb() {
  const env = await cloudflareEnv();
  const db = env.DB;
  if (!db) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB` or let your control plane inject the real binding values before using the database."
    );
  }

  return drizzle(db as Parameters<typeof drizzle>[0], { schema });
}
