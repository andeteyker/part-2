"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { emptyDraft, normalizeDraft, templateFor, type PageDraft, type PageKind, type PageRecord } from "./model";
import { PageContent } from "./PageContent";

type ToolLink = { slug: string; title: string };

function parseRecord(record: PageRecord): PageDraft {
  try { return normalizeDraft(JSON.parse(record.draft)); }
  catch { return { ...emptyDraft, slug: record.slug, title: record.slug }; }
}

function slugify(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90);
}

function KindIcon({ kind }: { kind: PageKind }) {
  if (kind === "rechner") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M7 7h10M8 11h2m4 0h2M8 15h2m4 0h2M8 18h8"/></svg>;
  if (kind === "tool") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5.5 4 4M12 8l4 4-8 8H4v-4zM15 3l6 6"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l3 3v15H6zM9 11h6M9 15h6M9 7h3"/></svg>;
}

export function StudioEditor({ tools, categories }: { tools: ToolLink[]; categories: string[] }) {
  const [pages, setPages] = useState<PageRecord[]>([]);
  const [draft, setDraft] = useState<PageDraft>(() => templateFor("ratgeber"));
  const [revision, setRevision] = useState(0);
  const [message, setMessage] = useState("Vorlage geladen – ersetze die Beispielinhalte mit deinem Thema.");
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState(true);
  const [dirty, setDirty] = useState(false);
  const [selectedTool, setSelectedTool] = useState(tools[0]?.slug ?? "");
  const textEditor = useRef<HTMLTextAreaElement>(null);

  async function reload() {
    try {
      const response = await fetch("/api/studio", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setPages(data);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Laden fehlgeschlagen.");
    }
  }

  useEffect(() => {
    let active = true;
    fetch("/api/studio", { cache: "no-store" })
      .then(async response => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        if (active) setPages(data);
      })
      .catch(error => { if (active) setMessage(error instanceof Error ? error.message : "Laden fehlgeschlagen."); });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (dirty) { event.preventDefault(); event.returnValue = ""; }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function update<K extends keyof PageDraft>(key: K, value: PageDraft[K]) {
    setDraft(current => ({ ...current, [key]: value }));
    setDirty(true);
  }

  function loadTemplate(kind: PageKind) {
    if (dirty && !window.confirm("Aktuellen Editorinhalt durch die ausgefüllte Vorlage ersetzen?")) return;
    setDraft(templateFor(kind));
    setRevision(0);
    setDirty(true);
    setMessage("Vollständige " + (kind === "ratgeber" ? "Ratgeber" : kind === "rechner" ? "Rechner" : "Tool") + "-Vorlage geladen.");
  }

  function select(record?: PageRecord) {
    if (dirty && !window.confirm("Ungespeicherte Änderungen verwerfen?")) return;
    setDraft(record ? parseRecord(record) : { ...emptyDraft });
    setRevision(record?.revision ?? 0);
    setDirty(false);
    setMessage(record ? "Seite geladen." : "Leere Seite angelegt. Du kannst auch eine ausgefüllte Vorlage laden.");
  }

  function insertAtCursor(snippet: string) {
    const editor = textEditor.current;
    const start = editor?.selectionStart ?? draft.body.length;
    const end = editor?.selectionEnd ?? draft.body.length;
    const before = draft.body.slice(0, start);
    const after = draft.body.slice(end);
    const prefix = before && !before.endsWith("\n\n") ? "\n\n" : "";
    const suffix = after && !after.startsWith("\n\n") ? "\n\n" : "";
    const insertion = prefix + snippet + suffix;
    update("body", before + insertion + after);
    requestAnimationFrame(() => {
      editor?.focus();
      const cursor = start + insertion.length;
      editor?.setSelectionRange(cursor, cursor);
    });
  }

  async function save(action: "save" | "publish" | "unpublish") {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/studio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft, revision, action }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setRevision(data.revision);
      setDirty(false);
      setMessage(action === "publish" ? "Veröffentlicht. Die Live-Seite ist jetzt aktuell." : action === "unpublish" ? "Offline genommen. Dein Entwurf bleibt gespeichert." : "Entwurf sicher gespeichert.");
      await reload();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Speichern fehlgeschlagen.");
    } finally {
      setBusy(false);
    }
  }

  const currentRecord = pages.find(page => page.slug === draft.slug);
  const isPublished = Boolean(currentRecord?.published);
  const selectedToolData = tools.find(tool => tool.slug === selectedTool);
  const wordCount = draft.body.trim() ? draft.body.trim().split(/\s+/).length : 0;

  return <main className="studio">
    <header className="studio-topbar">
      <Link className="studio-brand" href="/">
        <span className="studio-brand-mark">St</span>
        <span>Sofort<span>Tools</span> Studio</span>
      </Link>
      <div className="studio-top-actions">
        <span className={"studio-save-state " + (dirty ? "is-dirty" : "")}><i/>{dirty ? "Ungespeichert" : "Gespeichert"}</span>
        <button className="studio-button studio-button-secondary" disabled={busy} onClick={() => setPreview(value => !value)}>{preview ? "Vorschau ausblenden" : "Vorschau zeigen"}</button>
        <button className="studio-button studio-button-primary" disabled={busy} onClick={() => void save("publish")}>{busy ? "Bitte warten …" : "Veröffentlichen"}</button>
      </div>
    </header>

    <div className="studio-layout">
      <aside className="studio-sidebar">
        <div className="studio-sidebar-head">
          <div><span>Inhalte</span><strong>{pages.length} Seiten</strong></div>
          <button className="studio-icon-button" type="button" disabled={busy} onClick={() => select()} aria-label="Leere Seite anlegen">+</button>
        </div>

        <div className="studio-template-shortcuts" aria-label="Neue Seite aus Vorlage">
          <button onClick={() => loadTemplate("ratgeber")}><KindIcon kind="ratgeber"/><span><strong>Neuer Ratgeber</strong><small>mit Beispieltext</small></span></button>
          <button onClick={() => loadTemplate("rechner")}><KindIcon kind="rechner"/><span><strong>Neuer Rechner</strong><small>mit Design & Logik</small></span></button>
          <button onClick={() => loadTemplate("tool")}><KindIcon kind="tool"/><span><strong>Neues Tool</strong><small>mit Anleitung</small></span></button>
        </div>

        <div className="studio-page-list">
          <div className="studio-list-title"><span>Gespeichert</span><button type="button" onClick={() => void reload()} disabled={busy}>Aktualisieren</button></div>
          {pages.length === 0 && <p className="studio-empty">Noch keine eigene Seite gespeichert.</p>}
          {pages.map(page => {
            const parsed = parseRecord(page);
            return <button className={"studio-page-item " + (page.slug === draft.slug ? "is-active" : "")} key={page.slug} disabled={busy} onClick={() => select(page)}>
              <span className="studio-page-icon"><KindIcon kind={parsed.kind}/></span>
              <span><strong>{parsed.title}</strong><small><i className={page.published ? "live" : ""}/>{page.published ? "Live" : "Entwurf"} · {parsed.kind}</small></span>
            </button>;
          })}
        </div>

        <div className="studio-sidebar-footer">
          <a href="/seiten" target="_blank" rel="noopener noreferrer">Veröffentlichte Seiten öffnen</a>
          <a href="/signout-with-chatgpt?return_to=/">Abmelden</a>
        </div>
      </aside>

      <section className="studio-workspace">
        <div className="studio-heading">
          <div>
            <p className="studio-kicker">Seite bearbeiten</p>
            <h1>{draft.title || "Neue Seite"}</h1>
            <p>Beispielinhalte ersetzen, Vorschau prüfen und direkt veröffentlichen.</p>
          </div>
          <div className="studio-heading-status">
            <span className={isPublished ? "is-live" : ""}><i/>{isPublished ? "Öffentlich" : "Nur Entwurf"}</span>
            {isPublished && <a href={"/seiten/" + draft.slug} target="_blank" rel="noopener noreferrer">Live-Seite öffnen</a>}
          </div>
        </div>

        <fieldset className="studio-fields" disabled={busy}>
          <section className="studio-panel studio-meta-panel">
            <div className="studio-panel-head">
              <div><span className="studio-step">01</span><div><h2>Seitendaten</h2><p>Diese Angaben bilden Überschrift, Einleitung und Suchergebnis.</p></div></div>
            </div>
            <div className="studio-meta-grid">
              <label className="studio-field studio-field-wide"><span>Titel</span><input value={draft.title} onChange={event => update("title", event.target.value)} placeholder="Konkreter Titel der Seite"/></label>
              <label className="studio-field"><span>Seitentyp</span><select value={draft.kind} onChange={event => update("kind", event.target.value as PageKind)}><option value="ratgeber">Ratgeber</option><option value="rechner">Rechner</option><option value="tool">Tool</option></select></label>
              <label className="studio-field"><span>Kategorie</span><select value={draft.category} onChange={event => update("category", event.target.value)}>{!categories.includes(draft.category) && <option value={draft.category}>{draft.category}</option>}{categories.map(category => <option value={category} key={category}>{category}</option>)}</select></label>
              <label className="studio-field"><span>Themenzeile über der Überschrift</span><input value={draft.eyebrow} onChange={event => update("eyebrow", event.target.value)} placeholder="z. B. Gehalt verständlich erklärt"/></label>
              <label className="studio-field"><span>URL</span><span className="studio-url-field"><b>/seiten/</b><input disabled={revision > 0} value={draft.slug} onChange={event => update("slug", event.target.value)} placeholder="meine-neue-seite"/></span>{revision === 0 && <button className="studio-text-button" type="button" onClick={() => update("slug", slugify(draft.title))}>Aus Titel erzeugen</button>}</label>
              <label className="studio-field studio-field-wide"><span>Kurzbeschreibung <small>{draft.description.length}/400</small></span><textarea rows={3} value={draft.description} onChange={event => update("description", event.target.value)} placeholder="Was erhält der Nutzer auf dieser Seite?"/></label>
            </div>
          </section>

          <div className="studio-editors">
            <section className="studio-panel studio-editor-panel">
              <div className="studio-panel-head">
                <div><span className="studio-step">02</span><div><h2>Text & SEO</h2><p>Vollständiger Seiteninhalt in einfacher Textsyntax.</p></div></div>
                <span className="studio-counter">{wordCount} Wörter</span>
              </div>
              <div className="studio-editor-toolbar" aria-label="Textbausteine">
                <button type="button" onClick={() => insertAtCursor("## Neue Zwischenüberschrift\n\nDein hilfreicher Absatz.")}>Überschrift</button>
                <button type="button" onClick={() => insertAtCursor("> INFO: Erkläre hier einen wichtigen Begriff oder eine Annahme.")}>Info-Box</button>
                <button type="button" onClick={() => insertAtCursor("| Kennwert | Beispiel |\n| --- | ---: |\n| Wert | 100 |")}>Tabelle</button>
                <button type="button" onClick={() => insertAtCursor("### Häufige Frage\n\nKonkrete und verständliche Antwort.")}>FAQ</button>
              </div>
              <label className="studio-code-label" htmlFor="studio-text-editor">Artikeltext</label>
              <textarea id="studio-text-editor" ref={textEditor} className="studio-code-editor studio-text-editor" spellCheck="true" value={draft.body} onChange={event => update("body", event.target.value)} aria-describedby="studio-text-help"/>
              <div className="studio-editor-footer" id="studio-text-help">
                <span><b>##</b> Überschrift · <b>###</b> Untertitel · <b>**fett**</b> · <b>&gt; INFO:</b> Infobox</span>
                <span className="studio-link-insert"><select aria-label="Rechner auswählen" value={selectedTool} onChange={event => setSelectedTool(event.target.value)}>{tools.map(tool => <option key={tool.slug} value={tool.slug}>{tool.title}</option>)}</select><button type="button" disabled={!selectedToolData} onClick={() => selectedToolData && insertAtCursor("[" + selectedToolData.title + "](/tools/" + selectedToolData.slug + ")")}>Rechnerlink einfügen</button></span>
              </div>
            </section>

            <section className="studio-panel studio-editor-panel">
              <div className="studio-panel-head">
                <div><span className="studio-step">03</span><div><h2>Rechner & Design</h2><p>HTML, CSS und JavaScript für Oberfläche und Berechnung.</p></div></div>
                <button className="studio-text-button" type="button" onClick={() => {
                  if (!draft.code || window.confirm("Aktuellen Rechnercode durch die vollständige Vorlage ersetzen?")) update("code", templateFor("rechner").code);
                }}>Rechner-Vorlage laden</button>
              </div>
              <div className="studio-code-tabs"><span className="is-active">HTML + CSS + JavaScript</span><span>Läuft sicher isoliert</span></div>
              <label className="studio-code-label" htmlFor="studio-calculator-editor">Rechnercode</label>
              <textarea id="studio-calculator-editor" className="studio-code-editor studio-calculator-editor" spellCheck="false" value={draft.code} onChange={event => update("code", event.target.value)} placeholder="Für reine Ratgeber kann dieses Feld leer bleiben." aria-describedby="studio-code-help"/>
              <div className="studio-editor-footer" id="studio-code-help">
                <span>Fertige Vorlage mit Eingabefeldern, i-Hilfen, Ergebnisbox, Buttons und mobiler Darstellung.</span>
                <span>Keine externen Bibliotheken oder Netzwerkanfragen.</span>
              </div>
            </section>
          </div>

          <div className="studio-actionbar">
            <div>
              <button className="studio-button studio-button-secondary" type="button" onClick={() => void save("save")}>Entwurf speichern</button>
              <button className="studio-button studio-button-secondary" type="button" onClick={() => setPreview(value => !value)}>{preview ? "Vorschau schließen" : "Vorschau öffnen"}</button>
            </div>
            <div>
              {revision > 0 && <button className="studio-button studio-button-danger" type="button" onClick={() => window.confirm("Diese Seite öffentlich offline nehmen?") && void save("unpublish")}>Offline nehmen</button>}
              <button className="studio-button studio-button-primary" type="button" onClick={() => void save("publish")}>Jetzt veröffentlichen</button>
            </div>
          </div>
        </fieldset>

        <p className={"studio-message " + (message.includes("fehl") ? "is-error" : "")} role="status" aria-live="polite">{busy ? "Änderungen werden verarbeitet …" : message}</p>

        {preview && <section className="studio-preview" aria-label="Seitenvorschau">
          <div className="studio-preview-head"><div><span>Live-Vorschau</span><strong>So erscheint die Seite nach dem Veröffentlichen</strong></div><button type="button" onClick={() => setPreview(false)} aria-label="Vorschau schließen">×</button></div>
          <PageContent page={draft}/>
        </section>}
      </section>
    </div>
  </main>;
}
