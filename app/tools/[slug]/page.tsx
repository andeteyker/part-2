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
import { Recommendation } from "../../components/ToolUI";
import { getToolSeo } from "../../data/tool-seo";
import { absoluteUrl } from "../../lib/site";
import { getToolEditorial, getUsefulFaq } from "../../data/tool-editorial";
import { ToolIcon } from "../../components/ToolIcon";

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
  const guides = getGuidesByTool(tool.slug);
  const editorial = getToolEditorial(tool, seo, guides[0]?.excerpt);
  const usefulFaq = getUsefulFaq(tool, seo);

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

        <section className="tool-editorial" aria-labelledby={`editorial-${tool.slug}`}>
          <p className="eyebrow"><span /> Einordnung aus der Praxis</p>
          <h2 id={`editorial-${tool.slug}`}>{editorial.heading}</h2>
          <div className="tool-editorial-copy">
            <p>{editorial.lead}</p>
            <p>{editorial.method}</p>
          </div>
          <div className="tool-editorial-checks">
            <strong>Darauf solltest du achten</strong>
            <ul>{editorial.checks.map((check) => <li key={check}>{check}</li>)}</ul>
          </div>
        </section>

        {recommendation && <Recommendation rec={recommendation} slug={tool.slug} />}
        {seo.formula && <section className="calculation-guide" aria-label="Berechnungsweg">
          <span className="calculation-guide-icon" aria-hidden="true">i</span>
          <div><strong>So wird gerechnet</strong><p>{seo.formula}{seo.example ? ` · ${seo.example}` : ""}</p></div>
        </section>}

        <section className="content-grid">
          <article>
            <p className="eyebrow"><span /> Anleitung</p>
            <h2>So funktioniert der {tool.title}</h2>
            <ol>
              {seo.steps.map((step) => <li key={step.title}><b>{step.title}</b><span>{step.text}</span></li>)}
            </ol>
            {(seo.formula || seo.example) && <div className="tool-explanation">
              {seo.formula && <p><strong>Formel:</strong> {seo.formula}</p>}
              {seo.example && <p><strong>Beispiel:</strong> {seo.example}</p>}
            </div>}
            {guides.length > 0 && <div className="guide-inline-links" aria-label="Passende Ratgeber">
              {guides.map((guide) => <Link href={`/ratgeber/${guide.slug}`} className="guide-inline-link" key={guide.slug}>Ausführlicher Ratgeber: {guide.title} →</Link>)}
            </div>}
          </article>
          <aside>
            <h2>Häufige Fragen</h2>
            {usefulFaq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
          </aside>
        </section>

        {related.length > 0 && <section className="related">
          <div className="section-head">
            <div><p className="eyebrow"><span /> Passende Werkzeuge</p><h2>Diese Tools passen zu deiner nächsten Berechnung</h2></div>
            <Link href={categoryHref}>Alle {tool.category}-Tools →</Link>
          </div>
          <div className="tool-grid compact">
            {related.map((item) => item && <Link href={`/tools/${item.slug}`} className="tool-card" key={item.slug}>
              <div className="card-top"><span className="tool-icon"><ToolIcon slug={item.slug} /></span><span className="tool-arrow">↗</span></div>
              <p>{item.eyebrow}</p><h3>{item.title}</h3><span>{item.short}</span>
            </Link>)}
          </div>
        </section>}
      </div>
    </main>
    <SiteFooter />
  </>;
}
