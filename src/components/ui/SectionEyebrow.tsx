import { cn } from "@/lib/utils";
import { BrandO } from "@/components/layout/BrandO";

type Tone = "default" | "onDark";

/**
 * Marcador de ritmo: o anel cortado da marca (10px) + rótulo em Cleancut
 * lowercase, tracked. Um por secção — costura a página com discrição.
 */
export function SectionEyebrow({
  children,
  tone = "default",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 font-display text-[0.8rem] font-normal lowercase tracking-[0.14em]",
        tone === "onDark" ? "text-white/70" : "text-ink-muted",
        className
      )}
    >
      <BrandO className="h-2.5 w-2.5 shrink-0" />
      {children}
    </p>
  );
}
