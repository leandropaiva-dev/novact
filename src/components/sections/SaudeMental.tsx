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
    <section className="relative overflow-hidden bg-brand-blue py-24 text-white md:py-32">
      {/* Brilho quente concentrado — o calor é a assinatura desta secção */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-1/2 -z-0 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,130,43,0.42),rgba(240,180,74,0.10)_45%,transparent_70%)] blur-2xl"
      />
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
