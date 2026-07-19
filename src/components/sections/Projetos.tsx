import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";

const { projetos } = home;

/** Anel propositadamente incompleto — a abertura larga = trabalho em curso. */
function IncompleteRing() {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" className="h-40 w-40 -rotate-90">
      <circle cx="50" cy="50" r="46" stroke="#e2e8ed" strokeWidth="3" />
      <circle
        cx="50"
        cy="50"
        r="46"
        stroke="url(#novact-grad)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="173 116"
      />
    </svg>
  );
}

export function Projetos() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionEyebrow>{projetos.eyebrow}</SectionEyebrow>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,4vw,2.25rem)] font-normal leading-tight tracking-tight text-ink text-balance">
              {projetos.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-[1.75] text-ink-muted">
              {projetos.text}
            </p>
            <div className="mt-6">
              <ArrowLink href={projetos.link.href}>{projetos.link.label}</ArrowLink>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex justify-center lg:justify-end">
            <div className="relative flex aspect-[4/3] w-full max-w-sm flex-col items-center justify-center gap-6 rounded-[18px] bg-surface-muted ring-1 ring-border">
              <IncompleteRing />
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-ink-muted ring-1 ring-border">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-orange opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-orange" />
                </span>
                Em preparação
              </span>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
