import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { allGuides, getGuide, getRelatedGuides } from "../../data/guides";
import { getGuideEditorialOverride } from "../../data/guide-editorial";
import { getTool } from "../../data/tool-registry";
import { absoluteUrl } from "../../lib/site";
import type { GuideBlock } from "../../data/guides";

export function generateStaticParams() {
  return allGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const editorial = getGuideEditorialOverride(slug);
  const title = editorial?.title ?? guide.title;
  const description = editorial?.description ?? guide.description;

  return {
    title,
    description,
    keywords: guide.keywords,
    alternates: { canonical: `/ratgeber/${guide.slug}` },
    openGraph: { title, description, url: `/ratgeber/${guide.slug}`, type: "article" },
    twitter: { title, description },
  };
}

function renderBlock(block: GuideBlock) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "ul":
      return <ul>{block.items.map((item, i) => <li key={i}>{item}</li>)}</ul>;
    case "ol":
      return <ol>{block.items.map((item, i) => <li key={i}>{item}</li>)}</ol>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "tip":
      return <div className="guide-tip">{block.text}</div>;
    case "table":
      return (
        <table className="guide-table">
          <thead><tr>{block.head.map((cell, i) => <th key={i}>{cell}</th>)}</tr></thead>
          <tbody>{block.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody>
        </table>
      );
    default:
      return null;
  }
}

const editorialHeadings: Record<string, string[]> = {
  Immobilien: [
    "Bevor du nach Objekten suchst",
    "Diese Zahlen entscheiden über deinen Spielraum",
    "So wird aus einem Wunschbudget eine belastbare Planung",
    "Was ein realistisches Beispiel zeigt",
    "Wo Immobilienrechnungen häufig zu optimistisch werden",
  ],
  "Finanzen & Steuern": [
    "Was du zuerst voneinander trennen solltest",
    "Die wichtigsten Zahlen für eine brauchbare Einschätzung",
    "So gehst du Schritt für Schritt vor",
    "Ein Beispiel mit konkreten Annahmen",
    "Typische Denkfehler bei Finanz- und Steuerrechnungen",
  ],
  "Schicht & Zuschläge": [
    "Warum die Abrechnung schnell unübersichtlich wird",
    "Welche Zeiten und Sätze wirklich relevant sind",
    "So prüfst du deine Abrechnung nachvollziehbar",
    "Ein typischer Monat als Beispiel",
    "Diese Fehler führen oft zu falschen Ergebnissen",
  ],
  "Energie & Umwelt": [
    "Wo deine Energiekosten tatsächlich entstehen",
    "Welche Verbrauchswerte du kennen solltest",
    "So vergleichst du Kosten und Einsparpotenzial sinnvoll",
    "Ein Rechenbeispiel aus dem Alltag",
    "Was einfache Energievergleiche oft übersehen",
  ],
  "Gesundheit & Fitness": [
    "Was der Wert überhaupt aussagen kann",
    "Welche Angaben das Ergebnis beeinflussen",
    "So ordnest du die Zahl sinnvoll ein",
    "Ein Beispiel zur Orientierung",
    "Warum eine einzelne Kennzahl nie die ganze Geschichte erzählt",
  ],
  "Familie & Leben": [
    "Was du frühzeitig planen kannst – und was nicht",
    "Welche Daten du dafür brauchst",
    "So bekommst du eine realistische Orientierung",
    "Ein Beispiel für die Planung",
    "Wo pauschale Annahmen schnell in die Irre führen",
  ],
  "Arbeitgeber & Business": [
    "Die Frage hinter der eigentlichen Rechnung",
    "Welche Angaben du sauber erfassen solltest",
    "So entsteht eine belastbare Kalkulation",
    "Ein Beispiel mit realistischen Annahmen",
    "Typische Fehler in der Praxis",
  ],
};

function getEditorialHeading(cluster: string, index: number, fallback: string) {
  return editorialHeadings[cluster]?.[index] ?? fallback;
}

