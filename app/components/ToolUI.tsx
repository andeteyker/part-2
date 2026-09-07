"use client";

import { useEffect, useId, useRef, useState, type InputHTMLAttributes } from "react";

export const number = (value: string) => Number(String(value).replace(",", ".")) || 0;
export const fmt = (value: number, digits = 2) => new Intl.NumberFormat("de-DE", { maximumFractionDigits: digits }).format(value);
export const money = (value: number) => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value || 0);

type FieldProps = {
  label: string;
  help?: string;
  value: string;
  onChange: (value: string) => void;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  suffix?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  placeholder?: string;
};

const TERM_HELP: Record<string, string> = {
  Grundwert: "Der vollständige Ausgangswert, von dem ein prozentualer Anteil berechnet wird.",
  Prozentsatz: "Der Anteil des Grundwerts in Prozent. 19 % entsprechen zum Beispiel 0,19.",
  "Wert A": "Die bekannte Ausgangsmenge der ersten Größe.",
  "entspricht B": "Der bekannte Wert, der zu Wert A gehört.",
  "gesucht für C": "Die neue Ausgangsmenge, für die der passende Wert berechnet wird.",
  Geburtsdatum: "Der erste Tag des Zeitraums für die genaue Altersberechnung.",
  "Alter am": "Der Stichtag, für den das genaue Alter berechnet wird.",
  Startzeit: "Zeitpunkt, an dem der zu berechnende Zeitraum beginnt.",
  Endzeit: "Zeitpunkt, an dem der Zeitraum endet. Liegt er vor der Startzeit, wird der Folgetag angenommen.",
  Pause: "Unbezahlte Unterbrechung in Minuten; sie wird von der Zeit zwischen Start und Ende abgezogen.",
  Nettobetrag: "Preis ohne enthaltene Mehrwertsteuer.",
  Bruttobetrag: "Preis einschließlich Mehrwertsteuer.",
  Mehrwertsteuersatz: "Prozentualer Steueranteil. Welcher Satz gilt, hängt von der Leistung oder Ware ab.",
  Monatsgehalt: "Regelmäßiges Bruttogehalt pro Monat vor Steuern und Sozialabgaben.",
  Wochenstunden: "Vertraglich vereinbarte durchschnittliche Arbeitszeit pro Woche.",
  Strecke: "Einfache Fahrtstrecke. Die Rückfahrt kann separat zugeschaltet werden.",
  Verbrauch: "Durchschnittliche Kraftstoffmenge, die das Fahrzeug für 100 Kilometer benötigt.",
  Kraftstoffpreis: "Preis für einen Liter Kraftstoff.",
  Personen: "Anzahl der Personen, auf die die Gesamtkosten gleichmäßig verteilt werden.",
  Kaufpreis: "Reiner Preis der Immobilie ohne Kaufnebenkosten.",
  "Monatliche Kaltmiete": "Miete ohne Betriebs-, Heiz- und Nebenkosten.",
  Kaufnebenkosten: "Zusätzliche Erwerbskosten wie Grunderwerbsteuer, Notar, Grundbuch und gegebenenfalls Makler.",
  "Nicht umlagefähige Kosten pro Jahr": "Jährliche Eigentümerkosten, die nicht auf Mieter übertragen werden können.",
  "Nicht umlagefähige Kosten": "Monatliche Eigentümerkosten, die nicht auf Mieter übertragen werden können.",
  Grunderwerbsteuer: "Steuer auf den Immobilienkauf; der Prozentsatz richtet sich nach dem Bundesland.",
  "Notar + Grundbuch": "Kosten für notarielle Beurkundung und Eintragung des Eigentums im Grundbuch.",
  Maklerprovision: "Vereinbarte Vergütung des Immobilienmaklers, meist als Anteil des Kaufpreises.",
  "Monatliche Kreditrate": "Monatliche Zahlung an die Bank aus Zins und Tilgung.",
  Instandhaltungsrücklage: "Regelmäßig zurückgelegter Betrag für spätere Reparaturen und Erneuerungen.",
  "Sonstige Eigentümerkosten": "Weitere regelmäßig selbst zu tragende Ausgaben, etwa Verwaltung oder Kontoführung.",
  "Maximale Monatsrate": "Betrag, der dauerhaft monatlich für Zins und Tilgung verfügbar sein soll.",
  Eigenkapital: "Eigene verfügbare Mittel, die ohne Kredit in den Kauf eingebracht werden.",
  Sollzins: "Jährlicher Zinssatz auf die noch offene Kreditsumme, ohne weitere Kreditkosten.",
  "Anfängliche Tilgung": "Anteil der ursprünglichen Kreditsumme, der rechnerisch im ersten Jahr zurückgezahlt wird.",
  Kreditsumme: "Auszahlungsbetrag des Darlehens, auf den Zinsen und Tilgung berechnet werden.",
  "Zinsbindung / Zeitraum": "Zeitraum, für den der Sollzins fest vereinbart ist und bis zu dem die Restschuld geschätzt wird.",
  "Grundlohn pro Stunde": "Regulärer Bruttolohn je Arbeitsstunde ohne Zuschläge.",
  Nachtstunden: "Tatsächlich in der angegebenen Nachtzeit geleistete Arbeitsstunden.",
  Sonntagsstunden: "Tatsächlich an einem Sonntag geleistete Arbeitsstunden.",
  Feiertagsstunden: "Tatsächlich an einem gesetzlichen Feiertag geleistete Arbeitsstunden.",
  "Zuschlag laut Vertrag/Tarif": "Zusätzlicher Prozentsatz aus Arbeitsvertrag, Tarifvertrag oder Betriebsvereinbarung.",
  "Steuerliche Vergleichsgrenze": "Gesetzliche Höchstgrenze nach § 3b EStG zum Einordnen des errechneten Zuschlags; sie ist kein automatischer Anspruch.",
  Überstunden: "Arbeitsstunden über die vereinbarte regelmäßige Arbeitszeit hinaus.",
  Überstundenzuschlag: "Zusätzlicher Prozentsatz auf die Grundvergütung der Überstunden, sofern vereinbart.",
  "Bezahlte Stunden gesamt": "Alle im Monat mit dem Grundlohn vergüteten Stunden; Zuschläge werden zusätzlich berechnet.",
  Nachtzuschlag: "Zusätzliche Vergütung für die eingegebenen Nachtstunden.",
  Sonntagszuschlag: "Zusätzliche Vergütung für die eingegebenen Sonntagsstunden.",
  Feiertagszuschlag: "Zusätzliche Vergütung für die eingegebenen Feiertagsstunden.",
  Dachfläche: "Tatsächlich zu bearbeitende Dachfläche, nicht die Wohn- oder Gebäudegrundfläche.",
  Badfläche: "Grundfläche des Badezimmers als Basis für die überschlägige Kalkulation.",
  Bodenfläche: "Tatsächlich zu belegende Bodenfläche des Raums.",
  "Zu streichende Fläche": "Summe der zu bearbeitenden Wand- und Deckenflächen, nicht die Wohnfläche.",
  "Preis pro m²": "Frei anpassbarer Einheitspreis je Quadratmeter.",
  "Ausbaukosten pro m²": "Geschätzte flächenabhängige Kosten für Ausbau und Oberflächen.",
  "Arbeits-/Komplettpreis pro m²": "Preis je Quadratmeter für die Leistungen, die im eigenen Angebot enthalten sind.",
  Materialpreis: "Preis des Bodenbelags je Quadratmeter vor Berücksichtigung des Verschnitts.",
  Verlegung: "Arbeitskosten für die Verlegung je Quadratmeter Bodenfläche.",
  Verschnitt: "Zusätzlich benötigtes Material für Zuschnitte, Raumform und Verlegemuster.",
  Sicherheitspuffer: "Prozentuale Reserve für Preisabweichungen und nicht vorhersehbare Zusatzarbeiten.",
  "Anzahl Fenster": "Zahl der auszutauschenden oder neu einzubauenden Fensterelemente.",
  "Fensterpreis je Stück": "Materialpreis eines Fensters ohne Montage, sofern im Angebot getrennt ausgewiesen.",
  "Einbau je Fenster": "Montagekosten pro Fensterelement.",
  "Sanitärobjekte & Möbel": "Geschätzte Summe für zum Beispiel WC, Waschbecken, Dusche, Armaturen und Badmöbel.",
  "Installationen / Leitungen": "Kosten für Wasser, Abwasser, Elektroarbeiten und technische Anschlüsse.",
  "Vorarbeiten (Spachteln, Abkleben etc.)": "Zusatzkosten, die vor dem eigentlichen Anstrich entstehen.",
  "Zusätzliches Material": "Materialkosten, die noch nicht im Quadratmeterpreis enthalten sind.",
  "Untergrund / Sockelleisten / Sonstiges": "Pauschale für Rückbau, Untergrundausgleich, Dämmung, Sockelleisten oder Entsorgung.",
  Zusatzkosten: "Weitere einmalige Kosten, die nicht in den Stück- oder Flächenpreisen enthalten sind.",
  "Zusatzkosten (Gerüst, Entsorgung etc.)": "Weitere Kosten außerhalb des Quadratmeterpreises, etwa Gerüst, Entsorgung oder Anschlüsse.",
  "Monatliche Annuitätenrate": "Gleichbleibende Monatsrate aus Zins- und Tilgungsanteil.",
  "Gesamte Kaufnebenkosten": "Summe aus Grunderwerbsteuer, Notar, Grundbuch und eingegebener Maklerprovision.",
  "Sozialversicherungsfreie Höchstgrenze": "Rechnerische Obergrenze unter den gesetzlichen Voraussetzungen; die individuelle Abrechnung kann abweichen.",
  "Alternativer Freizeitausgleich": "Mathematische Zeitentsprechung einschließlich Zuschlag; entscheidend sind Vertrag und betriebliche Regeln.",
  "Durchschnittliche Web-Latenz": "Mittlere Dauer der Testanfragen zwischen Browser und SofortTools-Server.",
  "ISO-Kalenderwoche": "Wochennummer nach ISO 8601; eine Woche beginnt montags.",
};

