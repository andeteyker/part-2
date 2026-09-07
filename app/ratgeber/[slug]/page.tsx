import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { allGuides, getGuide } from "../../data/guides";
import { getTool } from "../../data/tool-registry";
import { absoluteUrl } from "../../lib/site";
import { Recommendation } from "../../components/ToolUI";
import { getRecommendation } from "../../data/affiliate";
import type { GuideBlock } from "../../data/guides";

export function generateStaticParams() {
  return allGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: `/ratgeber/${guide.slug}` },
    openGraph: { title: guide.title, description: guide.description, url: `/ratgeber/${guide.slug}`, type: "article" },
    twitter: { title: guide.title, description: guide.description },
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

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const tool = getTool(guide.toolSlug);
  const canonical = absoluteUrl(`/ratgeber/${guide.slug}`);
  const toolUrl = tool ? absoluteUrl(`/tools/${tool.slug}`) : null;
  const recommendation = getRecommendation(guide.toolSlug);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonical}#article`,
        headline: guide.title,
        description: guide.description,
        inLanguage: "de-DE",
        dateModified: guide.updated,
        author: { "@type": "Person", name: "Sofort-Tools" },
        publisher: { "@type": "Organization", name: "Sofort-Tools" },
        mainEntityOfPage: canonical,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Startseite", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Ratgeber", item: absoluteUrl("/ratgeber") },
          { "@type": "ListItem", position: 3, name: guide.title, item: canonical },
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
            <Link href="/">Startseite</Link><span>›</span><Link href="/ratgeber">Ratgeber</Link><span>›</span><b>{guide.title}</b>
          </nav>

          <section className="tool-hero">
            <p className="eyebrow"><span /> Ratgeber</p>
            <h1>{guide.title}</h1>
            <p>{guide.description}</p>
            {tool && toolUrl && (
              <Link href={toolUrl} className="guide-tool-cta">Zum passenden Rechner: {tool.title}</Link>
            )}
          </section>

          <article className="guide-body">
            {guide.sections.map((section) => (
              <section key={section.h2} className="guide-section">
                <h2>{section.h2}</h2>
                {section.blocks.map((block, i) => <div key={i}>{renderBlock(block)}</div>)}
              </section>
            ))}
          </article>

          {tool && toolUrl && (
            <section className="guide-rechner-cta">
              <h2>Jetzt selbst berechnen</h2>
              <p>{tool.title} – kostenlos und ohne Anmeldung.</p>
              <Link href={toolUrl} className="recommendation-link">Zum Rechner</Link>
            </section>
          )}

          {recommendation && <Recommendation rec={recommendation} />}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}