"use client";

import { useEffect, useState } from "react";

/**
 * Leichtgewichtige Consent-Management-Lösung (DSGVO / TTDSG Opt-in).
 *
 * - Setzt KEINE Tracking-Cookies, solange der Nutzer nicht zugestimmt hat.
 * - Speichert die Entscheidung in localStorage unter "st-consent".
 * - Bietet window.__consentRead() / window.__consentGrant() als API,
 *   die zukünftige Tracking- und Affiliate-Dienste abfragen können.
 * - Grundsätze: Opt-in für Marketing/Tracking, Opt-out gleichwertig einfach,
 *   Link zur Datenschutzerklärung.
 */

declare global {
  interface Window {
    __consentRead?: () => "accepted" | "denied" | null;
    __consentGrant?: (value: "accepted" | "denied", persist?: boolean) => boolean;
  }
}

type Choice = "accepted" | "denied" | null;
const KEY = "st-consent";

function readStored(): Choice {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw === "accepted" || raw === "denied") return raw;
  } catch {
    /* localStorage nicht verfügbar */
  }
  return null;
}

export default function ConsentBanner() {
  const [choice, setChoice] = useState<Choice>(null);

  // Nach dem Mount aus localStorage lesen und globale Helfer registrieren.
  useEffect(() => {
    const initial = readStored();
    setChoice(initial);

    window.__consentRead = () => readStored();

    window.__consentGrant = (value) => {
      setChoice(value);
      try {
        window.localStorage.setItem(KEY, value);
      } catch {
        setChoice(value);
      }
      return true;
    };
  }, []);

  // Entscheidung bereits getroffen -> Banner nie anzeigen.
  if (choice !== null) return null;

  function grant(value: Exclude<Choice, null>) {
    setChoice(value);
    try {
      window.localStorage.setItem(KEY, value);
    } catch {
      /* persist no-op */
    }
    window.dispatchEvent(new CustomEvent("st:consent", { detail: { value } }));
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie- und Datenschutzeinstellungen"
      className="consent-banner"
    >
      <div className="consent-inner">
        <p>
          <strong>Deine Privatsphäre</strong>
          <span>
            Wir setzen nur dann Tracking-Cookies (z. B. für Werbung und Reichweitenmessung),
            wenn du zustimmst. Deine Entscheidung kannst du jederzeit ändern. Weitere Details
            in der <a href="/datenschutz">Datenschutzerklärung</a>.
          </span>
        </p>
        <div className="consent-actions">
          <button onClick={() => grant("denied")} className="consent-deny">
            Nur technisch notwendig
          </button>
          <button onClick={() => grant("accepted")} className="consent-accept">
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}