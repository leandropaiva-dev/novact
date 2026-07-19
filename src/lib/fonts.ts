import { Inter, Bricolage_Grotesque } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

// Bricolage Grotesque — grotesca moderna, usada nos títulos, display e números.
// Variável (opsz+wght); auto-hospedada por next/font. Substitui a Cleancut nos
// títulos. Referenciada por --font-display em globals.css.
export const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-display-face",
});

// Cleancut (versão web de onlinewebfonts, auto-hospedada). Reservada só para o
// WORDMARK "novact" (Logo + marca-d'água do Footer) — a assinatura da marca.
// NOTA: versão de demonstração/CC-BY — trocar pelo ficheiro licenciado do cliente
// antes de qualquer lançamento público. Referenciada por --font-wordmark.
export const wordmark = localFont({
  src: [
    { path: "../fonts/cleancut-regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/cleancut-regular.woff", weight: "400", style: "normal" },
  ],
  display: "swap",
  variable: "--font-wordmark-face",
});
