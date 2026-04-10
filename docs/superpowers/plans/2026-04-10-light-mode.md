# Light Mode com Toggle Manual — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement automatic light/dark theme with a pill toggle in the Header, localStorage persistence, and zero FOUC using `data-theme` on `<html>`.

**Architecture:** A vanilla script injected before React reads `localStorage` (or falls back to `prefers-color-scheme`) and sets `data-theme` on `<html>`. CSS uses `[data-theme="light"]` selectors. A `ThemeProvider` React context syncs client state and exposes `toggleTheme`. Hardcoded dark colors across all components are replaced with semantic CSS var tokens registered in Tailwind v4's `@theme`.

**Tech Stack:** Next.js App Router, Tailwind CSS v4 (`@theme`), CSS custom properties, `localStorage`, `matchMedia`.

---

## File Map

### New files
| File | Responsibility |
|---|---|
| `src/lib/theme-script.ts` | IIFE string run before React — sets `data-theme` on `<html>` |
| `src/components/layout/ThemeProvider.tsx` | Context + hook — `theme` state, `toggleTheme`, localStorage sync |

### Modified files
| File | What changes |
|---|---|
| `src/app/globals.css` | CSS vars for dark/light, `@theme` aliases, glass + scrollbar overrides |
| `src/app/layout.tsx` | Remove `className="dark"`, inject script, wrap with ThemeProvider |
| `src/components/layout/Header.tsx` | Pill toggle + color tokens |
| `src/components/ui/footer-7.tsx` | Color tokens |
| `src/components/ui/GlassCard.tsx` | Hover border token |
| `src/components/sections/HeroSection.tsx` | Color tokens + inline style vars |
| `src/components/sections/ContactSection.tsx` | Color tokens + dynamic ReCAPTCHA theme |
| `src/components/sections/AboutSection.tsx` | Color tokens |
| `src/components/sections/ServicesSection.tsx` | Color tokens |
| `src/components/sections/SpecialtiesSection.tsx` | Color tokens |
| `src/components/sections/ProcessSection.tsx` | Color tokens |
| `src/components/sections/PortfolioSection.tsx` | Color tokens |
| `src/components/sections/BlogList.tsx` | Color tokens |
| `src/app/blog/page.tsx` | Color tokens |
| `src/app/blog/[slug]/page.tsx` | Color tokens |
| `src/app/cases/page.tsx` | Color tokens |
| `src/app/stack/page.tsx` | Color tokens |
| `src/app/docs/page.tsx` | Color tokens |
| `src/app/privacidade/page.tsx` | Color tokens |

### Token reference (after Task 1)
| Tailwind class | Resolves to | Dark value | Light value |
|---|---|---|---|
| `bg-surface` | `--color-surface` → `--bg-primary` | `#020202` | `#f5f5f5` |
| `bg-surface-secondary` | `--color-surface-secondary` → `--bg-secondary` | `#030303` | `#ebebeb` |
| `bg-card` | `--color-card` → `--bg-card` | `#111111` | `#ffffff` |
| `text-foreground` | `--color-foreground` → `--text-primary` | `#ededed` | `#0a0a0a` |
| `text-muted` | `--color-muted` → `--text-secondary` | `#a0a0a0` | `#444444` |
| `border-[var(--border)]` | `--border` | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.10)` |
| `bg-glass` | `--color-glass` → `--glass-bg` | `rgba(255,255,255,0.05)` | `rgba(255,255,255,0.70)` |
| `border-glass-border` | `--color-glass-border` → `--glass-border-color` | `rgba(255,255,255,0.10)` | `rgba(0,0,0,0.10)` |

> **Note on border opacity:** `border-[var(--border)]` uses the full `--border` value. For subtle variants like the original `border-white/5`, use `border-[var(--border)]` — the opacity difference is cosmetic. For hover stronger borders, use `hover:border-foreground/20`.

---

## Task 1: CSS Foundation — globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace the `@layer base` block**

Open `src/app/globals.css`. Replace the existing `@layer base` block (lines 26–37) with:

```css
@layer base {
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
    --scrollbar-thumb-hover-start: rgba(255, 0, 51, 0.35);
    --scrollbar-thumb-hover-end: rgba(255, 0, 51, 0.15);
    --scrollbar-thumb-hover-border: rgba(255, 0, 51, 0.25);
    --scrollbar-thumb-hover-shadow: rgba(255, 0, 51, 0.18);
    --background: var(--bg-primary);
    --foreground: var(--text-primary);
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
    --scrollbar-thumb-hover-start: rgba(204, 0, 0, 0.35);
    --scrollbar-thumb-hover-end: rgba(204, 0, 0, 0.15);
    --scrollbar-thumb-hover-border: rgba(204, 0, 0, 0.25);
    --scrollbar-thumb-hover-shadow: rgba(204, 0, 0, 0.18);
    --background: var(--bg-primary);
    --foreground: var(--text-primary);
  }

  body {
    background-color: var(--background);
    color: var(--foreground);
    @apply antialiased selection:bg-electric-red/30 selection:text-foreground;
  }
}
```

- [ ] **Step 2: Update the `@theme` block**

Replace the existing `@theme` block (lines 14–24) with:

```css
@theme {
  --color-mezzold-bg: #020202;
  --color-mezzold-text: #ededed;
  --color-electric-red: #ff0033;
  --color-emerald: #10b981;
  --color-cyan: #06b6d4;
  /* Semantic tokens — reference the CSS vars set by [data-theme] */
  --color-surface: var(--bg-primary);
  --color-surface-secondary: var(--bg-secondary);
  --color-card: var(--bg-card);
  --color-foreground: var(--text-primary);
  --color-muted: var(--text-secondary);
  /* Glass tokens — now reference theme-aware vars */
  --color-glass: var(--glass-bg);
  --color-glass-border: var(--glass-border-color);
  --font-sans: var(--font-geist-sans), sans-serif;
  --font-mono: var(--font-geist-mono), monospace;
}
```

- [ ] **Step 3: Update `.glass-panel` and `.glass-button` utilities**

In the `@layer utilities` block, update the glass classes:

```css
/* Replace the existing .glass-panel rule */
.glass-panel {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border-color);
}

