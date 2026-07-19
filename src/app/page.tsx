import type { Metadata } from "next";
import { home } from "@/content/home";
import { siteConfig } from "@/lib/siteConfig";
import { Hero } from "@/components/sections/Hero";
import { QuemSomos } from "@/components/sections/QuemSomos";
import { AreasGrid } from "@/components/sections/AreasGrid";
import { SaudeMental } from "@/components/sections/SaudeMental";
import { Projetos } from "@/components/sections/Projetos";
import { Parcerias } from "@/components/sections/Parcerias";
import { Associados } from "@/components/sections/Associados";
import { Contacto } from "@/components/sections/Contacto";

// Domínio ainda por confirmar com o cliente (novact.pt é placeholder).
const SITE_URL = "https://novact.pt";

export const metadata: Metadata = {
  title: { absolute: home.seo.title },
  description: home.seo.description,
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: siteConfig.name,
    title: home.seo.title,
    description: home.seo.description,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: siteConfig.name,
  alternateName: siteConfig.legalName,
  description: home.seo.description,
  url: SITE_URL,
  foundingDate: "2025",
  email: siteConfig.email,
  telephone: siteConfig.phone,
  taxID: siteConfig.nif,
  areaServed: "Norte de Portugal",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    postalCode: siteConfig.address.postalCode,
    addressLocality: siteConfig.address.city,
    addressCountry: "PT",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero />
      <QuemSomos />
      <AreasGrid />
      <SaudeMental />
      <Projetos />
      <Parcerias />
      <Associados />
      <Contacto />
    </>
  );
}
