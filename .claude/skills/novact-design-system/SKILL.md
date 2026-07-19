---
name: novact-design-system
description: Design system, paleta de cores, tipografia, regras de animação e comportamento mobile-first do site NOVACT. Usar sempre que criar ou editar UI, componentes, secções, cores, gradientes, tipografia, animações ou layout responsivo neste projeto. Palavras-chave: NOVACT, design, cores, gradiente, Cleancut, hero, tile, animação, Framer, hover, reveal, mobile, responsivo, breakpoint.
---

# Design System — NOVACT

Marca moderna e vibrante, ancorada num gradiente laranja→dourado→azul. Registo institucional mas contemporâneo, LEVE e CLARO. Aplica isto em toda a UI.

## Cores (paleta OFICIAL do cliente)

Gradiente de marca (assinatura): `linear-gradient(105deg, #F77A3E 0%, #F4B84D 40%, #8FC3D9 68%, #71BDF1 100%)`

Sólidas de marca:
- Dourado/âmbar: `#F4B84D`
- Laranja: `#F77A3E`
- Azul: `#71BDF1`
- Verde (acento pontual): `#66C593`

Neutros:
- **Texto**: quase-preto `#1A1A1A` sobre fundos claros (títulos e corpo). Texto secundário: cinza-neutro `#5A5A5A`.
- **Azul-marinho `#123047`** — SÓ para **fundo** (footer e blocos escuros pontuais). NUNCA como cor de texto. Sobre azul-marinho, o texto é **branco** (`#FFFFFF`) e os secundários em azul-claro (`#A9C7DE`).
- Borda: `#E4EBF0`
- Fundo suave: `#F5F9FC`
- Branco: `#FFFFFF`

**GRAFITE ABOLIDO.** Não usar `#2C3A45` nem qualquer cinzento-grafite em lado nenhum — nem fundos, nem texto, nem footer. A estética é **cores da marca + branco**. O único escuro permitido é o azul-marinho `#123047`, e SÓ como FUNDO (footer/blocos escuros) — nunca como texto. Texto é sempre quase-preto `#1A1A1A` sobre claro, ou branco sobre escuro.

**Fundos de secção:** branco `#FFFFFF` e fundo suave `#F5F9FC`, alternados. O gradiente de marca e os arcos (ver BrandArcs) entram como acento nos momentos-chave (hero, saúde mental). NUNCA usar fundos escuros/grafite em secções — a página é clara e leve.

Tokens Tailwind sugeridos: `brand-gold` (#F4B84D), `brand-orange` (#F77A3E), `brand-blue` (#71BDF1), `brand-green` (#66C593), `ink` (#1A1A1A, texto), `ink-muted` (#5A5A5A, texto secundário), `navy` (#123047, fundo escuro/footer), `surface` (#FFFFFF), `surface-soft` (#F5F9FC), `border` (#E4EBF0). Botões: `brand-orange` com hover mais escuro `#E8631F`.

## BrandArcs — motivo gráfico de marca (arcos concêntricos)

A identidade visual usa **arcos concêntricos** (anéis grossos, quartos de círculo em gradiente, saindo pela borda) como elemento decorativo de fundo — visíveis nos cartões e materiais da IDV. Criar um componente SVG reutilizável `BrandArcs` (à semelhança do BrandO) com anéis concêntricos em gradiente de marca, para decorar fundos de secções (hero, saúde mental).

- SVG reutilizável, leve, escalável. Vários `<circle>` em `stroke` grosso, sem preenchimento, com `radialGradient` ou `linearGradient` de marca.
- Posicionar a sair pela borda da secção (`overflow: hidden` no container), como quarto de círculo.
- Opacidade moderada quando é fundo (não competir com o texto).
- Pode animar-se muito devagar (rotação/escala lenta) como o "gradiente vivo" — respeitando reduced-motion e desligando em mobile.
- É a assinatura visual de fundo, coerente com o BrandO (o "o" cortado) — mesma linguagem de círculos/arcos da marca.

## Gradiente — contraste (IMPORTANTE, acessibilidade)

Texto branco sobre a zona azul-clara do gradiente FALHA WCAG AA. Solução adotada: **overlay subtil (opção C)**.

Por cima do gradiente, colocar uma camada escura translúcida (azul-marinho da marca), mais forte no lado azul:
`linear-gradient(105deg, rgba(18,48,71,0.12) 0%, rgba(18,48,71,0.30) 100%)`

Assim o gradiente de marca fica vibrante e intacto, o texto passa AA, e o layout não fica preso. Compatível com o gradiente animado.

## Tipografia

- **Cleancut** — títulos, display, números, wordmark. Geométrica, arredondada, futurista. (Aguardar ficheiro licenciado do cliente; auto-hospedar com `next/font/local`. NÃO usar onlinewebfonts.)
- **Inter** — corpo e UI. `next/font/google`.
- Contraste display-geométrico (títulos) / neutro-legível (corpo) é intencional.
- Escala: hero 30–44px, h2 24px, h3 18px, corpo 16px/1.7, legenda 13px.
- Cantos: 8px em botões/inputs, 12–18px em cards e tiles.

## Tiles de área

As 10 áreas de intervenção usam o sistema de ícones da marca: tile quadrado arredondado (rx 18px), ícone outline branco, uma cor sólida da paleta por tile, label branca em baixo. Ícones em linha (outline), consistentes.

## Animação (Framer Motion) — base + intermédio, consistente

Easing padrão: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo). Durações 250–600ms. Tudo entra UMA vez, nada repete a distrair.

