import { categories, categoryDetails, type ToolCategory } from "../data/tool-registry";
import { studioDb } from "../../db/studio";
import { normalizeDraft, type PageKind, type PageRecord } from "./model";

export type StudioCatalogItem = {
  slug: string;
  title: string;
  short: string;
  eyebrow: string;
  category: ToolCategory;
  kind: PageKind;
  href: string;
  updated: string;
};

function categoryFrom(value: string | undefined) {
  const normalized = value?.trim().toLocaleLowerCase("de");
  if (!normalized) return undefined;
  return categories.find((category) =>
    category.toLocaleLowerCase("de") === normalized || categoryDetails[category].slug === normalized,
  );
}

export function studioCategory(category: string, eyebrow: string, kind: PageKind): ToolCategory {
  return categoryFrom(category)
    ?? categoryFrom(eyebrow)
    ?? (kind === "tool" ? "Text & Sprache" : "Geld & Beruf");
}

export async function publishedStudioCatalog(): Promise<StudioCatalogItem[]> {
  try {
    const db = await studioDb();
    const result = await db.prepare(
      "SELECT slug, published, updated FROM studio_pages WHERE published IS NOT NULL ORDER BY updated DESC",
    ).all<Pick<PageRecord, "slug" | "published" | "updated">>();

    return (result.results ?? []).flatMap((record) => {
      try {
        const page = normalizeDraft(JSON.parse(record.published ?? ""));
        return [{
          slug: record.slug,
          title: page.title,
          short: page.description,
          eyebrow: page.eyebrow,
          category: studioCategory(page.category, page.eyebrow, page.kind),
          kind: page.kind,
          href: `/seiten/${record.slug}`,
          updated: record.updated,
        }];
      } catch {
        return [];
      }
    });
  } catch {
    // Static builds and local checks do not always provide the production database.
    return [];
  }
}
