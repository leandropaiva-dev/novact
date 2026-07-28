"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useIsTouch } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * Foto que inclina no eixo X (rotateX) e ajusta escala conforme o scroll — como
 * uma tela a "deitar" ao entrar no viewport. A moldura é o gradiente da marca.
 * A imagem está sempre no DOM (não depende de JS). Desliga o movimento com
 * prefers-reduced-motion e em touch/mobile (fica estática, só a moldura).
 */
export function TiltImage({
  src,
  alt,
  blurDataURL,
  sizes,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  blurDataURL: string;
  sizes: string;
  /** Define tamanho/forma (ex.: aspect-[4/3]). O arredondamento é interno. */
  className?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const touch = useIsTouch();
  const still = reduced || touch;

  // Progresso durante toda a travessia: entra pelo fundo (0), fica centrada (0.5)
  // e sai pelo topo (1). Inclina numa direção ao entrar e no sentido oposto ao sair.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Spring amortece o progresso: mesmo com scroll nativo "aos saltos" (roda do
  // rato), o tilt segue como mola — fluido sem precisar de smooth-scroll global.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });
  const rotateX = useTransform(smooth, [0, 0.5, 1], [14, 0, -14]);
  const scale = useTransform(smooth, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <div
      ref={ref}
      style={{ perspective: still ? undefined : "1000px" }}
    >
      <motion.div
        style={still ? undefined : { rotateX, scale, transformOrigin: "center top" }}
        className={cn(
          "rounded-[20px] bg-gradient-brand p-[3px] shadow-xl",
          className,
        )}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[17px]">
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
        </div>
      </motion.div>
    </div>
  );
}
