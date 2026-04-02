'use client';

import { GlowCard } from '../ui/spotlight-card';
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
    <span className={cn("transition-colors duration-500 font-bold", active ? "text-white" : "text-white/50")}>
      {children}
    </span>
  </PointerHighlight>
);

export function HeroSection() {
  const [activeHighlight, setActiveHighlight] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveHighlight((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-mezzold-bg">

      {/* ── 3D Halide Canvas – absolute background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <HalideTopoHero />
      </div>

      {/* ── Dark vignette overlay so text stays readable ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, rgba(2,2,2,0.75) 80%)',
        }}
      />

      {/* ── Subtle red accent glow top-center ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(255,0,51,0.12), transparent 70%)',
        }}
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

      {/* ── HUD corner labels (Removed per request) ── */}

      {/* ── Main Content ── */}
      <div className="container mx-auto px-6 relative z-[4] flex flex-col items-center text-center">

        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-electric-red shadow-[0_0_8px_rgba(255,0,51,0.8)] animate-pulse" />
          <span className="font-mono tracking-widest text-[10px] md:text-xs uppercase text-white/80">
            Mezzold Studio · Software House Premium
          </span>
        </div>

        <h1 className="font-sans font-black text-7xl sm:text-8xl md:text-[11rem] tracking-tighter text-white mb-6 leading-[0.85]"
          style={{ mixBlendMode: 'difference' }}>
          MEZZOLD
        </h1>

        <div className="font-mono text-xs md:text-sm tracking-widest uppercase mb-8 flex items-center text-white/70 flex-wrap justify-center gap-1">
          <span>Criamos </span>
          <span className="flex items-center text-white border-r-2 border-electric-red pr-1 animate-[pulse_1s_step-end_infinite]">
            [
            <TextRotate
              texts={["inovação", "performance", "design", "impacto", "SaaS", "software"]}
              mainClassName="text-white px-1 font-bold"
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

        <div className="max-w-xl text-white/50 text-sm md:text-lg mb-12 font-mono leading-relaxed">
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

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-20 w-full sm:w-auto">
          <Link
            href="#contact"
            className="group relative flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-8 text-[11px] font-extrabold uppercase tracking-[0.25em] text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            <span>Iniciar Projeto</span>
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
          </Link>
          <Link
            href="/cases"
            className="group flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-8 text-[11px] font-bold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-white/10 hover:border-white/40"
          >
            Ver Portfólio
          </Link>
        </div>

        {/* Floating Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <GlowCard glowColor="blue" customSize className="flex flex-col items-start text-left w-full h-full">
            <Layers className="text-cyan mb-4" size={28} />
            <h3 className="font-sans font-bold text-base md:text-lg mb-3 tracking-widest uppercase text-white">Experiências Fluidas</h3>
            <p className="text-white/60 font-sans text-sm leading-relaxed">
              Interfaces ricas em parallax e transições suaves impulsionadas por motion design.
            </p>
          </GlowCard>
          <GlowCard glowColor="green" customSize className="flex flex-col items-start text-left w-full h-full">
            <Code2 className="text-emerald mb-4" size={28} />
            <h3 className="font-sans font-bold text-base md:text-lg mb-3 tracking-widest uppercase text-white">Precisão Neon</h3>
            <p className="text-white/60 font-sans text-sm leading-relaxed">
              Acentos em azul elétrico e esmeralda com glassmorphism para profundidade futurista.
            </p>
          </GlowCard>
          <GlowCard glowColor="red" customSize className="flex flex-col items-start text-left w-full h-full">
            <Zap className="text-electric-red mb-4" size={28} />
            <h3 className="font-sans font-bold text-base md:text-lg mb-3 tracking-widest uppercase text-white">Performance de Elite</h3>
            <p className="text-white/60 font-sans text-sm leading-relaxed">
              Otimizado para velocidade, escala e excelência técnica a longo prazo.
            </p>
          </GlowCard>
        </div>
      </div>

      {/* ── Scroll hint line ── */}
      <div
        className="absolute bottom-8 left-1/2 z-[4]"
        style={{
          width: '1px',
          height: '60px',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)',
          animation: 'heroScroll 2s infinite ease-in-out',
        }}
      />

      <style>{`
        @keyframes heroScroll {
          0%, 100% { transform: scaleY(0); transform-origin: top; opacity: 0; }
          40%       { transform: scaleY(1); transform-origin: top; opacity: 1; }
          60%       { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
          99%       { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
