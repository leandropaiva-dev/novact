import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="NOVACT — página inicial"
      className="inline-flex min-h-11 items-center"
    >
      <span
        className={cn(
          "font-wordmark text-2xl font-normal lowercase tracking-[0.08em]",
          dark ? "text-white" : "text-ink"
        )}
      >
        novact
      </span>
    </Link>
  );
}
