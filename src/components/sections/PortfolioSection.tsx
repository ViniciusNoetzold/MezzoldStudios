"use client";

import { Activity, Workflow, Sparkles, Blocks, Cpu, Zap, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useId } from 'react';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────────── */
const features = [
  {
    id: 0,
    title: 'Sistemas de Monitoramento em Tempo Real',
    icon: Activity,
    shortTitle: 'MONITORAMENTO',
    description:
      'Dashboards estratégicos focados na visualização de dados complexos, transformando métricas brutas em interfaces de comando intuitivas e de alta performance. Arquitetamos pipelines de dados em tempo real com latência sub-milissegundo, utilizando WebSockets, SSE e renderização parcial no servidor para manter o estado sempre sincronizado.',
    tags: ['React.js', 'High-Precision UI', 'Data Streaming'],
    accent: 'emerald',
  },
  {
    id: 1,
    title: 'Automação de Fluxos Críticos',
    icon: Workflow,
    shortTitle: 'AUTOMAÇÃO',
    description:
      'Engenharia de processos para eliminar tarefas repetitivas. Integração de APIs e microsserviços que orquestram o seu negócio enquanto você foca no que importa. Pipelines event-driven com Node.js, Spring Boot e filas de mensagens para garantir zero perda de dados e rastreabilidade total de cada operação.',
    tags: ['Spring Boot', 'Node.js', 'Enterprise Automation'],
    accent: 'cyan',
  },
  {
    id: 2,
    title: 'Interfaces de Próxima Geração',
    icon: Sparkles,
    shortTitle: 'UI/UX',
    description:
      'Design focado em "Digitalism" e "Aero Glass". Criamos experiências visuais que não apenas funcionam, mas definem a identidade tecnológica da sua marca. Motion design cinematográfico com Framer Motion, shaders GLSL para fundos imersivos e sistemas de design customizados — sem templates, apenas originalidade radical.',
    tags: ['Motion Design', 'Framer Motion', 'Digitalism UI'],
    accent: 'violet',
  },
  {
    id: 3,
    title: 'Desenvolvimento de Micro-SaaS',
    icon: Blocks,
    shortTitle: 'MICRO-SAAS',
    description:
      'Da concepção ao lançamento. Arquitetura escalável para soluções de software específicas, focadas em resolver problemas pontuais com máxima eficiência. Stack moderna completa — autenticação, billing com Stripe, multi-tenancy e painel de administração — entregue em sprints ágeis e prontos para escala.',
    tags: ['Full-stack', 'Supabase', 'Scalable Architecture'],
    accent: 'orange',
  },
  {
    id: 4,
    title: 'Integração Hardware-Software (IoT)',
    icon: Cpu,
    shortTitle: 'IOT',
    description:
      'Conectando o mundo físico ao digital. Desenvolvimento de firmware e interfaces para controle de dispositivos inteligentes e monitoramento industrial remoto. Protocolos MQTT, OTA updates, dashboards de telemetria e alertas em tempo real — da placa embarcada até o painel web.',
    tags: ['ESP32 / M5Stack', 'MQTT', 'IoT Ecosystems'],
    accent: 'sky',
  },
  {
    id: 5,
    title: 'Otimização e Refatoração de Sistemas',
    icon: Zap,
    shortTitle: 'PERFORMANCE',
    description:
      'Diagnóstico e melhoria de performance em aplicações legadas. Redução de latência e otimização de banco de dados para sistemas que não podem parar. Profiling, query tuning, cache strategies e migração gradual — entregamos ganhos mensuráveis sem reescrever do zero o que já funciona.',
    tags: ['Java / Spring', 'Database Tuning', 'Low Latency'],
    accent: 'red',
  },
];

