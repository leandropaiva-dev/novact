import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "default" | "onDark";

/** Ligação de texto com seta que avança no hover/focus. Rota interna ou âncora. */
export function ArrowLink({
  href,
  children,
  tone = "default",
  className,
}: {
  href: string;
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const cls = cn(
    "group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold transition-colors",
    tone === "onDark" ? "text-white hover:text-white" : "text-brand-orange hover:text-brand-orange-deep",
    className
  );
  const inner = (
    <>
      {children}
      <ArrowRight
        className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
        aria-hidden="true"
      />
    </>
  );
  const isInternal = href.startsWith("/") && !href.startsWith("//");
  return isInternal ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {inner}
    </a>
  );
}
