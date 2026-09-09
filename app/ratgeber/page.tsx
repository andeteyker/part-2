import type { Metadata } from "next";
import Link from "next/link";
import { CategoryIcon } from "../components/CategoryIcon";
import { CardArrow } from "../components/CardArrow";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { allGuides } from "../data/guides";
import { getTool } from "../data/tool-registry";

export const metadata: Metadata = {
  title: "Ratgeber mit passenden Rechnern",
  description: "Konkrete Ratgeber zu Immobilien, Finanzen, Energie, Arbeit und Alltag – mit nachvollziehbaren Beispielen und den jeweils passenden Rechnern.",
  alternates: { canonical: "/ratgeber" },
};

export default function RatgeberPage() {
  const guides = allGuides();
  const clusters = [...new Set(guides.map((guide) => guide.cluster))];
  return (
    <>
      <SiteHeader />
      <main className="tool-page">
        <div className="shell">
          <section className="tool-hero">
            <p className="eyebrow"><span /> Wissen</p>
            <h1>Themen, die wir wirklich erklären</h1>
            <p>Jeder Beitrag beantwortet eine konkrete Frage, zeigt ein nachvollziehbares Beispiel und führt direkt zu den Rechnern, mit denen du die Zahlen auf deinen Fall übertragen kannst.</p>
          </section>

          {clusters.map((cluster) => (
            <section className="guide-cluster" key={cluster}>
              <div className="section-head"><div><p className="eyebrow"><span /> Themencluster</p><h2>{cluster}</h2></div></div>
              <div className="guide-grid">
                {guides
                  .filter((guide) => guide.cluster === cluster)
                  .sort((a, b) => Number(b.kind === "pillar") - Number(a.kind === "pillar"))
                  .map((guide) => {
                    const guideTools = (guide.toolSlugs ?? [guide.toolSlug]).map(getTool).filter((tool) => tool !== undefined);
                    const tool = guideTools[0];
                    return (
                      <Link href={`/ratgeber/${guide.slug}`} key={guide.slug} className={`guide-card ${guide.kind === "pillar" ? "guide-card-pillar" : ""}`}>
                        <div className="card-top"><span className="tool-icon"><CategoryIcon category={tool?.category ?? ""} /></span><CardArrow /></div>
                        <p>{guide.kind === "pillar" ? "Leitfaden" : tool?.category ?? "Ratgeber"}</p>
                        <h3>{guide.title}</h3>
                        <span>{guide.excerpt}</span>
                        <div className="guide-card-tools" aria-label="Passende Rechner">
                          <strong>Passende Rechner</strong>
                          {guideTools.slice(0, 4).map((item) => <span key={item.slug}>{item.title}</span>)}
                          {guideTools.length > 4 && <span>+ {guideTools.length - 4} weitere</span>}
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </section>
          ))}
          {guides.length === 0 && <p>Noch keine Ratgeber verfügbar.</p>}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
