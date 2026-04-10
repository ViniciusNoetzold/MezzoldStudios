# Light Mode com Toggle Manual — Design Spec
**Data:** 2026-04-10  
**Status:** Aprovado (revisado)  
**Abordagem:** data-theme no `<html>` + ThemeProvider + toggle pill no Header

---

## Objetivo

Implementar light/dark mode no Mezzold Studio com:
1. **Toggle manual** no header (pill "Light / Dark") que sobrescreve a preferência do sistema
2. **Fallback automático** via `prefers-color-scheme` se o usuário nunca usou o toggle
3. **Persistência** em `localStorage` — a escolha do usuário sobrevive a reloads
4. **Zero FOUC** — script inline no `<head>` aplica `data-theme` antes do primeiro render

---

## Arquitetura

### Fluxo de resolução do tema

```
1. Script inline no <head> lê localStorage.getItem('mezzold-theme')
   ├── 'light' → seta data-theme="light" no <html>
   ├── 'dark'  → seta data-theme="dark" no <html>
   └── null    → lê matchMedia('prefers-color-scheme: dark')
                 ├── true  → data-theme="dark"
                 └── false → data-theme="light"

2. React hidrata. ThemeProvider lê data-theme atual do <html> como estado inicial.

3. Usuário clica no toggle → ThemeProvider atualiza estado, escreve em localStorage,
   muda data-theme no <html>.
```

### CSS — seletores por `data-theme`

Em vez de `@media (prefers-color-scheme: light)`, o CSS usa seletores de atributo:

```css
/* Dark (padrão) */
:root,
[data-theme="dark"] {
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
  --scrollbar-thumb: rgba(255, 255, 255, 0.12);
  --scrollbar-thumb-hover: rgba(255, 0, 51, 0.35);
}

[data-theme="light"] {
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
  --scrollbar-thumb: rgba(0, 0, 0, 0.18);
  --scrollbar-thumb-hover: rgba(204, 0, 0, 0.35);
}
```

### Novos aliases Tailwind v4 no `@theme`

```css
@theme {
  --color-surface: var(--bg-primary);
  --color-surface-secondary: var(--bg-secondary);
  --color-card: var(--bg-card);
  --color-foreground: var(--text-primary);
  --color-muted: var(--text-secondary);
  --color-theme-border: var(--border);
  /* glass já existente sobrescrito para usar as vars */
  --color-glass: var(--glass-bg);
  --color-glass-border: var(--glass-border-color);
}
```

---

## Novos arquivos

### `src/lib/theme-script.ts`
Script inline exportado como string — injetado via `dangerouslySetInnerHTML` no `<head>` do layout. Roda antes do React, sem import de módulos. Responsável por setar `data-theme` no `<html>` antes do primeiro paint.

```ts
export const themeScript = `(function(){
  try {
    var saved = localStorage.getItem('mezzold-theme');
    var theme = saved === 'light' || saved === 'dark'
      ? saved
      : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  } catch(e){}
})();`;
```

### `src/components/layout/ThemeProvider.tsx`
Client component. Lê `data-theme` inicial do DOM, expõe `theme` e `toggleTheme` via Context.

```tsx
'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: 'dark',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Lê o data-theme que o script inline já setou
    const current = document.documentElement.getAttribute('data-theme') as Theme;
    if (current) setTheme(current);
  }, []);

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('mezzold-theme', next);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

### `src/components/ui/use-color-scheme.ts` (simplificado)
Usado apenas no ContactSection para o `theme` do ReCAPTCHA. Reutiliza o ThemeProvider.

---

## Toggle Pill no Header

Visual: pill com "Light" e "Dark" como duas metades, a ativa destacada.

```tsx
// Dentro de Header.tsx
import { useTheme } from '../layout/ThemeProvider';

const { theme, toggleTheme } = useTheme();

