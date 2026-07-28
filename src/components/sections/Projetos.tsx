"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  Landmark,
  Compass,
  Leaf,
  GraduationCap,
  HandHeart,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { home } from "@/content/home";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { useScrollEdges } from "@/components/motion/useScrollEdges";

const { projetos } = home;

const iconMap: Record<string, LucideIcon> = {
  landmark: Landmark,
  compass: Compass,
  leaf: Leaf,
  "graduation-cap": GraduationCap,
  "hand-heart": HandHeart,
};

const colorMap: Record<string, string> = {
  blue: "bg-brand-blue",
  green: "bg-brand-green",
  amber: "bg-brand-amber",
  orange: "bg-brand-orange",
};

// Scrim bottom-weighted (igual aos tiles de Área): topo vibrante, escurece no
// fundo para garantir texto branco legível mesmo sobre o dourado.
const scrim =
  "bg-[linear-gradient(155deg,rgba(20,30,45,0.06)_0%,rgba(20,30,45,0.20)_50%,rgba(20,30,45,0.60)_100%)]";

// Cabem exatamente N cards na largura, sem espreitar o próximo (gap-4 = 1rem):
// 1 no telemóvel, 2 em tablet, 3 em desktop.
const cardBasis =
  "basis-[80%] sm:basis-[calc((100%_-_1rem)/2)] lg:basis-[calc((100%_-_2rem)/3)]";

export function Projetos() {
  const trackRef = useRef<HTMLUListElement>(null);
  const { atStart, atEnd } = useScrollEdges(trackRef);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    // Anda ~um card (primeiro filho) + gap; respeita reduce-motion via CSS.
    const card = track.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : track.clientWidth * 0.85;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="bg-surface py-20 md:py-28">
      <Container>
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionEyebrow>{projetos.eyebrow}</SectionEyebrow>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,4vw,2.25rem)] font-normal leading-tight tracking-tight text-ink text-balance">
              {projetos.title}
            </h2>
            <p className="mt-5 text-base leading-[1.75] text-ink-muted">
              {projetos.text}
            </p>
          </div>

          {/* Setas de navegação — realce em desktop; em touch usa-se o swipe. */}
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={atStart}
              aria-label="Anterior"
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink transition-[color,background-color,border-color,opacity] hover:border-ink/30 hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2",
                atStart && "cursor-default opacity-40 hover:border-border hover:bg-transparent"
              )}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={atEnd}
              aria-label="Seguinte"
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink transition-[color,background-color,border-color,opacity] hover:border-ink/30 hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2",
                atEnd && "cursor-default opacity-40 hover:border-border hover:bg-transparent"
              )}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </Reveal>

        <ul
          ref={trackRef}
          className="mt-7 -mx-4 flex snap-x snap-mandatory scroll-pl-4 gap-3.5 overflow-x-auto px-4 pt-3 pb-14 -mb-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:scroll-pl-0 sm:gap-4 sm:px-0"
        >
          {projetos.preview.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <li
                key={item.slug}
                className={`shrink-0 snap-start ${cardBasis}`}
              >
                <Link
                  href={`/areas#${item.slug}`}
                  className={`group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-[18px] p-5 text-white shadow-[0_10px_30px_-18px_rgba(20,30,45,0.55)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_50px_-20px_rgba(20,30,45,0.7)] focus-visible:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${colorMap[item.color]}`}
                >
                  <span aria-hidden="true" className={`absolute inset-0 ${scrim}`} />
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25 transition-colors duration-300 group-hover:bg-white/25">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="relative mt-auto pt-5">
                    <span className="block font-display text-[1.02rem] font-normal leading-[1.2] tracking-tight">
                      {item.title}
                    </span>
                    <span className="mt-2 block text-[0.82rem] leading-[1.5] text-white/85">
                      {item.blurb}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}

        </ul>

        <div className="mt-8 flex justify-start">
          <Button href={projetos.link.href} variant="primary">
            {projetos.link.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
