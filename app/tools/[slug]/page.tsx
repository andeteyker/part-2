import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { ToolRunner } from "../../components/ToolRunner";
import { PropertyToolRunner } from "../../components/PropertyToolRunner";
import { ShiftToolRunner } from "../../components/ShiftToolRunner";
import { getTool, propertyTools, shiftTools, tools } from "../../data/tool-registry";

export function generateStaticParams() { return tools.map((tool) => ({ slug: tool.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const tool = getTool(slug); if (!tool) return {};
  return { title: tool.title, description: tool.description, keywords: tool.keywords, alternates: { canonical: `/tools/${tool.slug}` }, openGraph: { title: `${tool.title} – kostenlos online`, description: tool.description, url: `/tools/${tool.slug}`, images: [] }, twitter: { title: `${tool.title} – kostenlos online`, description: tool.description, images: [] } };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const tool = getTool(slug); if (!tool) notFound();
  const related = tools.filter((item) => item.category === tool.category && item.slug !== tool.slug).slice(0, 3);
  const isPropertyTool = propertyTools.some((item) => item.slug === tool.slug);
  const isShiftTool = shiftTools.some((item) => item.slug === tool.slug);
  const runner = isPropertyTool ? <PropertyToolRunner slug={tool.slug} /> : isShiftTool ? <ShiftToolRunner slug={tool.slug} /> : <ToolRunner slug={tool.slug} />;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebApplication", name: tool.title, url: `https://soforttools.mielerik.chatgpt.site/tools/${tool.slug}`, applicationCategory: "UtilitiesApplication", operatingSystem: "Alle", offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" }, description: tool.description },
    { "@type": "FAQPage", mainEntity: tool.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Startseite", item: "https://soforttools.mielerik.chatgpt.site/" }, { "@type": "ListItem", position: 2, name: tool.category, item: "https://soforttools.mielerik.chatgpt.site/#tools" }, { "@type": "ListItem", position: 3, name: tool.title }] },
  ] };
  return <><Script id={`schema-${tool.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><SiteHeader /><main className="tool-page"><div className="shell"><nav className="breadcrumbs" aria-label="Brotkrümelnavigation"><Link href="/">Startseite</Link><span>›</span><Link href="/#tools">{tool.category}</Link><span>›</span><b>{tool.title}</b></nav><section className="tool-hero"><p className="eyebrow"><span /> {tool.eyebrow}</p><h1>{tool.title}</h1><p>{tool.description}</p><div className="tool-badges"><span>✓ Kostenlos</span><span>✓ Ohne Anmeldung</span><span>✓ Sofortiges Ergebnis</span></div></section>{runner}<section className="content-grid"><article><p className="eyebrow"><span /> Anleitung</p><h2>So funktioniert: {tool.title}</h2><ol><li><b>Werte eingeben</b><span>Trage die benötigten Angaben in die übersichtlichen Felder ein.</span></li><li><b>Ergebnis erhalten</b><span>Das Werkzeug berechnet oder verarbeitet deine Eingabe direkt.</span></li><li><b>Ergebnis verwenden</b><span>Nutze das Ergebnis als schnelle Orientierung für deine nächste Entscheidung.</span></li></ol></article><aside><h2>Häufige Fragen</h2>{tool.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</aside></section>{related.length > 0 && <section className="related"><div className="section-head"><div><p className="eyebrow"><span /> Gleiche Nische</p><h2>Weitere Tools für {tool.category}</h2></div><Link href="/#tools">Alle Nischen →</Link></div><div className="tool-grid compact">{related.map((item) => <Link href={`/tools/${item.slug}`} className="tool-card" key={item.slug}><div className="card-top"><span className="tool-icon">{item.icon}</span><span className="tool-arrow">↗</span></div><p>{item.eyebrow}</p><h3>{item.title}</h3><span>{item.short}</span></Link>)}</div></section>}</div></main><SiteFooter /></>;
}
