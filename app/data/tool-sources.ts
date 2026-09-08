export type ToolSource = { label: string; publisher: string; href: string };

const sources: Record<string, ToolSource[]> = {
  "einkommensteuer-rechner": [
    { label: "§ 32a EStG – Einkommensteuertarif", publisher: "Bundesministerium der Justiz", href: "https://www.gesetze-im-internet.de/estg/__32a.html" },
  ],
  "pendlerpauschale-rechner": [
    { label: "§ 9 EStG – Entfernungspauschale und erste Tätigkeitsstätte", publisher: "Bundesministerium der Justiz", href: "https://www.gesetze-im-internet.de/estg/__9.html" },
  ],
  "nachtzuschlag-rechner": [
    { label: "§ 3b EStG – Zuschläge für Nachtarbeit", publisher: "Bundesministerium der Justiz", href: "https://www.gesetze-im-internet.de/estg/__3b.html" },
  ],
  "sonntagszuschlag-rechner": [
    { label: "§ 3b EStG – Zuschläge für Sonntagsarbeit", publisher: "Bundesministerium der Justiz", href: "https://www.gesetze-im-internet.de/estg/__3b.html" },
  ],
  "feiertagszuschlag-rechner": [
    { label: "§ 3b EStG – Zuschläge für Feiertagsarbeit", publisher: "Bundesministerium der Justiz", href: "https://www.gesetze-im-internet.de/estg/__3b.html" },
  ],
  "schichtlohn-rechner": [
    { label: "§ 3b EStG – steuerliche Grenzen für SFN-Zuschläge", publisher: "Bundesministerium der Justiz", href: "https://www.gesetze-im-internet.de/estg/__3b.html" },
  ],
  "urlaubsanspruch-rechner": [
    { label: "Bundesurlaubsgesetz", publisher: "Bundesministerium der Justiz", href: "https://www.gesetze-im-internet.de/burlg/" },
  ],
  "elterngeld-rechner": [
    { label: "Elterngeld – Voraussetzungen und Berechnung", publisher: "Familienportal des Bundes", href: "https://familienportal.de/familienportal/familienleistungen/elterngeld" },
  ],
  "kindergeld-rechner": [
    { label: "Kindergeld – Anspruch, Höhe und Antrag", publisher: "Familienportal des Bundes", href: "https://familienportal.de/familienportal/familienleistungen/kindergeld" },
  ],
  "rentenrechner": [
    { label: "Grundlagen der Rentenberechnung", publisher: "Deutsche Rentenversicherung", href: "https://www.deutsche-rentenversicherung.de/DRV/DE/Rente/Allgemeine-Informationen/Wissenswertes-zur-Rente/Rentenberechnung/rentenberechnung_node.html" },
  ],
  "bmi-rechner": [
    { label: "BMI und gesundheitliche Einordnung", publisher: "Weltgesundheitsorganisation", href: "https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight" },
  ],
};

export const getToolSources = (slug: string) => sources[slug] ?? [];
