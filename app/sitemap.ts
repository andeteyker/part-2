import type { MetadataRoute } from "next";
import { categories, categoryDetails, tools } from "./data/tool-registry";
import { allGuides } from "./data/guides";
import { absoluteUrl } from "./lib/site";
import { publishedStudioCatalog } from "./studio/catalog";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const studioPages = await publishedStudioCatalog();
  return [
    { url: absoluteUrl("/"), changeFrequency: "daily", priority: 1 },
    ...categories.map((category) => ({ url: absoluteUrl(`/nischen/${categoryDetails[category].slug}`), changeFrequency: "daily" as const, priority: 0.9 })),
    ...tools.map((tool) => ({ url: absoluteUrl(`/tools/${tool.slug}`), changeFrequency: "monthly" as const, priority: 0.85 })),
    ...studioPages.map((page) => ({ url: absoluteUrl(page.href), lastModified: new Date(page.updated), changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: absoluteUrl("/ratgeber"), changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/seiten"), changeFrequency: "daily", priority: 0.8 },
    { url: absoluteUrl("/ueber-uns"), changeFrequency: "monthly", priority: 0.6 },
    ...allGuides().map((guide) => ({ url: absoluteUrl(`/ratgeber/${guide.slug}`), lastModified: new Date(`${guide.updated}-01`), changeFrequency: "monthly" as const, priority: guide.kind === "pillar" ? 0.85 : 0.75 })),
    { url: absoluteUrl("/datenschutz"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/impressum"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
