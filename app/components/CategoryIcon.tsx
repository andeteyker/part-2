type CategoryIconProps = {
  category: string;
  className?: string;
};

function IconFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" role="img" aria-hidden="true">
      <circle className="category-icon-disc" cx="24" cy="24" r="23" fill="currentColor" opacity=".13" />
      <g className="category-icon-glyph" fill="currentColor">{children}</g>
    </svg>
  );
}

export function CategoryIcon({ category, className }: CategoryIconProps) {
  switch (category) {
    case "Geld & Beruf":
      return <IconFrame className={className}><path d="M10 15a5 5 0 0 1 5-5h21v7H15a2 2 0 0 0 0 4h23v17H14a6 6 0 0 1-6-6V16c0-4 3-7 7-7h18v3H15a4 4 0 0 0-4 4v16a3 3 0 0 0 3 3h21V24H15a5 5 0 0 1-5-9Zm20 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" /></IconFrame>;
    case "Schule, Text & SEO":
      return <IconFrame className={className}><path d="M13 8h16l8 8v24H13V8Zm14 3v8h8l-8-8ZM18 24h14v3H18v-3Zm0 7h11v3H18v-3Z" /><path d="m32 33 7 7-2 2-7-7 2-2Z" /></IconFrame>;
    case "Wortspiele & Rätsel":
      return <IconFrame className={className}><rect x="9" y="9" width="13" height="13" rx="3" /><rect x="26" y="9" width="13" height="13" rx="3" /><rect x="9" y="26" width="13" height="13" rx="3" /><path d="M31 27h4v4h4v4h-4v4h-4v-4h-4v-4h4v-4Z" /></IconFrame>;
    case "Bilder & Dateien":
      return <IconFrame className={className}><rect x="7" y="9" width="34" height="30" rx="5" /><circle cx="17" cy="18" r="4" fill="white" /><path d="m10 34 9-10 6 6 5-6 8 10H10Z" fill="white" /><path d="M32 7v8M28 11h8" /></IconFrame>;
    case "Internet & Sicherheit":
      return <IconFrame className={className}><path d="M24 5 39 11v10c0 10-6 17-15 22C15 38 9 31 9 21V11l15-6Zm-2 12v4h-4v6h4v4h5v-4h4v-6h-4v-4h-5Z" /></IconFrame>;
    case "Zeit & Planung":
      return <IconFrame className={className}><path d="M13 8h3v5h16V8h3v5h5v27H8V13h5V8Zm-1 13v15h24V21H12Zm11 3h4v7h6v4H23V24Z" /></IconFrame>;
    case "Finanzen & Steuern":
      return <IconFrame className={className}><path d="M10 7h25a4 4 0 0 1 4 4v28H10V7Zm5 6v7h19v-7H15Zm0 12v4h4v-4h-4Zm8 0v4h4v-4h-4Zm8 0v10h4V25h-4Zm-16 6v4h4v-4h-4Zm8 0v4h4v-4h-4Z" /></IconFrame>;
    case "Energie & Umwelt":
      return <IconFrame className={className}><path d="M36 8C21 9 11 17 10 29c0 6 4 10 10 10 12-1 18-11 16-31ZM15 34c5-8 10-12 17-17-5 6-8 11-11 20l-6-3Z" /><path d="m26 5-8 16h7l-3 13 12-19h-8V5Z" opacity=".9" /></IconFrame>;
    case "Gesundheit & Fitness":
      return <IconFrame className={className}><path d="M24 41 9 28C1 20 7 8 17 10c3 1 5 3 7 6 2-3 4-5 7-6 10-2 16 10 8 18L24 41Z" /><path d="M9 25h8l3-7 6 14 4-7h9v4h-7l-7 11-5-13-1 2H9v-4Z" fill="white" /></IconFrame>;
    case "Familie & Leben":
      return <IconFrame className={className}><circle cx="24" cy="15" r="7" /><circle cx="12" cy="20" r="5" /><circle cx="36" cy="20" r="5" /><path d="M13 38c0-9 4-14 11-14s11 5 11 14H13ZM4 38c0-7 3-11 8-11 2 0 3 0 4 1-3 3-5 6-5 10H4Zm33 0c0-4-2-7-5-10 1-1 2-1 4-1 5 0 8 4 8 11h-7Z" /></IconFrame>;
    case "Arbeitgeber & Business":
      return <IconFrame className={className}><path d="M18 8h12a4 4 0 0 1 4 4v4h6a4 4 0 0 1 4 4v18H4V20a4 4 0 0 1 4-4h6v-4a4 4 0 0 1 4-4Zm1 8h10v-3H19v3ZM4 25h16v4h8v-4h16v-5H4v5Z" /></IconFrame>;
    case "Immobilien":
      return <IconFrame className={className}><path d="m5 23 19-17 19 17-4 4-3-3v17H12V24l-3 3-4-4Zm13 14h12V26H18v11Z" /></IconFrame>;
    case "Schicht & Zuschläge":
      return <IconFrame className={className}><path d="M31 7c-9 2-14 12-10 21 3 7 11 11 19 8-4 6-11 9-18 7C11 41 5 30 8 19 11 9 21 4 31 7Z" /><path d="M25 14h3v9l6 4-2 3-7-5V14Z" /></IconFrame>;
    case "Handwerker & Renovierung":
      return <IconFrame className={className}><path d="M9 7h9v5l-2 2 8 8-5 5-8-8-2 2H4v-9l5 5 3-3-3-3-5 5V7h5Zm28 11 6 6-5 5-3-3-14 16-7-7 16-14-3-3 5-5 5 5ZM19 37l2 2 14-16-2-2-14 16Z" /></IconFrame>;
    default:
      return <IconFrame className={className}><path d="M10 8h28v32H10V8Zm5 5v8h18v-8H15Zm0 13v4h4v-4h-4Zm7 0v4h4v-4h-4Zm7 0v4h4v-4h-4Zm-14 7v4h4v-4h-4Zm7 0v4h4v-4h-4Zm7 0v4h4v-4h-4Z" /></IconFrame>;
  }
}
