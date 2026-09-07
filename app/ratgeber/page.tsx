import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { allGuides } from "../data/guides";
import { getTool } from "../data/tool-registry";

export const metadata: Metadata = {
  title: "Ratgeber",
  description: "Praxis-Ratgeber rund um Immobilien, Finanzen, Handwerk und Beruf – verständlich erklärt mit unseren kostenlosen Rechnern.",
  alternates: { canonical: "/ratgeber" },
};

export default function RatgeberPage() {
  const guides = allGuides();
  return (
    <>
      <SiteHeader />
      <main className="tool-page">
        <div className="shell">
          <section className="tool-hero">
            <p className="eyebrow"><span /> Wissen</p>
            <h1>Ratgeber</h1>
            <p>Praxisnah erklärte Themen zu unseren Rechnern – mit Formeln, Beispielen und konkreten Zahlen.</p>
          </section>

          <div className="guide-grid">
            {guides.map((guide) => {
              const tool = getTool(guide.toolSlug);
              return (
                <Link href={`/ratgeber/${guide.slug}`} key={guide.slug} className="guide-card">
                  <div className="card-top"><span className="tool-icon">Rat</span><span className="tool-arrow">↗</span></div>
                  <p>{tool?.category ?? "Ratgeber"}</p>
                  <h3>{guide.title}</h3>
                  <span>{guide.excerpt}</span>
                </Link>
              );
            })}
          </div>
          {guides.length === 0 && <p>Noch keine Ratgeber verfügbar.</p>}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}