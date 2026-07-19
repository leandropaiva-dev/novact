import { home } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

const { parcerias } = home;
const nodes = [
  { x: 34, y: 40 },
  { x: 168, y: 34 },
  { x: 24, y: 116 },
  { x: 176, y: 122 },
  { x: 96, y: 18 },
  { x: 104, y: 146 },
];

/** Rede de cooperação — encode visual de "redes entre entidades". */
function NetworkGraphic() {
  return (
    <svg viewBox="0 0 200 164" fill="none" aria-hidden="true" className="w-full max-w-xs">
      {nodes.map((n, i) => (
        <line key={i} x1="100" y1="82" x2={n.x} y2={n.y} stroke="#d3dde4" strokeWidth="1.5" />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r="7" fill="#ffffff" stroke="#c3d0d9" strokeWidth="1.5" />
      ))}
      <circle cx="100" cy="82" r="13" fill="url(#novact-grad)" />
    </svg>
  );
}

export function Parcerias() {
  const href = `/?assunto=${encodeURIComponent(parcerias.cta.assunto)}#contacto`;

  return (
    <section className="bg-surface-muted py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
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

          <Reveal delay={0.1} className="flex justify-center lg:justify-end">
            <div className="flex aspect-[4/3] w-full max-w-md items-center justify-center rounded-[18px] bg-white p-8 ring-1 ring-border">
              <NetworkGraphic />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
