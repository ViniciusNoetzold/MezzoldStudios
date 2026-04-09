'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useFocusTrap }      from '@/hooks/useFocusTrap';
import { PerformanceBenchmarkSimulator } from './PerformanceBenchmarkSimulator';
import { LiveMonitoringDashboard }        from './LiveMonitoringDashboard';
import { UIComponentPlayground }          from './UIComponentPlayground';
import { MezzLink }                       from './MezzLink';
import { IoTTelemetryDashboard }          from './IoTTelemetryDashboard';
import { AutomationFlowVisualizer }       from './AutomationFlowVisualizer';
import { StackConfigurator }             from './StackConfigurator';
import { CodeQualityDiffViewer }          from './CodeQualityDiffViewer';
import { X, Zap, BarChart2, Layers, Link, Cpu, Workflow, Settings2, Code2 } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────

type Accent   = 'emerald' | 'cyan' | 'red' | 'amber';
type Category = 'PERFORMANCE' | 'DASHBOARD' | 'UI/UX' | 'MICRO-SAAS' | 'IOT' | 'AUTOMAÇÃO';

interface Case {
  id:          string;
  label:       string;
  category:    Category;
  title:       string;
  description: string;
  tags:        string[];
  accent:      Accent;
  icon:        LucideIcon;
  modalSize:   'md' | 'xl';
}

// ── Case definitions ──────────────────────────────────────────────────────────

const CASES: Case[] = [
  {
    id: 'performance', label: '[ PERFORMANCE ]', category: 'PERFORMANCE',
    title:       'Performance Benchmark Simulator',
    description: 'Analise a performance de qualquer site em tempo real. Visualize Core Web Vitals, TTFB, LCP e mais — com engine proprietária da Mezzold.',
    tags:        ['Core Web Vitals', 'Lighthouse', 'Next.js', 'Edge Network'],
    accent: 'emerald', icon: Zap, modalSize: 'md',
  },
  {
    id: 'monitoring', label: '[ DASHBOARD ]', category: 'DASHBOARD',
    title:       'Live Monitoring Dashboard',
    description: 'Centro de comando em tempo real com KPIs, gráficos animados e logs ao vivo — gerado por engine proprietária, sem backend.',
    tags:        ['Real-time', 'WebSockets', 'Recharts', 'Data Viz'],
    accent: 'cyan', icon: BarChart2, modalSize: 'xl',
  },
  {
    id: 'ui-playground', label: '[ DESIGN SYSTEM ]', category: 'UI/UX',
    title:       'UI Component Playground',
    description: 'Vitrine interativa do design system da Mezzold. Experimente ao vivo os componentes, estados e animações que o estúdio entrega.',
    tags:        ['Design System', 'Framer Motion', 'Tailwind v4', 'Storybook'],
    accent: 'red', icon: Layers, modalSize: 'xl',
  },
  {
    id: 'mezzlink', label: '[ MICRO-SAAS ]', category: 'MICRO-SAAS',
    title:       'MezzLink — Encurtador de Links',
    description: 'Produto SaaS funcional com encurtamento de URLs, analytics em tempo real, QR Code e persistência local — zero backend.',
    tags:        ['Micro-SaaS', 'localStorage', 'Analytics', 'Full-stack Demo'],
    accent: 'amber', icon: Link, modalSize: 'xl',
  },
  {
    id: 'iot-telemetry', label: '[ IOT & HARDWARE ]', category: 'IOT',
    title:       'IoT Telemetry Dashboard',
    description: 'Monitoramento de hardware e telemetria via MQTT. Visualização de topologia, status e diagnóstico de dispositivos embarcados em tempo real.',
    tags:        ['IoT', 'MQTT', 'Hardware', 'Real-time'],
    accent: 'emerald', icon: Cpu, modalSize: 'xl',
  },
  {
    id: 'automation-flow', label: '[ AUTOMAÇÃO ]', category: 'AUTOMAÇÃO',
    title:       'Automation Flow Visualizer',
    description: 'Diagrama interativo de pipeline event-driven. Dispare um evento e assista o fluxo percorrer cada nó em tempo real, com simulação de erros e recuperação automática.',
    tags:        ['Event-driven', 'Webhooks', 'BPMN', 'Resilience'],
    accent: 'cyan', icon: Workflow, modalSize: 'xl',
  },
  {
    id: 'stack-configurator', label: '[ CONSULTORIA ]', category: 'AUTOMAÇÃO',
    title:       'Stack Configurator',
    description: 'Monte seu stack ideal em 5 etapas guiadas e receba uma análise de complexidade, estimativa de prazo e proposta personalizada da Mezzold.',
    tags:        ['Tech Advisor', 'Lead Gen', 'Wizard', 'Consultivo'],
    accent: 'amber', icon: Settings2, modalSize: 'xl',
  },
  {
    id: 'code-quality', label: '[ REFATORAÇÃO ]', category: 'PERFORMANCE',
    title:       'Code Quality Diff Viewer',
    description: 'Visualizador interativo de antes vs depois de refatoração. N+1 queries, callback hell, O(n²) — transformados em código de produção.',
    tags:        ['Otimização', 'Refatoração', 'Performance', 'Code Review'],
    accent: 'red', icon: Code2, modalSize: 'xl',
  },
];

