/**
 * Tokens de animação partilhados (design system NOVACT).
 * Easing padrão: ease-out-expo. Só animamos transform e opacity (+ blur pontual
 * no reveal, uma única vez — nunca em loop). Tudo entra uma vez.
 */
import type { Variants, Transition } from "framer-motion";

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const revealTransition: Transition = {
  duration: 0.9,
  ease: EASE_OUT_EXPO,
};

/** Blur-in + subida. `custom` (index) permite escalonar via staggerChildren. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: revealTransition,
  },
};

/** Versão sem blur/mais curta — usada em touch/mobile para poupar GPU. */
export const revealVariantsLite: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
