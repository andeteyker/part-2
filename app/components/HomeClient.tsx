"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { categories, categoryDetails, tools, type ToolCategory } from "../data/tool-registry";
import { CategoryIcon } from "./CategoryIcon";
import { CardArrow } from "./CardArrow";
import { ToolCarousel } from "./ToolCarousel";
import { ToolIcon } from "./ToolIcon";
import { StudioPageIcon } from "./StudioPageIcon";
import type { StudioCatalogItem } from "../studio/catalog";

type CatalogItem = {
  slug: string;
  title: string;
  short: string;
  eyebrow: string;
  category: ToolCategory;
  href: string;
  keywords: string[];
  studioKind?: StudioCatalogItem["kind"];
};

function matchesQuery(tool: CatalogItem, query: string) {
  const q = query.trim().toLocaleLowerCase("de");
  if (!q) return true;
  const haystack = [tool.title, tool.short, tool.category, ...tool.keywords].join(" ").toLocaleLowerCase("de");
  return haystack.includes(q);
}

export function HomeClient({ studioPages }: { studioPages: StudioCatalogItem[] }) {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [category, setCategory] = useState<ToolCategory | "Alle">("Alle");
  const catalog = useMemo<CatalogItem[]>(() => [
    ...tools.map((tool) => ({ ...tool, href: `/tools/${tool.slug}`, keywords: tool.keywords })),
    ...studioPages.map((page) => ({ ...page, keywords: [page.kind], studioKind: page.kind })),
  ], [studioPages]);

  const liveMatchCount = useMemo(
    () => catalog.filter((tool) => matchesQuery(tool, query)).length,
    [catalog, query],
  );

  const visible = useMemo(() => {
    return catalog.filter((tool) => {
      const inCategory = category === "Alle" || tool.category === category;
      return inCategory && matchesQuery(tool, submittedQuery);
    });
  }, [catalog, submittedQuery, category]);

  const groups = categories.map((name) => ({ name, details: categoryDetails[name], items: visible.filter((tool) => tool.category === name) })).filter((group) => group.items.length);
  const featuredCategories: { name: string; category: ToolCategory; subtitle: string }[] = [
    { name: "Handwerker & Renovierung", category: "Handwerker & Renovierung", subtitle: "Sanierung, Ausbau und Angebote" },
    { name: "Immobilien & Finanzierung", category: "Immobilien", subtitle: "Kauf, Kredit und Vermietung" },
    { name: "Lohn & Gehalt", category: "Geld & Beruf", subtitle: "Arbeitszeit, Gehalt und Zuschläge" },
    { name: "Steuern & Finanzen", category: "Finanzen & Steuern", subtitle: "Abgaben, Vorsorge und Sparen" },
    { name: "Energie & Verbrauch", category: "Energie & Umwelt", subtitle: "Strom, Heizung, Gas und Solar" },
  ];

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedQuery(query.trim());
    setCategory("Alle");
    requestAnimationFrame(() => document.getElementById("tools")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Kostenlos · Ohne Anmeldung · Direkt im Browser</p>
          <h1>Kostenlose Online-Rechner.<br /><em>Sofort ein klares Ergebnis.</em></h1>
          <p className="hero-text">SofortTools bietet kostenlose Online-Rechner und Werkzeuge für Gehalt, Steuern, Immobilien, Energie, Bilder und Alltag – sofort nutzbar, verständlich erklärt und ohne Anmeldung.</p>
          <form className="tool-search" onSubmit={submitSearch} role="search">
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Welches Tool brauchst du?" aria-label="Tools durchsuchen" />
            <kbd aria-live="polite">{query.trim() ? `${liveMatchCount} ${liveMatchCount === 1 ? "Treffer" : "Treffer"}` : "Alle Tools"}</kbd>
          </form>
          <div className="trust-row"><span>✓ Keine Registrierung</span><span>✓ Viele Tools arbeiten lokal</span><span>✓ Mobil optimiert</span></div>
        </div>
        <aside className="hero-panel" aria-label="Wichtige Kategorien">
          <p>Wichtige Themenbereiche</p>
          {featuredCategories.map((categoryItem, index) => (
            <Link href={`/nischen/${categoryDetails[categoryItem.category].slug}`} key={categoryItem.name}>
              <span className="rank">0{index + 1}</span>
              <span className="mini-icon"><CategoryIcon category={categoryItem.category} /></span>
              <span><strong>{categoryItem.name}</strong><small>{categoryItem.subtitle}</small></span>
              <b>→</b>
            </Link>
          ))}
        </aside>
      </section>

      <section className="tool-section shell" id="tools">
        <div className="section-head">
          <div><p className="eyebrow"><span /> Nach konkretem Anwendungsfall</p><h2>{submittedQuery ? `${visible.length} Treffer für „${submittedQuery}“` : "Finde das passende Sofort-Tool"}</h2></div>
          <p>{submittedQuery ? "Suchergebnisse" : "Spezialisierte Werkzeuge für konkrete Aufgaben"}</p>
        </div>
        <div className="category-tabs" id="kategorien" role="group" aria-label="Werkzeuge filtern">
          {(["Alle", ...categories] as const).map((item) => (
            <button key={item} onClick={() => setCategory(item)} className={category === item ? "active" : ""}>{item}</button>
          ))}
        </div>
        {groups.length ? (
          <div className="category-clusters">
            {groups.map((group) => (
              <section className="category-cluster" key={group.name}>
                <header className="cluster-head">
                  <span className="cluster-icon"><CategoryIcon category={group.name} /></span>
                  <div><p>{group.details.kicker}</p><h3><Link href={`/nischen/${group.details.slug}`}>{group.name}</Link></h3><span>{group.details.description}</span></div>
                  <Link className="cluster-more" href={`/nischen/${group.details.slug}`}>Alle Tools →</Link>
                </header>
                <ToolCarousel label={group.name}>
                  {group.items.map((tool) => (
                    <Link href={tool.href} className="tool-card" key={tool.href}>
                      <div className="card-top"><span className="tool-icon">{tool.studioKind ? <StudioPageIcon kind={tool.studioKind}/> : <ToolIcon slug={tool.slug} />}</span><CardArrow /></div>
                      <p>{tool.eyebrow}</p><h3>{tool.title}</h3><span>{tool.short}</span>
                    </Link>
                  ))}
                </ToolCarousel>
              </section>
            ))}
          </div>
        ) : <div className="empty-state"><strong>Kein passendes Tool gefunden.</strong><span>Versuche einen allgemeineren Suchbegriff.</span></div>}
      </section>

      <section className="why-section">
        <div className="shell why-grid">
          <div><p className="eyebrow light"><span /> Warum Sofort-Tools?</p><h2>Keine Umwege.<br />Nur dein Ergebnis.</h2></div>
          <div className="why-list">
            <article><b>01</b><div><h3>Sofort nutzbar</h3><p>Keine Anmeldung, kein Download und kein unnötiger Einrichtungsprozess.</p></div></article>
            <article><b>02</b><div><h3>Datenschutzfreundlich</h3><p>Texte, Bilder und Passwörter werden bei den lokalen Werkzeugen nicht hochgeladen.</p></div></article>
            <article><b>03</b><div><h3>Für jedes Gerät</h3><p>Klare Bedienung auf Smartphone, Tablet und Desktop.</p></div></article>
          </div>
        </div>
      </section>
    </>
  );
}
