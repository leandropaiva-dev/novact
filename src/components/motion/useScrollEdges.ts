"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Deteta se um scroller horizontal está no início / fim, para ligar/desligar
 * setas e máscaras de fade nos carrosséis. Atualiza no scroll e no resize.
 */
export function useScrollEdges(ref: RefObject<HTMLElement | null>) {
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setEdges({
        atStart: el.scrollLeft <= 1,
        atEnd: el.scrollLeft >= max - 1,
      });
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [ref]);

  return edges;
}
