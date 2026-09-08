"use client";

import { useEffect, useRef, useState } from "react";

type ActionStatus = "idle" | "copied" | "shared" | "error";

function CopyIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>;
}

function ShareIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.7 10.7 6.6-4.2M8.7 13.3l6.6 4.2" /></svg>;
}

function PrintIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 8V4h10v4M7 17H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M7 14h10v7H7z" /></svg>;
}

function resultSummary() {
  const surface = document.querySelector<HTMLElement>(".tool-surface");
  if (!surface) return "";

  const primary = surface.querySelector<HTMLElement>(".result-box");
  if (primary) {
    const label = primary.querySelector<HTMLElement>(".result-label > span")?.innerText.trim();
    const value = primary.querySelector<HTMLElement>(":scope > strong")?.innerText.trim();
    const detail = primary.querySelector<HTMLElement>(":scope > small")?.innerText.trim();
    return [label && value ? `${label}: ${value}` : value, detail].filter(Boolean).join(" – ");
  }

  return Array.from(surface.querySelectorAll<HTMLElement>(".stats-grid > div"))
    .map((item) => {
      const value = item.querySelector<HTMLElement>("strong")?.innerText.trim();
      const label = item.querySelector<HTMLElement>("span")?.innerText.trim();
      return value && label ? `${label}: ${value}` : "";
    })
    .filter(Boolean)
    .join(" · ");
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const input = document.createElement("textarea");
  input.value = text;
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  input.remove();
}

export function ToolResultActions({ title }: { title: string }) {
  const [status, setStatus] = useState<ActionStatus>("idle");
  const resetTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
  }, []);

  const text = () => [title, resultSummary(), window.location.href].filter(Boolean).join("\n");
  const finish = (next: ActionStatus) => {
    setStatus(next);
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setStatus("idle"), 2200);
  };

  async function copyResult() {
    try {
      await copyText(text());
      finish("copied");
    } catch {
      finish("error");
    }
  }

  async function shareResult() {
    try {
      if (navigator.share) {
        await navigator.share({ title, text: resultSummary(), url: window.location.href });
        finish("shared");
      } else {
        await copyText(window.location.href);
        finish("copied");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      finish("error");
    }
  }

  return (
    <div className="tool-result-actions" aria-label="Ergebnis verwenden">
      <span>Ergebnis verwenden</span>
      <div>
        <button type="button" onClick={copyResult}><CopyIcon /> Kopieren</button>
        <button type="button" onClick={shareResult}><ShareIcon /> Teilen</button>
        <button type="button" onClick={() => window.print()}><PrintIcon /> Drucken</button>
      </div>
      <p role="status" aria-live="polite">
        {status === "copied" ? "Ergebnis oder Link wurde kopiert." : status === "shared" ? "Teilen wurde geöffnet." : status === "error" ? "Das hat nicht funktioniert. Bitte versuche es erneut." : ""}
      </p>
    </div>
  );
}
