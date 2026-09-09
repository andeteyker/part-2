"use client";

import { useEffect } from "react";

const CONSENT_KEY = "st-consent";
const SCRIPT_ID = "plausible-analytics";
const SCRIPT_SRC = "https://plausible.io/js/pa-967J2UZYysJCeCfhnkhCf.js";

type PlausibleFunction = ((...args: unknown[]) => void) & {
  q?: unknown[][];
  init?: (options?: Record<string, unknown>) => void;
  o?: Record<string, unknown>;
};

declare global {
  interface Window {
    plausible?: PlausibleFunction;
  }
}

function hasAnalyticsConsent() {
  const managedChoice = window.__consentRead?.();
  if (managedChoice) return managedChoice === "accepted";

  try {
    return window.localStorage.getItem(CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}

function loadPlausible() {
  if (document.getElementById(SCRIPT_ID)) return;

  const plausible: PlausibleFunction = window.plausible ?? Object.assign(
    (...args: unknown[]) => {
      plausible.q = plausible.q ?? [];
      plausible.q.push(args);
    },
    {},
  );

  window.plausible = plausible;
  plausible.init = plausible.init ?? ((options = {}) => {
    plausible.o = options;
  });

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = SCRIPT_SRC;
  document.head.appendChild(script);
  plausible.init();
}

export default function PlausibleAnalytics() {
  useEffect(() => {
    function syncWithConsent() {
      if (hasAnalyticsConsent()) loadPlausible();
    }

    syncWithConsent();
    window.addEventListener("st:consent", syncWithConsent);
    return () => window.removeEventListener("st:consent", syncWithConsent);
  }, []);

  return null;
}
