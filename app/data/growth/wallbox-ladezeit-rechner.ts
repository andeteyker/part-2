import type { GrowthToolConfig } from "./types";

export const wallboxLadezeitConfig: GrowthToolConfig = {
  tool: {
    slug: "wallbox-ladezeit-rechner",
    title: "Wallbox-Ladezeit-Rechner",
    eyebrow: "E-Auto-Ladezeit zuhause realistisch planen",
    description: "Berechne die ungefähre Ladezeit eines Elektroautos anhand von Akkukapazität, Start- und Ziel-Ladestand, Wallbox-Leistung und maximaler AC-Ladeleistung des Fahrzeugs.",
    short: "Ladezeit eines E-Autos an 3,7-, 7,4-, 11- oder 22-kW-Wallboxen berechnen.",
    category: "Energie & Umwelt",
    icon: "EV",
    keywords: ["Wallbox Ladezeit Rechner", "wie lange lädt E Auto 11 kW", "E Auto Ladezeit zuhause", "Ladezeit 22 kW Wallbox"],
    faq: [
      { question: "Wie berechnet man die Ladezeit an einer Wallbox?", answer: "Benötigte Energie in kWh wird durch die tatsächlich nutzbare Ladeleistung geteilt. Entscheidend ist der kleinere Wert aus Wallbox-Leistung und maximaler AC-Ladeleistung des Fahrzeugs." },
      { question: "Lädt ein Auto an 22 kW immer doppelt so schnell wie an 11 kW?", answer: "Nein. Wenn das Fahrzeug AC-seitig nur 11 kW aufnehmen kann, bringt eine 22-kW-Wallbox für dieses Fahrzeug keine kürzere Ladezeit." },
      { question: "Warum dauert Laden in der Praxis länger?", answer: "Ladeverluste, Batterietemperatur und das Batteriemanagement können die reale Ladezeit verlängern. Der Rechner arbeitet deshalb mit einem einstellbaren Wirkungsgrad." }
    ],
  },
  fields: [
    { key: "akku", label: "Akkukapazität", defaultValue: "77", suffix: "kWh" },
    { key: "start", label: "Start-Ladestand", defaultValue: "20", suffix: "%", min: 0, max: 100 },
    { key: "ziel", label: "Ziel-Ladestand", defaultValue: "80", suffix: "%", min: 1, max: 100 },
    { key: "wallbox", label: "Wallbox-Leistung", defaultValue: "11", suffix: "kW" },
    { key: "auto", label: "Max. AC-Ladeleistung Auto", defaultValue: "11", suffix: "kW" },
    { key: "wirkungsgrad", label: "Ladewirkungsgrad", defaultValue: "90", suffix: "%", min: 50, max: 100 },
  ],
  seo: {
    steps: [
      { title: "Akkugröße eingeben", text: "Nutze die nutzbare oder vom Hersteller angegebene Batteriekapazität in kWh." },
      { title: "Ladefenster festlegen", text: "Start- und Ziel-Ladestand bestimmen, wie viel Energie tatsächlich nachgeladen werden muss." },
      { title: "Leistungsgrenze beachten", text: "Die reale AC-Ladeleistung wird vom schwächeren Glied aus Wallbox und Fahrzeug begrenzt." },
    ],
    formula: "Ladezeit = Akku × (Ziel − Start) ÷ 100 ÷ (min. Ladeleistung × Wirkungsgrad)",
    example: "77 kWh von 20 auf 80 % entsprechen 46,2 kWh. Bei 11 kW und 90 % Wirkungsgrad dauert das rechnerisch rund 4,7 Stunden.",
    relatedSlugs: ["eauto-verbrenner-kosten-rechner", "stromkosten-rechner", "energie-abschlag-rechner"],
  },
  notice: "Die tatsächliche Ladezeit kann durch Temperatur, Fahrzeugsoftware, Netzbedingungen und Ladeverluste abweichen. Bei DC-Schnellladen gelten andere Ladeverläufe.",
};
