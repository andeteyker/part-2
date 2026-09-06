import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { categories, categoryDetails, getCategoryBySlug } from "../../data/tool-registry";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: categoryDetails[category].slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `Online-Tools für ${category.name}`,
    description: `${category.description} Kostenlos, ohne Anmeldung und direkt im Browser.`,
    keywords: category.tools.flatMap((tool) => tool.keywords).slice(0, 10),
    alternates: { canonical: `/nischen/${category.slug}` },
    openGraph: { title: `Kostenlose Tools für ${category.name}`, description: category.description, url: `/nischen/${category.slug}`, images: [] },
    twitter: { title: `Kostenlose Tools für ${category.name}`, description: category.description, images: [] },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();
  const canonical = `https://soforttools.mielerik.chatgpt.site/nischen/${category.slug}`;
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", name: `Online-Tools für ${category.name}`, description: category.description, url: canonical, mainEntity: { "@type": "ItemList", numberOfItems: category.tools.length, itemListElement: category.tools.map((tool, index) => ({ "@type": "ListItem", position: index + 1, name: tool.title, url: `https://soforttools.mielerik.chatgpt.site/tools/${tool.slug}` })) } };
  return <><Script id={`category-${category.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><SiteHeader /><main className="category-page"><div className="shell"><nav className="breadcrumbs" aria-label="Brotkrümelnavigation"><Link href="/">Startseite</Link><span>›</span><b>{category.name}</b></nav><section className="category-hero"><span className="category-hero-icon">{category.icon}</span><div><p className="eyebrow"><span /> {category.kicker}</p><h1>Online-Tools für {category.name}</h1><p>{category.description} Alle Werkzeuge sind kostenlos, funktionieren ohne Anmeldung und liefern direkt ein Ergebnis.</p></div></section><section className="category-tool-list"><div className="section-head"><div><p className="eyebrow"><span /> Spezialisierte Werkzeuge</p><h2>{category.tools.length} klare Lösungen</h2></div></div><div className="tool-grid">{category.tools.map((tool) => <Link href={`/tools/${tool.slug}`} className="tool-card" key={tool.slug}><div className="card-top"><span className="tool-icon">{tool.icon}</span><span className="tool-arrow">↗</span></div><p>{tool.eyebrow}</p><h3>{tool.title}</h3><span>{tool.short}</span></Link>)}</div></section><section className="category-copy"><div><p className="eyebrow"><span /> Warum diese Nische?</p><h2>Weniger Suchen, schneller entscheiden</h2></div><p>Die Werkzeuge in „{category.name}“ sind nach einem konkreten Anwendungsbereich gebündelt. Dadurch findest du verwandte Lösungen direkt nebeneinander und kannst Ergebnisse aus mehreren Rechnern miteinander kombinieren.</p></section><nav className="other-niches" aria-label="Weitere Nischen"><strong>Weitere Nischen</strong><div>{categories.filter((name) => name !== category.name).map((name) => <Link href={`/nischen/${categoryDetails[name].slug}`} key={name}>{name} →</Link>)}</div></nav></div></main><SiteFooter /></>;
}
