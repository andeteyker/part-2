import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SofortTools – Kostenlose Online-Rechner",
    short_name: "SofortTools",
    description: "Verständliche Online-Rechner und praktische Werkzeuge für Finanzen, Immobilien, Arbeit, Energie, Gesundheit und Alltag.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#071a31",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
