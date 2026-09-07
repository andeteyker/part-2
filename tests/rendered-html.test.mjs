import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function createWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

async function fetchFromWorker(worker, path) {
  const response = await worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  return response;
}

test("renders one consistent production canonical and no preview marker", async () => {
  const worker = await createWorker();
  const response = await fetchFromWorker(worker, "/");

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /<html[^>]+lang=["']de["']/i);
  assert.match(html, /<title>Kostenlose Online-Rechner &amp; Tools \| SofortTools<\/title>/i);
  assert.match(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']https:\/\/www\.sofort-tools\.de[\/"]?/i);
  assert.doesNotMatch(html, /soforttools\.mielerik\.chatgpt\.site/i);
  assert.doesNotMatch(html, /codex-preview/i);
});

test("tool pages expose canonical, FAQ schema and unique help content", async () => {
  const worker = await createWorker();
  const response = await fetchFromWorker(worker, "/tools/nachtzuschlag-rechner");

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /https:\/\/www\.sofort-tools\.de\/tools\/nachtzuschlag-rechner/i);
  assert.match(html, /FAQPage/i);
  assert.match(html, /125 oder 150 Prozent prüfen|Zuschlagssatz auswählen/i);
});

test("robots and sitemap point only to the preferred www domain", async () => {
  const worker = await createWorker();
  const [robots, sitemap] = await Promise.all([
    fetchFromWorker(worker, "/robots.txt"),
    fetchFromWorker(worker, "/sitemap.xml"),
  ]);

  assert.equal(robots.status, 200);
  assert.equal(sitemap.status, 200);
  const robotsText = await robots.text();
  const sitemapText = await sitemap.text();
  assert.match(robotsText, /Sitemap: https:\/\/www\.sofort-tools\.de\/sitemap\.xml/i);
  assert.match(sitemapText, /https:\/\/www\.sofort-tools\.de\/tools\/mietrendite-rechner/i);
  assert.doesNotMatch(`${robotsText}\n${sitemapText}`, /mielerik\.chatgpt\.site/i);
  assert.equal((sitemapText.match(/<url>/g) ?? []).length, 45);
});

test("every published tool has dedicated SEO guidance", async () => {
  const [baseSource, registrySource, seoSource] = await Promise.all([
    readFile(new URL("../app/data/tools.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data/tool-registry.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data/tool-seo.ts", import.meta.url), "utf8"),
  ]);
  const baseToolSection = baseSource.split("export const categories")[0];
  const extendedToolSection = registrySource.split("const register")[0];
  const publishedSlugs = [...baseToolSection.matchAll(/slug: "([^"]+)"/g), ...extendedToolSection.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
  const optimizedSlugs = new Set([...seoSource.matchAll(/^  "([^"]+)": \{/gm)].map((match) => match[1]));

  assert.equal(publishedSlugs.length, 35);
  assert.deepEqual(publishedSlugs.filter((slug) => !optimizedSlugs.has(slug)), []);
});
