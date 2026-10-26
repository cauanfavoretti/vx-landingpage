# VX Consultoria — Landing Page (Remake)

Remake da landing page da **VX Consultoria Comercial**, reconstruída em Next.js com
design system próprio na paleta **laranja + azul**. Todo o conteúdo (copy, métricas,
provas sociais, serviços, endereço, webhook e agendamento) foi migrado da LP original.

## Stack

| Tecnologia | Uso neste projeto |
| --- | --- |
| **React 19 + Next.js 16** (App Router) | Estrutura, SSR/SSG, `next/image`, `next/font` |
| **Tailwind CSS v4** | Design system via `@theme` em `src/app/globals.css` |
| **GSAP + ScrollTrigger** | Timeline do hero, strike-through do diagnóstico, reveals por scroll |
| **Lenis** | Smooth scroll global + âncoras internas (`SmoothScroll` provider) |
| **Motion** | Microinterações: pill da nav (`layoutId`), contadores, modais, barra de progresso |
| **React Three Fiber + three** | Campo de partículas WebGL do hero (`HeroField`) |
| **Lucide React** | Todos os ícones |
| **Embla Carousel** | Carrossel das provas sociais (prints de WhatsApp) |
| **shadcn/ui** (Radix + CVA) | Base de `Button`, `Dialog`, `Input`, `Badge`, `Card` |

## Rodando

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção
npm start
npm run lint
```

## Paleta

Laranja é a cor dominante; o azul entra só como contraponto frio, em pontos escolhidos.

| Token | Hex | Uso |
| --- | --- | --- |
| `ink-950` … `ink-600` | `#0a0705` → `#3d2a1c` | Fundos e superfícies (carvão quente) |
| `orange-vx-500` | `#ff6b1a` | Cor primária da marca — CTAs, ícones, bordas ativas |
| `orange-vx-400` | `#ff8a3d` | Hover, gradientes, destaques de texto |
| `orange-vx-300/200/100` | `#ffb27a` / `#ffcda8` / `#ffe6d2` | Eyebrows, labels, textos sobre laranja |
| `orange-vx-600/700` | `#e2540f` / `#b83f09` | Profundidade em gradientes e sombras |
| `blue-vx-500` | `#1b6ff5` | Apoio: partículas do hero (18%), glow do Diagnóstico, anel interno do Método |
| `mist-100` … `mist-600` | `#faf6f2` → `#7d7168` | Escala de texto (neutra quente) |

Tipografia: **Space Grotesk** (display), **Inter** (corpo), **JetBrains Mono** (eyebrows/labels).

## Estrutura

```
src/
├── app/
│   ├── globals.css          # design tokens (@theme), utilitários, keyframes
│   ├── layout.tsx           # fontes, metadata/SEO/OG, providers
│   └── page.tsx             # composição das seções
├── components/
│   ├── providers/
│   │   └── smooth-scroll.tsx    # Lenis + sync com GSAP ScrollTrigger
│   ├── sections/            # nav, hero, clients, proof, instagram, problem,
│   │                        # solution, method, services, benefits, tech,
│   │                        # contact, location, final-cta, footer
│   ├── ui/                  # button, badge, card, dialog, input, counter, section-head
│   └── visuals/
│       ├── hero-field.tsx   # partículas R3F (PRNG determinístico p/ SSR estável)
│       └── scroll-progress.tsx
├── hooks/
│   └── use-reveal.ts        # reveal por scroll com GSAP ScrollTrigger
└── lib/utils.ts             # cn()
```

## Integrações preservadas da LP original

- **GHL (CRM)**: o formulário envia para a Route Handler `src/app/api/lead/route.ts`, que
  faz `upsert` do contato e cria a oportunidade no funil **"1. Funil de Vendas"**
  (estágio "Novo Contato") com `source: "site"`. Credenciais em `GHL_API_TOKEN` e
  `GHL_LOCATION_ID` — apenas no servidor, nunca no bundle. Veja `.env.example`.
  (O webhook antigo `webhook.schedule10x.com` está fora do ar — respondia 525 — e foi substituído.)
- **Booking LeadConnector** (iframe pós-envio): `widget/booking/WU0ds4ulezO5mCurDzGU`
- **Embed do Instagram**: carregado sob demanda via IntersectionObserver, com link de fallback
- **Google Maps**: R. Rio Purús, 535 · Nossa Sra. das Graças · Manaus – AM · 69053-050

## Assets

Copiados de `VX LP/vx-landingpage-main/uploads` para `public/uploads`.
O vídeo do escritório foi renomeado para `escritorio.mp4` (o nome original tinha espaços).

## Acessibilidade e performance

- `prefers-reduced-motion` desliga Lenis, GSAP, o canvas WebGL e as animações CSS.
- Canvas 3D carregado com `next/dynamic` (`ssr: false`); vídeo e embed do Instagram só
  carregam ao entrar na viewport.
- Foco visível em todos os controles; modais via Radix Dialog (foco preso + `Esc`).
