'use client';

import { useRef, useState, useCallback, useEffect, type RefObject } from 'react';
import { createPortal } from 'react-dom';
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
import { Parallax3DCard } from '@/components/ui/parallax-3d-card';
import { BGPattern } from '@/components/ui/bg-pattern';

// ── Types ──────────────────────────────────────────────────────────────────────

type Accent   = 'emerald' | 'cyan' | 'red' | 'amber';
type Category = 'PERFORMANCE' | 'DASHBOARD' | 'UI/UX' | 'MICRO-SAAS' | 'IOT' | 'AUTOMAÇÃO';

interface Case {
  id:          string;
  label:       string;
  category:    Category;
  context:     string;
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
    context:     'Quer saber se seu site é rápido?',
    title:       'Performance Benchmark Simulator',
    description: 'Analise a performance de qualquer site em tempo real. Visualize Core Web Vitals, TTFB, LCP e mais — com engine proprietária da Mezzold.',
    tags:        ['Core Web Vitals', 'Lighthouse', 'Next.js', 'Edge Network'],
    accent: 'emerald', icon: Zap, modalSize: 'md',
  },
  {
    id: 'monitoring', label: '[ DASHBOARD ]', category: 'DASHBOARD',
    context:     'Veja um painel de controle ao vivo',
    title:       'Live Monitoring Dashboard',
    description: 'Centro de comando em tempo real com KPIs, gráficos animados e logs ao vivo — gerado por engine proprietária, sem backend.',
    tags:        ['Real-time', 'WebSockets', 'Recharts', 'Data Viz'],
    accent: 'cyan', icon: BarChart2, modalSize: 'xl',
  },
  {
    id: 'ui-playground', label: '[ DESIGN SYSTEM ]', category: 'UI/UX',
    context:     'Explore nossos componentes de interface',
    title:       'UI Component Playground',
    description: 'Vitrine interativa do design system da Mezzold. Experimente ao vivo os componentes, estados e animações que o estúdio entrega.',
    tags:        ['Design System', 'Framer Motion', 'Tailwind v4', 'Storybook'],
    accent: 'red', icon: Layers, modalSize: 'xl',
  },
  {
    id: 'mezzlink', label: '[ PRODUTO REAL — DEMO AO VIVO ]', category: 'MICRO-SAAS',
    context:     'Um produto real, construído do zero',
    title:       'MezzLink — Encurtador de Links',
    description: 'Produto SaaS funcional com encurtamento de URLs, analytics em tempo real, QR Code e persistência local — zero backend.',
    tags:        ['Micro-SaaS', 'localStorage', 'Analytics', 'Full-stack Demo'],
    accent: 'amber', icon: Link, modalSize: 'xl',
  },
  {
    id: 'iot-telemetry', label: '[ IOT & HARDWARE ]', category: 'IOT',
    context:     'Hardware conectado à nuvem',
    title:       'IoT Telemetry Dashboard',
    description: 'Monitoramento de hardware e telemetria via MQTT. Visualização de topologia, status e diagnóstico de dispositivos embarcados em tempo real.',
    tags:        ['IoT', 'MQTT', 'Hardware', 'Real-time'],
    accent: 'emerald', icon: Cpu, modalSize: 'xl',
  },
  {
    id: 'automation-flow', label: '[ AUTOMAÇÃO ]', category: 'AUTOMAÇÃO',
    context:     'Processos automáticos sem intervenção humana',
    title:       'Automation Flow Visualizer',
    description: 'Diagrama interativo de pipeline event-driven. Dispare um evento e assista o fluxo percorrer cada nó em tempo real, com simulação de erros e recuperação automática.',
    tags:        ['Event-driven', 'Webhooks', 'BPMN', 'Resilience'],
    accent: 'cyan', icon: Workflow, modalSize: 'xl',
  },
  {
    id: 'stack-configurator', label: '[ CONSULTORIA ]', category: 'AUTOMAÇÃO',
    context:     'Monte o projeto ideal para o seu negócio',
    title:       'Stack Configurator',
    description: 'Monte seu stack ideal em 5 etapas guiadas e receba uma análise de complexidade, estimativa de prazo e proposta personalizada da Mezzold.',
    tags:        ['Tech Advisor', 'Lead Gen', 'Wizard', 'Consultivo'],
    accent: 'amber', icon: Settings2, modalSize: 'xl',
  },
  {
    id: 'code-quality', label: '[ REFATORAÇÃO ]', category: 'PERFORMANCE',
    context:     'Código ruim custa dinheiro. Veja a diferença.',
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
  xl: 'md:max-w-5xl',
};

// ── Cover art styles per accent ───────────────────────────────────────────────



// ── Portal modal — rendered at document.body to escape stacking contexts ────────

