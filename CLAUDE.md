# CLAUDE.md — Projeto NOVACT

Instruções permanentes para o Claude Code neste repositório. Lê isto antes de qualquer tarefa.

## O que é

Website institucional da **NOVACT** — Associação para a Promoção do Desenvolvimento Económico, Sustentabilidade, Inovação e Coesão. Associação sem fins lucrativos, criada em 2025, sede em Lamego (Norte de Portugal). NIF PT518924050.

Objetivo do site: credibilidade institucional e captação de parceiros e associados. Público: autarquias, IPSS, escolas, universidades, coordenadores de consórcios europeus, potenciais associados. Registo: institucional mas moderno e acessível — **nunca** "startup SaaS" nem "agência criativa exagerada".

Entrega: freela via Creative Line (Pedro). Calibra o esforço em conformidade — código limpo e enxuto, sem over-engineering.

## Stack (fixa — não trocar sem pedir)

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Framer Motion** (animações)
- **Lenis** (smooth scroll — SEMPRE Lenis, preferência forte)
- **Resend** (envio do formulário de contacto)
- **Plausible** (analytics privacy-first, sem cookies pessoais)
- **Vercel** (deploy)
- Conteúdo **estático** em ficheiros `.ts` (sem CMS por agora)

## Mobile-first (PRINCÍPIO CENTRAL — não negociável)

Este site é **mobile-first e otimizado para mobile**. Parte do ecrã pequeno e expande para cima, nunca o contrário.

- Escreve os estilos base para mobile; usa os breakpoints do Tailwind (`sm:`, `md:`, `lg:`) só para ADICIONAR a partir daí. Nunca "desktop com correções mobile".
- Testa mentalmente cada componente primeiro a ~360px de largura.
- Alvos de toque ≥44px, sem hover como única forma de aceder a algo (touch não tem hover).
- Tipografia e espaçamento fluidos; nada de larguras fixas que estourem em ecrãs pequenos.
- Menu mobile (hambúrguer) desde o início, não como afterthought.
- **Animações em mobile: simplificar.** Parallax, botão magnético, gradiente vivo e scroll-linked pesado → desligar ou reduzir a fade simples em telas pequenas / touch. Detetar via `matchMedia('(hover: none)')` ou breakpoint, além do `prefers-reduced-motion`. Reveals leves e hover→tap podem ficar.
- **Performance (importante mas equilibrada):** `next/image` sempre (WebP/AVIF, `sizes` corretos, lazy, blur placeholder); JS mínimo no carregamento inicial; carregar Framer Motion só onde é usado; fontes com `display: swap` e subsetting.
- **Gama baixa — fundamentos sem obsessão:** o público inclui territórios rurais com rede fraca e telemóveis modestos. Garantir os básicos que protegem gama baixa (imagens leves, animações que desligam, JS reduzido) e testar com throttling 3G + CPU 4x antes de entregar. Não fazer otimização extrema (não vale o esforço para este projeto).

## Regras de trabalho

- Ao editar código existente, altera SÓ o que for pedido. Se notares um bug ou risco fora do âmbito, aponta mas não alteres sem confirmar.
- Quando alterares código, pergunta se quero aprender sobre aquilo (estou a consolidar fundamentos de JS puro).
- Responde em português (PT-PT no conteúdo do site; PT-BR na conversa está ok).
- Conteúdo do site em ficheiros `content/*.ts`, separado dos componentes, para migração futura a CMS ser trivial.
- Nada crítico depende de JS para aparecer (SEO e robustez): o conteúdo tem de estar no HTML mesmo sem animação.
- Só animar `transform` e `opacity` (aceleradas por GPU). Nunca `width`/`top`/`filter` em loop.
- `prefers-reduced-motion` respeitado em TODAS as animações (usar `useReducedMotion` do Framer). Movimento grande desliga; reveals viram aparições instantâneas.

## Arquitetura

```
app/
  layout.tsx           fontes, Lenis, header/footer, metadata base
  page.tsx             home
  sobre/page.tsx
  equipa/page.tsx      página autónoma
  areas/page.tsx       página única + âncoras (#saude-mental)
  projetos/page.tsx
  contactos/page.tsx
  noticias/            índice + [slug] (construir; desativar no lançamento)
  parceiros/page.tsx   (construir; desativar no lançamento)
  privacidade/page.tsx
  termos/page.tsx
  api/contact/route.ts envio via Resend
content/               toda a copy em .ts (home, areas, equipa, noticias, site)
components/ui/         Button, Card, Section, GradientHero, AreaTile...
components/sections/   HeroSection, AreasGrid, TeamSection...
lib/
  siteConfig.ts        nome, contactos, morada, NIF, links (fonte única)
  fonts.ts             Cleancut (local) + Inter (next/font)
```

## SEO (desde o início)

- `generateMetadata` por página; Open Graph tags para partilha.
- `sitemap.ts` + `robots.ts`.
- JSON-LD structured data com schema `Organization` / `NGO`.
- `next/image` para todas as imagens (WebP/AVIF, lazy, blur placeholder).

## Formulário de contacto

- Validação com **Zod**.
- Anti-spam: **honeypot** + **rate-limit** no route handler.
- Envia para 3 destinatários: novactassociacao@gmail.com, mjoaotcarneiro@gmail.com, sofia.cardoso@cauditis.pt
- Consentimento RGPD obrigatório (checkbox) com link à Política de Privacidade.
- Estados de loading / sucesso / erro no frontend.

## Pendências do cliente (usar placeholders até chegarem)

- Logótipo em SVG (só temos PNG).
- **Cleancut**: licença tem de vir do cliente. NÃO usar a versão de onlinewebfonts (proveniência duvidosa). Auto-hospedar com `next/font/local` quando houver ficheiro legítimo.
- Fotos e bios dos 5 membros da equipa.
- Fotos de território (Douro/Norte).
- Domínio (novact.pt) + email institucional.

## Cores (paleta OFICIAL — regra crítica)

Paleta de marca: dourado `#F4B84D`, laranja `#F77A3E`, azul `#71BDF1`, verde `#66C593`.
Gradiente de marca: `linear-gradient(120deg, #F77A3E 0%, #F4B84D 48%, #71BDF1 100%)`.
**Texto**: quase-preto `#1A1A1A` (títulos e corpo sobre fundos claros); secundário `#5A5A5A`.
**Azul-marinho `#123047`**: SÓ para FUNDO (footer e blocos escuros). NUNCA como cor de texto. Sobre ele, texto branco.
Fundos de secção: branco `#FFFFFF` e suave `#F5F9FC`, alternados.

**GRAFITE ABOLIDO — regra dura.** Proibido `#2C3A45` ou qualquer cinzento-grafite. A página é clara e leve (cores da marca + branco). Escuro só existe como FUNDO do footer (azul-marinho `#123047`). Texto nunca é azul-marinho nem grafite — é quase-preto `#1A1A1A` sobre claro, ou branco sobre escuro.

**BrandArcs**: motivo de marca (arcos concêntricos em gradiente, SVG reutilizável) para decorar fundos-chave (hero, saúde mental).

Para o design system e regras de animação detalhadas, ver a skill `novact-design-system` em `.claude/skills/`.
