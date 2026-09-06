import type { Metadata } from "next";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "./lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} – Kostenlose Online-Rechner & Werkzeuge`, template: `%s | ${SITE_NAME}` },
  description: "Kostenlose Online-Rechner und Werkzeuge für Geld, Beruf, Immobilien, Renovierung, Schichtarbeit, Text, Bilder, Internet und Planung. Ohne Anmeldung und direkt nutzbar.",
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "de_DE", siteName: SITE_NAME, title: `${SITE_NAME} – Kostenlose Online-Rechner & Werkzeuge`, description: "Klare Tools für konkrete Aufgaben – kostenlos, ohne Anmeldung und direkt im Browser nutzbar.", url: "/", images: [{ url: "/og.png", width: 1731, height: 909, alt: `${SITE_NAME} – Kostenlose Online-Werkzeuge` }] },
  twitter: { card: "summary_large_image", title: `${SITE_NAME} – Kostenlose Online-Werkzeuge`, description: "Praktische Rechner und Werkzeuge, sofort und kostenlos nutzbar.", images: ["/og.png"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className="antialiased">{children}</body>
    </html>
  );
}
