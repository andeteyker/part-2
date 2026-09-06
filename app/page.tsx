import Script from "next/script";
import { HomeClient } from "./components/HomeClient";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { tools } from "./data/tool-registry";
import { siteName, siteUrl } from "./data/site";

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    url: `${siteUrl}/`,
    inLanguage: "de-DE",
    description: "Kostenlose spezialisierte Online-Rechner und Werkzeuge für Immobilien, Geld, Arbeit, Text, Bilder, Internet und Alltag.",
    hasPart: tools.map((tool) => ({
      "@type": "WebApplication",
      name: tool.title,
      url: `${siteUrl}/tools/${tool.slug}`,
    })),
  };

  return <>
    <Script id="website-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <SiteHeader />
    <main><HomeClient /></main>
    <SiteFooter />
  </>;
}
