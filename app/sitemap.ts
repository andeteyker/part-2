import type { MetadataRoute } from "next";
import { categories, categoryDetails, tools } from "./data/tool-registry";

const base = "https://soforttools.mielerik.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base },
    ...categories.map((category) => ({
      url: `${base}/nischen/${categoryDetails[category].slug}`,
    })),
    ...tools.map((tool) => ({
      url: `${base}/tools/${tool.slug}`,
    })),
    { url: `${base}/datenschutz` },
    { url: `${base}/impressum` },
  ];
}
