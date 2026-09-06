import type { MetadataRoute } from "next";
import { categories, categoryDetails, tools } from "./data/tool-registry";
import { siteUrl } from "./data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    ...categories.map((category) => ({
      url: `${siteUrl}/nischen/${categoryDetails[category].slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...tools.map((tool) => ({
      url: `${siteUrl}/tools/${tool.slug}`,
      changeFrequency: "monthly" as const,
      priority: tool.category === "Immobilien" ? 0.9 : 0.8,
    })),
    { url: `${siteUrl}/datenschutz`, changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${siteUrl}/impressum`, changeFrequency: "yearly" as const, priority: 0.2 },
  ];
}