/* accent → tailwind color values */
const accentMap: Record<string, { border: string; glow: string; text: string; bg: string }> = {
  emerald: { border: 'border-emerald-500/60', glow: 'shadow-[0_0_24px_rgba(16,185,129,0.25)]', text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  cyan:    { border: 'border-cyan-500/60',    glow: 'shadow-[0_0_24px_rgba(6,182,212,0.25)]',   text: 'text-cyan-400',    bg: 'bg-cyan-500/10'    },
  violet:  { border: 'border-violet-500/60',  glow: 'shadow-[0_0_24px_rgba(139,92,246,0.25)]',  text: 'text-violet-400',  bg: 'bg-violet-500/10'  },
  orange:  { border: 'border-orange-500/60',  glow: 'shadow-[0_0_24px_rgba(249,115,22,0.25)]',  text: 'text-orange-400',  bg: 'bg-orange-500/10'  },
  sky:     { border: 'border-sky-500/60',     glow: 'shadow-[0_0_24px_rgba(14,165,233,0.25)]',  text: 'text-sky-400',     bg: 'bg-sky-500/10'     },
  red:     { border: 'border-red-500/60',     glow: 'shadow-[0_0_24px_rgba(239,68,68,0.25)]',   text: 'text-red-400',     bg: 'bg-red-500/10'     },
};

/* ─────────────────────────────────────────────────────────────
   GridPattern util (inline to avoid extra file)
───────────────────────────────────────────────────────────── */
function GridPattern({ width = 20, height = 20, ...props }: React.SVGProps<SVGSVGElement> & { width?: number; height?: number }) {
  const id = useId();
  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse">
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Dispersal offsets — where each card flies when NOT active
   (keyed by active card index)
───────────────────────────────────────────────────────────── */
// For each activeId, for each cardId, where they move (x, y as % of viewport rough values)
const dispersalVectors: Record<number, Record<number, { x: number; y: number }>> = {
  0: { 1: { x: 60, y: -40 }, 2: { x: 120, y: -40 }, 3: { x: 0, y: 80 }, 4: { x: 60, y: 80 }, 5: { x: 120, y: 80 } },
  1: { 0: { x: -60, y: -40 }, 2: { x: 80, y: -40 }, 3: { x: -60, y: 80 }, 4: { x: 0, y: 80 }, 5: { x: 80, y: 80 } },
  2: { 0: { x: -120, y: -40 }, 1: { x: -60, y: -40 }, 3: { x: -120, y: 80 }, 4: { x: -60, y: 80 }, 5: { x: 0, y: 80 } },
  3: { 0: { x: 0, y: -80 }, 1: { x: 60, y: -80 }, 2: { x: 120, y: -80 }, 4: { x: 60, y: 40 }, 5: { x: 120, y: 40 } },
  4: { 0: { x: -60, y: -80 }, 1: { x: 0, y: -80 }, 2: { x: 80, y: -80 }, 3: { x: -60, y: 40 }, 5: { x: 80, y: 40 } },
  5: { 0: { x: -120, y: -80 }, 1: { x: -60, y: -80 }, 2: { x: 0, y: -80 }, 3: { x: -120, y: 40 }, 4: { x: -60, y: 40 } },
};

/* ─────────────────────────────────────────────────────────────
   Main Section
───────────────────────────────────────────────────────────── */
export function PortfolioSection() {
  const [activeId, setActiveId] = useState<number | null>(null);

  const handleCardClick = (id: number) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const activeFeature = activeId !== null ? features[activeId] : null;

  return (
    <section id="portfolio" className="py-24 relative px-6 bg-[#030303] overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50" />

      <div className="mx-auto w-full max-w-6xl space-y-16 mt-8 mb-16 relative z-10">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-emerald-500 mb-6 font-bold">
            [ SOLUÇÕES DE ELITE ]
          </div>
          <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-7xl tracking-tighter text-white uppercase mb-6">
            Engenharia & Design Radical
          </h2>
          <p className="text-white/60 text-sm tracking-wide md:text-base leading-relaxed max-w-2xl mx-auto">
            Clique em qualquer item para explorar em detalhe.
          </p>
        </motion.div>

        {/* Cards Grid + Detail Panel */}
        <div className="relative">
          {/* Dim overlay when a card is active */}
          <AnimatePresence>
            {activeId !== null && (
              <motion.div
                key="overlay"
                className="absolute inset-0 z-10 cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveId(null)}
              />
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px border border-dashed border-white/10 bg-white/5">
            {features.map((feature) => {
              const isActive = activeId === feature.id;
              const isOther = activeId !== null && !isActive;
              const accent = accentMap[feature.accent];
              const dispersal = isOther && activeId !== null ? dispersalVectors[activeId]?.[feature.id] : { x: 0, y: 0 };
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.id}
                  layout
                  animate={
                    isOther
                      ? {
                          x: dispersal?.x ?? 0,
                          y: dispersal?.y ?? 0,
                          opacity: 0.15,
                          scale: 0.88,
                          filter: 'blur(2px)',
                        }
                      : isActive
                      ? { x: 0, y: 0, opacity: 1, scale: 1.02, filter: 'blur(0px)' }
                      : { x: 0, y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }
                  }
                  transition={{ type: 'spring', damping: 22, stiffness: 380 }}
                  whileHover={!isActive && activeId === null ? { scale: 1.02 } : {}}
                  onClick={() => handleCardClick(feature.id)}
                  className={cn(
                    'relative overflow-hidden p-6 flex flex-col cursor-pointer select-none',
                    'bg-[#0a0a0a] border border-transparent transition-all duration-300',
                    'min-h-[200px]',
                    isActive
                      ? [accent.border, accent.glow, 'z-20 border']
                      : 'hover:bg-white/[0.03] hover:border-white/10 z-10'
                  )}
                >
                  {/* Grid pattern background */}
                  <div className="pointer-events-none absolute top-0 left-0 h-full w-full opacity-30">
                    <GridPattern className="fill-white/5 stroke-white/10 h-full w-full" />
                  </div>

                  {/* Active glow pulse */}
                  {isActive && (
                    <motion.div
                      className={cn('absolute inset-0 pointer-events-none', accent.bg)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}

                  {/* Card content */}
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={cn('p-2 rounded-lg w-fit mb-4', accent.bg)}>
                      <Icon className={cn('size-5', accent.text)} strokeWidth={1.5} />
                    </div>

                    <h3 className="text-sm md:text-base font-bold text-white uppercase tracking-widest leading-snug mt-auto">
                      {feature.title}
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {feature.tags.map((tag) => (
                        <span
                          key={tag}
                          className={cn(
                            'font-mono text-[9px] tracking-widest uppercase border px-2 py-1 rounded',
                            isActive
                              ? [accent.text, 'border-current/30 bg-current/5']
                              : 'border-white/10 text-white/40 bg-white/[0.02]'
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Hint arrow */}
                    {!isActive && activeId === null && (
                      <div className={cn('mt-4 flex items-center gap-1 text-[10px] font-mono tracking-widest opacity-0 group-hover:opacity-100 transition-opacity', accent.text)}>
                        <span>EXPLORAR</span>
                        <ArrowRight size={10} />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Detail Panel */}
          <AnimatePresence>
            {activeFeature && (
              <motion.div
                key={`detail-${activeFeature.id}`}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.97 }}
                transition={{ type: 'spring', damping: 22, stiffness: 400 }}
                className={cn(
                  'relative z-30 mt-px border border-dashed p-8 md:p-10 bg-[#0b0b0b]',
                  accentMap[activeFeature.accent].border
                )}
              >
                {/* Background grid */}
                <div className="pointer-events-none absolute inset-0 opacity-20">
                  <GridPattern className="fill-white/5 stroke-white/10 h-full w-full" />
                </div>

                {/* Accent side bar */}
                <div className={cn('absolute left-0 top-8 bottom-8 w-0.5', accentMap[activeFeature.accent].bg.replace('/10', '/60'))} />

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                  {/* Icon + title */}
                  <div className="flex-shrink-0 flex flex-col items-start gap-4 md:w-56">
                    <div className={cn('p-3 rounded-xl', accentMap[activeFeature.accent].bg)}>
                      <activeFeature.icon
                        className={cn('size-7', accentMap[activeFeature.accent].text)}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <div className={cn('font-mono text-[10px] tracking-[0.25em] uppercase mb-1', accentMap[activeFeature.accent].text)}>
                        {activeFeature.shortTitle}
                      </div>
                      <h3 className="font-sans font-black text-xl md:text-2xl text-white uppercase tracking-tight leading-tight">
                        {activeFeature.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex-1">
                    <p className="text-white/70 text-sm md:text-base leading-relaxed font-sans">
                      {activeFeature.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-6">
                      {activeFeature.tags.map((tag) => (
                        <span
                          key={tag}
                          className={cn(
                            'font-mono text-[10px] tracking-widest uppercase border px-3 py-1.5 rounded',
                            accentMap[activeFeature.accent].text,
                            'border-current/30 bg-current/5'
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={() => setActiveId(null)}
                    className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 text-white/40 hover:text-white hover:border-white/30 hover:bg-white/10 transition-colors"
                    aria-label="Fechar"
                  >
                    <X size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hint text when nothing is active */}
        <AnimatePresence>
          {activeId === null && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase"
            >
              ↑ Clique em um item para explorar
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
