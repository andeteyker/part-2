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
  assert.match(html, /<title>Kostenlose Online-Rechner für Alltag &amp; Finanzen \| SofortTools<\/title>/i);
  assert.match(html, /85 kostenlose Online-Rechner und Werkzeuge für Gehalt, Lernen, Texte, SEO, Bilder und Alltag/i);
  assert.match(html, /rel=["']icon["'][^>]+href=["'][^"']*icon-48\.png/i);
  assert.match(html, /rel=["']shortcut icon["'][^>]+href=["'][^"']*favicon\.ico/i);
  assert.match(html, /Organization/i);
  assert.match(html, /Sofort-Tools/i);
  assert.match(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']https:\/\/www\.sofort-tools\.de[\/"]?/i);
  assert.doesNotMatch(html, /soforttools\.mielerik\.chatgpt\.site/i);
  assert.doesNotMatch(html, /codex-preview/i);
});

test("brand and category artwork replace starter icons, abbreviations and emoji", async () => {
  const worker = await createWorker();
  const [home, category, guideIndex, localTool, favicon, homeSource, categorySource, toolPageSource] = await Promise.all([
    fetchFromWorker(worker, "/").then((response) => response.text()),
    fetchFromWorker(worker, "/nischen/immobilien").then((response) => response.text()),
    fetchFromWorker(worker, "/ratgeber").then((response) => response.text()),
    fetchFromWorker(worker, "/tools/zeichen-zaehlen").then((response) => response.text()),
    readFile(new URL("../public/favicon.svg", import.meta.url), "utf8"),
    readFile(new URL("../app/components/HomeClient.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/nischen/[slug]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/tools/[slug]/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(favicon, /#B8EF2C/i);
  assert.match(favicon, /#071A31/i);
  assert.doesNotMatch(favicon, /#2E9EFF|#0C79D8/i);
  assert.match(home, /<svg[^>]+viewBox="0 0 48 48"/i);
  assert.match(category, /<svg[^>]+viewBox="0 0 48 48"/i);
  assert.match(guideIndex, /<svg[^>]+viewBox="0 0 48 48"/i);
  const toolIconSlugs = [...home.matchAll(/data-tool-icon="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(toolIconSlugs.length, 85);
  assert.equal(new Set(toolIconSlugs).size, 85);
  assert.match(home, /data-tool-icon="prozentrechner"/);
  assert.match(home, /data-tool-icon="mehrwertsteuerrechner"/);
  assert.match(home, /data-tool-icon="stundenlohnrechner"/);
  assert.match(home, /data-tool-icon="spritkostenrechner"/);
  assert.doesNotMatch(`${home}\n${category}\n${guideIndex}\n${localTool}`, /🎂|⏱|⛽|🏠|🌙|🔒/u);
  assert.doesNotMatch(`${home}\n${category}\n${guideIndex}`, /↗/u);
  assert.match(home, /<span class="tool-arrow" aria-hidden="true"><svg[^>]+viewBox="0 0 20 20"/i);
  assert.doesNotMatch(`${homeSource}\n${categorySource}\n${toolPageSource}`, /\{(?:tool|item|category|group\.details)\.icon\}/);
  assert.match(home, /SofortTools bietet[\s\S]{0,40}85[\s\S]{0,40}kostenlose Online-Rechner und Werkzeuge/i);
});

test("category tools stay in one horizontally scrollable row", async () => {
  const worker = await createWorker();
  const [home, category, component, css] = await Promise.all([
    fetchFromWorker(worker, "/").then((response) => response.text()),
    fetchFromWorker(worker, "/nischen/schicht-zuschlaege").then((response) => response.text()),
    readFile(new URL("../app/components/ToolCarousel.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(home, /tool-carousel-track/);
  assert.match(category, /tool-carousel-track/);
  assert.match(component, /scrollBy\(/);
  assert.match(component, /Weitere Rechner in/);
  assert.match(css, /grid-auto-flow:\s*column/);
  assert.match(css, /overflow-x:\s*auto/);
  assert.match(css, /scroll-snap-type:\s*inline mandatory/);
  assert.match(css, /\.category-cluster\s*\{[^}]*min-width:\s*0[^}]*max-width:\s*100%/);
  assert.match(css, /\.tool-carousel-track\s*\{[^}]*width:\s*100%[^}]*max-width:\s*100%/);
});

test("image category contains ten useful tools with real drag and drop", async () => {
  const worker = await createWorker();
  const slugs = [
    "bildformat-konverter", "hintergrund-entfernen", "bildgroesse-aendern",
    "bild-zuschneiden-drehen", "bild-dateigroesse-komprimieren",
    "bild-metadaten-entfernen", "passfoto-zuschneiden", "bilder-zu-pdf",
    "bildfarben-korrigieren", "favicon-erstellen",
  ];
  const [categoryResponse, runnerSource] = await Promise.all([
    fetchFromWorker(worker, "/nischen/iphone-bilder"),
    readFile(new URL("../app/components/ImageToolRunner.tsx", import.meta.url), "utf8"),
  ]);
  const category = await categoryResponse.text();

  assert.equal(categoryResponse.status, 200);
  assert.match(category, /Bilder &amp; Dateien/);
  assert.equal((category.match(/data-tool-icon=/g) ?? []).length, 10);
  for (const slug of slugs) {
    const response = await fetchFromWorker(worker, `/tools/${slug}`);
    assert.equal(response.status, 200, slug);
    assert.match(await response.text(), /Bild hier ablegen oder auswählen/, slug);
  }
  assert.match(runnerSource, /onDragEnter=/);
  assert.match(runnerSource, /onDragOver=/);
  assert.match(runnerSource, /onDrop=/);
  assert.match(runnerSource, /event\.dataTransfer\.files/);
  assert.match(runnerSource, /multiple=\{multiple\}/);
  assert.doesNotMatch(category, /HEIC in JPG|WebP in JPG|Bild komprimieren/);
});

test("image format converter offers modern and legacy target formats", async () => {
  const worker = await createWorker();
  const [response, runnerSource] = await Promise.all([
    fetchFromWorker(worker, "/tools/bildformat-konverter"),
    readFile(new URL("../app/components/ImageToolRunner.tsx", import.meta.url), "utf8"),
  ]);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /JPG, PNG, WebP, AVIF &amp; BMP/);
  for (const format of ["image/jpeg", "image/png", "image/webp", "image/avif", "image/bmp"]) {
    assert.match(runnerSource, new RegExp(format.replace("/", "\\/")));
  }
  assert.match(runnerSource, /function bmpBlob/);
  assert.match(runnerSource, /ENCODE_UNSUPPORTED:image\/avif/);
  assert.match(runnerSource, /function UploadedImagePreview/);
  assert.match(runnerSource, /Originalvorschau/);
  assert.match(runnerSource, /Vorschau wird erstellt/);
  assert.match(runnerSource, /<UploadedImagePreview file=\{file\}/);
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
  assert.match(sitemapText, /https:\/\/www\.sofort-tools\.de\/ueber-uns/i);
  assert.equal((sitemapText.match(/<url>/g) ?? []).length, 136);
});

test("every published tool has dedicated SEO guidance", async () => {
  const [baseSource, registrySource, seoSource, learningSource, growthIndex, growthFiles] = await Promise.all([
    readFile(new URL("../app/data/tools.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data/tool-registry.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data/tool-seo.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data/learning-text-seo-tools.ts", import.meta.url), "utf8"),
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
  const learningSlugs = [...learningSource.matchAll(/^  \["([^"]+)"/gm)].map((match) => match[1]);
  const publishedSlugs = [...baseToolSection.matchAll(/slug: "([^"]+)"/g), ...extendedToolSection.matchAll(/slug: "([^"]+)"/g), ...growthFiles.flatMap((source) => [...source.matchAll(/slug: "([^"]+)"/g)].slice(0, 1))].map((match) => match[1]).concat(learningSlugs);
  const optimizedSlugs = new Set([...seoSource.matchAll(/^  "([^"]+)": \{/gm)].map((match) => match[1]));
  const growthSeoSlugs = new Set([...growthIndex.matchAll(/import \{ \w+ \} from "\.\/(.+)";/g)].map((match) => match[1]));

  assert.equal(publishedSlugs.length, 85);
  assert.deepEqual(publishedSlugs.filter((slug) => !optimizedSlugs.has(slug) && !growthSeoSlugs.has(slug) && !learningSlugs.includes(slug)), []);
});

test("every tool page adds human guidance and only topic-specific questions", async () => {
  const worker = await createWorker();
  const [baseSource, registrySource, learningSource, growthFiles] = await Promise.all([
    readFile(new URL("../app/data/tools.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data/tool-registry.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data/learning-text-seo-tools.ts", import.meta.url), "utf8"),
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
    .map((match) => match[1]).concat([...learningSource.matchAll(/^  \["([^"]+)"/gm)].map((match) => match[1]));
  const uniqueSlugs = [...new Set(slugs)];

  assert.equal(uniqueSlugs.length, 85);
  for (const slug of uniqueSlugs) {
    const response = await fetchFromWorker(worker, `/tools/${slug}`);
    const html = await response.text();
    const faqCount = (html.match(/<details/g) ?? []).length;
    assert.equal(response.status, 200, slug);
    assert.match(html, /Einordnung in die Praxis/i, slug);
    assert.match(html, /Hintergrund/i, slug);
    assert.match(html, /Regeln und Grenzen/i, slug);
    assert.match(html, /Darauf solltest du achten/i, slug);
    assert.ok(faqCount >= 1, `${slug}: keine thematische Frage`);
    assert.doesNotMatch(html, /Ist der (Rechner|Generator) kostenlos/i, slug);
    assert.doesNotMatch(html, /Was sollte ich bei „|Wie kann ich das Ergebnis zu „/i, slug);
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
    assert.match(html, /Mehr dazu:/i, slug);
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
  assert.match(html, /Variablen und Rechenschritte/i);
  assert.match(html, /Bruttomietrendite = Jahreskaltmiete/i);
  assert.doesNotMatch(html, /So funktioniert der Mietrendite-Rechner/i);
});

test("tool pages offer accessible result actions and official sources", async () => {
  const worker = await createWorker();
  const [taxPage, bmiPage, aboutPage] = await Promise.all([
    fetchFromWorker(worker, "/tools/einkommensteuer-rechner").then((response) => response.text()),
    fetchFromWorker(worker, "/tools/bmi-rechner").then((response) => response.text()),
    fetchFromWorker(worker, "/ueber-uns").then((response) => response.text()),
  ]);

  assert.match(taxPage, /Ergebnis verwenden/i);
  assert.match(taxPage, /Kopieren<\/button>/i);
  assert.match(taxPage, /Teilen<\/button>/i);
  assert.match(taxPage, /Drucken<\/button>/i);
  assert.match(taxPage, /aria-live="polite"/i);
  assert.match(taxPage, /Einkommensteuer-Rechner 2024–2026/i);
  assert.match(taxPage, /value="2026"/i);
  assert.match(taxPage, /§ 32a EStG – Einkommensteuertarif/i);
  assert.match(bmiPage, /Weltgesundheitsorganisation/i);
  assert.match(aboutPage, /Rechnen soll verständlich bleiben/i);
  assert.match(aboutPage, /Korrekturen und Hinweise/i);
});

test("practice guidance is tool-specific and calculator sections share one width", async () => {
  const worker = await createWorker();
  const [ruleOfThree, css] = await Promise.all([
    fetchFromWorker(worker, "/tools/dreisatzrechner").then((response) => response.text()),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(ruleOfThree, /Der direkte Dreisatz funktioniert bei proportionalen Zusammenhängen/i);
  assert.match(ruleOfThree, /Bei umgekehrt proportionalen Aufgaben/i);
  assert.match(ruleOfThree, /Schreibe die Einheiten neben die Werte/i);
  assert.doesNotMatch(ruleOfThree, /Wortzahl und Zeichenlänge/i);
  for (const selector of ["tool-surface", "calculation-guide", "tool-editorial", "faq-section"]) {
    assert.match(css, new RegExp(`\\.${selector}[^}]*max-width:\\s*920px`));
    assert.match(css, new RegExp(`\\.${selector}[^}]*margin(?:-inline)?:[^;}]*auto`));
  }
  for (const selector of ["guide-body", "guide-related", "guide-rechner-cta", "related"]) {
    assert.match(css, new RegExp(`\\.${selector}[^}]*margin(?:-inline)?:[^;}]*auto`));
  }
  assert.match(css, /\.guide-grid\s*\{[^}]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/);
  assert.match(css, /\.category-tool-list\s*\{[^}]*min-width:\s*0[^}]*max-width:\s*100%/);
  assert.match(css, /\.calculation-guide[^}]*background:\s*#f8fafb/);
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
  const [hook, core, property, shift, handwerker, growth, images] = await Promise.all([
    readFile(new URL("../app/hooks/useUrlState.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ToolRunner.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/PropertyToolRunner.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ShiftToolRunner.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/HandwerkerToolRunner.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/GrowthToolRunner.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ImageToolRunner.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(hook, /history\.replaceState/);
  assert.match(core, /useUrlState\("grundwert"/);
  assert.match(property, /useUrlState\("kaufpreis"/);
  assert.match(shift, /useUrlState\("nachtstunden"/);
  assert.match(handwerker, /useUrlState\("dachflaeche"/);
  assert.match(growth, /useUrlState\(field\.key, field\.defaultValue\)/);
  assert.match(images, /type="file"/);
  assert.match(images, /event\.dataTransfer\.files/);
  assert.doesNotMatch(images, /useUrlState/);
});

test("content plan renders 30 focused guides with examples and calculator links", async () => {
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
    assert.ok(words.length >= 150, `${slug} enthält nur ${words.length} Wörter`);
    assert.match(html, /Ein konkretes Beispiel/);
    assert.match(html, /Mit deinen eigenen Zahlen weiterrechnen/);
    assert.match(html, /Passende Ratgeber/);
    assert.doesNotMatch(html, /Eine belastbare Orientierung entsteht nicht durch einen einzelnen Richtwert/);
  }

  const index = await fetchFromWorker(worker, "/ratgeber").then((response) => response.text());
  assert.match(index, /Themen, die wir wirklich erklären/);
  assert.match(index, /Passende Rechner/);
  assert.match(index, /Kreditraten-Rechner für Immobilien/);
  assert.match(index, /Angebote richtig kalkulieren: Selbstkosten, Gewinn und Umsatzsteuer/);
});

test("consent is global, reversible and gates Plausible analytics", async () => {
  const [layout, banner, plausible, footer, appSources] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ConsentBanner.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/PlausibleAnalytics.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteFooter.tsx", import.meta.url), "utf8"),
    Promise.all([
      readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    ]).then((parts) => parts.join("\n")),
  ]);

  assert.match(layout, /<ConsentBanner \/>/);
  assert.match(layout, /<PlausibleAnalytics \/>/);
  assert.match(banner, /localStorage\.setItem\(KEY, value\)/);
  assert.match(banner, /setChoice\(value\)/);
  assert.equal((banner.match(/type="button"/g) ?? []).length, 2);
  assert.match(plausible, /https:\/\/plausible\.io\/js\/pa-967J2UZYysJCeCfhnkhCf\.js/);
  assert.match(plausible, /managedChoice === "accepted"/);
  assert.match(plausible, /addEventListener\("st:consent"/);
  assert.match(footer, /ConsentSettingsButton/);
  assert.doesNotMatch(appSources, /gtag\(|google-analytics|analytics\.js|document\.cookie/i);

  const worker = await createWorker();
  const homepage = await fetchFromWorker(worker, "/").then((response) => response.text());
  const privacy = await fetchFromWorker(worker, "/datenschutz").then((response) => response.text());
  assert.doesNotMatch(homepage, /pa-967J2UZYysJCeCfhnkhCf\.js/);
  assert.match(privacy, /Plausible Analytics/);
  assert.match(privacy, /Ohne aktive Zustimmung wird Plausible nicht geladen/);
});

test("learning, text and SEO are separate complete tool categories", async () => {
  const worker = await createWorker();
  const routes = [
    ["/nischen/schule-lernen", 8, /Notenrechner mit Gewichtung/i],
    ["/nischen/text-sprache", 8, /Lesbarkeitsanalyse für deutsche Texte/i],
    ["/nischen/seo-website", 10, /Google-Snippet-Vorschau/i],
  ];
  for (const [route, expectedCards, heading] of routes) {
    const response = await fetchFromWorker(worker, route);
    const html = await response.text();
    assert.equal(response.status, 200, route);
    assert.equal((html.match(/data-tool-icon=/g) ?? []).length, expectedCards, route);
    assert.match(html, heading, route);
  }
  const [definitions, runner] = await Promise.all([
    readFile(new URL("../app/data/learning-text-seo-tools.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/LearningTextSeoRunner.tsx", import.meta.url), "utf8"),
  ]);
  const slugs = [...definitions.matchAll(/^  \["([^"]+)"/gm)].map((match) => match[1]);
  assert.equal(slugs.length, 23);
  assert.equal(new Set(slugs).size, 23);
  slugs.forEach((slug) => assert.match(runner, new RegExp(`"?${slug}"?\\s*:`), slug));
  assert.match(runner, /function Field\(props:[\s\S]*help=\{help\}/);
  assert.match(runner, /function SelectField\(props:[\s\S]*help=\{help\}/);
  assert.match(runner, /function Area[\s\S]*<InfoTip/);
  assert.match(runner, /const TOOL_TERMS:[\s\S]*"hreflang-generator"/);
  assert.match(runner, /<ToolGlossary slug=\{slug\}/);
});
