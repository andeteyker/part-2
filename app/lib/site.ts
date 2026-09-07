// Keep one immutable production origin for canonicals, structured data, robots
// and the sitemap. The www host is the production URL selected by Sites.
// This deliberately cannot be overridden by a stale hosting variable.
export const SITE_URL = "https://www.sofort-tools.de";
export const SITE_NAME = "SofortTools";

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
