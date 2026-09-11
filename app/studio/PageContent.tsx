import { Fragment, type ReactNode } from "react";
import { normalizeDraft, sandboxDocument, type PageDraft } from "./model";

function inline(text: string): ReactNode[] {
  const pattern = /(\[[^\]]+\]\([^\s)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g;
  return text.split(pattern).filter(Boolean).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
    if (link) {
      const href = link[2];
      if (!/^\/(?!\/)/.test(href) && !/^https:\/\//.test(href)) return <Fragment key={i}>{link[1]}</Fragment>;
      const external = href.startsWith("https:");
      return <a key={i} href={href} className="guide-text-link" target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>{link[1]}</a>;
    }
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={i}>{part.slice(1, -1)}</code>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function renderTable(lines: string[], key: number) {
  const rows = lines.map(line => line.replace(/^\||\|$/g, "").split("|").map(cell => cell.trim()));
  const hasDivider = rows[1]?.every(cell => /^:?-{3,}:?$/.test(cell));
  if (!hasDivider) return null;
  return <div className="guide-table-wrap" key={key}><table className="guide-table"><thead><tr>{rows[0].map((cell, i) => <th key={i}>{inline(cell)}</th>)}</tr></thead><tbody>{rows.slice(2).map((row, r) => <tr key={r}>{row.map((cell, c) => <td key={c}>{inline(cell)}</td>)}</tr>)}</tbody></table></div>;
}

function renderBlock(block: string, key: number) {
  const lines = block.split("\n").map(line => line.trimEnd());
  if (lines[0] === "---") return <hr key={key}/>;
  if (lines[0].startsWith("### ")) return <h3 key={key}>{inline(lines.join(" ").slice(4))}</h3>;
  if (lines[0].startsWith("## ")) return <h2 key={key}>{inline(lines.join(" ").slice(3))}</h2>;
  if (lines.every(line => /^-\s+/.test(line))) return <ul key={key}>{lines.map((line, i) => <li key={i}>{inline(line.replace(/^-\s+/, ""))}</li>)}</ul>;
  if (lines.every(line => /^\d+\.\s+/.test(line))) return <ol key={key}>{lines.map((line, i) => <li key={i}>{inline(line.replace(/^\d+\.\s+/, ""))}</li>)}</ol>;
  if (lines.every(line => line.trim().startsWith("|"))) {
    const table = renderTable(lines, key);
    if (table) return table;
  }
  if (lines[0].startsWith("> ")) {
    const content = lines.map(line => line.replace(/^>\s?/, "")).join(" ");
    const match = content.match(/^(INFO|TIPP|WICHTIG):\s*(.*)$/i);
    return <aside className="guide-callout" data-tone={match?.[1].toLowerCase() ?? "info"} key={key}><strong>{match?.[1] ?? "Hinweis"}</strong><p>{inline(match?.[2] ?? content)}</p></aside>;
  }
  return <p key={key}>{lines.map((line, i) => <Fragment key={i}>{i > 0 && <br/>}{inline(line)}</Fragment>)}</p>;
}

export function PageContent({ page: rawPage }: { page: PageDraft | Partial<PageDraft> }) {
  const page = normalizeDraft(rawPage);
  const blocks = page.body.trim() ? page.body.trim().split(/\n\s*\n/) : [];
  return <article className="studio-published-page">
    <header className="studio-published-hero">
      <p className="eyebrow"><span/>{page.eyebrow || page.category}</p>
      <span className="studio-published-type">{page.kind === "ratgeber" ? "Ratgeber" : page.kind === "rechner" ? "Rechner" : "Online-Tool"} · {page.category}</span>
      <h1>{page.title || "Seitentitel"}</h1>
      <p>{page.description || "Hier erscheint die Kurzbeschreibung der Seite."}</p>
    </header>
    {page.code && <section className="studio-tool-frame"><iframe title={page.title + " – interaktives Tool"} sandbox="allow-scripts" referrerPolicy="no-referrer" srcDoc={sandboxDocument(page.code)}/></section>}
    <div className="guide-section studio-guide-section">{blocks.map(renderBlock)}</div>
  </article>;
}
