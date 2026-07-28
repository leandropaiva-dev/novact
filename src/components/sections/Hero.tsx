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
          className="absolute -inset-[28%] -z-20 bg-gradient-brand"
          initial={{ x: "-6%", y: "-3%", scale: 1.08, rotate: -2 }}
          animate={{
            x: ["-6%", "6%", "-3%", "-6%"],
            y: ["-3%", "4%", "-4%", "-3%"],
            scale: [1.08, 1.16, 1.1, 1.08],
            rotate: [-2, 2, -1, -2],
          }}
          transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-gradient-brand" />
      )}
      {/* Overlay de contraste — leve, só o suficiente para o texto do lado
          esquerdo; o resto do gradiente fica claro e vibrante. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(18,48,71,0.24)_0%,rgba(18,48,71,0.06)_44%,transparent_74%)]"
      />
      {/* Motivo de marca — anel branco grosso, um quarto visível no canto superior
          direito (como na Saúde Mental). */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 -z-10 h-[46rem] w-[46rem] -translate-y-[32%] translate-x-[30%] sm:h-[58rem] sm:w-[58rem]"
      >
        <circle cx="50" cy="50" r="41" stroke="#ffffff" strokeWidth="16" opacity="0.16" />
      </svg>

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
