"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { frame, cancelFrame } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Smooth scroll global com Lenis (preferência forte do projeto), sincronizado
 * com o frameloop do Framer Motion: em vez de dois requestAnimationFrame
 * separados (Lenis + Framer), o Lenis é conduzido pelo `frame` do Framer, para
 * o scroll e as animações ligadas ao scroll (ex.: o tilt) andarem no mesmo
 * compasso — sem gaguejo.
 *
 * Respeita prefers-reduced-motion: se o utilizador pede menos movimento, não
 * montamos o Lenis — o scroll nativo (instantâneo) é usado.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false);
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced) return;
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }
    frame.update(update, true);
    return () => cancelFrame(update);
  }, [reduced]);

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, lerp: 0.1, anchors: true }}
    >
      {children}
    </ReactLenis>
  );
}
