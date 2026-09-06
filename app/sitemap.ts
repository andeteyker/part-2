import type { MetadataRoute } from "next";
import { categories, categoryDetails, tools } from "./data/tool-registry";
import { absoluteUrl } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/") },
    ...categories.map((category) => ({
      url: absoluteUrl(`/nischen/${categoryDetails[category].slug}`),
    })),
    ...tools.map((tool) => ({
      url: absoluteUrl(`/tools/${tool.slug}`),
    })),
    { url: absoluteUrl("/datenschutz") },
    { url: absoluteUrl("/impressum") },
  ];
}
