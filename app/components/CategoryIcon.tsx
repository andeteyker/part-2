type CategoryIconProps = {
  category: string;
  className?: string;
};

function IconFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;
}

export function CategoryIcon({ category, className }: CategoryIconProps) {
  switch (category) {
    case "Geld & Beruf":
      return <IconFrame className={className}><rect x="3" y="6" width="18" height="13" rx="3" /><path d="M16 10h5v5h-5a2.5 2.5 0 0 1 0-5Z" /><path d="M7 6V4h9v2" /></IconFrame>;
    case "Schule, Text & SEO":
      return <IconFrame className={className}><path d="M5 3h10l4 4v14H5Z" /><path d="M15 3v5h4M8 12h7M8 16h5" /><circle cx="17.5" cy="16.5" r="2.5" /><path d="m19.3 18.3 1.7 1.7" /></IconFrame>;
    case "Wortspiele & Rätsel":
      return <IconFrame className={className}><rect x="3" y="3" width="8" height="8" rx="2" /><rect x="13" y="3" width="8" height="8" rx="2" /><rect x="3" y="13" width="8" height="8" rx="2" /><path d="M15 18h4M17 16v4" /></IconFrame>;
    case "iPhone & Bilder":
      return <IconFrame className={className}><rect x="4" y="2" width="16" height="20" rx="3" /><circle cx="12" cy="7" r="2" /><path d="m7 17 3-3 2 2 2.5-3 2.5 4" /></IconFrame>;
    case "Internet & Sicherheit":
      return <IconFrame className={className}><path d="M12 3 20 6v5c0 5.2-3.4 8.2-8 10-4.6-1.8-8-4.8-8-10V6Z" /><path d="M8 12h8M12 8a7 7 0 0 1 0 8M12 8a7 7 0 0 0 0 8" /></IconFrame>;
    case "Zeit & Planung":
      return <IconFrame className={className}><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18" /><path d="M12 13v4l3 1" /></IconFrame>;
    case "Finanzen & Steuern":
      return <IconFrame className={className}><rect x="3" y="3" width="12" height="18" rx="2" /><path d="M6 7h6M6 11h2M11 11h1M6 15h2M11 15h1" /><circle cx="18" cy="15" r="3" /><path d="M18 13.5v3M16.8 14.2h2.4M16.8 15.8h2.4" /></IconFrame>;
    case "Energie & Umwelt":
      return <IconFrame className={className}><path d="m13 2-7 11h6l-1 9 7-12h-6Z" /><path d="M18 4c2 .5 3 1.7 3 3.5-2.1.2-3.4-.7-4-2" /></IconFrame>;
    case "Gesundheit & Fitness":
      return <IconFrame className={className}><path d="M20.8 5.8c-2.2-2.3-5.8-1.6-7.3.8L12 8.7l-1.5-2.1C9 4.2 5.4 3.5 3.2 5.8.8 8.3 2 12 4.2 14.2L12 21l7.8-6.8C22 12 23.2 8.3 20.8 5.8Z" /><path d="M5.5 12h3l1.3-2.5 2.1 5 1.5-2.5h5" /></IconFrame>;
    case "Familie & Leben":
      return <IconFrame className={className}><circle cx="8" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M2.5 20c.5-4 2.3-6 5.5-6s5 2 5.5 6M13.5 15c1-.8 2.1-1.2 3.5-1.2 2.8 0 4.2 1.8 4.5 5.2" /></IconFrame>;
    case "Arbeitgeber & Business":
      return <IconFrame className={className}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V4h8v3M3 12h18M9 12v2h6v-2" /></IconFrame>;
    case "Immobilien":
      return <IconFrame className={className}><path d="m3 11 9-8 9 8" /><path d="M5 10v11h14V10M9 21v-7h6v7" /></IconFrame>;
    case "Schicht & Zuschläge":
      return <IconFrame className={className}><path d="M15.5 3.5A8.5 8.5 0 1 0 20.5 16 7.5 7.5 0 0 1 15.5 3.5Z" /><path d="M12 8v4l2.5 1.5" /></IconFrame>;
    case "Handwerker & Renovierung":
      return <IconFrame className={className}><path d="m4 20 7.5-7.5M14 4l6 6M13 5l6 6" /><path d="m3 21 3.5-1 12-12-2.5-2.5-12 12Z" /><path d="M13.5 14.5 19 20" /></IconFrame>;
    default:
      return <IconFrame className={className}><circle cx="12" cy="12" r="8" /><path d="M8 12h8M12 8v8" /></IconFrame>;
  }
}
