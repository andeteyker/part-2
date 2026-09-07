// Keep one immutable production origin for canonicals, structured data, robots
// and the sitemap. The apex domain redirects to www, so www is the only URL
// search engines should index. This deliberately cannot be overridden by a
// stale hosting environment variable.
export const SITE_URL = "https://www.sofort-tools.de";
export const SITE_NAME = "SofortTools";

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
