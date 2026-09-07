"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Bindet einen einzelnen, unkritischen Rechnerwert an den Query-String.
 * Der Server rendert stabile Standardwerte. React synchronisiert anschließend
 * mit der aktuellen URL und schreibt Änderungen ohne Navigation zurück.
 */
export function useUrlState(key: string, defaultValue: string) {
  const subscribe = useCallback((notify: () => void) => {
    window.addEventListener("popstate", notify);
    window.addEventListener("st:url-state", notify);
    return () => {
      window.removeEventListener("popstate", notify);
      window.removeEventListener("st:url-state", notify);
    };
  }, []);
  const getSnapshot = useCallback(
    () => new URL(window.location.href).searchParams.get(key) ?? defaultValue,
    [defaultValue, key],
  );
  const getServerSnapshot = useCallback(() => defaultValue, [defaultValue]);
  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const update = useCallback((nextValue: string) => {
    const url = new URL(window.location.href);
    if (nextValue === defaultValue || nextValue === "") url.searchParams.delete(key);
    else url.searchParams.set(key, nextValue);
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
    window.dispatchEvent(new Event("st:url-state"));
  }, [defaultValue, key]);

  return [value, update] as const;
}
