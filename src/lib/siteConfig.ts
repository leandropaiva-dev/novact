export const siteConfig = {
  name: "NOVACT",
  legalName:
    "NOVACT — Associação para a Promoção do Desenvolvimento Económico, Sustentabilidade, Inovação e Coesão",
  slogan: "Inovar territórios. Capacitar comunidades. Criar impacto.",
  nif: "PT518924050",
  email: "novactassociacao@gmail.com",
  phone: "+351 917 005 096",
  phoneHref: "tel:+351917005096",
  address: {
    street: "Av. Dr. Alfredo de Sousa, prédio B, Bloco 39",
    postalCode: "5100-066",
    city: "Lamego",
  },
  nav: [
    { label: "Início", href: "/" },
    { label: "Sobre Nós", href: "/sobre" },
    { label: "Áreas de Intervenção", href: "/areas" },
    { label: "Projetos", href: "/projetos" },
    { label: "Contactos", href: "/contactos" },
  ],
  cta: { label: "Fale connosco", href: "/contactos" },
  legalLinks: [
    { label: "Política de Privacidade", href: "/privacidade" },
    { label: "Termos e Condições", href: "/termos" },
    // Placeholder: PDF dos estatutos ainda não entregue pelo cliente
    { label: "Estatutos (PDF)", href: "/docs/estatutos.pdf" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
