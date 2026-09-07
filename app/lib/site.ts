// Keep one immutable production origin for canonicals, structured data, robots
// and the sitemap. The apex domain is the verified, directly served production
// hostname. This deliberately cannot be overridden by a stale hosting variable.
export const SITE_URL = "https://sofort-tools.de";
export const SITE_NAME = "SofortTools";

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
