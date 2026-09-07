import type { MetadataRoute } from "next";
import { categories, categoryDetails, tools } from "./data/tool-registry";
import { allGuides } from "./data/guides";
import { absoluteUrl } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    ...categories.map((category) => ({ url: absoluteUrl(`/nischen/${categoryDetails[category].slug}`), lastModified, changeFrequency: "weekly" as const, priority: 0.9 })),
    ...tools.map((tool) => ({ url: absoluteUrl(`/tools/${tool.slug}`), lastModified, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: absoluteUrl("/ratgeber"), lastModified, changeFrequency: "weekly", priority: 0.8 },
    ...allGuides().map((guide) => ({ url: absoluteUrl(`/ratgeber/${guide.slug}`), lastModified: new Date(`${guide.updated}-01`), changeFrequency: "monthly" as const, priority: guide.kind === "pillar" ? 0.8 : 0.7 })),
    { url: absoluteUrl("/datenschutz"), lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/impressum"), lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
