import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { categories, categoryDetails, getCategoryBySlug } from "../../data/tool-registry";
import { siteUrl } from "../../data/site";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: categoryDetails[category].slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  const canonical = `/nischen/${category.slug}`;
  return {
    title: `${category.name}: Rechner & Online-Tools`,
    description: `${category.description} Kostenlos, ohne Anmeldung und direkt im Browser nutzbar.`,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title: `${category.name}: kostenlose Rechner & Tools`,
      description: category.description,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name}: kostenlose Rechner & Tools`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const canonical = `${siteUrl}/nischen/${category.slug}`;
  const isProperty = category.name === "Immobilien";
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonical}#collection`,
        name: `${category.name}: Rechner & Online-Tools`,
        description: category.description,
        url: canonical,
        inLanguage: "de-DE",
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: category.tools.length,
          itemListElement: category.tools.map((tool, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: tool.title,
            url: `${siteUrl}/tools/${tool.slug}`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Startseite", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: category.name, item: canonical },
        ],
      },
    ],
  };

  return <>
    <Script id={`category-${category.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <SiteHeader />
    <main className="category-page">
      <div className="shell">
        <nav className="breadcrumbs" aria-label="Brotkrümelnavigation"><Link href="/">Startseite</Link><span>›</span><b>{category.name}</b></nav>

        <section className="category-hero">
          <span className="category-hero-icon">{category.icon}</span>
          <div>
            <p className="eyebrow"><span /> {category.kicker}</p>
            <h1>{category.name}: Rechner & Online-Tools</h1>
            <p>{category.description} Alle Werkzeuge sind kostenlos, funktionieren ohne Anmeldung und liefern direkt ein Ergebnis.</p>
          </div>
        </section>

        <section className="category-tool-list">
          <div className="section-head"><div><p className="eyebrow"><span /> Spezialisierte Werkzeuge</p><h2>{category.tools.length} Rechner für konkrete Fragen</h2></div></div>
          <div className="tool-grid">
            {category.tools.map((tool) => <Link href={`/tools/${tool.slug}`} className="tool-card" key={tool.slug}>
              <div className="card-top"><span className="tool-icon">{tool.icon}</span><span className="tool-arrow">↗</span></div>
              <p>{tool.eyebrow}</p><h3>{tool.title}</h3><span>{tool.short}</span>
            </Link>)}
          </div>
        </section>

        <section className="category-copy">
          <div><p className="eyebrow"><span /> Suchintention statt Tool-Sammlung</p><h2>{isProperty ? "Immobilien Schritt für Schritt durchrechnen" : "Weniger suchen, schneller entscheiden"}</h2></div>
          <p>{isProperty
            ? "Beginne beim möglichen Kaufpreis und den Kaufnebenkosten, prüfe anschließend Kreditrate und Restschuld und bewerte bei einer Kapitalanlage zusätzlich Mietrendite und laufenden Cashflow. Die Rechner sind bewusst miteinander verknüpft, damit aus einzelnen Zahlen eine nachvollziehbare Entscheidungskette entsteht."
            : `Die Werkzeuge in „${category.name}“ sind nach einem konkreten Anwendungsbereich gebündelt. Dadurch findest du verwandte Lösungen direkt nebeneinander und kannst Ergebnisse aus mehreren Rechnern miteinander kombinieren.`}
          </p>
        </section>

        <nav className="other-niches" aria-label="Weitere Nischen">
          <strong>Weitere Kategorien</strong>
          <div>{categories.filter((name) => name !== category.name).map((name) => <Link href={`/nischen/${categoryDetails[name].slug}`} key={name}>{name} →</Link>)}</div>
        </nav>
      </div>
    </main>
    <SiteFooter />
  </>;
}
