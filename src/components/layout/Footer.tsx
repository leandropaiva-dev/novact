import Link from "next/link";
import { Fragment } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden text-white">
      {/* Gradiente quente da marca — laranja → dourado (assinatura de calor) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(120deg,#F77A3E_0%,#F89148_42%,#F4B84D_100%)]"
      />
      {/* Overlay de contraste — mantém o texto branco legível em toda a largura */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(45,18,6,0.44)_0%,rgba(45,18,6,0.32)_60%,rgba(45,18,6,0.24)_100%)]"
      />
      {/* Motivo de marca — anéis brancos cortados (como na secção Saúde Mental,
          mas noutras posições). */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 sm:h-[36rem] sm:w-[36rem]"
      >
        <circle cx="50" cy="50" r="41" stroke="#fff" strokeWidth="18" opacity="0.1" />
      </svg>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-[34%] h-[40rem] w-[40rem] translate-x-[42%] sm:h-[52rem] sm:w-[52rem]"
      >
        <circle cx="50" cy="50" r="41" stroke="#fff" strokeWidth="18" opacity="0.1" />
      </svg>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none"
      >
        <span className="block translate-y-[32%] pl-2 font-wordmark text-[9rem] font-normal lowercase leading-none tracking-[0.04em] text-white opacity-[0.1] md:text-[16rem]">
          novact
        </span>
      </div>
      <div className="relative mx-auto w-full max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:w-[83.333%] lg:px-0">
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