// ── Filter tabs ───────────────────────────────────────────────────────────────

type FilterKey = 'TODOS' | Category;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'TODOS',       label: 'TODOS'       },
  { key: 'PERFORMANCE', label: 'PERFORMANCE' },
  { key: 'DASHBOARD',   label: 'DASHBOARD'   },
  { key: 'UI/UX',       label: 'UI / UX'     },
  { key: 'MICRO-SAAS',  label: 'MICRO-SAAS'  },
  { key: 'IOT',         label: 'IOT'         },
  { key: 'AUTOMAÇÃO',   label: 'AUTOMAÇÃO'   },
];

// ── Accent styles ─────────────────────────────────────────────────────────────

const AC: Record<Accent, { label: string; border: string; hover: string; tag: string; btn: string; blob: string }> = {
  emerald: {
    label: 'text-emerald', border: 'border-emerald/20',
    hover:  'hover:border-emerald/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.07)]',
    tag:    'border-emerald/15 text-emerald/50',
    btn:    'bg-emerald/[0.08] border-emerald/30 text-emerald hover:bg-emerald/15 hover:border-emerald/50',
    blob:   'bg-emerald/10',
  },
  cyan: {
    label: 'text-cyan', border: 'border-cyan/20',
    hover:  'hover:border-cyan/40 hover:shadow-[0_0_40px_rgba(6,182,212,0.07)]',
    tag:    'border-cyan/15 text-cyan/50',
    btn:    'bg-cyan/[0.08] border-cyan/30 text-cyan hover:bg-cyan/15 hover:border-cyan/50',
    blob:   'bg-cyan/10',
  },
  red: {
    label: 'text-electric-red', border: 'border-electric-red/20',
    hover:  'hover:border-electric-red/40 hover:shadow-[0_0_40px_rgba(255,0,51,0.07)]',
    tag:    'border-electric-red/15 text-electric-red/50',
    btn:    'bg-electric-red/[0.08] border-electric-red/30 text-electric-red hover:bg-electric-red/15 hover:border-electric-red/50',
    blob:   'bg-electric-red/10',
  },
  amber: {
    label: 'text-amber-400', border: 'border-amber-400/20',
    hover:  'hover:border-amber-400/40 hover:shadow-[0_0_40px_rgba(251,191,36,0.07)]',
    tag:    'border-amber-400/15 text-amber-400/50',
    btn:    'bg-amber-400/[0.08] border-amber-400/30 text-amber-400 hover:bg-amber-400/15 hover:border-amber-400/50',
    blob:   'bg-amber-400/10',
  },
};

const MODAL_WIDTH: Record<'md' | 'xl', string> = {
  md: 'md:max-w-2xl',
  xl: 'md:max-w-4xl',
};

// ── Main component ─────────────────────────────────────────────────────────────

