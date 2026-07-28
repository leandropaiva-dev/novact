import type { Metadata } from "next";
import "./globals.css";
import { inter, display, wordmark } from "@/lib/fonts";
import { siteConfig } from "@/lib/siteConfig";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BrandGradientDefs } from "@/components/layout/BrandO";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.slogan}`,
    template: `%s — ${siteConfig.name}`,
  },
  description:
    "A NOVACT é uma associação sem fins lucrativos, sediada em Lamego, dedicada à promoção do desenvolvimento económico, da sustentabilidade, da inovação e da coesão dos territórios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-PT"
      className={cn("h-full", "antialiased", inter.variable, display.variable, wordmark.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;filter:none!important;transform:none!important}`}</style>
        </noscript>
        <BrandGradientDefs />
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
