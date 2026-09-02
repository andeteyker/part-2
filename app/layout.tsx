import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://soforttools.mielerik.chatgpt.site"),
  title: { default: "SofortTools – Kostenlose Online-Rechner & Werkzeuge", template: "%s | SofortTools" },
  description: "20 spezialisierte Online-Tools für Geld, Beruf, Schule, Wortspiele, iPhone-Bilder, Internet und Planung. Kostenlos und ohne Anmeldung.",
  keywords: ["spezialisierte Online Tools", "kostenlose Rechner", "Scrabble Wortfinder", "Arbeitszeit berechnen", "iPhone HEIC JPG", "WLAN QR Code"],
  authors: [{ name: "SofortTools" }],
  creator: "SofortTools",
  publisher: "SofortTools",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "de_DE", siteName: "SofortTools", title: "SofortTools – Spezialisierte Online-Werkzeuge", description: "Klare Tools für konkrete Aufgaben: Geld, Beruf, Schule, Wortspiele, iPhone, Internet und Planung.", url: "/", images: [{ url: "/og.png", width: 1731, height: 909, alt: "SofortTools – Kostenlose Online-Werkzeuge" }] },
  twitter: { card: "summary_large_image", title: "SofortTools – Kostenlose Online-Werkzeuge", description: "20 praktische Werkzeuge, sofort und kostenlos nutzbar.", images: ["/og.png"] },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">{children}</body>
    </html>
  );
}
