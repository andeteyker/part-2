import Script from "next/script";
import { HomeClient } from "./components/HomeClient";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { absoluteUrl, SITE_NAME } from "./lib/site";
import { publishedStudioCatalog } from "./studio/catalog";

export const dynamic = "force-dynamic";

export default async function Home() {
  const studioPages = await publishedStudioCatalog();
  const organizationId = `${absoluteUrl("/")}#organization`;
  const websiteId = `${absoluteUrl("/")}#website`;
  const webpageId = `${absoluteUrl("/")}#webpage`;
  const description = "Kostenlose Online-Rechner und praktische Tools für Finanzen, Gehalt, Steuern, Alltag, Lernen, Texte, SEO und mehr – direkt nutzbar, verständlich erklärt und ohne Anmeldung.";
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: SITE_NAME,
        alternateName: ["Sofort Tools", "Sofort-Tools"],
        url: absoluteUrl("/"),
        logo: {
          "@type": "ImageObject",
          "@id": `${absoluteUrl("/")}#logo`,
          url: absoluteUrl("/icon-512.png"),
          contentUrl: absoluteUrl("/icon-512.png"),
          width: 512,
          height: 512,
          caption: SITE_NAME,
        },
        description: "SofortTools bietet kostenlose Online-Rechner, digitale Werkzeuge und verständliche Ratgeber für konkrete Fragen aus Alltag, Beruf und Finanzen.",
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: SITE_NAME,
        alternateName: "Sofort Tools",
        url: absoluteUrl("/"),
        inLanguage: "de-DE",
        publisher: { "@id": organizationId },
        description,
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        name: `Kostenlose Online-Rechner & Tools | ${SITE_NAME}`,
        url: absoluteUrl("/"),
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        primaryImageOfPage: { "@id": `${absoluteUrl("/")}#logo` },
        inLanguage: "de-DE",
        description,
      },
    ],
  };
  return <><Script id="website-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><SiteHeader /><main><HomeClient studioPages={studioPages} /></main><SiteFooter /></>;
}
