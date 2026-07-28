import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ArrowLink } from "@/components/ui/ArrowLink";

/**
 * Placeholder institucional para páginas ainda por construir. Navbar e footer
 * vêm do layout; aqui fica só o nome da página centrado e um aviso discreto.
 */
export function UnderConstruction({ title }: { title: string }) {
  return (
    <section className="flex min-h-[72vh] items-center bg-surface py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionEyebrow className="justify-center">em breve</SectionEyebrow>
          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] font-normal leading-tight tracking-tight text-ink text-balance">
            {title}
          </h1>
          <p className="mt-4 text-base leading-[1.7] text-ink-muted">
            Esta página está em desenvolvimento. Estamos a prepará-la — volte em breve.
          </p>
          <div className="mt-8 flex justify-center">
            <ArrowLink href="/">Voltar ao início</ArrowLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
