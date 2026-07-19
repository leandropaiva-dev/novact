import { home } from "@/content/home";
import { images } from "@/content/images";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";
import { PhotoReveal } from "@/components/motion/PhotoReveal";

const { quemSomos } = home;
const img = images.quemSomos;

export function QuemSomos() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionEyebrow>{quemSomos.eyebrow}</SectionEyebrow>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,4vw,2.25rem)] font-normal leading-tight tracking-tight text-ink text-balance">
              {quemSomos.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-[1.75] text-ink-muted">
              {quemSomos.text}
            </p>
            <div className="mt-6">
              <ArrowLink href={quemSomos.link.href}>{quemSomos.link.label}</ArrowLink>
            </div>
          </Reveal>

          <PhotoReveal
            src={img.src}
            alt={img.alt}
            blurDataURL={img.blurDataURL}
            sizes="(min-width: 1024px) 40vw, 100vw"
            coverColor="#ffffff"
            cols={7}
            rows={5}
            className="aspect-[4/3] rounded-[18px] ring-1 ring-border"
          />
        </div>
      </Container>
    </section>
  );
}
