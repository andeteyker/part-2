type ToolIconProps = { slug: string; className?: string };

const icons: Record<string, React.ReactNode> = {
  prozentrechner: <><circle cx="18" cy="17" r="4" /><circle cx="30" cy="31" r="4" /><path d="m15 34 18-20" /></>,
  dreisatzrechner: <><path d="M11 14h12M11 24h18M11 34h26" /><path d="m31 12 6 6-6 6" /></>,
  "woerter-aus-buchstaben": <><rect x="9" y="10" width="13" height="13" rx="2" /><rect x="26" y="10" width="13" height="13" rx="2" /><rect x="17" y="27" width="13" height="13" rx="2" /><path d="M13 19l3-6 3 6M29 14h7M32 14v6M20 31h7M20 35h7" /></>,
  "wordle-hilfe": <><rect x="8" y="9" width="9" height="9" rx="2" /><rect x="20" y="9" width="9" height="9" rx="2" /><rect x="32" y="9" width="8" height="9" rx="2" /><rect x="14" y="22" width="9" height="9" rx="2" /><rect x="26" y="22" width="9" height="9" rx="2" /><path d="m19 37 4 4 9-10" /></>,
  "zeichen-zaehlen": <><path d="M17 9 13 39M32 9l-4 30M9 20h30M8 30h30" /></>,
  "woerter-zaehlen": <><path d="M10 12h22M10 20h28M10 28h20M10 36h25" /><circle cx="37" cy="12" r="3" /></>,
  "bildformat-konverter": <><rect x="7" y="9" width="25" height="29" rx="4" /><circle cx="14" cy="17" r="3" /><path d="m10 33 7-8 5 5 4-4 6 7M36 12v24M32 16l4-4 4 4M32 32l4 4 4-4" /></>,
  "hintergrund-entfernen": <><path d="M9 9h13v4H13v9H9V9Zm17 0h13v13h-4v-9h-9V9ZM9 26h4v9h9v4H9V26Zm26 0h4v13H26v-4h9v-9Z" /><circle cx="24" cy="22" r="7" /><path d="M13 35c2-7 6-10 11-10s9 3 11 10" /></>,
  "bildgroesse-aendern": <><rect x="11" y="11" width="26" height="26" rx="3" /><path d="M7 18V7h11M7 7l9 9M41 30v11H30M41 41l-9-9" /></>,
  "bild-zuschneiden-drehen": <><path d="M12 6v29a5 5 0 0 0 5 5h25M6 13h27a5 5 0 0 1 5 5v24" /><path d="M27 8h10v10M37 8 25 20" /></>,
  "bild-dateigroesse-komprimieren": <><rect x="8" y="8" width="32" height="32" rx="5" /><path d="m11 34 9-10 6 6 4-5 7 9M15 13h7v7M22 13l-8 8M33 35h-7v-7M26 35l8-8" /></>,
  "bild-metadaten-entfernen": <><rect x="8" y="10" width="27" height="28" rx="4" /><circle cx="16" cy="18" r="3" /><path d="m11 33 8-9 6 6 5-6 5 7" /><path d="m29 33 5 5 9-12" /></>,
  "passfoto-zuschneiden": <><rect x="10" y="6" width="28" height="36" rx="4" /><circle cx="24" cy="18" r="7" /><path d="M14 37c1-9 4-13 10-13s9 4 10 13M7 13h6M7 35h6M35 13h6M35 35h6" /></>,
  "bilder-zu-pdf": <><path d="M12 6h18l7 7v29H12V6Zm18 0v8h7" /><path d="M7 18h20v15H7zM10 29l5-6 4 4 3-3 5 5" /></>,
  "bildfarben-korrigieren": <><circle cx="24" cy="24" r="17" /><path d="M24 7v34M7 24h34" /><circle cx="24" cy="24" r="8" /><path d="M12 12l24 24M36 12 12 36" /></>,
  "favicon-erstellen": <><rect x="9" y="9" width="30" height="30" rx="7" /><path d="M18 34V14h14M18 23h11" /><path d="M7 16H4M7 24H3M7 32H4M41 16h3M41 24h4M41 32h3" /></>,
  "qr-code-erstellen": <><path d="M8 8h12v12H8V8Zm20 0h12v12H28V8ZM8 28h12v12H8V28Zm20 0h5v5h-5v-5Zm7 0h5v12H28v-5h7v-7Z" /></>,
  "meine-ip": <><circle cx="24" cy="24" r="16" /><path d="M8 24h32M24 8c6 6 6 26 0 32M24 8c-6 6-6 26 0 32" /><circle cx="24" cy="24" r="3" /></>,
  "ping-test": <><path d="M7 29h7l4-12 7 22 6-18 4 8h6" /><path d="M10 11h10M15 6v10" /></>,
  altersrechner: <><circle cx="24" cy="25" r="15" /><path d="M24 16v10l7 4M18 8V5M30 8V5" /><path d="M14 9h20" /></>,
  "zeitdauer-berechnen": <><circle cx="22" cy="25" r="15" /><path d="M22 15v11l8 5M17 7h10M36 14l4-4" /><path d="M34 8l6 6" /></>,
  mehrwertsteuerrechner: <><path d="M10 10h28v28H10zM16 17h9M16 24h16M16 31h9" /><path d="M30 15v7M27 18h6M30 27v6" /></>,
  stundenlohnrechner: <><circle cx="18" cy="24" r="11" /><path d="M18 17v8l5 3M30 15h10M35 10v10M30 30h10M30 36h8" /></>,
  spritkostenrechner: <><path d="M10 38V13a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4v25M8 38h27M14 14h14v9H14z" /><path d="M32 17h5l3 5v12a3 3 0 0 1-6 0v-8" /></>,
  kalenderwoche: <><rect x="8" y="11" width="32" height="29" rx="4" /><path d="M15 7v8M33 7v8M8 19h32M15 25h6M27 25h6M15 32h6M27 32h6" /></>,
  zufallsgenerator: <><rect x="10" y="10" width="28" height="28" rx="6" /><circle cx="17" cy="17" r="2" fill="currentColor" /><circle cx="31" cy="17" r="2" fill="currentColor" /><circle cx="24" cy="24" r="2" fill="currentColor" /><circle cx="17" cy="31" r="2" fill="currentColor" /><circle cx="31" cy="31" r="2" fill="currentColor" /></>,
  passwortgenerator: <><rect x="9" y="21" width="30" height="20" rx="4" /><path d="M15 21v-5a9 9 0 0 1 18 0v5M24 28v7" /><circle cx="24" cy="28" r="3" /></>,
  "mietrendite-rechner": <><path d="m8 23 16-14 16 14M12 21v18h24V21M18 39V28h12v11" /><path d="M34 9v8M30 13h8" /></>,
  "kaufnebenkosten-rechner": <><path d="m8 21 16-13 16 13M12 19v20h24V19" /><path d="M18 26h12M18 32h12M24 23v12" /></>,
  "immobilien-cashflow-rechner": <><path d="m7 22 17-14 17 14M12 20v20h24V20M18 40V29h12v11" /><path d="m15 18 6-6 6 6 7-7" /></>,
  "haus-leisten-rechner": <><path d="m6 22 18-15 18 15M11 20v20h26V20M18 40V28h12v12" /><circle cx="36" cy="11" r="5" /><path d="M36 8v6M33 11h6" /></>,
  "kreditraten-rechner": <><path d="m8 22 16-13 16 13M12 20v19h24V20M18 39V28h12v11" /><path d="M34 30h8M38 26v8" /></>,
  "schichtlohn-rechner": <><circle cx="18" cy="24" r="12" /><path d="M18 16v9l6 3" /><path d="M31 13h9M35 9v8M30 26h11M31 34h9" /></>,
  "nachtzuschlag-rechner": <><path d="M29 8c-9 2-14 12-9 21 4 7 12 9 20 5-4 8-14 11-23 7C7 37 4 25 10 16c4-7 12-10 19-8Z" /><path d="M31 19h10M36 14v10" /></>,
  "sonntagszuschlag-rechner": <><circle cx="21" cy="24" r="9" /><path d="M21 7v6M21 35v6M4 24h6M32 24h6M9 12l5 5M28 31l5 5M9 36l5-5M28 17l5-5" /><path d="M35 29v12M29 35h12" /></>,
  "feiertagszuschlag-rechner": <><path d="M12 39V19M36 39V19M8 19h32M15 19V9h18v10M18 27h12M24 23v8" /><path d="M9 39h30" /></>,
  "ueberstunden-rechner": <><circle cx="21" cy="25" r="14" /><path d="M21 16v10l7 4M35 12h8M39 8v8" /></>,
  "dachkosten-rechner": <><path d="m5 27 19-18 19 18M10 24v16h28V24M17 40V29h14v11" /><path d="M15 17h18" /></>,
  "badrenovierung-rechner": <><path d="M8 25h32v7a8 8 0 0 1-8 8H16a8 8 0 0 1-8-8v-7ZM12 25v-8a6 6 0 0 1 12 0" /><circle cx="24" cy="17" r="2" /></>,
  "fensterkosten-rechner": <><rect x="9" y="7" width="30" height="34" rx="2" /><path d="M24 7v34M9 24h30M28 28l7 7M35 28l-7 7" /></>,
  "malerkosten-rechner": <><path d="M8 12h25v10H8zM33 15h7v12H24v7" /><rect x="20" y="33" width="8" height="9" rx="2" /></>,
  "bodenverlegung-kosten-rechner": <><path d="M8 12h32v26H8zM8 21h32M8 30h32M19 12v9M30 12v9M14 21v9M25 21v9M36 21v9M19 30v8M30 30v8" /></>,
  "netto-gehalt-rechner": <><rect x="8" y="10" width="32" height="28" rx="4" /><path d="M8 19h32M14 27h9M14 32h14" /><circle cx="34" cy="29" r="4" /></>,
  "einkommensteuer-rechner": <><path d="M13 7h22v34H13zM18 13h12M18 20h12M18 28h5M28 28h3M18 34h5M28 34h3" /><path d="M9 14h4M9 22h4M9 30h4" /></>,
  "pendlerpauschale-rechner": <><path d="M8 32h32l-4-12H12L8 32Zm5 0v5M35 32v5" /><circle cx="15" cy="33" r="4" /><circle cx="33" cy="33" r="4" /><path d="M17 14h15M28 10l4 4-4 4" /></>,
  rentenrechner: <><path d="M10 38h28M13 38V18h22v20M18 18v-6h12v6M18 25h12M18 31h8" /><path d="M32 27v7M29 30h6" /></>,
  "abfindungs-rechner": <><path d="M12 15h24v25H12zM18 15v-5h12v5M12 24h24" /><path d="m18 31 4 4 8-9" /></>,
  "bauspar-rechner": <><path d="m7 23 17-14 17 14M11 21v19h26V21M18 40V28h12v12" /><path d="M31 11h9v9" /></>,
  "stromkosten-rechner": <><path d="M27 5 13 26h10l-2 17 14-24H25l2-14Z" /><path d="M7 37h8M33 37h8" /></>,
  "heizkosten-rechner": <><path d="M18 7v22a8 8 0 1 0 12 0V7a6 6 0 0 0-12 0Z" /><path d="M24 14v20M14 10h4M14 17h4" /></>,
  "gasverbrauch-rechner": <><path d="M25 5c3 8-4 11-1 17 2 3 6 1 7-2 4 5 7 9 5 15-2 6-7 9-13 8-8-1-13-7-11-15 2-7 8-10 13-23Z" /><path d="M23 27c4 4 2 7 0 10-3-2-5-6 0-10Z" /></>,
  "solar-ertrag-rechner": <><circle cx="35" cy="13" r="6" /><path d="M35 3v4M35 19v4M25 13h4M41 13h4" /><path d="M8 25h28l4 16H4l4-16Zm5 0-2 16M22 25v16M31 25l2 16M6 33h32" /></>,
  "bmi-rechner": <><path d="M12 40h24l-3-28H15l-3 28Z" /><path d="M18 18a6 6 0 0 1 12 0M24 18l4-4" /></>,
  "kalorienbedarf-rechner": <><path d="M25 5c3 9-5 12-2 19 2 4 7 2 8-2 5 6 8 11 5 16-3 5-9 7-15 5-8-3-11-12-6-19 3-4 8-8 10-19Z" /><path d="M24 29c4 4 2 8-1 11-4-3-4-7 1-11Z" /></>,
  "koerperfett-anteil-rechner": <><circle cx="24" cy="11" r="6" /><path d="M16 41c0-9 2-17 8-22 6 5 8 13 8 22M14 27h20M12 34h24" /></>,
  "idealgewicht-rechner": <><path d="M11 38h26l-3-27H14l-3 27Z" /><path d="M24 17v9M19 22h10" /><path d="M17 32h14" /></>,
  "elterngeld-rechner": <><circle cx="19" cy="15" r="6" /><circle cx="31" cy="20" r="4" /><path d="M8 39c1-11 5-17 11-17 7 0 11 6 12 17M27 27c7 0 11 4 12 12" /><circle cx="35" cy="11" r="4" /><path d="M35 9v4M33 11h4" /></>,
  "kindergeld-rechner": <><circle cx="17" cy="16" r="6" /><circle cx="31" cy="17" r="5" /><path d="M7 39c1-11 4-17 10-17 7 0 10 6 11 17M27 25c8 0 12 5 13 14" /><path d="M31 8v7M27 11h8" /></>,
  "schwangerschafts-terminrechner": <><rect x="8" y="11" width="32" height="29" rx="4" /><path d="M15 7v8M33 7v8M8 19h32" /><circle cx="24" cy="29" r="6" /><path d="M24 25v8M20 29h8" /></>,
  "urlaubsanspruch-rechner": <><path d="M6 31c8-14 21-18 36-10-12 2-20 8-24 18M26 18l-3 19" /><path d="M8 41h32" /></>,
  "angebots-kalkulation": <><path d="M12 7h20l6 6v28H12V7Zm20 0v7h6M17 21h16M17 27h16M17 33h9" /><path d="M8 13h4" /></>,
  "umzugskosten-rechner": <><rect x="7" y="18" width="25" height="18" rx="2" /><path d="M32 24h6l4 6v6H32M13 18v-6h13v6" /><circle cx="15" cy="37" r="4" /><circle cx="35" cy="37" r="4" /></>,
};

export const TOOL_ICON_SLUGS = Object.keys(icons);

export function ToolIcon({ slug, className }: ToolIconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-tool-icon={slug}>
      <circle cx="24" cy="24" r="23" fill="currentColor" opacity=".13" stroke="none" />
      {icons[slug] ?? <><circle cx="24" cy="24" r="12" /><path d="M18 24h12M24 18v12" /></>}
    </svg>
  );
}
