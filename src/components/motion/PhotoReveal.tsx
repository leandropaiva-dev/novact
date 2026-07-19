"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO } from "./primitives";
import { useIsTouch } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * Reveal "quadriculado": a foto está sempre no DOM; por cima há uma grelha de
 * azulejos da cor do fundo que se desvanecem em varredura diagonal, revelando a
 * imagem azulejo a azulejo. O container (className) define tamanho/forma e tem
 * overflow-hidden. Sem JS o data-reveal desliga a grelha. Respeita
 * prefers-reduced-motion (mostra a foto inteira, sem grelha).
 */
export function PhotoReveal({
  src,
  alt,
  blurDataURL,
  sizes,
  className,
  coverColor = "#ffffff",
  cols = 7,
  rows = 5,
  priority = false,
}: {
  src: string;
  alt: string;
  blurDataURL: string;
  sizes: string;
  className?: string;
  coverColor?: string;
  cols?: number;
  rows?: number;
  priority?: boolean;
}) {
  const reduced = useReducedMotion();
  const touch = useIsTouch();
  // Menos azulejos em touch (mais leve); grelha idêntica no servidor e cliente.
  const nCols = touch ? Math.min(cols, 5) : cols;
  const nRows = touch ? Math.min(rows, 4) : rows;
  const maxUnit = nCols - 1 + (nRows - 1);

  const tiles = [];
  for (let r = 0; r < nRows; r++) {
    for (let c = 0; c < nCols; c++) tiles.push({ r, c });
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        placeholder="blur"
        blurDataURL={blurDataURL}
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />

      {!reduced && (
        <motion.div
          aria-hidden="true"
          data-reveal
          className="pointer-events-none absolute inset-0 grid"
          style={{
            gridTemplateColumns: `repeat(${nCols}, 1fr)`,
            gridTemplateRows: `repeat(${nRows}, 1fr)`,
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-12% 0px" }}
        >
          {tiles.map(({ r, c }) => {
            // Varredura diagonal + jitter determinístico (evita mismatch de hidratação).
            const base = (r + c) / maxUnit; // 0..1
            const jitter = ((r * 7 + c * 13) % 5) * 0.03;
            const delay = base * (touch ? 0.5 : 0.75) + jitter;
            return (
              <motion.div
                key={`${r}-${c}`}
                style={{ backgroundColor: coverColor }}
                variants={{
                  hidden: { opacity: 1, scale: 1 },
                  show: {
                    opacity: 0,
                    scale: 1.03,
                    transition: { duration: 0.55, ease: EASE_OUT_EXPO, delay },
                  },
                }}
              />
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
