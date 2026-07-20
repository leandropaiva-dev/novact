import { cn } from "@/lib/utils";

/** Largura máxima + padding horizontal consistentes em todas as secções. */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl px-4 md:px-6 lg:w-[83.333%] lg:px-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