function ContextualToolLinks({ toolSlugs, intro }: { toolSlugs: string[]; intro?: string }) {
  const tools = toolSlugs.map(getTool).filter((item) => item !== undefined).slice(0, 3);
  if (tools.length === 0) return null;

  return (
    <aside className="guide-context-tools" aria-label="Passende Rechner">
      <p>{intro ?? "Wenn du die Zahlen auf deinen eigenen Fall übertragen willst:"}</p>
      <div className="guide-tool-links">
        {tools.map((tool) => (
          <Link className="guide-inline-link" href={`/tools/${tool.slug}`} key={tool.slug}>
            {tool.title}<span aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}

function GuideCalculatorCta({ toolSlugs }: { toolSlugs: string[] }) {
  const tools = toolSlugs.map(getTool).filter((item) => item !== undefined).slice(0, 3);
  if (tools.length === 0) return null;

  return (
    <section className="guide-rechner-cta" aria-labelledby="guide-calculators-heading">
      <h2 id="guide-calculators-heading">Passende Rechner direkt öffnen</h2>
      <p>Nutze deine eigenen Werte. Jeder Rechner öffnet sich direkt und kostenlos.</p>
      <div className="guide-tool-links">
        {tools.map((tool) => (
          <Link className="guide-tool-cta" href={`/tools/${tool.slug}`} key={tool.slug}>
            {tool.title}<span aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const editorial = getGuideEditorialOverride(slug);
  const articleTitle = editorial?.title ?? guide.title;
  const articleDescription = editorial?.description ?? guide.description;
  const canonical = absoluteUrl(`/ratgeber/${guide.slug}`);
  const relatedGuides = getRelatedGuides(guide);
  const directToolSlugs = guide.toolSlugs ?? [guide.toolSlug];
  const relatedToolSlugs = guide.kind === "pillar"
    ? relatedGuides.flatMap((related) => related.toolSlugs ?? [related.toolSlug])
    : [];
  const contextualToolSlugs = [...new Set([...directToolSlugs, ...relatedToolSlugs])].slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonical}#article`,
        headline: articleTitle,
        description: articleDescription,
        inLanguage: "de-DE",
        dateModified: `${guide.updated}-01`,
        author: { "@type": "Organization", name: "Sofort-Tools Redaktion" },
        publisher: { "@type": "Organization", name: "Sofort-Tools" },
        mainEntityOfPage: canonical,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Startseite", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Ratgeber", item: absoluteUrl("/ratgeber") },
          { "@type": "ListItem", position: 3, name: articleTitle, item: canonical },
        ],
      },
    ],
  };

  return (
    <>
      <Script id={`guide-schema-${guide.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SiteHeader />
      <main className="tool-page">
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Brotkrümelnavigation">
            <Link href="/">Startseite</Link><span>›</span><Link href="/ratgeber">Ratgeber</Link><span>›</span><b>{articleTitle}</b>
          </nav>

          <section className="tool-hero guide-article-hero">
            <p className="eyebrow"><span /> {guide.kind === "pillar" ? "Leitfaden" : "Ratgeber"} · {guide.cluster}</p>
            <h1>{articleTitle}</h1>
            <p>{articleDescription}</p>
            <p className="guide-meta">Stand {guide.updated.split("-").reverse().join("/")} · Redaktionell eingeordnet und mit nachvollziehbaren Beispielen.</p>
          </section>

          <GuideCalculatorCta toolSlugs={contextualToolSlugs} />

          <article className="guide-body">
            {editorial?.lead && (
              <section className="guide-section guide-lead">
                <p>{editorial.lead}</p>
              </section>
            )}

            {guide.sections.map((section, sectionIndex) => (
              <section key={section.h2} className="guide-section">
                <h2>{editorial?.headings[sectionIndex] ?? getEditorialHeading(guide.cluster, sectionIndex, section.h2)}</h2>
                {section.blocks.map((block, i) => <div key={i}>{renderBlock(block)}</div>)}
                {sectionIndex === 1 && (
                  <ContextualToolLinks toolSlugs={contextualToolSlugs} intro={editorial?.toolIntro} />
                )}
              </section>
            ))}

            <section className="guide-editorial-note" aria-label="Hinweis zur Einordnung">
              <h2>Was du aus dem Beitrag mitnehmen solltest</h2>
              <p>Die Beispiele und Rechner helfen dir, Größenordnungen zu verstehen und verschiedene Szenarien miteinander zu vergleichen. Bei Verträgen, Steuern, Finanzierung, medizinischen Fragen oder anderen verbindlichen Entscheidungen zählen aber immer die konkreten Unterlagen und die für deinen Fall geltenden Regeln.</p>
            </section>
          </article>

          {relatedGuides.length > 0 && (
            <section className="guide-related" aria-labelledby="related-guides-heading">
              <h2 id="related-guides-heading">Passend dazu weiterlesen</h2>
              <div className="guide-grid compact">
                {relatedGuides.map((related) => {
                  const relatedEditorial = getGuideEditorialOverride(related.slug);
                  return (
                    <Link href={`/ratgeber/${related.slug}`} key={related.slug} className="guide-card">
                      <p>{related.kind === "pillar" ? "Leitfaden" : related.cluster}</p>
                      <h3>{relatedEditorial?.title ?? related.title}</h3>
                      <span>{relatedEditorial?.description ?? related.excerpt}</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
