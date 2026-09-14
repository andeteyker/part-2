import type { GrowthToolConfig } from "./types";

export const powerstationLaufzeitConfig: GrowthToolConfig = {
  tool: {
    slug: "powerstation-laufzeit-rechner",
    title: "Powerstation-Laufzeit-Rechner",
    eyebrow: "Wattstunden in reale Nutzungsdauer umrechnen",
    description: "Berechne, wie lange eine Powerstation oder ein Akku ein Gerät mit bestimmter Leistungsaufnahme versorgen kann – inklusive Wirkungsgrad und täglicher Nutzungszeit.",
    short: "Laufzeit einer Powerstation aus Wh, Watt und Wirkungsgrad berechnen.",
    category: "Energie & Umwelt",
    icon: "Wh",
    keywords: ["Powerstation Laufzeit Rechner", "wie lange hält Powerstation", "Wh Watt Laufzeit Rechner", "Akku Laufzeit Wattstunden"],
    faq: [
      { question: "Wie berechnet man die Laufzeit einer Powerstation?", answer: "Vereinfacht wird die nutzbare Kapazität in Wattstunden durch die Leistungsaufnahme des angeschlossenen Geräts in Watt geteilt. Verluste des Wechselrichters werden über den Wirkungsgrad berücksichtigt." },
      { question: "Warum ist die reale Laufzeit kürzer als Wh geteilt durch Watt?", answer: "Wechselrichter, Elektronik, Temperatur und Eigenverbrauch verursachen Verluste. Deshalb steht an der Steckdose meist nicht die komplette Nennkapazität zur Verfügung." },
      { question: "Kann ich auch Kühlschrank oder Kompressor berechnen?", answer: "Als Orientierung ja, wenn du eine realistische durchschnittliche Leistungsaufnahme einträgst. Geräte mit Einschaltspitzen müssen zusätzlich zur Dauerleistung zur maximalen Ausgangsleistung der Powerstation passen." },
    ],
  },
  fields: [
    { key: "kapazitaet", label: "Nennkapazität", defaultValue: "1024", suffix: "Wh" },
    { key: "leistung", label: "Durchschnittliche Geräteleistung", defaultValue: "100", suffix: "W" },
    { key: "wirkungsgrad", label: "Nutzbarer Wirkungsgrad", defaultValue: "85", suffix: "%", min: 1, max: 100 },
    { key: "stunden", label: "Nutzung pro Tag", defaultValue: "8", suffix: "h/Tag", min: 0.1, max: 24, step: 0.1 },
  ],
  seo: {
    steps: [
      { title: "Kapazität in Wh ablesen", text: "Nutze die vom Hersteller angegebene Nennkapazität der Powerstation oder des Akkus in Wattstunden." },
      { title: "Durchschnittliche Leistung einsetzen", text: "Entscheidend ist die mittlere Leistungsaufnahme des Geräts, nicht nur eine kurzzeitige Spitzenleistung." },
      { title: "Verluste berücksichtigen", text: "Ein realistischer Wirkungsgrad macht die Laufzeitplanung belastbarer als die reine Division von Wh durch Watt." },
    ],
    formula: "Laufzeit in Stunden = Kapazität in Wh × Wirkungsgrad ÷ Geräteleistung in W",
    example: "Eine Powerstation mit 1.024 Wh, 85 % nutzbarem Wirkungsgrad und 100 W Dauerlast liefert rechnerisch rund 8,7 Stunden Energie.",
    relatedSlugs: ["stromkosten-rechner", "haushaltsgeraete-kosten-rechner", "balkonkraftwerk-rechner"],
  },
  notice: "Die reale Laufzeit hängt unter anderem von Temperatur, Akkuzustand, Wechselrichter, Eigenverbrauch und Lastprofil ab. Prüfe außerdem die maximale Dauer- und Spitzenleistung der Powerstation.",
};
