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
  assert.equal((sitemapText.match(/<url>/g) ?? []).length, 103);
});

test("every published tool has dedicated SEO guidance", async () => {
  const [baseSource, registrySource, seoSource, growthIndex, growthFiles] = await Promise.all([
    readFile(new URL("../app/data/tools.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data/tool-registry.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data/tool-seo.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data/growth/index.ts", import.meta.url), "utf8"),
    Promise.all([
      "netto-gehalt-rechner", "einkommensteuer-rechner", "pendlerpauschale-rechner", "rentenrechner", "abfindungs-rechner", "bauspar-rechner",
      "stromkosten-rechner", "heizkosten-rechner", "gasverbrauch-rechner", "solar-ertrag-rechner", "bmi-rechner", "kalorienbedarf-rechner",
      "koerperfett-anteil-rechner", "idealgewicht-rechner", "elterngeld-rechner", "kindergeld-rechner", "schwangerschafts-terminrechner",
      "urlaubsanspruch-rechner", "angebots-kalkulation", "umzugskosten-rechner",
    ].map((slug) => readFile(new URL(`../app/data/growth/${slug}.ts`, import.meta.url), "utf8"))),
  ]);
  const baseToolSection = baseSource.split("export const categories")[0];
  const extendedToolSection = registrySource.split("const register")[0];
  const publishedSlugs = [...baseToolSection.matchAll(/slug: "([^"]+)"/g), ...extendedToolSection.matchAll(/slug: "([^"]+)"/g), ...growthFiles.flatMap((source) => [...source.matchAll(/slug: "([^"]+)"/g)].slice(0, 1))].map((match) => match[1]);
  const optimizedSlugs = new Set([...seoSource.matchAll(/^  "([^"]+)": \{/gm)].map((match) => match[1]));
  const growthSeoSlugs = new Set([...growthIndex.matchAll(/import \{ \w+ \} from "\.\/(.+)";/g)].map((match) => match[1]));

  assert.equal(publishedSlugs.length, 55);
  assert.deepEqual(publishedSlugs.filter((slug) => !optimizedSlugs.has(slug) && !growthSeoSlugs.has(slug)), []);
});

test("every tool page adds human guidance and useful topic-specific questions", async () => {
  const worker = await createWorker();
  const [baseSource, registrySource, growthFiles] = await Promise.all([
    readFile(new URL("../app/data/tools.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data/tool-registry.ts", import.meta.url), "utf8"),
    Promise.all([
      "netto-gehalt-rechner", "einkommensteuer-rechner", "pendlerpauschale-rechner", "rentenrechner", "abfindungs-rechner", "bauspar-rechner",
      "stromkosten-rechner", "heizkosten-rechner", "gasverbrauch-rechner", "solar-ertrag-rechner", "bmi-rechner", "kalorienbedarf-rechner",
      "koerperfett-anteil-rechner", "idealgewicht-rechner", "elterngeld-rechner", "kindergeld-rechner", "schwangerschafts-terminrechner",
      "urlaubsanspruch-rechner", "angebots-kalkulation", "umzugskosten-rechner",
    ].map((slug) => readFile(new URL(`../app/data/growth/${slug}.ts`, import.meta.url), "utf8"))),
  ]);
  const baseToolSection = baseSource.split("export const categories")[0];
  const registryToolSection = registrySource.split("const register")[0];
  const slugs = [...baseToolSection.matchAll(/slug: "([^"]+)"/g), ...registryToolSection.matchAll(/slug: "([^"]+)"/g), ...growthFiles.flatMap((source) => [...source.matchAll(/slug: "([^"]+)"/g)].slice(0, 1))]
    .map((match) => match[1]);
  const uniqueSlugs = [...new Set(slugs)];

  assert.equal(uniqueSlugs.length, 55);
  for (const slug of uniqueSlugs) {
    const response = await fetchFromWorker(worker, `/tools/${slug}`);
    const html = await response.text();
    const faqCount = (html.match(/<details/g) ?? []).length;
    assert.equal(response.status, 200, slug);
    assert.match(html, /Einordnung aus der Praxis/i, slug);
    assert.match(html, /Darauf solltest du achten/i, slug);
    assert.ok(faqCount >= 3, `${slug}: nur ${faqCount} thematische Fragen`);
    assert.doesNotMatch(html, /Ist der (Rechner|Generator) kostenlos/i, slug);
  }
});

test("all 20 growth calculators render FAQ, guidance and concise descriptions", async () => {
  const worker = await createWorker();
  const slugs = [
    "netto-gehalt-rechner", "einkommensteuer-rechner", "pendlerpauschale-rechner", "rentenrechner", "abfindungs-rechner", "bauspar-rechner",
    "stromkosten-rechner", "heizkosten-rechner", "gasverbrauch-rechner", "solar-ertrag-rechner", "bmi-rechner", "kalorienbedarf-rechner",
    "koerperfett-anteil-rechner", "idealgewicht-rechner", "elterngeld-rechner", "kindergeld-rechner", "schwangerschafts-terminrechner",
    "urlaubsanspruch-rechner", "angebots-kalkulation", "umzugskosten-rechner",
  ];

  for (const slug of slugs) {
    const [response, source] = await Promise.all([
      fetchFromWorker(worker, `/tools/${slug}`),
      readFile(new URL(`../app/data/growth/${slug}.ts`, import.meta.url), "utf8"),
    ]);
    const html = await response.text();
    const description = source.match(/description: "([^"]+)"/)?.[1] ?? "";
    const fieldCount = (source.match(/{ key:/g) ?? []).length;
    const infoButtonCount = (html.match(/aria-label="[^"]+ erklären"/g) ?? []).length;
    assert.equal(response.status, 200, slug);
    assert.match(html, /FAQPage/i, slug);
    assert.match(html, /So wird gerechnet/i, slug);
    assert.match(html, /Ausführlicher Ratgeber/i, slug);
    assert.ok(description.length >= 140 && description.length <= 160, `${slug}: ${description.length} Zeichen`);
    assert.ok(infoButtonCount >= fieldCount + 1, `${slug}: Info-Buttons fehlen an Feldern oder Ergebnis`);
  }
});

test("calculator pages explain technical terms and the calculation close to the form", async () => {
  const worker = await createWorker();
  const response = await fetchFromWorker(worker, "/tools/mietrendite-rechner");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Kaufnebenkosten erklären/i);
  assert.match(html, /So wird gerechnet/i);
  assert.match(html, /Bruttomietrendite = Jahreskaltmiete/i);
});

test("imprint identifies the operator with a complete service address", async () => {
  const worker = await createWorker();
  const response = await fetchFromWorker(worker, "/impressum");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Easysites/i);
  assert.match(html, /Erik Miel/i);
  assert.match(html, /Habichtweg 4/i);
  assert.match(html, /26835 Hesel/i);
  assert.match(html, /mielerik@gmail\.com/i);
  assert.doesNotMatch(html, /muss noch ergänzt werden/i);
});

test("all calculator families use reusable URL state while upload tools stay local", async () => {
  const [hook, core, property, shift, handwerker, growth] = await Promise.all([
    readFile(new URL("../app/hooks/useUrlState.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ToolRunner.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/PropertyToolRunner.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ShiftToolRunner.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/HandwerkerToolRunner.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/GrowthToolRunner.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(hook, /history\.replaceState/);
  assert.match(core, /useUrlState\("grundwert"/);
  assert.match(property, /useUrlState\("kaufpreis"/);
  assert.match(shift, /useUrlState\("nachtstunden"/);
  assert.match(handwerker, /useUrlState\("dachflaeche"/);
  assert.match(growth, /useUrlState\(field\.key, field\.defaultValue\)/);
  assert.match(core, /const \[file, setFile\] = useState<File \| null>/);
});

test("content pyramid renders ten clusters and 30 substantial linked guides", async () => {
  const worker = await createWorker();
  const guideSlugs = [
    "immobilie-kaufen-finanzieren-plan", "mietrendite-berechnen", "kaufnebenkosten-immobilie",
    "schichtarbeit-zuschlaege-ueberblick", "nachtzuschlag-steuerfrei", "ueberstunden-auszahlen-freizeit",
    "renovierungskosten-planen", "dachsanierung-kosten-planen", "boden-verlegen-kosten",
    "geld-rechner-alltag", "mehrwertsteuer-netto-brutto", "stundenlohn-monatsgehalt",
    "texte-schreiben-seo-pruefen", "dreisatz-einfach-erklaert", "wortzahl-lesezeit",
    "finanzen-steuern-planen", "einkommensteuer-pendlerpauschale", "rente-abfindung-bausparen",
    "energiekosten-senken", "heizkosten-gasverbrauch", "photovoltaik-ertrag-amortisation",
    "koerperwerte-einordnen", "kalorienbedarf-grundumsatz", "koerperfett-idealgewicht",
    "familienleistungen-termine", "kindergeld-bezugsdauer", "geburtstermin-schwangerschaftswoche",
    "arbeit-projekte-kalkulieren", "urlaubsanspruch-teilzeit", "umzugskosten-budget",
  ];

  for (const slug of guideSlugs) {
    const response = await fetchFromWorker(worker, `/ratgeber/${slug}`);
    const html = await response.text();
    assert.equal(response.status, 200, slug);
    const body = html.match(/<article class="guide-body">([\s\S]*?)<\/article>/)?.[1] ?? "";
    const words = body.replace(/<[^>]+>/g, " ").replace(/&[^;]+;/g, " ").trim().split(/\s+/).filter(Boolean);
    assert.ok(words.length >= 500, `${slug} enthält nur ${words.length} Wörter`);
    assert.match(html, /Zum passenden Rechner|Jetzt selbst berechnen/);
    assert.match(html, /Passende Ratgeber/);
  }
});

test("consent is global, reversible and does not include tracking SDKs", async () => {
  const [layout, banner, footer, appSources] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ConsentBanner.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteFooter.tsx", import.meta.url), "utf8"),
    Promise.all([
      readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    ]).then((parts) => parts.join("\n")),
  ]);

  assert.match(layout, /<ConsentBanner \/>/);
  assert.match(banner, /localStorage\.setItem\(KEY, value\)/);
  assert.match(footer, /ConsentSettingsButton/);
  assert.doesNotMatch(appSources, /gtag\(|google-analytics|analytics\.js|document\.cookie/i);
});
