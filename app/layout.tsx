import type { Metadata } from "next";
import "@fontsource-variable/inter/wght.css";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "./lib/site";
import ConsentBanner from "./components/ConsentBanner";
import PlausibleAnalytics from "./components/PlausibleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `Kostenlose Online-Rechner für Alltag & Finanzen | ${SITE_NAME}`, template: `%s | ${SITE_NAME}` },
  description: "Kostenlose Online-Rechner und Werkzeuge für Gehalt, Steuern, Lernen, Texte, SEO, Bilder und Alltag – sofort nutzbar, verständlich erklärt, ohne Anmeldung.",
  applicationName: SITE_NAME,
  category: "Online-Rechner und digitale Werkzeuge",
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  alternates: { canonical: "/", languages: { "de-DE": "/", "x-default": "/" } },
  openGraph: { type: "website", locale: "de_DE", siteName: SITE_NAME, title: `Kostenlose Online-Rechner für Alltag & Finanzen | ${SITE_NAME}`, description: "85 verständlich erklärte Rechner und Werkzeuge für Gehalt, Lernen, Texte, SEO, Bilder und Alltag – kostenlos und ohne Anmeldung.", url: "/", images: [{ url: "/og.png", width: 1731, height: 909, alt: `${SITE_NAME} – Kostenlose Online-Rechner und Tools` }] },
  twitter: { card: "summary_large_image", title: `Kostenlose Online-Rechner | ${SITE_NAME}`, description: "85 verständlich erklärte Rechner und Werkzeuge für Finanzen, Lernen, Texte, SEO, Bilder und Alltag.", images: ["/og.png"] },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className="antialiased">{children}<ConsentBanner /><PlausibleAnalytics /></body>
    </html>
  );
}
