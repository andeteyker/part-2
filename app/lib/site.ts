const fallbackSiteUrl = "https://soforttools.mielerik.chatgpt.site";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl).replace(/\/$/, "");
export const SITE_NAME = "Sofort-Tools";

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
