import type { MetadataRoute } from "next";
import { categories, categoryDetails, tools } from "./data/tool-registry";
import { allGuides } from "./data/guides";
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
    { url: absoluteUrl("/ratgeber") },
    ...allGuides().map((guide) => ({
      url: absoluteUrl(`/ratgeber/${guide.slug}`),
    })),
    { url: absoluteUrl("/datenschutz") },
    { url: absoluteUrl("/impressum") },
  ];
}
