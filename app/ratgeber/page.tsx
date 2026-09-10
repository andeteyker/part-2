import type { Metadata } from "next";
import Link from "next/link";
import { CategoryIcon } from "../components/CategoryIcon";
import { CardArrow } from "../components/CardArrow";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { allGuides } from "../data/guides";
import { getTool } from "../data/tool-registry";

export const metadata: Metadata = {
  title: "Ratgeber: verständliche Antworten für Finanzen, Wohnen, Arbeit & Alltag",
  description: "Ausführliche, verständliche Ratgeber zu Immobilien, Finanzen, Energie, Arbeit und Alltag – mit Beispielen, Einordnung und passenden Rechnern, wenn sie wirklich weiterhelfen.",
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
            <p className="eyebrow"><span /> Ratgeber</p>
            <h1>Erst verstehen, dann rechnen</h1>
            <p>Hier geht es nicht nur um Formeln. Die Ratgeber erklären Entscheidungen, typische Fallstricke und sinnvolle Annahmen. Wo eine eigene Rechnung hilfreich ist, findest du den passenden Rechner direkt im Beitrag.</p>
          </section>

          {clusters.map((cluster) => (
            <section className="guide-cluster" key={cluster}>
              <div className="section-head">
                <div>
                  <p className="eyebrow"><span /> Themenbereich</p>
                  <h2>{cluster}</h2>
                </div>
              </div>

              <div className="guide-grid">
                {guides
                  .filter((guide) => guide.cluster === cluster)
                  .sort((a, b) => Number(b.kind === "pillar") - Number(a.kind === "pillar"))
                  .map((guide) => {
                    const guideTools = (guide.toolSlugs ?? [guide.toolSlug]).map(getTool).filter((tool) => tool !== undefined);
                    const tool = guideTools[0];

                    return (
                      <Link href={`/ratgeber/${guide.slug}`} key={guide.slug} className={`guide-card ${guide.kind === "pillar" ? "guide-card-pillar" : ""}`}>
                        <div className="card-top">
                          <span className="tool-icon"><CategoryIcon category={tool?.category ?? ""} /></span>
                          <CardArrow />
                        </div>
                        <p>{guide.kind === "pillar" ? "Ausführlicher Leitfaden" : "Ratgeber"}</p>
                        <h3>{guide.title}</h3>
                        <span>{guide.excerpt}</span>
                        {guideTools.length > 0 && (
                          <div className="guide-card-tools" aria-label="Im Artikel verlinkte Rechner">
                            <strong>Im Beitrag hilfreich:</strong>
                            <span>{guideTools.slice(0, 2).map((item) => item.title).join(" · ")}</span>
                          </div>
                        )}
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
