"use client";
import Link from "next/link";

export default function PageError({ reset }: { reset: () => void }) {
  return <main className="shell">
    <h1>Seite vorübergehend nicht verfügbar</h1>
    <p>Die gespeicherten Inhalte konnten gerade nicht geladen werden.</p>
    <button onClick={reset}>Erneut versuchen</button>
    <p><Link href="/">Zur Startseite</Link></p>
  </main>;
}
