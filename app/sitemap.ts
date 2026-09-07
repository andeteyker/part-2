import type { MetadataRoute } from "next";
import { categories, categoryDetails, tools } from "./data/tool-registry";
import { absoluteUrl } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    ...categories.map((category) => ({
      url: absoluteUrl(`/nischen/${categoryDetails[category].slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...tools.map((tool) => ({
      url: absoluteUrl(`/tools/${tool.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
