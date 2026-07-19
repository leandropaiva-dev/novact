import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

const { associados } = home;

export function Associados() {
  const href = `/?assunto=${encodeURIComponent(associados.cta.assunto)}#contacto`;

  return (
    <section className="relative bg-brand-blue py-14 text-white md:py-16">
      {/* Fio de gradiente — reafirmação silenciosa da marca */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-brand" />
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <SectionEyebrow tone="onDark">{associados.eyebrow}</SectionEyebrow>
            <h2 className="mt-3 font-display text-[clamp(1.5rem,3.5vw,2rem)] font-normal leading-tight tracking-tight text-balance">
              {associados.title}
            </h2>
            <p className="mt-3 max-w-xl text-base leading-[1.7] text-white/80">
              {associados.text}
            </p>
          </div>
          <div className="shrink-0">
            <Button href={href} variant="onGradient">
              {associados.cta.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
