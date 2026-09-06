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
import { getToolSeo } from "../../data/tool-seo";
import { absoluteUrl } from "../../lib/site";

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};

  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: {
      title: `${tool.title} – kostenlos online`,
      description: tool.description,
      url: `/tools/${tool.slug}`,
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
          </article>
          <aside>
            <h2>Häufige Fragen</h2>
            {tool.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
          </aside>
        </section>

        {related.length > 0 && <section className="related">
          <div className="section-head">
            <div><p className="eyebrow"><span /> Passende Werkzeuge</p><h2>Diese Tools passen zu deiner nächsten Berechnung</h2></div>
            <Link href={categoryHref}>Alle {tool.category}-Tools →</Link>
          </div>
          <div className="tool-grid compact">
            {related.map((item) => item && <Link href={`/tools/${item.slug}`} className="tool-card" key={item.slug}>
              <div className="card-top"><span className="tool-icon">{item.icon}</span><span className="tool-arrow">↗</span></div>
              <p>{item.eyebrow}</p><h3>{item.title}</h3><span>{item.short}</span>
            </Link>)}
          </div>
        </section>}
      </div>
    </main>
    <SiteFooter />
  </>;
}
