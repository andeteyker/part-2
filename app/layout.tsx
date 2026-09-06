import type { Metadata } from "next";
import "./globals.css";
import { siteName, siteUrl } from "./data/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "SofortTools – Kostenlose Online-Rechner & Werkzeuge",
    template: "%s | SofortTools",
  },
  description: "Spezialisierte Online-Rechner für Immobilien, Geld, Beruf, Text, Bilder, Internet und Alltag. Kostenlos, ohne Anmeldung und direkt nutzbar.",
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName,
    title: "SofortTools – Rechner für konkrete Entscheidungen",
    description: "Kostenlose spezialisierte Rechner für Immobilien, Geld, Beruf und Alltag.",
    url: "/",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "SofortTools – kostenlose Online-Rechner" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SofortTools – Kostenlose Online-Rechner",
    description: "Spezialisierte Rechner für konkrete Aufgaben – kostenlos und ohne Anmeldung.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  other: {
    "codex-preview": "development",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className="antialiased">{children}</body>
    </html>
  );
}