export function InfoTip({ text, label = "Begriff erklären" }: { text: string; label?: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const root = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", escape); };
  }, [open]);

  return <span className="info-tip" ref={root}>
    <button type="button" aria-label={label} aria-expanded={open} aria-controls={id} onClick={(event) => { event.preventDefault(); setOpen((value) => !value); }}>i</button>
    <span id={id} role="tooltip" className="info-popover" hidden={!open}>{text}</span>
  </span>;
}

function FieldLabel({ label, help, htmlFor }: { label: string; help?: string; htmlFor: string }) {
  const explanation = help ?? TERM_HELP[label];
  return <span className="field-label"><label htmlFor={htmlFor}>{label}</label>{explanation && <InfoTip text={explanation} label={`${label} erklären`} />}</span>;
}

export function Field({ label, help, value, onChange, type = "number", suffix, min, max, step, placeholder }: FieldProps) {
  const id = useId();
  return (
    <div className="field">
      <FieldLabel label={label} help={help} htmlFor={id} />
      <div>
        <input id={id} type={type} value={value} min={min} max={max} step={step} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
        {suffix && <b>{suffix}</b>}
      </div>
    </div>
  );
}

export function NumberField(props: Omit<FieldProps, "type">) {
  return <Field {...props} type="number" min={props.min ?? 0} step={props.step ?? "0.01"} />;
}

