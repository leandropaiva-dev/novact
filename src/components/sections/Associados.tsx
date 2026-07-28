import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

const { associados } = home;

export function Associados() {
  const href = `/?assunto=${encodeURIComponent(associados.cta.assunto)}#contacto`;

  return (
    <section className="relative overflow-hidden py-16 text-white md:py-24">
      {/* Gradiente da marca */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-gradient-brand" />
      {/* Overlay de contraste — obrigatório sob texto branco sobre o gradiente */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-brand-overlay" />
      <Container>
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="font-display text-[clamp(2.5rem,8vw,5rem)] font-normal uppercase leading-[0.98] tracking-tight text-balance">
            {associados.title}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-[1.7] text-white/85 md:text-lg">
            {associados.text}
          </p>
          <div className="mt-9">
            <Button href={href} variant="onGradient">
              {associados.cta.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
