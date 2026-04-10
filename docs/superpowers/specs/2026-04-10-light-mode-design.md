# Light Mode Automático — Design Spec
**Data:** 2026-04-10  
**Status:** Aprovado  
**Abordagem:** B — Tailwind v4 tokens responsivos + substituição cirúrgica nos componentes

---

## Objetivo

Implementar light mode automático no Mezzold Studio detectado via `prefers-color-scheme: light` do sistema operacional/browser. Sem botão de toggle. Sem JS para detecção de tema. Zero FOUC.

---

## Arquitetura

### Camada 1 — Tokens semânticos em `:root`

Novos CSS custom properties adicionados em `globals.css` dentro de `@layer base { :root { ... } }`:

```css
/* Dark (padrão) */
:root {
  --bg-primary: #020202;
  --bg-secondary: #030303;
  --bg-card: #111111;
  --text-primary: #ededed;
  --text-secondary: #a0a0a0;
  --accent: #ff0033;
  --border: rgba(255, 255, 255, 0.08);
  --nav-bg: rgba(2, 2, 2, 0.85);
  --hero-overlay: rgba(2, 2, 2, 0.65);
  --hero-bottom-fade: rgba(2, 2, 2, 0.98);
  --hero-vignette: rgba(0, 0, 0, 0.75);
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border-color: rgba(255, 255, 255, 0.10);
}

@media (prefers-color-scheme: light) {
  :root {
    --bg-primary: #f5f5f5;
    --bg-secondary: #ebebeb;
    --bg-card: #ffffff;
    --text-primary: #0a0a0a;
    --text-secondary: #444444;
    --accent: #cc0000;
    --border: rgba(0, 0, 0, 0.10);
    --nav-bg: rgba(245, 245, 245, 0.90);
    --hero-overlay: rgba(245, 245, 245, 0.50);
    --hero-bottom-fade: rgba(245, 245, 245, 0.98);
    --hero-vignette: rgba(0, 0, 0, 0.30);
    --glass-bg: rgba(255, 255, 255, 0.70);
    --glass-border-color: rgba(0, 0, 0, 0.10);
  }
}
```

### Camada 2 — Aliases Tailwind v4 no `@theme`

Novos tokens no bloco `@theme` que refereciam as CSS vars semânticas:

```css
@theme {
  --color-surface: var(--bg-primary);
  --color-surface-secondary: var(--bg-secondary);
  --color-card: var(--bg-card);
  --color-foreground: var(--text-primary);
  --color-muted: var(--text-secondary);
  --color-theme-border: var(--border);
  --color-glass: var(--glass-bg);
  --color-glass-border: var(--glass-border-color);
}
```

Isso permite usar `bg-surface`, `text-foreground`, `text-muted`, `bg-card`, `border-theme-border` como classes Tailwind em qualquer componente.

### Camada 3 — `.glass-panel` em light mode

```css
@media (prefers-color-scheme: light) {
  .glass-panel {
    background: var(--glass-bg);
    border-color: var(--glass-border-color);
  }
  
  .glass-button {
    background: linear-gradient(180deg, rgba(240,240,240,0.85) 0%, rgba(255,255,255,0.95) 100%);
  }
  
  .glass-button-wrap:hover .glass-button {
    background: linear-gradient(180deg, rgba(230,230,230,0.85) 0%, rgba(245,245,245,0.95) 100%);
  }
}
```

### Camada 4 — Scrollbar em light mode

```css
@media (prefers-color-scheme: light) {
  html, body {
    scrollbar-color: rgba(0, 0, 0, 0.18) transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.10) 100%);
    border: 1px solid rgba(0,0,0,0.08);
  }
}
```

---

## Mudanças por arquivo

### `src/app/globals.css`
- Adicionar tokens semânticos em `:root` (dark e light via media query)
- Adicionar aliases no `@theme`
- Adicionar overrides de `.glass-panel`, `.glass-button` em light mode
- Adaptar `scrollbar-color` e `::-webkit-scrollbar-thumb` em light mode
- Adaptar `selection:` — trocar `selection:text-white` por `selection:text-foreground`

### `src/app/layout.tsx`
- Remover `className="dark"` do `<html>`
- Mudar `colorScheme: "dark"` para `colorScheme: "dark light"`