/* Keep .glass-button-wrap and .glass-button as-is — they are intentionally dark */
/* Only .glass-panel needs to adapt */
```

- [ ] **Step 4: Update the scrollbar styles**

Replace the scrollbar section (the Firefox and WebKit rules, lines 96–155) with:

```css
/* --- Scrollbar - Glass Aero (macOS / Win11 style) --- */

html, body {
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb) transparent;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(
    180deg,
    var(--scrollbar-thumb) 0%,
    var(--scrollbar-thumb) 100%
  );
  border-radius: 100px;
  border: 1px solid var(--glass-border-color);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.10),
    0 0 8px rgba(0, 0, 0, 0.04);
  transition: background 0.25s ease, box-shadow 0.25s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(
    180deg,
    var(--scrollbar-thumb-hover-start) 0%,
    var(--scrollbar-thumb-hover-end) 60%,
    var(--scrollbar-thumb) 100%
  );
  border-color: var(--scrollbar-thumb-hover-border);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.10),
    0 0 12px var(--scrollbar-thumb-hover-shadow);
}

::-webkit-scrollbar-thumb:active {
  background: linear-gradient(
    180deg,
    var(--scrollbar-thumb-hover-start) 0%,
    var(--scrollbar-thumb-hover-end) 100%
  );
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 0 16px var(--scrollbar-thumb-hover-shadow);
}

::-webkit-scrollbar-corner {
  background: transparent;
}

/* --- end scrollbar --- */
```

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(theme): add semantic CSS vars and data-theme selectors to globals.css"
```

---

## Task 2: ThemeProvider and theme-script

**Files:**
- Create: `src/lib/theme-script.ts`
- Create: `src/components/layout/ThemeProvider.tsx`

- [ ] **Step 1: Create `src/lib/theme-script.ts`**

```ts
/**
 * Inline script — injected into <head> before React hydrates.
 * Sets data-theme on <html> with zero FOUC.
 * Must be a self-contained IIFE — no imports, no module syntax.
 */
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

- [ ] **Step 2: Create `src/components/layout/ThemeProvider.tsx`**

```tsx
'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Read the data-theme that the inline script already set before React
    const current = document.documentElement.getAttribute('data-theme') as Theme | null;
    if (current === 'light' || current === 'dark') setTheme(current);
  }, []);

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('mezzold-theme', next);
    } catch (_) {}
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/theme-script.ts src/components/layout/ThemeProvider.tsx
git commit -m "feat(theme): add ThemeProvider context and zero-FOUC inline script"
```

---

## Task 3: Wire Up layout.tsx

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace the entire layout.tsx**

```tsx
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PageTransitionLoader } from "@/components/ui/page-transition-loader";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { themeScript } from "@/lib/theme-script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = 'https://mezzoldstudio.com.br';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Mezzold Studio | Software House Premium',
    template: '%s | Mezzold Studio',
  },
  description: 'Mezzold Studio é uma software house especializada em sites, Micro SaaS e dashboards de alta performance. Construímos plataformas ultra-rápidas com design inovador para marcas digitais ambiciosas.',
  keywords: ['Mezzold Studio', 'software house', 'desenvolvimento web', 'Micro SaaS', 'Next.js', 'dashboards', 'automação'],
  authors: [{ name: 'Mezzold Studio', url: BASE_URL }],
  creator: 'Mezzold Studio',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: BASE_URL,
    siteName: 'Mezzold Studio',
    title: 'Mezzold Studio | Software House Premium',
    description: 'Mezzold Studio é uma software house especializada em sites, Micro SaaS e dashboards de alta performance.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mezzold Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mezzold Studio | Software House Premium',
    description: 'Mezzold Studio é uma software house especializada em sites, Micro SaaS e dashboards de alta performance.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/logo.png?v=2',
    apple: '/logo.png?v=2',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      style={{ colorScheme: "dark light" }}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-[100dvh] flex flex-col font-sans`}>
        <ThemeProvider>
          <PageTransitionLoader />
          <CookieConsent />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

> **Note:** `suppressHydrationWarning` on `<html>` is required because the inline script mutates `data-theme` before React hydrates — without it Next.js throws a hydration mismatch warning.

- [ ] **Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(theme): wire ThemeProvider and zero-FOUC script into root layout"
```

---

## Task 4: Header — Toggle Pill + Color Tokens

**Files:**
- Modify: `src/components/layout/Header.tsx`

- [ ] **Step 1: Replace the entire Header.tsx**

```tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlassButton } from '../ui/glass-button';
import { MenuToggleIcon } from '../ui/menu-toggle-icon';
import { useScroll } from '../ui/use-scroll';
import { useTheme } from '../layout/ThemeProvider';

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);
	const { theme, toggleTheme } = useTheme();

	const links = [
		{ label: 'Blog', href: '/blog' },
		{ label: 'Portfólio', href: '/cases' },
		{ label: 'Contato', href: '/#contact' },
	];

	React.useEffect(() => {
		if (open) {
			const scrollY = window.scrollY;
			document.body.style.position = 'fixed';
			document.body.style.top = `-${scrollY}px`;
			document.body.style.width = '100%';
		} else {
			const scrollY = document.body.style.top;
			document.body.style.position = '';
			document.body.style.top = '';
			document.body.style.width = '';
			if (scrollY) window.scrollTo(0, -parseInt(scrollY));
		}
		return () => {
			document.body.style.position = '';
			document.body.style.top = '';
			document.body.style.width = '';
		};
	}, [open]);

	return (
		<header
			className={cn(
				'fixed left-0 right-0 z-50 mx-auto w-full transition-all duration-500 ease-out flex flex-col items-center justify-center',
				{
					'top-0 max-w-full rounded-none border-b border-transparent bg-transparent': !scrolled && !open,
					'top-0 md:top-6 max-w-full md:max-w-4xl md:rounded-full border-b md:border border-transparent md:border-glass-border glass-panel shadow-lg': scrolled && !open,
					'top-0 max-w-full glass-panel border-b border-glass-border rounded-none': open,
				}
			)}
		>
			<nav
				className={cn(
					'flex h-14 md:h-16 w-full items-center justify-between px-6 transition-all duration-500 ease-out',
					{
						'md:px-8': scrolled,
						'md:px-10': !scrolled,
					}
				)}
			>
				<Link href="/" className="font-sans font-black text-xl tracking-tighter text-foreground" onClick={() => setOpen(false)}>
					MEZZOLD<span className="text-electric-red">.</span>
				</Link>

				<div className="hidden items-center gap-8 md:flex text-sm font-mono tracking-widest uppercase">
					{links.map((link, i) => (
						<Link key={i} className="hover:text-foreground transition-colors text-foreground/70" href={link.href}>
							{link.label}
						</Link>
					))}
				</div>

				{/* Desktop: toggle pill + (no hamburger) */}
				<div className="hidden md:flex items-center gap-4">
					{/* Theme toggle pill */}
					<button
						onClick={toggleTheme}
						aria-label="Alternar tema"
						className="flex items-center rounded-full border border-[var(--border)] text-[10px] font-mono tracking-widest uppercase overflow-hidden transition-colors duration-300"
					>
						<span
							className={cn(
								'px-3 py-1.5 transition-colors duration-300',
								theme === 'light'
									? 'bg-foreground text-[var(--bg-primary)]'
									: 'text-foreground/40 hover:text-foreground/70'
							)}
						>
							Light
						</span>
						<span
							className={cn(
								'px-3 py-1.5 transition-colors duration-300',
								theme === 'dark'
									? 'bg-foreground text-[var(--bg-primary)]'
									: 'text-foreground/40 hover:text-foreground/70'
							)}
						>
							Dark
						</span>
					</button>
				</div>

				{/* Mobile: hamburger + theme icon */}
				<div className="md:hidden flex items-center gap-2">
					{/* Mobile theme icon — sun/moon only, no label */}
					<button
						onClick={toggleTheme}
						aria-label="Alternar tema"
						className="flex items-center justify-center text-foreground/70 h-10 w-10 rounded-full hover:bg-foreground/5 transition-colors"
					>
						{theme === 'dark'
							? <Sun size={16} strokeWidth={2} />
							: <Moon size={16} strokeWidth={2} />
						}
					</button>

					{/* min 48px touch target per iOS HIG / Material 3 */}
					<button
						onClick={() => setOpen(!open)}
						aria-label={open ? 'Fechar menu' : 'Abrir menu'}
						aria-expanded={open}
						className="flex items-center justify-center text-foreground h-12 w-12 rounded-full hover:bg-foreground/5 active:bg-foreground/10 transition-colors"
					>
						<MenuToggleIcon open={open} className="size-6" duration={300} />
					</button>
				</div>
			</nav>

			{/* Mobile menu overlay */}
			<div
				className={cn(
					'fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-t border-glass-border backdrop-blur-xl md:hidden transition-all duration-300',
					open ? 'opacity-100 translate-y-0 h-screen pointer-events-auto' : 'opacity-0 -translate-y-8 h-0 pointer-events-none',
				)}
				style={{ backgroundColor: 'color-mix(in srgb, var(--bg-primary) 95%, transparent)' }}
			>
				<div className="flex h-full w-full flex-col p-6 font-mono tracking-widest uppercase text-lg">
					<div className="grid gap-y-6 mt-8">
						{links.map((link) => (
							<Link
								key={link.label}
								className="text-foreground hover:text-electric-red active:text-electric-red transition-colors w-full border-b border-[var(--border)] py-3 flex items-center min-h-[44px]"
								href={link.href}
								onClick={() => setOpen(false)}
							>
								{link.label}
							</Link>
						))}
					</div>
				</div>
			</div>
		</header>
	);
}
```

