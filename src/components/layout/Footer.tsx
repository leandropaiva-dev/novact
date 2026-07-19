import Link from "next/link";
import { Fragment } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-brand-blue text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none"
      >
        <span className="block translate-y-[32%] bg-gradient-brand bg-clip-text pl-2 font-wordmark text-[9rem] font-normal lowercase leading-none tracking-[0.04em] text-transparent opacity-[0.08] md:text-[16rem]">
          novact
        </span>
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              {siteConfig.slogan}
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Navegação
            </h2>
            <ul className="mt-3">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Contactos
            </h2>
            <ul className="mt-3 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex min-h-11 items-center gap-2.5 text-white/80 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex min-h-11 items-center gap-2.5 text-white/80 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex gap-2.5 py-2.5 text-white/80">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.postalCode} {siteConfig.address.city}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs leading-relaxed text-white/60">
            © {year} {siteConfig.legalName} · NIF {siteConfig.nif}
          </p>
          <ul className="flex flex-wrap items-center">
            {siteConfig.legalLinks.map((link, i) => (
              <Fragment key={link.href}>
                {i > 0 && (
                  <li aria-hidden="true" className="px-1 text-xs text-white/40">
                    ·
                  </li>
                )}
                <li>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center px-1 text-xs text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