### `src/components/layout/Header.tsx`
- `text-white` (logo, links) → `text-foreground`
- `text-white/70` (links nav) → `text-foreground/70`
- `bg-[#020202]/95` (menu mobile) → `bg-[var(--bg-primary)]/95`
- `border-white/5` → `border-theme-border/5`
- Links hover: `hover:text-white` → `hover:text-foreground`
- `text-white` e `hover:text-electric-red` nos links mobile → `text-foreground`

### `src/components/ui/footer-7.tsx`
- `bg-[#020202]` → `bg-surface`
- `text-white` (logo) → `text-foreground`
- `text-white/60` (descrição, links) → `text-foreground/60`
- `text-white/50` (social icons) → `text-foreground/50`
- `text-white/40` (section titles, copyright) → `text-foreground/40`
- `hover:text-white` → `hover:text-foreground`
- `border-white/5` → `border-theme-border/5`

### `src/components/sections/HeroSection.tsx`
- `text-white` (h1, h3, spans) → `text-foreground`
- `text-white/50`, `text-white/60`, `text-white/70` → equivalentes com `text-foreground`
- `bg-black/40` nos feature cards → `bg-card/40`
- `border-white/10` → `border-theme-border/10`
- Inline style `radial-gradient(ellipse at center, transparent 20%, rgba(2,2,2,0.65) 80%)` → `var(--hero-overlay)`
- Inline style `linear-gradient(to bottom, transparent, rgba(2,2,2,0.98))` → `var(--hero-bottom-fade)`
- HighlightWord: `text-white` → `text-foreground`, `text-white/50` → `text-foreground/50`

### `src/components/sections/ContactSection.tsx`
- `bg-[#030303]` → `bg-surface-secondary`
- `bg-gradient-to-b from-[#030303]` → `from-[var(--bg-secondary)]`
- `bg-gradient-to-t from-[#020202]` → `from-[var(--bg-primary)]`
- Vignette inline: `rgba(0,0,0,0.75)` → `var(--hero-vignette)`
- `bg-[#222]` wrapper ReCAPTCHA → `bg-[var(--bg-card)]`
- `theme="dark"` do ReCAPTCHA → hook `useColorScheme()` que retorna `"light" | "dark"`
- Form inputs `inputClass`: `bg-white/[0.04]` → `bg-[var(--bg-card)]`, `text-white` → `text-foreground`, `border-white/10` → `border-theme-border/10`, `placeholder:text-white/20` → `placeholder:text-foreground/20`
- `text-white` em labels e botões → `text-foreground`
- Botão submit `bg-white text-black` — manter (é um CTA, não texto corrido)

### Páginas (`/blog`, `/cases`, `/stack`, `/docs`, `/privacidade`)
- Fundos hardcoded (`bg-[#020202]`, `bg-black`, `bg-[#0a0a0a]`) → `bg-surface` ou `bg-surface-secondary`
- Textos `text-white/*` → `text-foreground/*`
- Bordas `border-white/*` → `border-theme-border/*`
- Números decorativos (01, 02, 03…) → verificar opacidade em light mode, ajustar se necessário

---

## O que NÃO muda

- Layouts, espaçamentos, tipografia, animações — intocáveis
- `text-electric-red`, `text-cyan`, `text-emerald` — acentos funcionam em ambos os temas
- `HalideTopoHero`, `TunnelHero`, canvas/WebGL — encapsulados, não afetam tema
- `canvas-reveal-effect`, `card-spotlight`, `glowing-effect` — efeitos decorativos ok em ambos
- `GlassButton` gradiente interno escuro — design intencional
- Botão CTA principal (`bg-white text-black`) — CTA permanece contrastante

---

## Hook utilitário

Criar `src/components/ui/use-color-scheme.ts`:

```ts
'use client';
import { useEffect, useState } from 'react';

export function useColorScheme(): 'light' | 'dark' {
  const [scheme, setScheme] = useState<'light' | 'dark'>('dark');
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    setScheme(mq.matches ? 'light' : 'dark');
    const handler = (e: MediaQueryListEvent) => setScheme(e.matches ? 'light' : 'dark');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return scheme;
}
```

Usado somente em `ContactSection.tsx` para o `theme` do ReCAPTCHA.

---

## Critérios de sucesso

- `prefers-color-scheme: light` no browser/OS → site renderiza em light automaticamente
- Zero FOUC (sem JS de detecção, CSS puro)
- Zero mudanças em layout, espaçamento ou animação
- Acentos vermelhos, cyan e emerald mantidos em ambos os temas
- Páginas testadas: `/`, `/blog`, `/blog/[slug]`, `/cases`, `/stack`, `/docs`, `/privacidade`
