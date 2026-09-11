import Script from "next/script";
import { HomeClient } from "./components/HomeClient";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { absoluteUrl, SITE_NAME } from "./lib/site";
import { tools } from "./data/tool-registry";
import { publishedStudioCatalog } from "./studio/catalog";

export const dynamic = "force-dynamic";

export default async function Home() {
  const studioPages = await publishedStudioCatalog();
  const toolCount = tools.length + studioPages.length;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${absoluteUrl("/")}#organization`,
        name: SITE_NAME,
        alternateName: "Sofort Tools",
        url: absoluteUrl("/"),
        logo: { "@type": "ImageObject", url: absoluteUrl("/icon-512.png"), width: 512, height: 512 },
      },
      {
        "@type": "WebSite",
        "@id": `${absoluteUrl("/")}#website`,
        name: SITE_NAME,
        alternateName: "Sofort Tools",
        url: absoluteUrl("/"),
        inLanguage: "de-DE",
        publisher: { "@id": `${absoluteUrl("/")}#organization` },
        description: `${toolCount} kostenlose Online-Rechner und Werkzeuge für Gehalt, Lernen, Texte, SEO, Bilder und Alltag – verständlich erklärt und ohne Anmeldung.`,
      },
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl("/")}#webpage`,
        name: `Kostenlose Online-Rechner für Alltag & Finanzen | ${SITE_NAME}`,
        url: absoluteUrl("/"),
        isPartOf: { "@id": `${absoluteUrl("/")}#website` },
        about: { "@id": `${absoluteUrl("/")}#organization` },
        description: `${toolCount} kostenlose Online-Rechner und Werkzeuge für Gehalt, Lernen, Texte, SEO, Bilder und Alltag – sofort nutzbar, verständlich erklärt, ohne Anmeldung.`,
      },
    ],
  };
  return <><Script id="website-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><SiteHeader /><main><HomeClient studioPages={studioPages} /></main><SiteFooter /></>;
}