> **Note on mobile menu bg:** `color-mix(in srgb, var(--bg-primary) 95%, transparent)` replaces the old `bg-[#020202]/95` and adapts to both themes. This is supported in all modern browsers (same ones that support `backdrop-filter`).

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat(theme): add toggle pill to Header, replace hardcoded colors with tokens"
```

---

## Task 5: Footer7 + GlassCard

**Files:**
- Modify: `src/components/ui/footer-7.tsx`
- Modify: `src/components/ui/GlassCard.tsx`

- [ ] **Step 1: Update footer-7.tsx**

Replace the `<section>` opening tag and all `text-white/*` class strings:

```tsx
// Line 100 — section bg
<section className="py-16 bg-surface">

// Line 106 — logo
<h2 className="font-sans font-black text-xl tracking-tighter text-foreground">

// Line 111 — description
<p className="max-w-[70%] text-sm text-foreground/60">

// Line 114 — social list
<ul className="flex items-center space-x-6 text-foreground/50">

// Line 116 — social hover
className="font-medium hover:text-foreground transition-colors"

// Line 133 — section title
<h3 className="mb-4 font-mono tracking-widest text-xs uppercase text-foreground/40">

// Line 136 — link list
<ul className="space-y-3 text-sm text-foreground/60">

// Line 138 — link hover
className="font-medium hover:text-foreground transition-colors"

// Line 147 — bottom bar
<div className="mt-8 flex flex-col justify-between gap-4 border-t border-[var(--border)] py-8 text-xs font-mono text-foreground/40 md:flex-row md:items-center md:text-left">

// Line 153 — legal link hover
className="hover:text-foreground transition-colors"
```

- [ ] **Step 2: Update GlassCard.tsx hover border**

In `GlassCard.tsx` line 51, replace `hover:border-white/20` with `hover:border-foreground/20`:

```tsx
className={`glass-panel rounded-2xl p-6 transition-all duration-300 hover:border-foreground/20 hover:-translate-y-1 active:scale-[0.97] cursor-pointer select-none overflow-hidden relative ${glowClass} ${className}`}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/footer-7.tsx src/components/ui/GlassCard.tsx
git commit -m "feat(theme): update Footer and GlassCard to use semantic color tokens"
```

---

## Task 6: HeroSection

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1: Replace the entire HeroSection.tsx**

```tsx
'use client';

import { GlowingEffect } from '../ui/glowing-effect';
import { HalideTopoHero } from '../ui/halide-topo-hero';
import { ArrowRight, Code2, Zap, Layers } from 'lucide-react';
import Link from 'next/link';
import { PointerHighlight } from '../ui/pointer-highlight';
import { TextRotate } from '../ui/text-rotate';
import React from 'react';
import { cn } from '@/lib/utils';

const HighlightWord = ({ children, active }: { children: React.ReactNode; active: boolean }) => (
  <PointerHighlight
    active={active}
    containerClassName="inline-block"
    pointerClassName="text-electric-red drop-shadow-[0_0_8px_rgba(255,0,51,0.8)]"
    rectangleClassName="border-electric-red/50 bg-electric-red/10"
  >
    <span className={cn("transition-colors duration-500 font-bold", active ? "text-foreground" : "text-foreground/50")}>
      {children}
    </span>
  </PointerHighlight>
);

export function HeroSection() {
  const [activeHighlight, setActiveHighlight] = React.useState(0);
  const reducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  React.useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setActiveHighlight((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <section className="relative min-h-[85svh] md:min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-surface touch-pan-y">

      {/* ── Desktop: 3D animated Halide canvas ── */}
      <div className="absolute inset-0 bottom-[35%] z-0 pointer-events-none hidden md:block overflow-hidden">
        <HalideTopoHero />
      </div>

      {/* ── Mobile: flat dark code image ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none md:hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          filter: 'grayscale(0.8) brightness(0.25)',
        }}
      />

      {/* ── Dark vignette ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, var(--hero-overlay) 80%)',
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 md:h-64 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--hero-bottom-fade))' }}
      />

      {/* ── Red accent glow top-center ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] md:w-[60vw] h-[35vh] z-[1] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top, rgba(255,0,51,0.1), transparent 70%)' }}
      />

      {/* ── Grain texture overlay ── */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="hero-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.06]"
        style={{ filter: 'url(#hero-grain)' }}
      />

      {/* ── Main Content ── */}
      <div className="container mx-auto px-5 md:px-6 relative z-[4] flex flex-col items-center text-center w-full">

        {/* Eyebrow */}
        <div className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-electric-red/80 mb-4 md:mb-5">
          [ MEZZOLD STUDIO ]
        </div>

        {/* Headline */}
        <h1
          className="font-sans font-black text-[clamp(2.75rem,10vw,8.5rem)] tracking-tighter text-foreground mb-3 md:mb-6 leading-[0.88]"
          style={{ mixBlendMode: 'difference' }}
        >
          MEZZOLD
        </h1>

        {/* Rotating tagline */}
        <div className="font-mono text-[10px] md:text-xs tracking-widest uppercase mb-4 md:mb-6 flex items-center text-foreground/70 flex-wrap justify-center gap-1">
          <span>Criamos </span>
          <span className="flex items-center text-foreground border-r-2 border-electric-red pr-1 animate-[pulse_1s_step-end_infinite]">
            [
            <TextRotate
              texts={["inovação", "performance", "design", "impacto", "SaaS", "software"]}
              mainClassName="text-foreground px-1 font-bold"
              staggerFrom={"last"}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2500}
            />
            ]
          </span>
        </div>

        {/* Description */}
        <div className="max-w-xs md:max-w-lg text-foreground/50 text-[11px] md:text-base mb-7 md:mb-10 font-mono leading-relaxed">
          Plataformas{' '}
          <HighlightWord active={activeHighlight === 0}>ultra-rápidas</HighlightWord>
          , com interfaces que parecem{' '}
          <HighlightWord active={activeHighlight === 1}>vivas</HighlightWord>
          {' '}—{' '}criadas para{' '}
          <HighlightWord active={activeHighlight === 2}>marcas SaaS</HighlightWord>
          {' '}e empresas digital-first{' '}
          <HighlightWord active={activeHighlight === 3}>ambiciosas</HighlightWord>
          .
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-10 md:mb-16 w-full max-w-xs sm:max-w-none sm:w-auto">
          <Link
            href="#contact"
            className="group relative flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-7 text-[10px] font-extrabold uppercase tracking-[0.25em] text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-[0.97] shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            <span>Iniciar Projeto</span>
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
          </Link>
          <Link
            href="/cases"
            className="group flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-foreground/5 backdrop-blur-sm px-7 text-[10px] font-bold uppercase tracking-[0.25em] text-foreground transition-all duration-300 hover:bg-foreground/10 hover:border-foreground/40 active:bg-foreground/10"
          >
            Ver Portfólio
          </Link>
        </div>

        {/* Feature cards — desktop only */}
        <ul className="hidden md:grid grid-cols-3 gap-4 w-full max-w-4xl p-0 m-0">
          <li className="list-none">
            <div className="relative h-full rounded-3xl border border-[var(--border)] p-3">
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl bg-card/40 p-6">
                <div className="relative flex flex-col items-start text-left">
                  <Layers className="text-cyan mb-3" size={24} />
                  <h3 className="font-sans font-bold text-base mb-2 tracking-widest uppercase text-foreground">Experiências Fluidas</h3>
                  <p className="text-foreground/60 font-sans text-xs leading-relaxed">
                    Interfaces ricas em parallax e transições suaves impulsionadas por motion design.
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li className="list-none">
            <div className="relative h-full rounded-3xl border border-[var(--border)] p-3">
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl bg-card/40 p-6">
                <div className="relative flex flex-col items-start text-left">
                  <Code2 className="text-emerald mb-3" size={24} />
                  <h3 className="font-sans font-bold text-base mb-2 tracking-widest uppercase text-foreground">Precisão Neon</h3>
                  <p className="text-foreground/60 font-sans text-xs leading-relaxed">
                    Acentos em azul elétrico e esmeralda com glassmorphism para profundidade futurista.
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li className="list-none">
            <div className="relative h-full rounded-3xl border border-[var(--border)] p-3">
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl bg-card/40 p-6">
                <div className="relative flex flex-col items-start text-left">
                  <Zap className="text-electric-red mb-3" size={24} />
                  <h3 className="font-sans font-bold text-base mb-2 tracking-widest uppercase text-foreground">Performance de Elite</h3>
                  <p className="text-foreground/60 font-sans text-xs leading-relaxed">
                    Otimizado para velocidade, escala e excelência técnica a longo prazo.
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>

        {/* Mobile: compact feature badges */}
        <div className="flex md:hidden items-center gap-4 text-foreground/40 font-mono text-[9px] tracking-widest uppercase">
          <span className="flex items-center gap-1.5"><Layers size={11} className="text-cyan" /> Design</span>
          <span className="w-px h-3 bg-[var(--border)]" />
          <span className="flex items-center gap-1.5"><Code2 size={11} className="text-emerald" /> Código</span>
          <span className="w-px h-3 bg-[var(--border)]" />
          <span className="flex items-center gap-1.5"><Zap size={11} className="text-electric-red" /> Performance</span>
        </div>
      </div>

    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/HeroSection.tsx
