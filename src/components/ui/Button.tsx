import Link from "next/link";
import { cn } from "@/lib/utils";

export type Variant = "primary" | "outline" | "onGradient" | "onGradientOutline";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-orange text-white shadow-[0_10px_24px_-14px_rgba(242,100,48,0.9)] hover:bg-brand-orange-deep hover:-translate-y-0.5",
  outline:
    "border border-border bg-white text-ink hover:border-ink/30 hover:-translate-y-0.5",
  // Sobre o gradiente do hero (já escurecido pelo overlay): sólido branco.
  onGradient:
    "bg-white text-ink shadow-[0_12px_28px_-16px_rgba(20,30,45,0.7)] hover:-translate-y-0.5",
  onGradientOutline:
    "border border-white/70 text-white hover:bg-white/12 hover:-translate-y-0.5",
};

/** Classes de um botão por variante — partilhado com o MagneticButton. */
export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

type ButtonProps = {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
};

/**
 * Link estilizado. Rota interna → next/link; âncora (#) ou externo → <a>.
 * Não há <button> aqui — todos os CTA da home navegam.
 */
export function Button({ href, variant = "primary", children, className }: ButtonProps) {
  const cls = buttonClass(variant, className);
  const isInternal = href.startsWith("/") && !href.startsWith("//");

  if (isInternal) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}
