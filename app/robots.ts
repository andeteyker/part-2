import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://soforttools.mielerik.chatgpt.site/sitemap.xml", host: "https://soforttools.mielerik.chatgpt.site" }; }