**Base (usar em todo o site):**
- Hero: texto entra palavra-a-palavra (`staggerChildren` com variants).
- Reveal on scroll: blur-in (opacity + blur + y) via `whileInView` / `useInView`, escalonado.
- Tiles: hover eleva (translateY -6px + scale 1.02) + sombra + ícone com spring.
- Contadores: sobem de 0 ao entrar no viewport. NÃO inventar métricas — usar só números verdadeiros (a associação é de 2025, tem poucos dados reais).

**Intermédio (pontual, 1-2 sítios cada):**
- Botão magnético (segue o cursor levemente) — só no CTA principal.
- Gradiente vivo: o gradiente de marca move-se muito devagar (≥8s) no hero.
- Scroll-linked (`useScroll`): parallax leve, barra de progresso nos artigos de notícias.

**Assinatura (o "wow" — só esta no site todo):**
- Transições de página com `AnimatePresence` (fade + slide subtil entre rotas).

**Comportamento em MOBILE (mobile-first — simplificar):**
- Parallax, botão magnético e gradiente vivo → DESLIGAR ou reduzir a fade simples em ecrãs pequenos / touch. Detetar com `matchMedia('(hover: none)')` e/ou breakpoint, além de `prefers-reduced-motion`.
- Reveals (blur-in) podem ficar, mas mais leves e rápidos no mobile.
- Hover→tap: em touch não há hover; garantir que nada essencial depende de hover. Estados de tile/card acionam-se por tap ou já estão visíveis.
- Transições de página podem ficar, mas curtas e sem slide grande no mobile.

**Regras invioláveis:**
- Só animar `transform` e `opacity`.
- `prefers-reduced-motion` SEMPRE (`useReducedMotion`): movimento grande desliga, reveals viram aparições instantâneas. O conteúdo nunca depende de JS para existir.
- Menos é mais. Consistência de timing/easing em todo o lado. Não encher cada secção de efeitos diferentes.
- Carregar Framer Motion só onde é usado (não globalmente) para poupar bundle no mobile.

## Litmus test antes de entregar UI

- **Foi construído mobile-first?** (base a 360px, breakpoints só adicionam)
- **Alvos de toque ≥44px? Nada essencial depende de hover?**
- **As animações pesadas desligam/simplificam em mobile e touch?**
- **ZERO grafite/cinzento? (fundos claros; texto quase-preto #1A1A1A; único escuro é o azul-marinho #123047, e SÓ como fundo do footer)**
- As imagens usam `next/image` com `sizes` corretos?
- O gradiente tem overlay de contraste onde há texto branco?
- As animações respeitam reduced-motion?
- O conteúdo aparece mesmo sem JS?
- Os tiles/cards seguem o sistema (cantos, ícone outline, cor sólida)?
- Cleancut nos títulos, Inter no corpo?
