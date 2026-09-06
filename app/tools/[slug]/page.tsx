import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { ToolRunner } from "../../components/ToolRunner";
import { PropertyToolRunner } from "../../components/PropertyToolRunner";
import { categoryDetails, getTool, propertyTools, tools } from "../../data/tool-registry";
import { toolSeoContent } from "../../data/seo-content";
import { siteUrl } from "../../data/site";

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
    alternates: { canonical },
    openGraph: {
      type: "website",
      title: `${tool.title} – kostenlos online`,
      description: tool.description,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.title} – kostenlos online`,
      description: tool.description,
    },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const category = categoryDetails[tool.category];
  const categoryHref = `/nischen/${category.slug}`;
  const related = tools.filter((item) => item.category === tool.category && item.slug !== tool.slug).slice(0, 4);
  const isPropertyTool = propertyTools.some((item) => item.slug === tool.slug);
  const seo = toolSeoContent[tool.slug];
  const canonical = `${siteUrl}/tools/${tool.slug}`;

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
          { "@type": "ListItem", position: 1, name: "Startseite", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: tool.category, item: `${siteUrl}${categoryHref}` },
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
          <div className="tool-badges"><span>✓ Kostenlos</span><span>✓ Ohne Anmeldung</span><span>✓ Direkt berechnet</span></div>
        </section>

        {isPropertyTool ? <PropertyToolRunner slug={tool.slug} /> : <ToolRunner slug={tool.slug} />}

        {seo && <section className="content-grid">
          <article>
            <p className="eyebrow"><span /> Einordnung</p>
            <h2>Was zeigt dir dieser Rechner?</h2>
            <p>{seo.intro}</p>
            <h3>{seo.formulaTitle}</h3>
            <p>{seo.formula}</p>
            <h3>Rechenbeispiel</h3>
            <p>{seo.example}</p>
          </article>
          <aside>
            <h2>Darauf solltest du achten</h2>
            <ul>{seo.notes.map((note) => <li key={note}>{note}</li>)}</ul>
          </aside>
        </section>}

        <section className="content-grid">
          <article>
            <p className="eyebrow"><span /> Anleitung</p>
            <h2>So nutzt du {tool.title}</h2>
            <ol>
              <li><b>Werte eingeben</b><span>Trage die für deinen Fall relevanten Angaben in die Felder ein.</span></li>
              <li><b>Ergebnis vergleichen</b><span>Ändere einzelne Annahmen, um verschiedene Szenarien direkt gegeneinander zu testen.</span></li>
              <li><b>Nächsten Rechner öffnen</b><span>Nutze die verwandten Werkzeuge derselben Kategorie für eine zweite Perspektive.</span></li>
            </ol>
          </article>
          <aside>
            <h2>Häufige Fragen</h2>
            {tool.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
          </aside>
        </section>

        {related.length > 0 && <section className="related">
          <div className="section-head">
            <div><p className="eyebrow"><span /> Nächster Schritt</p><h2>Weitere Rechner für {tool.category}</h2></div>
            <Link href={categoryHref}>Alle {tool.category}-Tools →</Link>
          </div>
          <div className="tool-grid compact">
            {related.map((item) => <Link href={`/tools/${item.slug}`} className="tool-card" key={item.slug}>
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
