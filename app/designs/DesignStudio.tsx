"use client";

import Link from "next/link";
import { useState } from "react";
import { categories, categoryDetails, tools } from "../data/tool-registry";
import styles from "./designs.module.css";

type Concept = "search" | "os" | "editorial";

const popularSlugs = [
  "dachkosten-rechner",
  "schichtlohn-rechner",
  "mietrendite-rechner",
  "badrenovierung-rechner",
  "haus-leisten-rechner",
  "passwortgenerator",
];

const popular = popularSlugs
  .map((slug) => tools.find((tool) => tool.slug === slug))
  .filter((tool): tool is (typeof tools)[number] => Boolean(tool));

const concepts: Array<{ id: Concept; number: string; name: string; note: string; label?: string }> = [
  { id: "search", number: "01", name: "Search First", note: "Schnell, klar, conversionstark", label: "Empfehlung" },
  { id: "os", number: "02", name: "Tool OS", note: "Kompakt, technisch, effizient" },
  { id: "editorial", number: "03", name: "Bold Utility", note: "Eigenständig, lebendig, merkbar" },
];

export function DesignStudio() {
  const [concept, setConcept] = useState<Concept>("search");

  return (
    <main className={styles.studio}>
      <header className={styles.studioHeader}>
        <Link href="/" className={styles.back}>← SofortTools</Link>
        <div>
          <span>Designvergleich</span>
          <strong>Startseite · Desktop & Mobil</strong>
        </div>
        <span className={styles.counter}>3 Richtungen</span>
      </header>

      <nav className={styles.conceptNav} aria-label="Design auswählen">
        {concepts.map((item) => (
          <button key={item.id} className={concept === item.id ? styles.selected : ""} onClick={() => setConcept(item.id)}>
            <span>{item.number}</span>
            <span><strong>{item.name}</strong><small>{item.note}</small></span>
            {item.label && <b>{item.label}</b>}
          </button>
        ))}
      </nav>

      <section className={styles.canvas} aria-live="polite">
        {concept === "search" && <SearchFirst />}
        {concept === "os" && <ToolOS />}
        {concept === "editorial" && <BoldUtility />}
      </section>
    </main>
  );
}

function Brand({ inverse = false }: { inverse?: boolean }) {
  return <span className={`${styles.brand} ${inverse ? styles.inverse : ""}`}><b>S</b><span>Sofort<strong>Tools</strong></span></span>;
}

function SearchFirst() {
  return (
    <div className={`${styles.preview} ${styles.searchFirst}`}>
      <header className={styles.searchHeader}>
        <Brand />
        <nav><a href="#search-tools">Alle Tools</a><a href="#search-categories">Kategorien</a><a href="#search-categories">Neu</a></nav>
        <button aria-label="Menü öffnen">☰</button>
      </header>

      <section className={styles.searchHero}>
        <div className={styles.searchCopy}>
          <span className={styles.kicker}>35 kostenlose Werkzeuge</span>
          <h1>Was möchtest du<br /><em>jetzt erledigen?</em></h1>
          <p>Einfach das passende Tool suchen und direkt loslegen. Ohne Anmeldung, ohne Download.</p>
          <label className={styles.bigSearch}>
            <span>⌕</span>
            <input placeholder="z. B. Schichtlohn, Dachkosten, Passwort …" aria-label="Tool suchen" />
            <kbd>⌘ K</kbd>
          </label>
          <div className={styles.quickLinks}><span>Häufig gesucht:</span><Link href="/tools/schichtlohn-rechner">Schichtlohn</Link><Link href="/tools/dachkosten-rechner">Dachkosten</Link><Link href="/tools/mietrendite-rechner">Mietrendite</Link></div>
        </div>
        <aside className={styles.dailyCard}>
          <span>Tool des Tages</span>
          <b>€/h</b>
          <small>Arbeit & Zuschläge</small>
          <h2>Schichtlohn-Rechner</h2>
          <p>Nacht-, Sonntags- und Feiertagszuschläge in einer Übersicht.</p>
          <Link href="/tools/schichtlohn-rechner">Jetzt berechnen <span>↗</span></Link>
        </aside>
      </section>

      <section className={styles.searchContent} id="search-tools">
        <div className={styles.sectionTitle}><div><span>Direkt starten</span><h2>Beliebte Tools</h2></div><a href="#search-categories">Alle 35 ansehen →</a></div>
        <div className={styles.popularGrid}>
          {popular.slice(0, 4).map((tool, index) => (
            <Link href={`/tools/${tool.slug}`} key={tool.slug} className={styles.popularCard}>
              <span className={styles.cardNumber}>0{index + 1}</span><b>{tool.icon}</b><small>{tool.category}</small><h3>{tool.title}</h3><p>{tool.short}</p><i>↗</i>
            </Link>
          ))}
        </div>
        <div className={styles.trustStrip}><span><b>35</b> spezialisierte Tools</span><span><b>0 €</b> Nutzungskosten</span><span><b>100 %</b> ohne Anmeldung</span></div>
        <div id="search-categories" className={styles.categoryRail}>
          <span>Kategorien</span>
          {categories.slice(0, 6).map((category) => <Link href={`/nischen/${categoryDetails[category].slug}`} key={category}><b>{categoryDetails[category].icon}</b>{category}<span>→</span></Link>)}
        </div>
      </section>
    </div>
  );
}

