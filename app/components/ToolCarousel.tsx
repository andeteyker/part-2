"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

export function ToolCarousel({ children, label }: { children: ReactNode; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canBack, setCanBack] = useState(false);
  const [canForward, setCanForward] = useState(false);

  const updateControls = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanBack(track.scrollLeft > 4);
    setCanForward(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateControls();
    const observer = new ResizeObserver(updateControls);
    observer.observe(track);
    track.addEventListener("scroll", updateControls, { passive: true });
    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", updateControls);
    };
  }, [children, updateControls]);

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * Math.max(280, track.clientWidth * 0.82), behavior: "smooth" });
  };

  return (
    <div className="tool-carousel">
      <div className="tool-carousel-controls" aria-label={`${label} durchblättern`}>
        <span>Weitere Rechner</span>
        <button type="button" onClick={() => move(-1)} disabled={!canBack} aria-label={`Vorherige Rechner in ${label}`}>←</button>
        <button type="button" onClick={() => move(1)} disabled={!canForward} aria-label={`Weitere Rechner in ${label}`}>→</button>
      </div>
      <div className="tool-grid tool-carousel-track" ref={trackRef} role="region" aria-label={`Rechner in ${label}`} tabIndex={0}>
        {children}
      </div>
    </div>
  );
}
