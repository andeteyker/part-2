import type { Metadata } from "next";
import "@fontsource-variable/inter/wght.css";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "./lib/site";
import ConsentBanner from "./components/ConsentBanner";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} – Kostenlose Rechner & Online-Tools`, template: `%s | ${SITE_NAME}` },
  description: "Kostenlose Online-Rechner für Gehalt, Steuern, Immobilien, Energie, Gesundheit und Alltag. Mit verständlichen Ergebnissen, Erklärungen und Ratgebern.",
  applicationName: SITE_NAME,
  category: "Online-Rechner und digitale Werkzeuge",
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  alternates: { canonical: "/", languages: { "de-DE": "/", "x-default": "/" } },
  openGraph: { type: "website", locale: "de_DE", siteName: SITE_NAME, title: `${SITE_NAME} – Kostenlose Rechner & Online-Tools`, description: "Verständliche Rechner und praktische Werkzeuge für Finanzen, Immobilien, Arbeit, Energie, Gesundheit und Alltag.", url: "/", images: [{ url: "/og.png", width: 1731, height: 909, alt: `${SITE_NAME} – Kostenlose Online-Rechner und Tools` }] },
  twitter: { card: "summary_large_image", title: `${SITE_NAME} – Kostenlose Rechner & Online-Tools`, description: "Verständliche Rechner und praktische Werkzeuge für wichtige Fragen im Alltag.", images: ["/og.png"] },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml", sizes: "any" }], shortcut: "/favicon.svg" },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className="antialiased">{children}<ConsentBanner /></body>
    </html>
  );
}