function ToolOS() {
  return (
    <div className={`${styles.preview} ${styles.toolOS}`}>
      <aside className={styles.osSidebar}>
        <Brand inverse />
        <nav>
          <a className={styles.osActive} href="#os-tools"><span>⌂</span> Übersicht</a>
          <a href="#os-tools"><span>⌕</span> Alle Tools</a>
          <a href="#os-categories"><span>▦</span> Kategorien</a>
          <a href="#os-tools"><span>☆</span> Favoriten</a>
        </nav>
        <div><small>SofortTools</small><p>Kostenlos. Privat. Schnell.</p></div>
      </aside>
      <div className={styles.osMain}>
        <header><div><small>SONNTAG, 6. SEPTEMBER</small><h1>Guten Tag. Was steht an?</h1></div><button>35 Tools verfügbar</button></header>
        <label className={styles.osSearch}><span>⌕</span><input placeholder="Tool, Aufgabe oder Stichwort suchen …" aria-label="Tool suchen" /><kbd>STRG K</kbd></label>
        <section className={styles.osRecents} id="os-tools">
          <div className={styles.osTitle}><h2>Schnellzugriff</h2><a href="#os-categories">Verwalten</a></div>
          <div>
            {popular.slice(0, 3).map((tool) => <Link href={`/tools/${tool.slug}`} key={tool.slug}><b>{tool.icon}</b><span><strong>{tool.title}</strong><small>{tool.category}</small></span><i>→</i></Link>)}
          </div>
        </section>
        <section className={styles.osCategories} id="os-categories">
          <div className={styles.osTitle}><h2>Werkzeugbereiche</h2><span>9 Kategorien</span></div>
          <div>
            {categories.map((category, index) => (
              <Link href={`/nischen/${categoryDetails[category].slug}`} key={category} style={{ "--tone": `${(index * 38 + 44) % 360}` } as React.CSSProperties}>
                <span>{categoryDetails[category].icon}</span><strong>{category}</strong><small>{tools.filter((tool) => tool.category === category).length} Tools</small><i>↗</i>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function BoldUtility() {
  return (
    <div className={`${styles.preview} ${styles.boldUtility}`}>
      <header className={styles.boldHeader}>
        <Brand />
        <span>Werkzeuge für echte Aufgaben.</span>
        <button>MENÜ +</button>
      </header>
      <section className={styles.boldHero}>
        <span className={styles.issue}>AUSGABE 01 — 35 TOOLS</span>
        <h1>WENIGER SUCHEN.<br /><em>MEHR SCHAFFEN.</em></h1>
        <div className={styles.boldIntro}><p>Kostenlose Online-Werkzeuge für Geld, Arbeit, Immobilien, Renovierung und den digitalen Alltag.</p><a href="#bold-tools">TOOLS ENTDECKEN ↓</a></div>
        <div className={styles.ticker}><span>SCHNELL</span><b>✦</b><span>KOSTENLOS</span><b>✦</b><span>OHNE ANMELDUNG</span><b>✦</b><span>DATENSCHUTZFREUNDLICH</span></div>
      </section>
      <section className={styles.boldSearch} id="bold-tools">
        <span>WAS BRAUCHST DU?</span>
        <label><input placeholder="Tool suchen …" aria-label="Tool suchen" /><button>⌕</button></label>
      </section>
      <section className={styles.boldGrid}>
        {categories.slice(0, 6).map((category, index) => {
          const example = tools.find((tool) => tool.category === category);
          return <Link className={styles[`boldTone${index + 1}`]} href={`/nischen/${categoryDetails[category].slug}`} key={category}>
            <span>0{index + 1}</span><b>{categoryDetails[category].icon}</b><small>{tools.filter((tool) => tool.category === category).length} WERKZEUGE</small><h2>{category}</h2><p>{example?.title}</p><i>↗</i>
          </Link>;
        })}
      </section>
      <footer className={styles.boldFooter}><span>SOFORTTOOLS®</span><p>Ein Problem. Ein klares Tool.</p><a href="#bold-tools">NACH OBEN ↑</a></footer>
    </div>
  );
}
