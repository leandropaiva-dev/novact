"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { Button, type Variant } from "./Button";
import { useIsTouch } from "@/components/motion/Reveal";

/**
 * CTA principal com efeito magnético: o botão segue levemente o cursor e volta
 * ao lugar com spring. Só no ponteiro fino (desktop) — em touch/reduced-motion
 * degrada para um <Button> normal (a skill manda desligar em mobile). O wrapper
 * trata do movimento; o <Button> interno mantém a navegação via Next Link.
 */
export function MagneticButton({
  href,
  variant = "onGradient",
  children,
  className,
  strength = 0.4,
  radius = 90,
}: {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}) {
  const reduced = useReducedMotion();
  const touch = useIsTouch();
  const ref = useRef<HTMLDivElement>(null);
  const mvx = useMotionValue(0);
  const mvy = useMotionValue(0);
  const x = useSpring(mvx, { stiffness: 260, damping: 18, mass: 0.5 });
  const y = useSpring(mvy, { stiffness: 260, damping: 18, mass: 0.5 });

  if (reduced || touch) {
    return (
      <Button href={href} variant={variant} className={className}>
        {children}
      </Button>
    );
  }

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy);
    const factor = Math.max(0, 1 - dist / (r.width / 2 + radius));
    mvx.set(dx * strength * factor);
    mvy.set(dy * strength * factor);
  }

  function reset() {
    mvx.set(0);
    mvy.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className="inline-flex"
    >
      <Button href={href} variant={variant} className={className}>
        {children}
      </Button>
    </motion.div>
  );
}
