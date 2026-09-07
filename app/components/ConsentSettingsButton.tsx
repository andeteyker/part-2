"use client";

const CONSENT_KEY = "st-consent";

export function ConsentSettingsButton() {
  function reopenConsent() {
    try {
      window.localStorage.removeItem(CONSENT_KEY);
    } finally {
      window.location.reload();
    }
  }

  return <button type="button" className="footer-consent" onClick={reopenConsent}>Datenschutz-Einstellungen</button>;
}