git commit -m "feat(theme): update HeroSection to use CSS var tokens"
```

---

## Task 7: ContactSection — Colors + Dynamic ReCAPTCHA Theme

**Files:**
- Modify: `src/components/sections/ContactSection.tsx`

- [ ] **Step 1: Replace ContactSection.tsx**

The main changes: `bg-[#030303]` → `bg-surface-secondary`, gradient inline styles using `var(--bg-*)`, ReCAPTCHA `theme` from `useTheme`, `inputClass` tokens.

```tsx
'use client';
import { ContactCard } from "@/components/ui/contact-card";
import { useAccent } from '../layout/AccentProvider';
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { Suspense, useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTheme } from '../layout/ThemeProvider';

const inputClass =
  'bg-[var(--bg-card)] border border-[var(--border)] text-foreground text-base md:text-sm rounded-lg px-3 ' +
  'h-12 ' +
  'placeholder:text-foreground/20 ' +
  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan/50 focus-visible:border-cyan/50 ' +
  'transition-colors duration-200 w-full';

export function ContactSection() {
  const { accentRgb } = useAccent();

  return (
    <section
      id="contact"
      className="relative px-4 md:px-6 pt-8 pb-16 md:py-32 flex w-full items-center justify-center overflow-hidden bg-surface-secondary"
    >
      {/* ── CSS gradient background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 100% 100%, rgba(6,182,212,0.06) 0%, transparent 60%),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 39px,
              rgba(255,255,255,0.015) 39px,
              rgba(255,255,255,0.015) 40px
            )
          `,
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, var(--hero-vignette) 100%)',
        }}
      />

      {/* Top transition */}
      <div
        className="absolute top-0 left-0 right-0 h-40 z-[3] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, var(--bg-secondary), transparent)' }}
      />

      {/* Bottom transition to Footer */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[3] pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }}
      />

      {/* Content */}
      <div className="container mx-auto max-w-6xl relative z-[3] w-full">
        <ContactCard
          title="Entre em contato"
          description="Se você tem alguma dúvida sobre nossos serviços ou precisa de ajuda, preencha o formulário aqui. Faremos o possível para responder em até 1 dia útil."
          contactInfo={[
            {
              icon: MailIcon,
              label: 'Email',
              value: 'mezzoldstudio@gmail.com',
              href: 'mailto:mezzoldstudio@gmail.com',
            },
            {
              icon: PhoneIcon,
              label: 'Telefone',
              value: '+55 (54) 99713-1399',
              href: 'https://w.app/mezzold',
            },
            {
              icon: MapPinIcon,
              label: 'Endereço',
              value: 'Sarandi, Rio Grande do Sul, 99560-000',
            },
          ]}
        >
          <Suspense fallback={<div className="h-64 animate-pulse bg-foreground/5 rounded-xl w-full" />}>
            <ContactForm />
          </Suspense>
        </ContactCard>
      </div>
    </section>
  );
}