<button
  onClick={toggleTheme}
  aria-label="Alternar tema"
  className="hidden md:flex items-center rounded-full border border-theme-border text-[10px] font-mono tracking-widest uppercase overflow-hidden"
>
  <span className={cn('px-3 py-1.5 transition-colors', theme === 'light' ? 'bg-foreground text-surface' : 'text-foreground/40')}>
    Light
  </span>
  <span className={cn('px-3 py-1.5 transition-colors', theme === 'dark' ? 'bg-foreground text-surface' : 'text-foreground/40')}>
    Dark
  </span>
</button>
```

No mobile: ícone de sol/lua apenas (sem label) para não poluir o header compacto.

---

## Mudanças por arquivo

### `src/app/globals.css`
- Substituir `:root { ... }` + `@media (prefers-color-scheme: light)` por `:root, [data-theme="dark"] { ... }` + `[data-theme="light"] { ... }`
- Adicionar aliases no `@theme`
- Adaptar `.glass-panel`, `.glass-button` para usar vars
- Adaptar scrollbar para usar `--scrollbar-thumb` e `--scrollbar-thumb-hover`
- `selection:text-white` → `selection:text-foreground`

### `src/app/layout.tsx`
- Remover `className="dark"` do `<html>` (sem classe estática de tema)
- Mudar `colorScheme: "dark"` para `colorScheme: "dark light"`
- Adicionar `<script dangerouslySetInnerHTML={{ __html: themeScript }} />` no `<head>`
- Envolver children com `<ThemeProvider>`

### `src/components/layout/Header.tsx`
- Importar `useTheme`
- Adicionar toggle pill entre links e botão de menu mobile
- Substituir cores hardcoded (`text-white`, `bg-[#020202]/95`, etc.) por tokens semânticos

### `src/components/ui/footer-7.tsx`
- `bg-[#020202]` → `bg-surface`
- `text-white/*` → `text-foreground/*`
- `border-white/5` → `border-theme-border/5`

### `src/components/sections/HeroSection.tsx`
- `text-white/*` → `text-foreground/*`
- `bg-black/40` → `bg-card/40`
- `border-white/10` → `border-theme-border/10`
- Inline styles com `rgba(2,2,2,...)` → `var(--hero-overlay)`, `var(--hero-bottom-fade)`, `var(--hero-vignette)`

### `src/components/sections/ContactSection.tsx`
- `bg-[#030303]` → `bg-surface-secondary`
- Gradientes de transição inline → `var(--bg-secondary)`, `var(--bg-primary)`
- Vignette → `var(--hero-vignette)`
- `bg-[#222]` → `bg-[var(--bg-card)]`
- `theme="dark"` ReCAPTCHA → `theme={theme}` via `useTheme()`
- `inputClass`: cores hardcoded → tokens semânticos

### Páginas (`/blog`, `/blog/[slug]`, `/cases`, `/stack`, `/docs`, `/privacidade`)
- Fundos hardcoded → `bg-surface` / `bg-surface-secondary`
- `text-white/*` → `text-foreground/*`
- `border-white/*` → `border-theme-border/*`

---

## O que NÃO muda

- Layouts, espaçamentos, tipografia, animações — intocáveis
- Cores de acento (`electric-red`, `cyan`, `emerald`)
- `HalideTopoHero`, `TunnelHero`, canvas/WebGL
- Efeitos decorativos (`canvas-reveal-effect`, `card-spotlight`, `glowing-effect`)
- Botão CTA principal (`bg-white text-black`)

---

## Critérios de sucesso

- Toggle pill em "Light / Dark" no header muda o tema imediatamente
- Preferência persiste após reload e navegação entre páginas
- Se nunca usou o toggle, o site segue `prefers-color-scheme` do sistema
- Zero FOUC em qualquer cenário
- Páginas testadas: `/`, `/blog`, `/blog/[slug]`, `/cases`, `/stack`, `/docs`, `/privacidade`
