import Script from "next/script";
import { HomeClient } from "./components/HomeClient";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { tools } from "./data/tool-registry";
import { absoluteUrl, SITE_NAME } from "./lib/site";

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    name: SITE_NAME,
    alternateName: "Sofort-Tools",
    url: absoluteUrl("/"),
    inLanguage: "de-DE",
    description: "55 kostenlose Online-Rechner und Werkzeuge für Finanzen, Energie, Gesundheit, Familie, Arbeit, Immobilien, Text, Bilder und Alltag.",
    hasPart: tools.map((tool) => ({ "@type": "WebApplication", name: tool.title, url: absoluteUrl(`/tools/${tool.slug}`) })),
  };
  return <><Script id="website-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><SiteHeader /><main><HomeClient /></main><SiteFooter /></>;
}