function CaseModal({
  active,
  closeModal,
  modalRef,
}: {
  active: Case | null;
  closeModal: () => void;
  modalRef: RefObject<HTMLDivElement | null>;
}) {
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {active && (
        <motion.div
          key="case-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeModal}
          aria-hidden="true"
          className="fixed inset-0 z-[500] bg-black/82 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
        >
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: 14, scale: 0.97  }}
            transition={{ type: 'spring', stiffness: 310, damping: 30 }}
            onClick={e => e.stopPropagation()}
            className={[
              'flex flex-col w-full max-h-[88vh] rounded-2xl overflow-hidden',
              MODAL_WIDTH[active.modalSize],
            ].join(' ')}
          >
            {/* Non-scrolling header — X button always reachable */}
            <div className="shrink-0 flex justify-end px-3 pt-3 pb-1">
              <button
                onClick={closeModal}
                aria-label="Fechar demonstração"
                className="w-9 h-9 rounded-lg border border-white/10 bg-black/85 backdrop-blur-md flex items-center justify-center text-white/35 hover:text-white hover:border-white/30 transition-all duration-200 shadow-lg"
              >
                <X size={13} />
              </button>
            </div>

            {/* Scrollable demo content */}
            <div className="overflow-y-auto flex-1">
              {active.id === 'performance'        && <PerformanceBenchmarkSimulator />}
              {active.id === 'monitoring'         && <LiveMonitoringDashboard />}
              {active.id === 'ui-playground'      && <UIComponentPlayground />}
              {active.id === 'mezzlink'           && <MezzLink />}
              {active.id === 'iot-telemetry'      && <IoTTelemetryDashboard />}
              {active.id === 'automation-flow'    && <AutomationFlowVisualizer />}
              {active.id === 'stack-configurator' && <StackConfigurator />}
              {active.id === 'code-quality'       && <CodeQualityDiffViewer />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

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
      <motion.div layout className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dots background */}
        <BGPattern
          variant="dots"
          fill="rgba(255,255,255,0.04)"
          size={22}
          mask="fade-edges"
          className="rounded-2xl"
        />

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
              >
                <Parallax3DCard
                  onClick={() => setActiveId(c.id)}
                  className="w-full h-full"
                >
                  <div
                    className={[
                      'group relative w-full h-full border rounded-2xl overflow-hidden transition-all duration-500',
                      'bg-black/20 backdrop-blur-md',
                      a.border, a.hover,
                    ].join(' ')}
                  >
                    {/* Background Pattern inside card */}
                    <div className="absolute inset-0 z-0 opacity-[0.10]">
                      <BGPattern variant="dots" fill="rgba(255,255,255,1)" size={24} mask="fade-bottom" />
                    </div>

                    {/* Inner content wrapper with translateZ for parallax */}
                    <div
                      style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}
                      className="relative z-10 flex flex-col p-8 h-full"
                    >
                      {/* Corner bracket */}
                      <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-2xl pointer-events-none transition-colors duration-300 ${a.border}`} />

                      {/* Hover blob */}
                      <div className={`absolute top-0 right-0 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[80px] -translate-y-1/2 translate-x-1/4 ${a.blob}`} />

                      {/* Top section: Category & Context */}
                      <div style={{ transform: 'translateZ(20px)' }} className="mb-6 perspective-[1000px]">
                        <span className={`font-mono text-[9px] tracking-[0.4em] uppercase mb-4 block ${a.label}`}>
                          {c.label}
                        </span>
                        <p className="font-mono text-[9px] tracking-[0.15em] text-white/40 italic leading-snug">
                          {c.context}
                        </p>
                      </div>

                      {/* Middle section: Icon, Title */}
                      <div style={{ transform: 'translateZ(30px)' }} className="mb-6 perspective-[1000px]">
                        <div className="flex items-center gap-4 mb-5">
                          <div className={`shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center ${a.border} bg-white/[0.03] shadow-inner group-hover:bg-white/[0.06] transition-colors duration-300`}>
                            <Icon size={20} className={a.label} />
                          </div>
                          <h2 className="font-sans font-black text-xl tracking-tight text-white leading-snug">
                            {c.title}
                          </h2>
                        </div>
                        {/* Dynamic gradient divider line based on accent color */}
                        <div className="h-px w-full bg-white/[0.08]" />
                      </div>

                      {/* Description */}
                      <p style={{ transform: 'translateZ(10px)' }} className="text-white/50 text-sm leading-relaxed mb-8 flex-1 perspective-[1000px]">
                        {c.description}
                      </p>

                      {/* Bottom section: Tags & Button */}
                      <div style={{ transform: 'translateZ(25px)' }} className="mt-auto flex flex-col gap-6 perspective-[1000px]">
                        <div className="flex flex-wrap gap-2">
                          {c.tags.map(tag => (
                            <span key={tag} className={`font-mono text-[8.5px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-md border bg-black/40 backdrop-blur-sm shadow-[inset_0_1px_rgba(255,255,255,0.05)] ${a.tag}`}>
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2">
                          <button className={`font-mono text-[9px] tracking-[0.3em] uppercase px-5 py-3 rounded-lg border transition-all duration-300 backdrop-blur-md group-hover:shadow-lg ${a.btn}`}>
                            Ver demonstração →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Parallax3DCard>
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

      {/* ── Modal portal (renders at document.body — above header) ── */}
      <CaseModal active={active} closeModal={closeModal} modalRef={modalRef} />
    </>
  );
}