function ContactForm() {
  const searchParams = useSearchParams();
  const msg = searchParams.get('msg');
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [companyName_fakeField, setFakeField] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (msg === 'website') {
      setMessage("Olá, quero saber mais sobre o Desenvolvimento de Sites.");
    } else if (msg === 'saas') {
      setMessage("Olá, quero saber mais sobre Micro SaaS.");
    } else if (msg === 'dashboards') {
      setMessage("Olá, quero saber mais sobre Dashboards e Automação.");
    }
  }, [msg]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMsg("Por favor, preencha nome, email e mensagem.");
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrorMsg("");
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message, companyName_fakeField, recaptchaToken }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Erro desconhecido.');
      }
      setStatus('success');
    } catch (err: unknown) {
      if (recaptchaRef.current) recaptchaRef.current.reset();
      setRecaptchaToken(null);
      setErrorMsg(err instanceof Error ? err.message : 'Erro ao enviar. Tente novamente.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-5 py-10 text-center">
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-foreground/[0.04] border border-[var(--border)] flex items-center justify-center">
            <svg className="w-7 h-7 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-foreground font-black text-sm tracking-[0.2em] uppercase">Proposta Enviada</p>
          <p className="text-foreground/40 text-xs font-mono">Respondemos em até 1 dia útil.</p>
        </div>
        <div className="w-full border-t border-[var(--border)]" />
        <div className="w-full flex flex-col gap-2 text-left">
          <p className="text-center text-[10px] font-mono tracking-[0.18em] uppercase text-foreground/30 mb-1">
            Nossa equipe retornará via
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-[var(--border)] bg-foreground/[0.02]">
              <div className="shrink-0 w-7 h-7 rounded-md bg-foreground/[0.05] border border-[var(--border)] flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-foreground/70" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.559 4.122 1.525 5.855L.057 23.57a.75.75 0 00.912.912l5.716-1.468A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.722 9.722 0 01-4.958-1.356l-.355-.211-3.677.944.963-3.558-.232-.368A9.721 9.721 0 012.25 12C2.25 6.616 6.616 2.25 12 2.25S21.75 6.616 21.75 12 17.384 21.75 12 21.75z"/>
                </svg>
              </div>
              <div>
                <p className="text-[9px] font-mono tracking-widest uppercase text-foreground/30">WhatsApp</p>
                <p className="text-foreground/80 text-xs font-medium">Resposta rápida</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-[var(--border)] bg-foreground/[0.02]">
              <div className="shrink-0 w-7 h-7 rounded-md bg-foreground/[0.05] border border-[var(--border)] flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <p className="text-[9px] font-mono tracking-widest uppercase text-foreground/30">Email</p>
                <p className="text-foreground/80 text-xs font-medium truncate">mezzoldstudio@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => { setStatus('idle'); setName(""); setEmail(""); setPhone(""); setMessage(""); }}
          className="text-[10px] font-mono tracking-widest uppercase text-foreground/20 hover:text-foreground/50 transition-colors"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      {/* Honeypot field */}
      <div aria-hidden="true" className="hidden opacity-0 absolute top-0 left-0 w-0 h-0 pointer-events-none z-[-100]">
        <label htmlFor="companyName_fakeField" tabIndex={-1}>Company Name</label>
        <input
          id="companyName_fakeField"
          name="companyName_fakeField"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          value={companyName_fakeField}
          onChange={(e) => setFakeField(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-name" className="text-foreground/70 text-xs font-mono tracking-widest uppercase">Nome</Label>
        <input id="contact-name" name="name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Seu nome" required />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-email" className="text-foreground/70 text-xs font-mono tracking-widest uppercase">Email</Label>
        <input id="contact-email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="seu@email.com" required />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-phone" className="text-foreground/70 text-xs font-mono tracking-widest uppercase">Telefone</Label>
        <input id="contact-phone" name="phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="(00) 00000-0000" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="contact-message" className="text-foreground/70 text-xs font-mono tracking-widest uppercase">Mensagem</Label>
        <textarea id="contact-message" name="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className={`${inputClass} h-auto py-3 resize-none`} placeholder="Descreva seu projeto..." required />
      </div>

      <div className="w-full flex justify-center py-1">
        <div className="rounded-lg overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] shadow-xl relative inline-flex justify-center transition-colors hover:border-cyan/30 duration-300">
          <div className="m-[-1px]">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              onChange={(token) => setRecaptchaToken(token)}
              theme={theme}
            />
          </div>
        </div>
      </div>

      {status === 'error' && (
        <p className="text-red-400/80 text-xs font-mono">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || !recaptchaToken}
        className="w-full h-12 mt-1 rounded-lg bg-white text-black text-xs font-extrabold uppercase tracking-[0.2em] transition-all duration-200 hover:bg-white/90 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Enviando...' : 'Enviar Proposta'}
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/ContactSection.tsx
git commit -m "feat(theme): update ContactSection with tokens and dynamic ReCAPTCHA theme"
```

---

## Task 8: Remaining Home-Page Sections

**Files:**
- Modify: `src/components/sections/AboutSection.tsx`
- Modify: `src/components/sections/ServicesSection.tsx`
- Modify: `src/components/sections/SpecialtiesSection.tsx`
- Modify: `src/components/sections/ProcessSection.tsx`
- Modify: `src/components/sections/PortfolioSection.tsx`

- [ ] **Step 1: AboutSection.tsx — replace color classes**

Find and replace in `src/components/sections/AboutSection.tsx`:

| Old | New |
|---|---|
| `text-white leading-[1.05]` | `text-foreground leading-[1.05]` |
| `text-white/35` | `text-foreground/35` |
| `text-white/55` | `text-foreground/55` |
| `text-white font-semibold` | `text-foreground font-semibold` |
| `text-white tracking-tight` | `text-foreground tracking-tight` |
| `text-white/35 whitespace-pre-line` | `text-foreground/35 whitespace-pre-line` |
| `border-white/[0.07]` | `border-[var(--border)]` |
| `via-white/[0.06]` (decorative hr) | `via-foreground/[0.06]` |
| `bg-[linear-gradient(to_right,#ffffff04_1px...` | keep as-is (decorative grid, barely visible, safe in both themes) |

- [ ] **Step 2: ServicesSection.tsx — replace color classes**

Find and replace in `src/components/sections/ServicesSection.tsx`:

| Old | New |
|---|---|
| `bg-neutral-950/90` | `bg-card/90` |
| `bg-neutral-950` | `bg-card` |
| `bg-[#0c0c0c]` | `bg-card` |
| `bg-[#0c0c0c]/60` | `bg-card/60` |
| `bg-[#050505]` | `bg-surface` |
| `text-white leading-tight` | `text-foreground leading-tight` |
| `text-white/60` | `text-foreground/60` |
| `text-white/40` | `text-foreground/40` |
| `text-white/30` | `text-foreground/30` |
| `border-white/5` | `border-[var(--border)]` |
| `border-white/[0.05]` | `border-[var(--border)]` |
| `border-white/10` | `border-[var(--border)]` |
| `border-white/20` | `border-foreground/20` |
| `bg-white/10` (line divider) | `bg-[var(--border)]` |
| `bg-white/[0.02]` | `bg-foreground/[0.02]` |
| `bg-white/[0.03]` | `bg-foreground/[0.03]` |
| `bg-white/[0.04]` | `bg-foreground/[0.04]` |

- [ ] **Step 3: SpecialtiesSection.tsx — replace color classes**

Find and replace in `src/components/sections/SpecialtiesSection.tsx`:

| Old | New |
|---|---|
| `bg-[#0a0a0a]` | `bg-surface-secondary` |
| `text-white` (h3) | `text-foreground` |
| `text-white/40` | `text-foreground/40` |
| `text-white/60` | `text-foreground/60` |
| `bg-white/[0.02]` | `bg-foreground/[0.02]` |
| `bg-white/[0.04]` | `bg-foreground/[0.04]` |
| `bg-white/5` (icon bg) | `bg-foreground/5` |
| `border-white/[0.05]` | `border-[var(--border)]` |
| `border-white/10` | `border-[var(--border)]` |
| `border-white/20` | `border-foreground/20` |
| `text-white hover:bg-white/10 hover:text-white` (carousel arrows) | `text-foreground hover:bg-foreground/10 hover:text-foreground` |
| `text-white/20` (drag hint) | `text-foreground/20` |

- [ ] **Step 4: ProcessSection.tsx — replace color classes**

Find and replace in `src/components/sections/ProcessSection.tsx`:

| Old | New |
|---|---|
| `bg-[#0a0a0a]` | `bg-surface-secondary` |
| `text-white` (h2) | `text-foreground` |
| `text-white/80` (icons) | `text-foreground/80` |
| `text-white/40` (phase id) | `text-foreground/40` |
| `text-white tracking-tight` (h3) | `text-foreground tracking-tight` |
| `text-white/50` (desc) | `text-foreground/50` |
| `bg-[#0a0a0a]` (mobile icon node) | `bg-card` |
| `bg-white/[0.02]` | `bg-foreground/[0.02]` |
| `border-white/10` | `border-[var(--border)]` |
| `bg-white/10` (line divider) | `bg-[var(--border)]` |
| In `CardSpotlight` prop: `color="#202020"` | `color="var(--bg-card)"` |
| `rgba(255,255,255,0.1)` in the mobile timeline gradient | keep as-is (decorative) |

- [ ] **Step 5: PortfolioSection.tsx — replace color classes**

Find and replace in `src/components/sections/PortfolioSection.tsx`:

| Old | New |
|---|---|
| `bg-[#030303]` (section) | `bg-surface-secondary` |
| `text-white uppercase mb-4` (h2) | `text-foreground uppercase mb-4` |
| `text-white/60` (p) | `text-foreground/60` |
| `text-white uppercase tracking-tight` (mobile h3) | `text-foreground uppercase tracking-tight` |
| `text-white/50` (mobile desc) | `text-foreground/50` |
| `bg-[#0a0a0a]` (mobile card) | `bg-card` |
| `border-white/8` (mobile card border) | `border-[var(--border)]` |
| `bg-white/[0.02]` (mobile icon bg) | `bg-foreground/[0.02]` |
| `border-white/5` | `border-[var(--border)]` |

> **Note:** Do NOT touch `accentMap` — those are intentional accent colors, not theme-sensitive.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/AboutSection.tsx src/components/sections/ServicesSection.tsx src/components/sections/SpecialtiesSection.tsx src/components/sections/ProcessSection.tsx src/components/sections/PortfolioSection.tsx
git commit -m "feat(theme): update home page sections to use semantic color tokens"
```

---

## Task 9: Pages and BlogList

**Files:**
- Modify: `src/components/sections/BlogList.tsx`
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/blog/[slug]/page.tsx`
- Modify: `src/app/cases/page.tsx`
- Modify: `src/app/stack/page.tsx`
- Modify: `src/app/docs/page.tsx`
- Modify: `src/app/privacidade/page.tsx`

- [ ] **Step 1: BlogList.tsx**

Find and replace in `src/components/sections/BlogList.tsx`:

| Old | New |
|---|---|
| `border-white/[0.08]` | `border-[var(--border)]` |
| `text-white/30` (date) | `text-foreground/30` |
| `text-white leading-[1.08]` (featured title) | `text-foreground leading-[1.08]` |
| `group-hover:text-white/90` | `group-hover:text-foreground/90` |
| `text-white/60` (excerpt) | `text-foreground/60` |
| `text-white/25` (CTA) | `text-foreground/25` |
| `text-white/[0.07]` (decorative number) | `text-foreground/[0.07]` |
| `bg-white/[0.13]` (divider) | `bg-[var(--border)]` |
| `border-white/[0.13]` | `border-[var(--border)]` |
| `hover:bg-white/[0.015]` | `hover:bg-foreground/[0.015]` |
| `text-white/[0.09]` (grid numbers) | `text-foreground/[0.09]` |
| `text-white leading-[1.2]` (grid title) | `text-foreground leading-[1.2]` |
| `text-white/55` (grid excerpt) | `text-foreground/55` |
| `text-white/20` (date, CTA) | `text-foreground/20` |

- [ ] **Step 2: blog/page.tsx**

Find and replace in `src/app/blog/page.tsx`:

| Old | New |
|---|---|
| `bg-white/[0.06]` (divider line) | `bg-[var(--border)]` |
| `text-white/20` (article count) | `text-foreground/20` |
| `text-white mb-6` (h1) | `text-foreground mb-6` |
| `text-white/35` (subtitle) | `text-foreground/35` |
| `bg-gradient-to-r from-white/10` (decorative line) | `bg-gradient-to-r from-foreground/10` |

- [ ] **Step 3: blog/[slug]/page.tsx**

Find and replace in `src/app/blog/[slug]/page.tsx`:

| Old | New |
|---|---|
| `text-white/30 hover:text-white/70` (back link) | `text-foreground/30 hover:text-foreground/70` |
| `text-white/25` (date) | `text-foreground/25` |
| `text-white leading-[1.15]` (h1) | `text-foreground leading-[1.15]` |
| `text-white/45` (excerpt) | `text-foreground/45` |
| `bg-white/[0.07]` (divider lines) | `bg-[var(--border)]` |
| `text-white/15` (MEZZOLD STUDIO label) | `text-foreground/15` |
| `text-white leading-snug` (heading in renderSection) | `text-foreground leading-snug` |
| `text-white/60` (paragraph) | `text-foreground/60` |
| `text-white/60` (list items) | `text-foreground/60` |
| `border-white/[0.07]` (callout border) | `border-[var(--border)]` |
| `border-white/[0.06]` (callout inner) | `border-[var(--border)]` |
| `bg-white/[0.025]` (callout bg) | `bg-foreground/[0.025]` |
| `text-white/70` (callout text) | `text-foreground/70` |
| `border-white/[0.08]` (tags, next post) | `border-[var(--border)]` |
| `text-white/35` (tags) | `text-foreground/35` |
| `bg-white/[0.03]` (tags bg) | `bg-foreground/[0.03]` |
| `text-white/25` (next article label) | `text-foreground/25` |
| `text-white/80 group-hover:text-white` (next post title) | `text-foreground/80 group-hover:text-foreground` |
| `bg-white/[0.02] hover:bg-white/[0.05]` (next post card) | `bg-foreground/[0.02] hover:bg-foreground/[0.05]` |
| `hover:border-white/[0.16]` (next post card hover border) | `hover:border-foreground/16` |
| `text-white/25` (arrow) | `text-foreground/25` |
| `group-hover:text-white/70` (arrow) | `group-hover:text-foreground/70` |

- [ ] **Step 4: cases/page.tsx**

Find and replace in `src/app/cases/page.tsx`:

| Old | New |
|---|---|
| `bg-white/[0.06]` (divider lines) | `bg-[var(--border)]` |
| `text-white/15` | `text-foreground/15` |
| `text-white mb-5` (h1) | `text-foreground mb-5` |
| `text-white/30` (subtitle) | `text-foreground/30` |
| `bg-white/[0.06]` (section divider lines) | `bg-[var(--border)]` |
| `text-white/15` (FIM DOS CASES) | `text-foreground/15` |
| `border-white/[0.07]` (CTA card) | `border-[var(--border)]` |
| `bg-white/[0.015]` (CTA card bg) | `bg-foreground/[0.015]` |
| `text-white leading-tight` (h2) | `text-foreground leading-tight` |
| `text-white/35` (CTA description) | `text-foreground/35` |
| `text-white tracking-tighter` (stat values) | `text-foreground tracking-tighter` |
| `text-white/22` (stat labels) | `text-foreground/22` |
| `border-white/[0.05]` (stat divider) | `border-[var(--border)]` |
| `border-white/[0.08]` (stack button) | `border-[var(--border)]` |
| `text-white/35 hover:text-white/60` (stack button) | `text-foreground/35 hover:text-foreground/60` |
| `hover:border-white/18` (stack button hover) | `hover:border-foreground/18` |

- [ ] **Step 5: stack/page.tsx**

Find and replace in `src/app/stack/page.tsx`:

| Old | New |
|---|---|
| `bg-[#020202]` (main) | `bg-surface` |
| `text-white uppercase` (h1) | `text-foreground uppercase` |
| `text-white/50` (subtitle) | `text-foreground/50` |
| `border-white/5` (card) | `border-[var(--border)]` |
| `bg-white/[0.02]` (card bg) | `bg-foreground/[0.02]` |
| `hover:bg-white/[0.04]` | `hover:bg-foreground/[0.04]` |
| `hover:border-white/10` | `hover:border-foreground/10` |
| `bg-[#050505]` (icon container) | `bg-surface` |
| `border-white/5` (icon border) | `border-[var(--border)]` |
| `text-white mb-1` (tech name) | `text-foreground mb-1` |
| `text-white/40` (tech role) | `text-foreground/40` |

- [ ] **Step 6: docs/page.tsx**

Find and replace in `src/app/docs/page.tsx`:

| Old | New |
|---|---|
| `text-white` (h1) | `text-foreground` |
| `text-white/60` (subtitle) | `text-foreground/60` |
| `text-white/30` (STATUS label) | `text-foreground/30` |
| `text-white mb-4` (h2 Em produção) | `text-foreground mb-4` |
| `text-white/40` (description) | `text-foreground/40` |

- [ ] **Step 7: privacidade/page.tsx**

Find and replace in `src/app/privacidade/page.tsx`:

| Old | New |
|---|---|
| `bg-[#020202] text-white` (main) | `bg-surface text-foreground` |
| `text-white` (h1) | `text-foreground` |
| `text-white/60` (body text) | `text-foreground/60` |
| `text-white mb-4` (h2s) | `text-foreground mb-4` |
| `text-white` (strong inside li) | `text-foreground` |

- [ ] **Step 8: Commit**

```bash
git add src/components/sections/BlogList.tsx src/app/blog/page.tsx "src/app/blog/[slug]/page.tsx" src/app/cases/page.tsx src/app/stack/page.tsx src/app/docs/page.tsx src/app/privacidade/page.tsx
git commit -m "feat(theme): update pages and BlogList to use semantic color tokens"
```

---

## Task 10: Manual QA Checklist

No code changes in this task. Open the dev server (`npm run dev`) and verify each item.

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Test dark mode (default)**

With no localStorage key set, open DevTools → Application → Local Storage → delete `mezzold-theme` key if it exists. Reload.

Expected:
- Site opens in dark (matches your OS preference if dark, or light if OS is light — it reads system)
- Header shows pill with "Dark" active (if OS is dark)

- [ ] **Step 3: Test toggle**

Click the "Light" side of the pill toggle.

Expected:
- Theme switches immediately — background goes light (#f5f5f5), text goes dark (#0a0a0a)
- `localStorage.getItem('mezzold-theme')` returns `"light"` (check in DevTools)
- `html[data-theme]` attribute is `"light"` (check Elements panel)

- [ ] **Step 4: Test persistence**

After toggling to Light, reload the page.

Expected: Site opens in light — no flash of dark on load.

- [ ] **Step 5: Test toggle back**

Click "Dark" in the pill.

Expected: Switches to dark immediately.

- [ ] **Step 6: Test all pages in light mode**

With theme set to light, navigate to:
- `/` — Hero, About, Specialties, Services, Process, Portfolio, Contact sections
- `/blog` — header dividers visible, text readable
- `/blog/[any-slug]` — body text, callouts, code blocks readable
- `/cases` — CTA card, stat row readable
- `/stack` — card grid readable
- `/docs` — GlassCard visible on light bg
- `/privacidade` — body text readable

- [ ] **Step 7: Verify no layout shifts**

Toggle between light and dark multiple times. Confirm: no layout shifts, no text jumps, no elements appearing/disappearing.

- [ ] **Step 8: Test mobile**

On mobile (or DevTools responsive), confirm:
- Sun/moon icon appears instead of pill
- Tapping it toggles theme
- Mobile menu adapts background color

- [ ] **Step 9: Final commit**

```bash
git add -A
git commit -m "feat(theme): complete light/dark mode implementation with toggle pill"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Toggle pill "Light / Dark" in header → Task 4
- ✅ Fallback to `prefers-color-scheme` → themeScript IIFE reads `matchMedia`
- ✅ localStorage persistence → `toggleTheme()` writes, script reads on load
- ✅ Zero FOUC → script inline in `<head>` before React
- ✅ globals.css semantic vars dark + light → Task 1
- ✅ Tailwind v4 `@theme` aliases → Task 1
- ✅ glass-panel, glass-button, scrollbar adapts → Task 1
- ✅ layout.tsx: remove `className="dark"`, add script, ThemeProvider → Task 3
- ✅ Header color tokens → Task 4
- ✅ Footer color tokens → Task 5
- ✅ HeroSection inline styles use vars → Task 6
- ✅ ContactSection ReCAPTCHA dynamic → Task 7
- ✅ All sections → Task 8
- ✅ All pages + BlogList → Task 9
- ✅ Mobile icon toggle → Task 4
- ✅ `suppressHydrationWarning` on `<html>` → Task 3

**No spec requirement without a task.**
