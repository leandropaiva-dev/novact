import { home } from "@/content/home";
import { images } from "@/content/images";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";
import { PhotoReveal } from "@/components/motion/PhotoReveal";

const { saudeMental } = home;
const img = images.saudeMental;

/** Anel cortado (aperture) que emoldura a foto — a assinatura da marca ampliada. */
function ApertureRing() {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full -rotate-[18deg]"
    >
      <circle
        cx="50"
        cy="50"
        r="47.5"
        stroke="url(#novact-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="248 51"
      />
    </svg>
  );
}

export function SaudeMental() {
  return (
    <section className="relative overflow-hidden py-24 text-white md:py-32">
      {/* Gradiente quente da secção — só laranja → dourado (assinatura de calor) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(120deg,#F77A3E_0%,#F89148_42%,#F4B84D_100%)]"
      />
      {/* Overlay de contraste (opção C) — mantém o texto branco legível do lado esquerdo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(45,18,6,0.42)_0%,rgba(45,18,6,0.14)_46%,transparent_72%)]"
      />
      {/* Brilho dourado subtil à direita, para profundidade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12%] top-1/2 -z-10 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,225,170,0.28),transparent_66%)] blur-2xl"
      />
      {/* Motivo do círculo — anel branco, 25% visível no canto inferior esquerdo */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[26rem] w-[26rem] -translate-x-1/2 translate-y-1/2 sm:h-[34rem] sm:w-[34rem]"
      >
        <circle cx="50" cy="50" r="41" stroke="#fff" strokeWidth="18" opacity="0.22" />
      </svg>
      {/* Anel grande cortado no topo direito */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 -z-10 h-[52rem] w-[52rem] -translate-y-[30%] translate-x-[28%] sm:h-[66rem] sm:w-[66rem]"
      >
        <circle cx="50" cy="50" r="41" stroke="#fff" strokeWidth="18" opacity="0.22" />
      </svg>
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <SectionEyebrow tone="onDark">{saudeMental.eyebrow}</SectionEyebrow>
            <h2 className="mt-4 font-display text-[clamp(1.8rem,4.5vw,2.75rem)] font-normal leading-[1.1] tracking-tight text-balance">
              {saudeMental.title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-[1.8] text-white/80 sm:text-lg">
              {saudeMental.text}
            </p>
            <div className="mt-7">
              <ArrowLink href={saudeMental.link.href} tone="onDark">
                {saudeMental.link.label}
              </ArrowLink>
            </div>
          </Reveal>

          <div className="flex justify-center lg:justify-end">
            <div className="relative aspect-square w-[min(74vw,23rem)]">
              <PhotoReveal
                src={img.src}
                alt={img.alt}
                blurDataURL={img.blurDataURL}
                sizes="(min-width: 1024px) 24rem, 74vw"
                coverColor="#72bef2"
                cols={6}
                rows={6}
                className="absolute inset-[6%] rounded-full shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]"
              />
              <ApertureRing />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
