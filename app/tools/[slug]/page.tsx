import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { ToolRunner } from "../../components/ToolRunner";
import { PropertyToolRunner } from "../../components/PropertyToolRunner";
import { ShiftToolRunner } from "../../components/ShiftToolRunner";
import { HandwerkerToolRunner } from "../../components/HandwerkerToolRunner";
import { categoryDetails, getTool, tools } from "../../data/tool-registry";
import { getRecommendation } from "../../data/affiliate";
import { getGuidesByTool } from "../../data/guides";
import { getAssociatedGuides } from "../../data/tool-guide-associations";
import { Recommendation } from "../../components/ToolUI";
import { getToolSeo } from "../../data/tool-seo";
import { absoluteUrl } from "../../lib/site";
import { getToolEditorial, getUsefulFaq } from "../../data/tool-editorial";
import { ToolIcon } from "../../components/ToolIcon";
import { CardArrow } from "../../components/CardArrow";
import { ToolResultActions } from "../../components/ToolResultActions";
import { getToolSources } from "../../data/tool-sources";

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};

  const canonical = `/tools/${tool.slug}`;
  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical, languages: { "de-DE": canonical, "x-default": canonical } },
    openGraph: {
      title: `${tool.title} – kostenlos online`,
      description: tool.description,
      url: canonical,
    },
    twitter: {
      title: `${tool.title} – kostenlos online`,
      description: tool.description,
    },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const categorySlug = categoryDetails[tool.category].slug;
  const categoryHref = `/nischen/${categorySlug}`;
  const seo = getToolSeo(tool.slug);
  const configuredRelated = (seo.relatedSlugs ?? []).map((relatedSlug) => getTool(relatedSlug)).filter(Boolean);
  const fallbackRelated = tools.filter((item) => item.category === tool.category && item.slug !== tool.slug && !configuredRelated.some((related) => related?.slug === item.slug));
  const related = [...configuredRelated, ...fallbackRelated].slice(0, 4);
  const recommendation = getRecommendation(tool.slug, tool.title);
  const guides = [...getGuidesByTool(tool.slug), ...getAssociatedGuides(tool.slug)]
    .filter((guide, index, list) => list.findIndex((item) => item.slug === guide.slug) === index);
  const editorial = getToolEditorial(tool, seo, guides[0]?.excerpt);
  const usefulFaq = getUsefulFaq(tool, seo);
  const sources = getToolSources(tool.slug);

  const runner = {
    core: <ToolRunner slug={tool.slug} />,
    property: <PropertyToolRunner slug={tool.slug} />,
    shift: <ShiftToolRunner slug={tool.slug} />,
    handwerker: <HandwerkerToolRunner slug={tool.slug} />,
  }[tool.runner];

  const canonical = absoluteUrl(`/tools/${tool.slug}`);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${canonical}#app`,
        name: tool.title,
        url: canonical,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        inLanguage: "de-DE",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        description: tool.description,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Startseite", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: tool.category, item: absoluteUrl(categoryHref) },
          { "@type": "ListItem", position: 3, name: tool.title, item: canonical },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: usefulFaq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return <>
    <Script id={`schema-${tool.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <SiteHeader />
    <main className="tool-page">
      <div className="shell">
        <nav className="breadcrumbs" aria-label="Brotkrümelnavigation">
          <Link href="/">Startseite</Link><span>›</span><Link href={categoryHref}>{tool.category}</Link><span>›</span><b>{tool.title}</b>
        </nav>

        <section className="tool-hero">
          <p className="eyebrow"><span /> {tool.eyebrow}</p>
          <h1>{tool.title}</h1>
          <p>{tool.description}</p>
          <div className="tool-badges"><span>✓ Kostenlos</span><span>✓ Ohne Anmeldung</span><span>✓ Sofortiges Ergebnis</span></div>
        </section>

        {runner}
        <ToolResultActions title={tool.title} />

        <section className="calculation-guide" aria-labelledby={`calculation-${tool.slug}`}>
          <header className="calculation-guide-head">
            <span className="calculation-guide-icon" aria-hidden="true">1</span>
            <div><p className="eyebrow"><span /> Rechenweg</p><h2 id={`calculation-${tool.slug}`}>So wird gerechnet</h2></div>
          </header>
          {seo.formula ? <div className="formula-panel">
            <span>Die Formel</span>
            <strong>{seo.formula}</strong>
            {seo.example && <p><b>Einfaches Beispiel:</b> {seo.example}</p>}
          </div> : <div className="formula-panel formula-panel-muted">
            <span>Ablauf statt Formel</span>
            <strong>Dieses Werkzeug wertet deine Eingaben Schritt für Schritt aus.</strong>
          </div>}
          <div className="calculation-steps" aria-label="Variablen und Rechenschritte">
            {seo.steps.map((step, index) => <article key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><strong>{step.title}</strong><p>{step.text}</p></div>
            </article>)}
          </div>
        </section>

        <section className="tool-editorial" aria-labelledby={`editorial-${tool.slug}`}>
          <header className="tool-editorial-head">
            <span className="tool-editorial-number" aria-hidden="true">2</span>
            <div><p className="eyebrow"><span /> Einordnung in die Praxis</p><h2 id={`editorial-${tool.slug}`}>{editorial.heading}</h2></div>
          </header>
          <p className="tool-editorial-lead">{editorial.lead}</p>
          <div className="practice-grid">
            <article><span>Hintergrund</span><p>{editorial.background}</p></article>
            <article><span>Regeln und Grenzen</span><p>{editorial.rules}</p></article>
            <article><span>Für deine Praxis</span><p>{editorial.practical}</p></article>
          </div>
          <div className="tool-editorial-checks">
            <strong>Darauf solltest du achten</strong>
            <ul>{editorial.checks.map((check) => <li key={check}>{check}</li>)}</ul>
          </div>
          {sources.length > 0 && <div className="official-sources">
            <strong>Offizielle Grundlagen</strong>
            <p>Tarife und Regeln können sich ändern. Diese Originalquellen helfen dir beim Gegenprüfen:</p>
            <ul>{sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a><span>{source.publisher}</span></li>)}</ul>
          </div>}
          {guides.length > 0 && <div className="guide-inline-links" aria-label="Passende Ratgeber">
            {guides.map((guide) => <Link href={`/ratgeber/${guide.slug}`} className="guide-inline-link" key={guide.slug}>Mehr dazu: {guide.title} →</Link>)}
          </div>}
        </section>

        {usefulFaq.length > 0 && <section className="faq-section" aria-labelledby={`faq-${tool.slug}`}>
          <div className="faq-intro"><p className="eyebrow"><span /> Kurz beantwortet</p><h2 id={`faq-${tool.slug}`}>Fragen aus der Praxis</h2><p>Nur Fragen, die beim Rechnen oder Einordnen dieses Ergebnisses wirklich weiterhelfen.</p></div>
          <div className="faq-list">
            {usefulFaq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
          </div>
        </section>}

        {recommendation && <Recommendation rec={recommendation} slug={tool.slug} />}

        {related.length > 0 && <section className="related">
          <div className="section-head">
            <div><p className="eyebrow"><span /> Passende Werkzeuge</p><h2>Diese Tools passen zu deiner nächsten Berechnung</h2></div>
            <Link href={categoryHref}>Alle {tool.category}-Tools →</Link>
          </div>
          <div className="tool-grid compact">
            {related.map((item) => item && <Link href={`/tools/${item.slug}`} className="tool-card" key={item.slug}>
              <div className="card-top"><span className="tool-icon"><ToolIcon slug={item.slug} /></span><CardArrow /></div>
              <p>{item.eyebrow}</p><h3>{item.title}</h3><span>{item.short}</span>
            </Link>)}
          </div>
        </section>}
      </div>
    </main>
    <SiteFooter />
  </>;
}
