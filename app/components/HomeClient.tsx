"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { categories, categoryDetails, tools, type ToolCategory } from "../data/tool-registry";

export function HomeClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ToolCategory | "Alle">("Alle");
  const visible = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("de");
    return tools.filter((tool) => {
      const inCategory = category === "Alle" || tool.category === category;
      const haystack = [tool.title, tool.short, tool.category, ...tool.keywords].join(" ").toLocaleLowerCase("de");
      return inCategory && (!q || haystack.includes(q));
    });
  }, [query, category]);
  const groups = categories.map((name) => ({ name, details: categoryDetails[name], items: visible.filter((tool) => tool.category === name) })).filter((group) => group.items.length);
  const popular = ["zeitdauer-berechnen", "woerter-aus-buchstaben", "heic-zu-jpg", "haus-leisten-rechner", "dachkosten-rechner"].map((slug) => tools.find((tool) => tool.slug === slug)!).filter(Boolean);

  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Kostenlos · Ohne Anmeldung · Direkt im Browser</p>
          <h1>Kostenlose Online-Rechner.<br /><em>Sofort ein klares Ergebnis.</em></h1>
          <p className="hero-text">55 kostenlose Rechner und Tools für konkrete Aufgaben – von Finanzen, Energie und Gesundheit bis Immobilien, Arbeit, Text und Bildern.</p>
          <label className="tool-search">
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Welches Tool brauchst du?" aria-label="Tools durchsuchen" />
            <kbd>{tools.length} Tools</kbd>
          </label>
          <div className="trust-row"><span>✓ Keine Registrierung</span><span>✓ Viele Tools arbeiten lokal</span><span>✓ Mobil optimiert</span></div>
        </div>
        <aside className="hero-panel" aria-label="Empfohlene Werkzeuge">
          <p>Direkt starten</p>
          {popular.map((tool, index) => (
            <Link href={`/tools/${tool.slug}`} key={tool.slug}>
              <span className="rank">0{index + 1}</span>
              <span className="mini-icon">{tool.icon}</span>
              <span><strong>{tool.title}</strong><small>{tool.category}</small></span>
              <b>→</b>
            </Link>
          ))}
        </aside>
      </section>

      <section className="tool-section shell" id="tools">
        <div className="section-head">
          <div><p className="eyebrow"><span /> Nach konkretem Anwendungsfall</p><h2>Finde das passende Sofort-Tool</h2></div>
          <p>{visible.length} spezialisierte Werkzeuge</p>
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
                  <span className="cluster-icon">{group.details.icon}</span>
                  <div><p>{group.details.kicker}</p><h3><Link href={`/nischen/${group.details.slug}`}>{group.name}</Link></h3><span>{group.details.description}</span></div>
                  <Link className="cluster-more" href={`/nischen/${group.details.slug}`}>{group.items.length} Tools →</Link>
                </header>
                <div className="tool-grid">
                  {group.items.map((tool) => (
                    <Link href={`/tools/${tool.slug}`} className="tool-card" key={tool.slug}>
                      <div className="card-top"><span className="tool-icon">{tool.icon}</span><span className="tool-arrow">↗</span></div>
                      <p>{tool.eyebrow}</p><h3>{tool.title}</h3><span>{tool.short}</span>
                    </Link>
                  ))}
                </div>
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
