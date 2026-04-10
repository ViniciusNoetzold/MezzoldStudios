"use client";

import { Activity, Workflow, Sparkles, Blocks, Cpu, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { HoverEffect } from '../ui/card-hover-effect';
import { useAccent } from '../layout/AccentProvider';

/* ─── Data ─────────────────────────────────────────────────── */
const features = [
  {
    id: 0,
    title: 'Sistemas de Monitoramento em Tempo Real',
    icon: Activity,
    shortTitle: 'MONITORAMENTO',
    description:
      'Dashboards estratégicos que transformam dados complexos em centros de comando de alta performance. Arquitetura em tempo real com latência sub-milissegundo para garantir sincronia absoluta.',
    tags: ['React.js', 'High-Precision UI', 'Data Streaming'],
    accent: 'emerald',
  },
  {
    id: 1,
    title: 'Automação de Fluxos Críticos',
    icon: Workflow,
    shortTitle: 'AUTOMAÇÃO',
    description:
      'Engenharia de processos para escalar sua operação. Orquestramos integrações, APIs e microsserviços em pipelines event-driven, garantindo zero perda de dados e rastreabilidade total.',
    tags: ['Spring Boot', 'Node.js', 'Enterprise Automation'],
    accent: 'cyan',
  },
  {
    id: 2,
    title: 'Interfaces de Próxima Geração',
    icon: Sparkles,
    shortTitle: 'UI/UX',
    description:
      'Digitalism e Aero Glass unidos em experiências visuais que definem o futuro tecnológico da sua marca. Motion cinematográfico, shaders imersivos e pura originalidade.',
    tags: ['Motion Design', 'Framer Motion', 'Digitalism UI'],
    accent: 'violet',
  },
  {
    id: 3,
    title: 'Desenvolvimento de Micro-SaaS',
    icon: Blocks,
    shortTitle: 'MICRO-SAAS',
    description:
      'Da ideia ao tracionamento. Arquitetura escalável entregue em sprints ágeis para resolver problemas com máxima eficiência. Stack premium completa, pronta para dominar seu nicho.',
    tags: ['Full-stack', 'Supabase', 'Scalable Architecture'],
    accent: 'orange',
  },
  {
    id: 4,
    title: 'Integração Hardware-Software (IoT)',
    icon: Cpu,
    shortTitle: 'IOT',
    description:
      'A ponte definitiva entre o físico e o digital. Firmware de alta precisão, telemetria em tempo real e controle remoto absoluto—da placa embarcada à interface web.',
    tags: ['ESP32 / M5Stack', 'MQTT', 'IoT Ecosystems'],
    accent: 'sky',
  },
  {
    id: 5,
    title: 'Otimização e Refatoração de Sistemas',
    icon: Zap,
    shortTitle: 'PERFORMANCE',
    description:
      'Performance extrema para sistemas que não podem parar. Redução de latência, profiling avançado e otimização bruta, entregando ganhos radicais sem recriar a roda.',
    tags: ['Java / Spring', 'Database Tuning', 'Low Latency'],
    accent: 'red',
  },
];

const accentMap: Record<string, {
  border: string; glow: string; text: string; bg: string;
  glowRgb: string; borderActive: string; shadowActive: string;
}> = {
  emerald: { border: 'border-white/10', glow: 'shadow-[0_0_24px_rgba(255,255,255,0.03)]', text: 'text-white', bg: 'bg-foreground/[0.02]', glowRgb: '16,185,129', borderActive: 'border-white/20', shadowActive: 'shadow-[0_0_32px_rgba(255,255,255,0.05)]' },
  cyan:    { border: 'border-white/10', glow: 'shadow-[0_0_24px_rgba(255,255,255,0.03)]', text: 'text-white', bg: 'bg-foreground/[0.02]', glowRgb: '103,232,249', borderActive: 'border-white/20', shadowActive: 'shadow-[0_0_32px_rgba(255,255,255,0.05)]' },
  violet:  { border: 'border-white/10', glow: 'shadow-[0_0_24px_rgba(255,255,255,0.03)]', text: 'text-white', bg: 'bg-foreground/[0.02]', glowRgb: '139,92,246', borderActive: 'border-white/20', shadowActive: 'shadow-[0_0_32px_rgba(255,255,255,0.05)]' },
  orange:  { border: 'border-white/10', glow: 'shadow-[0_0_24px_rgba(255,255,255,0.03)]', text: 'text-white', bg: 'bg-foreground/[0.02]', glowRgb: '249,115,22', borderActive: 'border-white/20', shadowActive: 'shadow-[0_0_32px_rgba(255,255,255,0.05)]' },
  sky:     { border: 'border-white/10', glow: 'shadow-[0_0_24px_rgba(255,255,255,0.03)]', text: 'text-white', bg: 'bg-foreground/[0.02]', glowRgb: '14,165,233', borderActive: 'border-white/20', shadowActive: 'shadow-[0_0_32px_rgba(255,255,255,0.05)]' },
  red:     { border: 'border-white/10', glow: 'shadow-[0_0_24px_rgba(255,255,255,0.03)]', text: 'text-white', bg: 'bg-foreground/[0.02]', glowRgb: '239,68,68', borderActive: 'border-white/20', shadowActive: 'shadow-[0_0_32px_rgba(255,255,255,0.05)]' },
};

/* ─── Mobile carousel ───────────────────────────────────────── */
function MobileCarousel() {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ratios = useRef<number[]>([1, 0, 0, 0, 0, 0]);
  const { setAccent, accentRgb } = useAccent();

  useEffect(() => {
    const a = accentMap[features[active].accent];
    setAccent('', a.glowRgb);
  }, [active, setAccent]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = Number((e.target as HTMLElement).dataset.idx);
          ratios.current[idx] = e.intersectionRatio;
        });

        let best = 0;
        let maxRatio = 0;
        ratios.current.forEach((ratio, idx) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            best = idx;
          }
        });
        
        if (maxRatio > 0) {
          setActive(best);
        }
      },
      { root: scrollRef.current, threshold: [0, 0.25, 0.5, 0.75, 1.0] }
    );
    cardRefs.current.filter(Boolean).forEach((c) => io.observe(c!));
    return () => io.disconnect();
  }, []);

  return (
    <div className="md:hidden">
      {/* Scroll track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 pb-2 overscroll-x-none select-none"
        style={{ scrollbarWidth: 'none' }}
      >
        {features.map((f, i) => {
          const Icon = f.icon;
          const a = accentMap[f.accent];
          const isActive = active === i;

          return (
            <div
              key={f.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              data-idx={i}
              className="snap-center shrink-0 w-[82vw] max-w-[300px]"
            >
              <motion.div
                animate={{ scale: isActive ? 1 : 0.93, opacity: isActive ? 1 : 0.45 }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className={cn(
                  'relative rounded-2xl border bg-card p-5 overflow-hidden transition-shadow duration-500 h-full',
                  isActive ? `${a.borderActive} ${a.shadowActive}` : 'border-[var(--border)]'
                )}
              >
                {/* Glow sweep */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key="glow"
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      style={{
                        background: `radial-gradient(ellipse 90% 55% at 50% 0%, rgba(${a.glowRgb},0.15) 0%, transparent 70%)`,
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Icon */}
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-4 border border-[var(--border)] relative z-10', a.bg)}>
                  <Icon className={cn('size-5', a.text)} strokeWidth={1.5} />
                </div>

                {/* Short label */}
                <p className={cn('font-mono text-[9px] tracking-[0.25em] uppercase font-bold mb-2 relative z-10', a.text)}>
                  {f.shortTitle}
                </p>

                {/* Title */}
                <h3 className="font-sans font-black text-base text-foreground uppercase tracking-tight leading-snug mb-3 relative z-10">
                  {f.title}
                </h3>

                {/* Description */}
                <p className="text-foreground/50 text-xs leading-relaxed mb-4 relative z-10">
                  {f.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 relative z-10">
                  {f.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        'font-mono text-[8px] tracking-widest uppercase border px-2 py-0.5 rounded transition-colors',
                        isActive ? `${a.text} border-current/30 bg-current/5` : 'border-white/10 text-white/30 bg-foreground/[0.02]'
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          );
        })}
        <div className="shrink-0 w-5" />
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-0 mt-5">
        {features.map((f, i) => {
          const a = accentMap[f.accent];
          return (
            <button
              key={i}
              onClick={() => cardRefs.current[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })}
              className="w-11 h-11 flex items-center justify-center -mx-2 outline-none"
              aria-label={`Ver ${f.shortTitle}`}
            >
              <motion.div
                animate={{
                  width: active === i ? 20 : 6,
                  height: 6,
                  backgroundColor: active === i ? `rgb(${a.glowRgb})` : 'rgba(255,255,255,0.18)',
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="rounded-full"
              />
            </button>
          );
        })}
      </div>

    </div>
  );
}