type SelectOption = { value: string; label: string };

type SelectFieldProps = {
  label: string;
  help?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
};

export function SelectField({ label, help, value, onChange, options }: SelectFieldProps) {
  const id = useId();
  return (
    <div className="field">
      <FieldLabel label={label} help={help} htmlFor={id} />
      <div>
        <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </div>
    </div>
  );
}

export function Result({ label, value, detail, help }: { label: string; value: string; detail?: string; help?: string }) {
  const explanation = help ?? TERM_HELP[label];
  return <div className="result-box"><span className="result-label"><span>{label}</span>{explanation && <InfoTip text={explanation} label={`${label} erklären`} />}</span><strong>{value}</strong>{detail && <small>{detail}</small>}</div>;
}

/** Weiterleitung, die erst nach einem Result ausgegeben und klar als Anzeige gekennzeichnet ist. */
export function Recommendation({ rec }: { rec: { tag: string; headline: string; network: string; product: string; text: string; url: string } }) {
  if (!rec) return null;
  return (
    <aside className="recommendation" aria-label="Werbung">
      <div className="rec-head">
        <span className="rec-tag">{rec.tag}</span>
        <span className="rec-network">{rec.network}</span>
      </div>
      <h3>{rec.headline}</h3>
      <p className="rec-text">{rec.text}</p>
      <a className="rec-link" href={rec.url} target="_blank" rel="sponsored nofollow noopener">
        {rec.product} ansehen
      </a>
      <small className="rec-disclosure">Anzeige. Über diesen Link entstehen dir keine Mehrkosten. Wir können eine Provision erhalten.</small>
    </aside>
  );
}
