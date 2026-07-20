"use client";

import { motion, useReducedMotion } from "framer-motion";
import { home } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BrandO } from "@/components/layout/BrandO";
import { useIsTouch } from "@/components/motion/Reveal";
import { EASE_OUT_EXPO } from "@/components/motion/primitives";

const { hero } = home;
const words = hero.title.split(" ");
const sloganParts = ["Inovar territórios", "Capacitar comunidades", "Criar impacto"];

export function Hero() {
  const reduced = useReducedMotion();
  const touch = useIsTouch();
  const animate = !reduced;
  const liveGradient = !reduced && !touch;

  return (
    <section className="relative isolate -mt-16 flex min-h-[88vh] items-center overflow-hidden text-white sm:min-h-[92vh] md:-mt-20">
      {/* Camada de gradiente de marca (viva no desktop, estática no resto) */}
      {liveGradient ? (
        <motion.div
          aria-hidden="true"
          className="absolute -inset-[35%] -z-20 bg-gradient-brand"
          initial={{ x: "-8%", y: "-4%", scale: 1.12, rotate: -3 }}
          animate={{
            x: ["-8%", "8%", "-4%", "-8%"],
            y: ["-4%", "5%", "-5%", "-4%"],
            scale: [1.12, 1.22, 1.14, 1.12],
            rotate: [-3, 3, -2, -3],
          }}
          transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-gradient-brand" />
      )}
      {/* Overlay de contraste obrigatório sob texto branco */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-brand-overlay" />
      {/* Anel cortado ambiente (aperture) — a sangrar pela direita, subtil */}
      <BrandO className="pointer-events-none absolute -right-24 -top-16 -z-10 h-[26rem] w-[26rem] opacity-[0.14] sm:-right-16 sm:h-[34rem] sm:w-[34rem]" />

      <div className="mx-auto w-full max-w-7xl px-4 py-24 md:px-6 lg:w-[83.333%] lg:px-0">
        <div className="max-w-3xl">
          <motion.h1
            className="font-display text-[clamp(1.9rem,6vw,3.4rem)] font-normal leading-[1.08] tracking-tight text-balance"
            variants={{ show: { transition: { staggerChildren: 0.035, delayChildren: 0.1 } } }}
            initial={animate ? "hidden" : false}
            animate="show"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block whitespace-pre"
                variants={{
                  hidden: { opacity: 0, y: "0.5em", filter: "blur(6px)" },
                  show: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
                  },
                }}
              >
                {word}
                {i < words.length - 1 ? " " : ""}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-base leading-[1.7] text-white/90 sm:text-lg"
            initial={animate ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.55 }}
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            initial={animate ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.7 }}
          >
            <MagneticButton href={hero.primary.href} variant="onGradient">
              {hero.primary.label}
            </MagneticButton>
            <Button href={hero.secondary.href} variant="onGradientOutline">
              {hero.secondary.label}
            </Button>
          </motion.div>

          {/* Slogan como assinatura gráfica (não título) */}
          <motion.p
            className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-sm lowercase tracking-[0.06em] text-white/80"
            initial={animate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.95 }}
          >
            {sloganParts.map((part, i) => (
              <span key={part} className="inline-flex items-center gap-3">
                {i > 0 && <BrandO className="h-2.5 w-2.5" />}
                {part}
              </span>
            ))}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
