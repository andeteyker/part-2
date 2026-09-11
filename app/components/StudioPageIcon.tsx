import type { PageKind } from "../studio/model";

export function StudioPageIcon({ kind }: { kind: PageKind }) {
  if (kind === "rechner") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M7 7h10M8 11h2m4 0h2M8 15h2m4 0h2M8 18h8"/></svg>;
  if (kind === "tool") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5.5 4 4M12 8l4 4-8 8H4v-4zM15 3l6 6"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l3 3v15H6zM9 11h6M9 15h6M9 7h3"/></svg>;
}
