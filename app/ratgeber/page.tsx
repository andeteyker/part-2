import type { Metadata } from "next";
import Link from "next/link";
import { CategoryIcon } from "../components/CategoryIcon";
import { CardArrow } from "../components/CardArrow";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { allGuides } from "../data/guides";
import { getGuideEditorialOverride } from "../data/guide-editorial";
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
            <h1>Fragen aus dem Alltag verständlich beantwortet</h1>
            <p>Die Beiträge starten bei der eigentlichen Frage – nicht beim Rechner. Du bekommst zuerst eine verständliche Einordnung, Beispiele und typische Fallstricke. Nur wenn eine eigene Berechnung wirklich weiterhilft, verlinken wir das passende Werkzeug direkt an der richtigen Stelle.</p>
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
                    const editorial = getGuideEditorialOverride(guide.slug);
                    const title = editorial?.title ?? guide.title;
                    const excerpt = editorial?.description ?? guide.excerpt;

                    return (
                      <Link href={`/ratgeber/${guide.slug}`} key={guide.slug} className={`guide-card ${guide.kind === "pillar" ? "guide-card-pillar" : ""}`}>
                        <div className="card-top">
                          <span className="tool-icon"><CategoryIcon category={tool?.category ?? ""} /></span>
                          <CardArrow />
                        </div>
                        <p>{guide.kind === "pillar" ? "Ausführlicher Leitfaden" : "Ratgeber"}</p>
                        <h3>{title}</h3>
                        <span>{excerpt}</span>
                        {guideTools.length > 0 && (
                          <div className="guide-card-tools" aria-label="Im Artikel verlinkte Rechner">
                            <strong>Bei Bedarf weiterrechnen:</strong>
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
