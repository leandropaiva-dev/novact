"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import { BrandO } from "./BrandO";
import { Logo } from "./Logo";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white transition-shadow duration-300 motion-reduce:transition-none",
        solid ? "shadow-[0_12px_32px_-20px_rgba(44,58,69,0.35)]" : "shadow-none"
      )}
    >
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:h-20 md:px-6 lg:w-[83.333%] lg:px-0">
        <Logo />

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium transition-colors",
                      active ? "text-ink" : "text-ink hover:text-brand-orange"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href={siteConfig.cta.href}
          className="hidden h-11 items-center rounded-lg bg-brand-orange px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-deep lg:inline-flex"
        >
          {siteConfig.cta.label}
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink lg:hidden"
        >
          {open ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>

        <div
          id="menu-mobile"
          inert={!open}
          className={cn(
            "absolute inset-x-0 top-full bg-white shadow-[0_24px_48px_-24px_rgba(44,58,69,0.4)] lg:hidden",
            "transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none",
            open
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          )}
        >
          <nav aria-label="Navegação móvel" className="mx-auto max-w-7xl px-4 pb-4 pt-2">
            <ul>
              {siteConfig.nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center gap-2.5 rounded-lg px-3 text-lg font-medium text-ink"
                    >
                      {active && <BrandO className="h-2.5 w-2.5" />}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href={siteConfig.cta.href}
              onClick={() => setOpen(false)}
              className="mt-3 flex h-12 items-center justify-center rounded-lg bg-brand-orange text-base font-semibold text-white"
            >
              {siteConfig.cta.label}
            </Link>
          </nav>
          <div aria-hidden="true" className="h-px bg-gradient-brand opacity-80" />
        </div>

      </div>

      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-brand opacity-80",
          "transition-transform duration-500 ease-out motion-reduce:transition-none",
          scrolled && !open ? "scale-x-100" : "scale-x-0"
        )}
      />
    </header>
  );
}
