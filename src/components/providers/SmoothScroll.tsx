"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

/**
 * Smooth scroll global com Lenis (preferência forte do projeto).
 * `anchors` deixa o Lenis tratar cliques em links #ancora suavemente.
 * Respeita prefers-reduced-motion: se o utilizador pede menos movimento,
 * não montamos o Lenis — o scroll nativo (instantâneo) é usado.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: true }}>
      {children}
    </ReactLenis>
  );
}
