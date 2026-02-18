"use client";

import { useEffect, useRef } from "react";
import { trackScrollDepth } from "@/lib/analytics";

const THRESHOLDS = [25, 50, 75, 100];

export function ScrollTracker() {
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const sentinels: HTMLDivElement[] = [];
    const fired = firedRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const pct = Number(entry.target.getAttribute("data-depth"));
          if (pct && !fired.has(pct)) {
            fired.add(pct);
            trackScrollDepth(pct);
          }
        }
      },
      { threshold: 0 }
    );

    for (const pct of THRESHOLDS) {
      const el = document.createElement("div");
      el.setAttribute("data-depth", String(pct));
      el.style.position = "absolute";
      el.style.left = "0";
      el.style.width = "1px";
      el.style.height = "1px";
      el.style.pointerEvents = "none";
      // Place at pct% of the document height
      el.style.top = `${pct}%`;
      document.body.appendChild(el);
      observer.observe(el);
      sentinels.push(el);
    }

    return () => {
      observer.disconnect();
      for (const el of sentinels) el.remove();
    };
  }, []);

  return null;
}