/* ─── Section ───────────────────────────────────────────────── */
export function PortfolioSection() {
  const { accentRgb } = useAccent();

  return (
    <section id="portfolio" className="pt-16 pb-8 md:py-24 relative px-4 sm:px-5 md:px-6 bg-surface-secondary overflow-hidden">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50 transition-opacity" 
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
        }}
      />
      
      {/* Bridge Gradient (Top Half) */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-[1]"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, rgba(255,255,255, 0.03) 100%)`
        }}
      />

      <div className="mx-auto w-full max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-3xl text-center mb-10 md:mb-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >

          <h2 className="font-sans font-black text-3xl md:text-5xl lg:text-7xl tracking-tighter text-foreground uppercase mb-4 md:mb-6">
            Engenharia & Design Radical
          </h2>
          <p className="text-foreground/60 text-sm tracking-wide md:text-base leading-relaxed max-w-2xl mx-auto mb-8 md:mb-0">
            Explora as nossas soluções avançadas desenvolvidas para a mais alta performance corporativa.
          </p>
        </motion.div>

        {/* ── Mobile: snap carousel ── */}
        <MobileCarousel />

        {/* ── Desktop: hover-effect grid ── */}
        <div className="hidden md:block">
          <HoverEffect
            items={features.map((f) => ({
              ...f,
              accentData: accentMap[f.accent],
            }))}
          />
        </div>
      </div>
    </section>
  );
}
