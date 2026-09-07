import type { Metadata } from "next";
import "@fontsource-variable/inter/wght.css";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "./lib/site";
import ConsentBanner from "./components/ConsentBanner";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `Kostenlose Online-Rechner & Tools | ${SITE_NAME}`, template: `%s | ${SITE_NAME}` },
  description: "55 kostenlose Online-Rechner und Tools für Finanzen, Energie, Gesundheit, Familie, Arbeit, Immobilien und Alltag – direkt nutzbar.",
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  alternates: { canonical: "/", languages: { "de-DE": "/", "x-default": "/" } },
  openGraph: { type: "website", locale: "de_DE", siteName: SITE_NAME, title: `Kostenlose Online-Rechner & Tools | ${SITE_NAME}`, description: "55 praktische Rechner und Werkzeuge – kostenlos, ohne Anmeldung und direkt im Browser nutzbar.", url: "/", images: [{ url: "/og.png", width: 1731, height: 909, alt: `${SITE_NAME} – Kostenlose Online-Rechner und Tools` }] },
  twitter: { card: "summary_large_image", title: `Kostenlose Online-Rechner & Tools | ${SITE_NAME}`, description: "55 praktische Rechner und Werkzeuge – kostenlos und ohne Anmeldung.", images: ["/og.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className="antialiased">{children}<ConsentBanner /></body>
    </html>
  );
}
