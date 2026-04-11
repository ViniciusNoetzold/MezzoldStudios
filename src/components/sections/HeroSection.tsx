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

      {/* ── Mobile: flat dark code image (dark mode only) ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none hidden dark:block md:hidden"
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
        style={{ background: 'radial-gradient(ellipse at top, rgba(255,0,51,0.07), transparent 70%)' }}
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
          style={{ mixBlendMode: 'normal' }}
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
