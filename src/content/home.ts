/**
 * Copy da página inicial — texto institucional FINAL (NOVACT_Copy_Pagina_Inicial.md).
 * Separado dos componentes para migração trivial a CMS. Não editar o texto sem
 * validação do cliente. `icon` é uma chave resolvida em AreasGrid (string, não
 * componente, para o conteúdo ficar puro/serializável).
 */

export const home = {
  seo: {
    title: "NOVACT — Inovar territórios. Capacitar comunidades. Criar impacto.",
    description:
      "Associação sem fins lucrativos que transforma conhecimento, cooperação e inovação em projetos com impacto nos territórios do Norte de Portugal.",
  },

  hero: {
    title:
      "Transformamos conhecimento, cooperação e inovação em soluções com impacto nos territórios.",
    subtitle:
      "A NOVACT é uma associação sem fins lucrativos que promove o desenvolvimento sustentável, a coesão territorial, a capacitação das comunidades e a inovação social, económica, ambiental e digital. Desenvolvemos também respostas de proximidade nas áreas da saúde mental, do bem-estar psicológico e da intervenção comunitária.",
    primary: { label: "Conheça as nossas áreas", href: "/areas" },
    secondary: { label: "Fale connosco", href: "#contacto" },
  },

  quemSomos: {
    eyebrow: "quem somos",
    title: "Uma associação próxima das pessoas e dos territórios",
    text: "Criada em 2025, com sede em Lamego, a NOVACT reúne profissionais com percursos ligados ao associativismo empresarial, às autarquias, à consultoria e formação, à gestão financeira e à psicologia. Trabalhamos sobretudo na região Norte de Portugal, com especial atenção aos territórios rurais, periféricos e de baixa densidade — e com capacidade de intervenção a nível nacional e internacional.",
    link: { label: "Sobre nós", href: "/sobre" },
  },

  areas: {
    eyebrow: "o que fazemos",
    title: "O que fazemos",
    intro:
      "Atuamos de forma integrada em dez áreas complementares — do diagnóstico à execução e à avaliação de resultados.",
    link: { label: "Ver todas as áreas", href: "/areas" },
    cards: [
      {
        slug: "projetos-cooperacao-financiamento",
        icon: "landmark",
        color: "blue",
        title: "Desenvolvimento de Projetos, Cooperação Europeia e Financiamento",
        blurb:
          "Concebemos, gerimos e avaliamos projetos apoiados por programas nacionais, europeus e internacionais, e ajudamos entidades a transformar ideias em candidaturas viáveis.",
      },
      {
        slug: "desenvolvimento-territorial",
        icon: "compass",
        color: "green",
        title: "Desenvolvimento Territorial e Inovação Social",
        blurb:
          "Promovemos o desenvolvimento integrado dos territórios através de diagnósticos, estratégias locais e projetos de inovação social, sobretudo em zonas rurais e de baixa densidade.",
      },
      {
        slug: "sustentabilidade-ambiente-energia",
        icon: "leaf",
        color: "amber",
        title: "Desenvolvimento Sustentável, Ação Ambiental e Transição Energética",
        blurb:
          "Apoiamos a ação climática, a economia circular e a criação de comunidades de energia renovável, ligando a transição energética à inclusão social.",
      },
      {
        slug: "inovacao-digital-empreendedorismo",
        icon: "cpu",
        color: "blue",
        title: "Inovação, Transformação Digital e Empreendedorismo",
        blurb:
          "Apoiamos empreendedores, PME e organizações na inovação, na qualificação digital e na adoção responsável de soluções tecnológicas.",
      },
      {
        slug: "formacao-capacitacao",
        icon: "graduation-cap",
        color: "amber",
        title: "Formação, Capacitação e Desenvolvimento Organizacional",
        blurb:
          "Desenhamos e executamos programas de formação, mentoria e desenvolvimento organizacional para profissionais, organizações e comunidades.",
      },
      {
        slug: "saude-mental",
        icon: "hand-heart",
        color: "orange",
        title: "Saúde Mental, Bem-Estar Psicológico e Intervenção Comunitária",
        blurb:
          "Criamos respostas preventivas e de proximidade dirigidas a crianças e jovens, pessoas idosas, cuidadores informais, famílias e instituições locais.",
      },
      {
        slug: "inclusao-participacao",
        icon: "users",
        color: "green",
        title: "Inclusão Social, Participação Cívica e Envolvimento Comunitário",
        blurb:
          "Promovemos a inclusão, a cidadania ativa e a participação das comunidades nas decisões que afetam os seus territórios.",
      },
      {
        slug: "cultura-criatividade",
        icon: "palette",
        color: "amber",
        title: "Desenvolvimento Cultural e Criativo",
        blurb:
          "Apoiamos a participação cultural, a valorização do património e as indústrias criativas como instrumentos de identidade e desenvolvimento local.",
      },
      {
        slug: "investigacao-conhecimento",
        icon: "microscope",
        color: "blue",
        title: "Investigação, Estudos e Produção de Conhecimento",
        blurb:
          "Realizamos investigação aplicada, diagnósticos territoriais e estudos que apoiam a decisão pública e comunitária.",
      },
      {
        slug: "cooperacao-governacao",
        icon: "waypoints",
        color: "blue-soft",
        title: "Cooperação Institucional e Governação",
        blurb:
          "Construímos parcerias e redes de cooperação entre entidades públicas, privadas, sociais e académicas, a nível nacional e internacional.",
      },
    ],
  },

  saudeMental: {
    eyebrow: "saúde mental de proximidade",
    title: "Saúde mental de proximidade",
    text: "Nos territórios rurais e de baixa densidade, o acesso a respostas preventivas de saúde mental continua limitado. A NOVACT desenvolve programas de literacia emocional para crianças e jovens, sessões de estimulação cognitiva para pessoas idosas, grupos de apoio a cuidadores informais e ações de capacitação para profissionais e instituições locais — respostas regulares, acessíveis e próximas das comunidades.",
    link: { label: "Saber mais", href: "/areas#saude-mental" },
  },

  projetos: {
    eyebrow: "projetos",
    title: "Projetos em preparação",
    text: "Estamos a desenvolver as primeiras candidaturas e parcerias, em cooperação com entidades locais, nacionais e europeias. Acompanhe aqui os projetos da NOVACT à medida que forem aprovados e iniciados.",
    link: { label: "Ver áreas de projeto", href: "/areas" },
  },

  parcerias: {
    eyebrow: "parcerias",
    title: "Trabalhamos em parceria",
    text: "Municípios, freguesias, associações, empresas, escolas, universidades, IPSS, instituições de saúde e organizações internacionais: se procura um parceiro para desenvolver projetos com impacto no seu território, fale connosco. Apoiamos todo o ciclo — da identificação de oportunidades de financiamento à execução e avaliação de resultados.",
    cta: { label: "Propor uma parceria", assunto: "Proposta de parceria" },
  },

  associados: {
    eyebrow: "associados",
    title: "Junte-se à NOVACT",
    text: "Quer participar na construção de territórios mais coesos, sustentáveis e inclusivos? Torne-se associado da NOVACT.",
    cta: { label: "Quero ser associado", assunto: "Quero ser associado" },
  },

  contacto: {
    eyebrow: "contacto",
    title: "Fale connosco",
    text: "Tem uma ideia, um desafio ou uma proposta de cooperação? Escreva-nos.",
    consent:
      "Li e aceito a Política de Privacidade. Os dados recolhidos destinam-se exclusivamente a responder ao seu contacto.",
    consentLink: { label: "Política de Privacidade", href: "/privacidade" },
    assuntos: [
      "Pedido de informação",
      "Proposta de parceria",
      "Quero ser associado",
      "Imprensa",
      "Outro",
    ],
  },
} as const;
