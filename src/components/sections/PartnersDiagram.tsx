"use client";

import { useState } from "react";
import { useReducedMotion, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsTouch } from "@/components/motion/Reveal";

// Cada entidade tem o seu próprio raio (r) — órbitas a distâncias diferentes,
// para não ficar com cara de roda gigante. r em unidades do viewBox / % do container.
const NODES = [
  { label: "Municípios", color: "#f77a3e", r: 34 },
  { label: "Freguesias", color: "#f4b84d", r: 27 },
  { label: "Associações", color: "#66c593", r: 38 },
  { label: "Empresas", color: "#71bdf1", r: 30 },
  { label: "Escolas", color: "#f77a3e", r: 36 },
  { label: "Universidades", color: "#f4b84d", r: 25 },
  { label: "IPSS", color: "#66c593", r: 33 },
  { label: "Instituições de saúde", color: "#71bdf1", r: 29 },
  { label: "Org. internacionais", color: "#f77a3e", r: 37 },
];

const BAND = 20; // comprimento do feixe de luz

/** Posição de um nó (topo = primeiro), a distância própria, em coordenadas 0–100. */
function nodePos(i: number) {
  const angle = ((-90 + i * (360 / NODES.length)) * Math.PI) / 180;
  const r = NODES[i].r;
  return { x: 50 + r * Math.cos(angle), y: 50 + r * Math.sin(angle), r };
}

/**
 * Diagrama "roda gigante": a NOVACT fixa no centro; as entidades parceiras dão a
 * volta à sua volta (translação), ligadas por feixes de luz que emanam do centro.
 * Como as cabines de uma roda gigante, cada chip contra-roda para NUNCA girar no
 * próprio eixo — o texto fica sempre reto. Passar o rato pausa a roda e acende o
 * feixe da entidade sob o cursor. Movimento desliga em reduced-motion e touch. Só
 * transform/opacity.
 */
export function PartnersDiagram() {
  const reduced = useReducedMotion();
  const touch = useIsTouch();
  const animate = !reduced && !touch;

  const [active, setActive] = useState<number | null>(null);
  const dim = active !== null;

  // A roda gira +360°; cada chip gira −360° (contra-rotação) → texto sempre reto.
  // Classes literais (o Tailwind não gera arbitrárias construídas dinamicamente).
  const spin = animate
    ? "animate-[orbit-spin_50s_linear_infinite] group-hover:[animation-play-state:paused]"
    : "";
  const counterSpin = animate
    ? "animate-[orbit-spin-rev_50s_linear_infinite] group-hover:[animation-play-state:paused]"
    : "";

  return (
    <div className="group relative mx-auto aspect-square w-full max-w-[32rem] lg:ml-auto lg:mr-0 lg:max-w-[40rem]">
      {/* A roda que gira: anel + feixes + chips (translação em conjunto) */}
      <div className={cn("absolute inset-0", spin)}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        >
          {NODES.map((node, i) => {
            const { x, y, r } = nodePos(i);
            const isActive = active === i;
            // Direção unitária do centro → nó (o fluxo emana da NOVACT para fora).
            const ox = (x - 50) / r;
            const oy = (y - 50) / r;
            return (
              <g
                key={node.label}
                className="transition-opacity duration-300"
                style={{ opacity: dim && !isActive ? 0.18 : 1 }}
              >
                {/* Linha-base */}
                <line
                  x1="50"
                  y1="50"
                  x2={x}
                  y2={y}
                  stroke={isActive ? node.color : "#e4ebf0"}
                  strokeWidth={isActive ? 0.9 : 0.5}
                  className="transition-[stroke] duration-300"
                />
                {/* Feixe de luz a emanar da NOVACT para cada entidade */}
                {animate && (
                  <>
                    <line
                      x1="50"
                      y1="50"
                      x2={x}
                      y2={y}
                      stroke={`url(#beam-${i})`}
                      strokeWidth={isActive ? 1.7 : 1.1}
                      strokeLinecap="round"
                    />
                    <motion.linearGradient
                      id={`beam-${i}`}
                      gradientUnits="userSpaceOnUse"
                      initial={{ x1: 50 - BAND * ox, y1: 50 - BAND * oy, x2: 50, y2: 50 }}
                      animate={{
                        x1: [50 - BAND * ox, x - BAND * ox],
                        y1: [50 - BAND * oy, y - BAND * oy],
                        x2: [50, x],
                        y2: [50, y],
                      }}
                      transition={{
                        duration: 2.6,
                        ease: "linear" as const,
                        repeat: Infinity,
                        delay: i * 0.3,
                        repeatDelay: 0.4,
                      }}
                    >
                      <stop offset="0" stopColor={node.color} stopOpacity="0" />
                      <stop offset="0.5" stopColor={node.color} stopOpacity="0.95" />
                      <stop offset="1" stopColor={node.color} stopOpacity="0" />
                    </motion.linearGradient>
                  </>
                )}
              </g>
            );
          })}
        </svg>

        {/* Chips das entidades — contra-rodam para ficarem sempre direitos */}
        {NODES.map((node, i) => {
          const { x, y } = nodePos(i);
          const isActive = active === i;
          return (
            <div
              key={node.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border bg-white px-2.5 py-1.5 transition-[opacity,box-shadow,border-color] duration-300",
                  counterSpin,
                  isActive
                    ? "border-brand-orange/50 shadow-[0_8px_22px_-6px_rgba(247,122,62,0.5)]"
                    : "border-border shadow-[0_4px_12px_-6px_rgba(18,48,71,0.35)]",
                  dim && !isActive && "opacity-40"
                )}
              >
                <span
                  aria-hidden="true"
                  className="size-1.5 shrink-0 rounded-full"
                  style={{ background: node.color }}
                />
                <span className="whitespace-nowrap text-[0.72rem] font-medium leading-none text-ink">
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Nó central — novact (wordmark, Cleancut, fixo no centro) */}
      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div className="relative grid size-[7rem] place-items-center overflow-hidden rounded-full shadow-[0_16px_36px_-12px_rgba(18,48,71,0.55)] ring-[6px] ring-[#f4f7f9]">
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-brand" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-brand-overlay" />
          <span className="relative font-wordmark text-[1.6rem] lowercase leading-none tracking-[0.02em] text-white">
            novact
          </span>
        </div>
      </div>
    </div>
  );
}
