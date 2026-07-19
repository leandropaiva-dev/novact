"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { revealVariants, revealVariantsLite, staggerParent } from "./primitives";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Atraso extra (s) antes de animar. */
  delay?: number;
  as?: "div" | "section" | "li" | "ul" | "span";
};

/**
 * Blur-in on scroll, uma única vez. Respeita prefers-reduced-motion (aparição
 * instantânea) e simplifica em touch (sem blur). O conteúdo está sempre no DOM;
 * o <noscript> no layout garante visibilidade se o JS não correr.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const touch = useIsTouch();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return (
      <Tag className={className} data-reveal>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      data-reveal
      variants={touch ? revealVariantsLite : revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Container que escalona filhos <RevealItem/>. Útil para grelhas e listas.
 */
export function RevealGroup({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul";
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return (
      <Tag className={className} data-reveal>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const reduced = useReducedMotion();
  const touch = useIsTouch();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as;
    return (
      <Tag className={className} data-reveal>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      data-reveal
      variants={touch ? revealVariantsLite : revealVariants}
    >
      {children}
    </MotionTag>
  );
}

/** Deteta ausência de hover (touch) para simplificar animações. */
export function useIsTouch() {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const update = () => setTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return touch;
}
