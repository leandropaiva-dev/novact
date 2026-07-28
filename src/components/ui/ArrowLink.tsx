import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonClass } from "./Button";
import { cn } from "@/lib/utils";

type Tone = "default" | "onDark";

/**
 * Ação secundária: botão outline/ghost com seta que avança no hover/focus.
 * Reaproveita as variantes do Button (outline em fundo claro, onGradientOutline
 * sobre o gradiente). Rota interna → next/link; âncora/externo → <a>.
 */
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
    "group",
    buttonClass(tone === "onDark" ? "onGradient" : "primary"),
    className,
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
