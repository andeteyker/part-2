"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Bindet einen einzelnen, unkritischen Rechnerwert an den Query-String.
 * Der Server rendert stabile Standardwerte. React synchronisiert anschließend
 * mit der aktuellen URL und schreibt Änderungen ohne Navigation zurück.
 */
export function useUrlState(key: string, defaultValue: string) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const syncFromUrl = () => setValue(new URL(window.location.href).searchParams.get(key) ?? defaultValue);
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    window.addEventListener("st:url-state", syncFromUrl);
    return () => {
      window.removeEventListener("popstate", syncFromUrl);
      window.removeEventListener("st:url-state", syncFromUrl);
    };
  }, [defaultValue, key]);

  const update = useCallback((nextValue: string) => {
    setValue(nextValue);
    const url = new URL(window.location.href);
    if (nextValue === defaultValue || nextValue === "") url.searchParams.delete(key);
    else url.searchParams.set(key, nextValue);
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
    window.dispatchEvent(new Event("st:url-state"));
  }, [defaultValue, key]);

  return [value, update] as const;
}
