"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Landmark,
  Compass,
  Leaf,
  Cpu,
  GraduationCap,
  HandHeart,
  Users,
  Palette,
  Microscope,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { CardContainer, CardItem } from "@/components/ui/3d-card";
import { revealVariants, staggerParent } from "@/components/motion/primitives";

const { areas } = home;

const iconMap: Record<string, LucideIcon> = {
  landmark: Landmark,
  compass: Compass,
  leaf: Leaf,
  cpu: Cpu,
  "graduation-cap": GraduationCap,
  "hand-heart": HandHeart,
  users: Users,
  palette: Palette,
  microscope: Microscope,
  waypoints: Waypoints,
};

const colorMap: Record<string, string> = {
  blue: "bg-brand-blue",
  green: "bg-brand-green",
  amber: "bg-brand-amber",
  orange: "bg-brand-orange",
  "blue-soft": "bg-brand-blue-soft",
};

// Scrim bottom-weighted: topo leve (cor de marca vibrante junto ao ícone),
// escurece só no fundo para garantir texto branco AA — mesmo sobre o dourado.
const scrim =
  "bg-[linear-gradient(155deg,rgba(20,30,45,0.06)_0%,rgba(20,30,45,0.20)_50%,rgba(20,30,45,0.60)_100%)]";

// Áreas em destaque: ocupam 2 colunas no bento de desktop (área-líder + saúde mental).
const featured = new Set(["projetos-cooperacao-financiamento", "saude-mental"]);

export function AreasGrid() {
  const reduced = useReducedMotion();

  // Mobile: carrossel scroll-snap (CSS puro). Tablet: grelha 2 col.
  // Desktop: bento 4 col com 2 tiles largos → 12 células, 3 linhas, sem órfãos.
  const grid = (
    <ul className="mt-10 -mx-4 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
      {areas.cards.map((card) => {
        const Icon = iconMap[card.icon];
        const isFeatured = featured.has(card.slug);
        return (
          <motion.li
            key={card.slug}
            variants={reduced ? undefined : revealVariants}
            data-reveal
            className={`shrink-0 basis-[80%] snap-start sm:basis-auto sm:shrink ${
              isFeatured ? "lg:col-span-2" : ""
            }`}
          >
            <CardContainer
              containerClassName="h-full w-full"
              className="h-full w-full"
            >
              <Link
                href={`/areas#${card.slug}`}
                className={`group relative flex h-full min-h-[190px] w-full flex-col rounded-[18px] p-5 text-white shadow-[0_10px_30px_-18px_rgba(20,30,45,0.55)] transition-[transform,box-shadow] duration-300 ease-out [transform-style:preserve-3d] hover:shadow-[0_30px_50px_-20px_rgba(20,30,45,0.7)] focus-visible:-translate-y-1.5 focus-visible:shadow-[0_30px_50px_-20px_rgba(20,30,45,0.7)] ${
                  isFeatured ? "lg:flex-row lg:items-center lg:gap-7 lg:p-7" : ""
                }`}
              >
                {/* Camada de fundo (cor + scrim), clipada e arredondada.
                    Fica separada para o overflow-hidden não achatar o 3D. */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 overflow-hidden rounded-[18px] ${colorMap[card.color]}`}
                >
                  <span className={`absolute inset-0 ${scrim}`} />
                </span>
                <CardItem
                  as="span"
                  translateZ={60}
                  className={`relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25 duration-300 group-hover:bg-white/25 ${
                    isFeatured ? "lg:h-14 lg:w-14 lg:shrink-0" : ""
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 transition-transform duration-300 ease-out group-hover:scale-[1.18] motion-reduce:transition-none ${
                      isFeatured ? "lg:h-7 lg:w-7" : ""
                    }`}
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </CardItem>
                <CardItem
                  as="span"
                  translateZ={25}
                  className={`relative mt-auto pt-5 ${
                    isFeatured ? "lg:mt-0 lg:pt-0" : ""
                  }`}
                >
                  <span
                    className={`block font-display text-[0.98rem] font-normal leading-[1.22] tracking-tight ${
                      isFeatured ? "lg:text-[1.3rem] lg:leading-[1.15]" : ""
                    }`}
                  >
                    {card.title}
                  </span>
                  <span
                    className={`mt-2 block text-[0.8rem] leading-[1.5] text-white/85 ${
                      isFeatured ? "lg:mt-3 lg:text-[0.9rem] lg:leading-[1.55]" : ""
                    }`}
                  >
                    {card.blurb}
                  </span>
                </CardItem>
              </Link>
            </CardContainer>
          </motion.li>
        );
      })}
    </ul>
  );

  return (
    <section className="bg-surface-muted py-20 md:py-28">
      <Container>
        <div className="max-w-2xl">
          <SectionEyebrow>{areas.eyebrow}</SectionEyebrow>
          <h2 className="mt-4 font-display text-[clamp(1.6rem,4vw,2.25rem)] font-normal leading-tight tracking-tight text-ink text-balance">
            {areas.title}
          </h2>
          <p className="mt-4 text-base leading-[1.7] text-ink-muted">{areas.intro}</p>
        </div>

        {reduced ? (
          grid
        ) : (
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-8% 0px" }}
          >
            {grid}
          </motion.div>
        )}

        <div className="mt-9">
          <ArrowLink href={areas.link.href}>{areas.link.label}</ArrowLink>
        </div>
      </Container>
    </section>
  );
}
