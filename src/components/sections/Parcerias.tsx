import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { PartnersDiagram } from "@/components/sections/PartnersDiagram";

const { parcerias } = home;

export function Parcerias() {
  const href = `/?assunto=${encodeURIComponent(parcerias.cta.assunto)}#contacto`;

  return (
    <section className="flex min-h-[88vh] items-center bg-surface-muted py-8 sm:min-h-[92vh] md:py-10">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="lg:order-1">
            <SectionEyebrow>{parcerias.eyebrow}</SectionEyebrow>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,4vw,2.25rem)] font-normal leading-tight tracking-tight text-ink text-balance">
              {parcerias.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-[1.75] text-ink-muted">
              {parcerias.text}
            </p>
            <div className="mt-7">
              <Button href={href} variant="primary">
                {parcerias.cta.label}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="w-full lg:order-2">
            <PartnersDiagram />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
