import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound, permanentRedirect } from "next/navigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { categories, categoryDetails, getCategoryBySlug } from "../../data/tool-registry";
import { absoluteUrl } from "../../lib/site";
import { CategoryIcon } from "../../components/CategoryIcon";
import { CardArrow } from "../../components/CardArrow";
import { ToolCarousel } from "../../components/ToolCarousel";
import { ToolIcon } from "../../components/ToolIcon";
import { StudioPageIcon } from "../../components/StudioPageIcon";
import { publishedStudioCatalog } from "../../studio/catalog";

export const dynamic = "force-dynamic";

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
    description: `${category.description} Kostenlose Rechner und Werkzeuge ohne Anmeldung, direkt im Browser nutzbar.`,
    alternates: { canonical, languages: { "de-DE": canonical, "x-default": canonical } },
    openGraph: {
      title: `${category.name}: kostenlose Rechner & Tools`,
      description: category.description,
      url: canonical,
    },
    twitter: {
      title: `${category.name}: kostenlose Rechner & Tools`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "schule-text-seo") permanentRedirect("/nischen/text-sprache");
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const studioPages = (await publishedStudioCatalog()).filter((page) => page.category === category.name);
  const categoryTools = [
    ...category.tools.map((tool) => ({ ...tool, href: `/tools/${tool.slug}`, studioKind: undefined })),
    ...studioPages.map((page) => ({ ...page, studioKind: page.kind })),
  ];

  const canonical = absoluteUrl(`/nischen/${category.slug}`);
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
          numberOfItems: categoryTools.length,
          itemListElement: categoryTools.map((tool, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: tool.title,
            url: absoluteUrl(tool.href),
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Startseite", item: absoluteUrl("/") },
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
        <nav className="breadcrumbs" aria-label="Brotkrümelnavigation">
          <Link href="/">Startseite</Link><span>›</span><b>{category.name}</b>
        </nav>

        <section className="category-hero">
          <span className="category-hero-icon"><CategoryIcon category={category.name} /></span>
          <div>
            <p className="eyebrow"><span /> {category.kicker}</p>
            <h1>{category.name}: Rechner & Online-Tools</h1>
            <p>{category.description} Alle Werkzeuge sind kostenlos, funktionieren ohne Anmeldung und liefern direkt ein Ergebnis.</p>
          </div>
        </section>

        <section className="category-tool-list">
          <div className="section-head">
            <div><p className="eyebrow"><span /> Spezialisierte Werkzeuge</p><h2>{categoryTools.length} Rechner und Seiten für konkrete Aufgaben</h2></div>
          </div>
          <ToolCarousel label={category.name}>
            {categoryTools.map((tool) => <Link href={tool.href} className="tool-card" key={tool.href}>
              <div className="card-top"><span className="tool-icon">{tool.studioKind ? <StudioPageIcon kind={tool.studioKind}/> : <ToolIcon slug={tool.slug} />}</span><CardArrow /></div>
              <p>{tool.eyebrow}</p><h3>{tool.title}</h3><span>{tool.short}</span>
            </Link>)}
          </ToolCarousel>
        </section>

        <section className="category-copy">
          <div><p className="eyebrow"><span /> Thematisch gebündelt</p><h2>Weniger suchen, schneller entscheiden</h2></div>
          <p>Die Werkzeuge in „{category.name}“ sind nach einem konkreten Anwendungsbereich gebündelt. So kannst du verwandte Berechnungen direkt nacheinander durchführen, Ergebnisse vergleichen und ohne Umwege zum passenden nächsten Tool wechseln.</p>
        </section>

        <nav className="other-niches" aria-label="Weitere Kategorien">
          <strong>Weitere Kategorien</strong>
          <div>{categories.filter((name) => name !== category.name).map((name) => <Link href={`/nischen/${categoryDetails[name].slug}`} key={name}>{name} →</Link>)}</div>
        </nav>
      </div>
    </main>
    <SiteFooter />
  </>;
}
