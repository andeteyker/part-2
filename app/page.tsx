import Script from "next/script";
import { HomeClient } from "./components/HomeClient";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { tools } from "./data/tool-registry";
import { absoluteUrl, SITE_NAME } from "./lib/site";

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${absoluteUrl("/")}#organization`,
        name: SITE_NAME,
        alternateName: "Sofort-Tools",
        url: absoluteUrl("/"),
        logo: { "@type": "ImageObject", url: absoluteUrl("/favicon.svg"), width: 64, height: 64 },
      },
      {
        "@type": "WebSite",
        "@id": `${absoluteUrl("/")}#website`,
        name: SITE_NAME,
        alternateName: ["Sofort-Tools", "sofort-tools.de"],
        url: absoluteUrl("/"),
        inLanguage: "de-DE",
        publisher: { "@id": `${absoluteUrl("/")}#organization` },
        description: "Kostenlose Online-Rechner und verständliche Werkzeuge für Finanzen, Immobilien, Arbeit, Energie, Gesundheit und Alltag.",
        hasPart: tools.map((tool) => ({ "@type": "WebApplication", name: tool.title, url: absoluteUrl(`/tools/${tool.slug}`) })),
      },
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl("/")}#webpage`,
        name: `${SITE_NAME} – Kostenlose Rechner & Online-Tools`,
        url: absoluteUrl("/"),
        isPartOf: { "@id": `${absoluteUrl("/")}#website` },
        about: { "@id": `${absoluteUrl("/")}#organization` },
        description: "Verständliche Online-Rechner mit Erklärungen, Rechenwegen und thematischen Ratgebern.",
      },
    ],
  };
  return <><Script id="website-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><SiteHeader /><main><HomeClient /></main><SiteFooter /></>;
}
