import Script from "next/script";
import { HomeClient } from "./components/HomeClient";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { tools } from "./data/tool-registry";

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SofortTools",
    url: "https://soforttools.mielerik.chatgpt.site/",
    description: "Kostenlose Online-Rechner und Werkzeuge für Immobilien, Geld, Arbeit, Text, Bilder, Internet und Alltag.",
    hasPart: tools.map((tool) => ({ "@type": "WebApplication", name: tool.title, url: `https://soforttools.mielerik.chatgpt.site/tools/${tool.slug}` })),
  };
  return <><Script id="website-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><SiteHeader /><main><HomeClient /></main><SiteFooter /></>;
}