export function CasesGrid() {
  const [filter,   setFilter]   = useState<FilterKey>('TODOS');
  const [activeId, setActiveId] = useState<string | null>(null);
  const active    = CASES.find(c => c.id === activeId) ?? null;
  const modalRef  = useRef<HTMLDivElement>(null);

  // Scroll lock — compensates scrollbar width to prevent layout shift on Windows
  useLockBodyScroll(!!activeId);

  // Focus trap + Escape key — cleaned up automatically on unmount
  const closeModal = useCallback(() => setActiveId(null), []);
  useFocusTrap(modalRef, !!activeId, closeModal);

  const filtered = filter === 'TODOS' ? CASES : CASES.filter(c => c.category === filter);

  function changeFilter(key: FilterKey) {
    if (key === filter) return;
    setFilter(key);
  }

  return (
    <>
      {/* ── Filter tabs ── */}
      <div className="flex flex-wrap gap-1.5 mb-8">
        {FILTERS.map(f => {
          const isActive = f.key === filter;
          return (
            <button
              key={f.key}
              onClick={() => changeFilter(f.key)}
              className={[
                'relative font-mono text-[8px] tracking-[0.3em] uppercase px-3.5 py-2 rounded-lg border transition-all duration-200',
                isActive
                  ? 'border-blue-400/50 bg-blue-400/[0.09] text-blue-400'
                  : 'border-white/[0.08] text-white/28 hover:text-white/55 hover:border-white/18',
              ].join(' ')}
            >
              {isActive && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-lg bg-blue-400/[0.07] border border-blue-400/40"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{f.label}</span>
              {/* count bubble */}
              <span className={`relative ml-1.5 font-mono text-[6.5px] opacity-50 ${isActive ? 'text-blue-400' : 'text-white/20'}`}>
                {f.key === 'TODOS' ? CASES.length : CASES.filter(c => c.category === f.key).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Grid ── */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((c, i) => {
            const a    = AC[c.accent];
            const Icon = c.icon;
            return (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1,    y: 0  }}
                exit={{    opacity: 0, scale: 0.94, y: -8  }}
                transition={{ duration: 0.28, delay: i * 0.05 }}
                onClick={() => setActiveId(c.id)}
                className={[
                  'group relative border rounded-xl p-6 cursor-pointer transition-all duration-300',
                  'bg-white/[0.02] backdrop-blur-sm overflow-hidden',
                  a.border, a.hover,
                ].join(' ')}
              >
                {/* Corner bracket */}
                <div className={`absolute top-0 left-0 w-5 h-5 border-t border-l rounded-tl-xl pointer-events-none ${a.border}`} />

                {/* Hover blob */}
                <div className={`absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl ${a.blob}`} />

                {/* Category label */}
                <span className={`font-mono text-[9px] tracking-[0.4em] uppercase mb-4 block ${a.label}`}>
                  {c.label}
                </span>

                {/* Icon + title */}
                <div className="flex items-start gap-3 mb-3">
                  <div className={`shrink-0 w-9 h-9 rounded-lg border flex items-center justify-center ${a.border} bg-white/[0.03]`}>
                    <Icon size={14} className={a.label} />
                  </div>
                  <h2 className="font-sans font-black text-lg tracking-tight text-white leading-snug">
                    {c.title}
                  </h2>
                </div>

                {/* Description */}
                <p className="text-white/45 text-sm leading-[1.7] mb-5">{c.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {c.tags.map(tag => (
                    <span key={tag} className={`font-mono text-[8px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-md border bg-white/[0.02] ${a.tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>

                <button className={`font-mono text-[9px] tracking-[0.3em] uppercase px-4 py-2 rounded-lg border transition-all duration-200 ${a.btn}`}>
                  Ver demo →
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Coming soon — only in TODOS */}
        <AnimatePresence>
          {filter === 'TODOS' && (
            <motion.div
              key="coming-soon"
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1     }}
              exit={{    opacity: 0, scale: 0.94   }}
              transition={{ duration: 0.25 }}
              className="border border-white/[0.04] border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-3 min-h-[220px]"
            >
              <div className="w-px h-8 bg-white/[0.08]" />
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/12">Mais cases em breve</span>
              <div className="w-px h-8 bg-white/[0.08]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Empty state ── */}
      <AnimatePresence>
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="py-20 flex flex-col items-center gap-3"
          >
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/15">Nenhum case nessa categoria</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modal ── */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={closeModal}
              aria-hidden="true"
              className="fixed inset-0 z-[200] bg-black/82 backdrop-blur-sm"
            />
            <motion.div
              key="modal"
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              initial={{ opacity: 0, y: 36, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={{    opacity: 0, y: 18, scale: 0.97  }}
              transition={{ type: 'spring', stiffness: 310, damping: 30 }}
              className={[
                'fixed inset-x-3 top-[4%] bottom-[4%] z-[201] overflow-y-auto',
                'md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full',
                MODAL_WIDTH[active.modalSize],
              ].join(' ')}
            >
              <div className="sticky top-0 z-10 flex justify-end mb-3">
                <button
                  onClick={closeModal}
                  aria-label="Fechar demonstração"
                  className="w-9 h-9 rounded-lg border border-white/10 bg-black/85 backdrop-blur-md flex items-center justify-center text-white/35 hover:text-white hover:border-white/25 transition-all duration-200"
                >
                  <X size={13} />
                </button>
              </div>
              {active.id === 'performance'       && <PerformanceBenchmarkSimulator />}
              {active.id === 'monitoring'        && <LiveMonitoringDashboard />}
              {active.id === 'ui-playground'     && <UIComponentPlayground />}
              {active.id === 'mezzlink'          && <MezzLink />}
              {active.id === 'iot-telemetry'     && <IoTTelemetryDashboard />}
              {active.id === 'automation-flow'   && <AutomationFlowVisualizer />}
              {active.id === 'stack-configurator' && <StackConfigurator />}
              {active.id === 'code-quality'      && <CodeQualityDiffViewer />}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
