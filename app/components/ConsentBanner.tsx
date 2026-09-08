"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

/**
 * Leichtgewichtige Consent-Management-Lösung (DSGVO / TDDDG Opt-in).
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
    __consentChoice?: "accepted" | "denied" | null;
  }
}

type Choice = "accepted" | "denied" | null;
const KEY = "st-consent";

function readStored(): Choice {
  if (typeof window === "undefined") return null;
  if (window.__consentChoice !== undefined) return window.__consentChoice;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw === "accepted" || raw === "denied") return raw;
  } catch {
    /* localStorage nicht verfügbar */
  }
  return null;
}

export default function ConsentBanner() {
  const subscribe = useCallback((notify: () => void) => {
    window.addEventListener("st:consent", notify);
    return () => window.removeEventListener("st:consent", notify);
  }, []);
  const choice = useSyncExternalStore(subscribe, readStored, () => null);

  // Nach dem Mount globale Helfer für optionale zukünftige Dienste registrieren.
  useEffect(() => {
    window.__consentRead = () => readStored();

    window.__consentGrant = (value, persist = true) => {
      window.__consentChoice = value;
      if (persist) {
        try {
          window.localStorage.setItem(KEY, value);
        } catch { /* localStorage nicht verfügbar */ }
      }
      window.dispatchEvent(new CustomEvent("st:consent", { detail: { value } }));
      return true;
    };
  }, []);

  // Entscheidung bereits getroffen -> Banner nie anzeigen.
  if (choice !== null) return null;

  function grant(value: Exclude<Choice, null>) {
    window.__consentChoice = value;
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
            Aktuell nutzt SofortTools kein Tracking. Optionale Dienste würden erst nach deiner Zustimmung geladen.
            Mehr in der <a href="/datenschutz">Datenschutzerklärung</a>.
          </span>
        </p>
        <div className="consent-actions">
          <button onClick={() => grant("denied")} className="consent-deny">
            Nur notwendig
          </button>
          <button onClick={() => grant("accepted")} className="consent-accept">
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
