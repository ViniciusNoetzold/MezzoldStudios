'use client';

import { useState, useEffect, useRef, useCallback, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Webhook, ShieldCheck, Sparkles, Globe, Cpu, Database,
  Bell, Play, AlertTriangle, ChevronDown, Activity,
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────

type NodeStatus = 'idle' | 'running' | 'success' | 'error' | 'retry';

interface PipelineNode {
  id: string;
  label: string;
  sublabel: string;
  icon: React.FC<{ size?: number; className?: string }>;
  logs: string[];        // log lines shown when active
  errorLog?: string;     // shown on simulated error
}

interface Scenario {
  id: string;
  label: string;
  nodes: PipelineNode[];
}

// ── Scenarios ─────────────────────────────────────────────────────────────────

const SCENARIOS: Scenario[] = [
  {
    id: 'ecommerce',
    label: 'E-commerce Order',
    nodes: [
      { id: 'trigger',      label: 'WEBHOOK',       sublabel: 'Trigger',       icon: Webhook,     logs: ['POST /webhook/order', 'payload: 2.4 KB', 'auth: Bearer ✓'],            errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'validate',     label: 'VALIDAÇÃO',      sublabel: 'Schema & Rules', icon: ShieldCheck, logs: ['Validando schema JSON...', 'Verificando estoque...', 'stock_id: OK'],   errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'enrich',       label: 'ENRIQUECIMENTO', sublabel: 'Customer Data',  icon: Sparkles,    logs: ['Buscando perfil CRM...', 'LTV: R$ 4.280', 'Segmento: Premium'],        errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'external-api', label: 'API EXTERNA',    sublabel: 'Payment Gateway', icon: Globe,       logs: ['POST api.stripe.com', 'amount: R$ 399,00', 'charge_id: ch_3Qx...'],  errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'process',      label: 'PROCESSAMENTO',  sublabel: 'Order Engine',   icon: Cpu,         logs: ['Reservando estoque...', 'Calculando frete...', 'ETA: 3–5 dias'],       errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'db',           label: 'DATABASE',       sublabel: 'PostgreSQL',      icon: Database,    logs: ['INSERT orders (1 row)', 'UPDATE inventory', 'tx committed OK'],        errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'notify',       label: 'NOTIFICAÇÃO',    sublabel: 'Email + Push',   icon: Bell,        logs: ['Enviando e-mail cliente...', 'Push notif: entregue', 'SMS: OK'],       errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
    ],
  },
  {
    id: 'saas-billing',
    label: 'SaaS Billing',
    nodes: [
      { id: 'trigger',      label: 'CRON JOB',       sublabel: 'Scheduler',      icon: Activity,    logs: ['schedule: 0 9 * * *', 'triggered: 09:00 UTC', '247 subscriptions'],   errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'validate',     label: 'VALIDAÇÃO',      sublabel: 'Plan & Status',  icon: ShieldCheck, logs: ['Checando planos ativos...', 'trial_end: 3 próximos', 'overdue: 12'],  errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'enrich',       label: 'ENRIQUECIMENTO', sublabel: 'Usage Metrics',  icon: Sparkles,    logs: ['Coletando uso mensal...', 'api_calls: 84.302', 'storage: 12.4 GB'],   errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'external-api', label: 'API EXTERNA',    sublabel: 'Stripe Billing', icon: Globe,       logs: ['GET /subscriptions', 'charging 231 subs...', 'rate limit: ok'],       errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'process',      label: 'PROCESSAMENTO',  sublabel: 'Invoice Engine', icon: Cpu,         logs: ['Gerando 231 faturas...', 'Aplicando descontos...', 'tax: BR/SP'],      errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'db',           label: 'DATABASE',       sublabel: 'MongoDB',        icon: Database,    logs: ['upsert invoices: 231', 'update mrr: +R$12.8k', 'snapshot saved'],      errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'notify',       label: 'NOTIFICAÇÃO',    sublabel: 'Slack + Email',  icon: Bell,        logs: ['#billing channel: ✓', 'Relatório PDF enviado', 'audit log: OK'],      errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
    ],
  },
  {
    id: 'lead-capture',
    label: 'Lead Capture',
    nodes: [
      { id: 'trigger',      label: 'FORMULÁRIO',     sublabel: 'Web Hook',       icon: Webhook,     logs: ['POST /api/leads', 'origin: landing-v3', 'utm_source: google'],       errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'validate',     label: 'VALIDAÇÃO',      sublabel: 'Spam & Format',  icon: ShieldCheck, logs: ['reCAPTCHA score: 0.92', 'email syntax: OK', 'honeypot: clear'],      errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'enrich',       label: 'ENRIQUECIMENTO', sublabel: 'Lead Scoring',   icon: Sparkles,    logs: ['Clearbit lookup...', 'company: Acme Corp', 'score: 87/100'],         errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'external-api', label: 'API EXTERNA',    sublabel: 'HubSpot CRM',   icon: Globe,       logs: ['POST /crm/contacts', 'pipeline: MQL', 'owner: auto-assign'],         errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'process',      label: 'PROCESSAMENTO',  sublabel: 'Segmentation',   icon: Cpu,         logs: ['Classificando segmento...', 'ICP match: 94%', 'priority: HIGH'],     errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'db',           label: 'DATABASE',       sublabel: 'Supabase',       icon: Database,    logs: ['INSERT leads (1 row)', 'UPDATE score_history', 'realtime: emitted'], errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'notify',       label: 'NOTIFICAÇÃO',    sublabel: 'Sales Team',     icon: Bell,        logs: ['Slack #sales-hot: ✓', 'Email SDR: enviado', 'Calendly: agendado'],   errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
    ],
  },
];

// ── Timing constants ──────────────────────────────────────────────────────────

const NODE_DELAY_MS       = 1100; // delay between nodes activating
const NODE_RUNNING_MS     = 900;  // how long each node stays "running"
const PARTICLE_DURATION   = 0.75; // seconds for particle to travel an edge

// ── Status → style map ────────────────────────────────────────────────────────

const STATUS_STYLE: Record<NodeStatus, {
  border: string; glow: string; dot: string; label: string; bg: string;
}> = {
  idle:    { border: 'border-white/[0.09]',    glow: '',                                            dot: 'bg-white/20',          label: 'text-white/20', bg: 'bg-white/[0.015]' },
  running: { border: 'border-blue-400/60',     glow: 'shadow-[0_0_22px_rgba(96,165,250,0.18)]',    dot: 'bg-blue-400 animate-pulse', label: 'text-blue-400', bg: 'bg-blue-400/[0.06]' },
  success: { border: 'border-emerald/55',      glow: 'shadow-[0_0_18px_rgba(16,185,129,0.14)]',    dot: 'bg-emerald',           label: 'text-emerald',  bg: 'bg-emerald/[0.06]' },
  error:   { border: 'border-red-500/65',      glow: 'shadow-[0_0_22px_rgba(239,68,68,0.2)]',      dot: 'bg-red-500 animate-pulse', label: 'text-red-500', bg: 'bg-red-500/[0.07]' },
  retry:   { border: 'border-amber-400/65',    glow: 'shadow-[0_0_20px_rgba(251,191,36,0.18)]',    dot: 'bg-amber-400 animate-pulse', label: 'text-amber-400', bg: 'bg-amber-400/[0.06]' },
};

// ── SVG grid background ───────────────────────────────────────────────────────

function GridBg() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)
        `,
        backgroundSize: '28px 28px',
      }}
    />
  );
}

// ── Individual pipeline node ──────────────────────────────────────────────────

interface NodeCardProps {
  node: PipelineNode;
  status: NodeStatus;
  logLine: string;
  index: number;
  isMobile: boolean;
}

function NodeCard({ node, status, logLine, index, isMobile }: NodeCardProps) {
  const s = STATUS_STYLE[status];
  const Icon = node.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: isMobile ? 10 : 0, x: isMobile ? 0 : 10 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className={[
        'relative flex flex-col border rounded-xl p-2.5 transition-all duration-400 select-none overflow-hidden',
        'flex-1 min-w-0',
        s.border, s.glow, s.bg,
      ].join(' ')}
    >
      {/* Corner accent */}
      <div className={`absolute top-0 left-0 w-4 h-4 border-t border-l rounded-tl-xl pointer-events-none ${s.border}`} />

      {/* Status dot */}
      <div className={`absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />

      {/* Icon */}
      <div className={`w-7 h-7 rounded-lg border flex items-center justify-center mb-1.5 shrink-0 transition-colors duration-300 ${s.border} ${s.bg}`}>
        <Icon size={12} className={`${s.label} transition-colors duration-300`} />
      </div>

      {/* Labels */}
      <span className={`font-mono font-bold text-[7.5px] tracking-[0.18em] uppercase truncate block ${s.label} transition-colors duration-300`}>
        {node.label}
      </span>
      <span className="font-mono text-[6.5px] tracking-[0.12em] text-white/22 uppercase mt-0.5 truncate block leading-tight">
        {node.sublabel}
      </span>

      {/* Mini log */}
      <AnimatePresence>
        {logLine && (
          <motion.div
            key={logLine}
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className={`font-mono text-[7.5px] leading-relaxed px-2 py-1.5 rounded-md bg-black/35 border border-white/[0.05] ${
              status === 'error' ? 'text-red-400' : status === 'retry' ? 'text-amber-400' : 'text-white/40'
            }`}>
              {logLine}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Animated edge (SVG line + travelling particle) ────────────────────────────

interface EdgeProps {
  fromIndex: number;
  toIndex: number;
  totalNodes: number;
  active: boolean;       // particle should travel
  done: boolean;         // permanently lit after success
  isMobile: boolean;
  gradientId: string;
}

function Edge({ fromIndex, active, done, isMobile, gradientId }: EdgeProps) {
  // Particle key increments each time "active" becomes true to re-trigger animation
  const [particleKey, setParticleKey] = useState(0);

  useEffect(() => {
    if (active) setParticleKey(k => k + 1);
  }, [active]);

  const strokeColor = done  ? 'rgba(16,185,129,0.55)'
                    : active ? `url(#${gradientId})`
                    : 'rgba(255,255,255,0.06)';

  if (isMobile) {
    // Vertical connector
    return (
      <div className="flex flex-col items-center py-1 shrink-0" style={{ height: 28, width: 1 }}>
        <svg width="4" height="28" viewBox="0 0 4 28" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id={`${gradientId}-v`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <line
            x1="2" y1="0" x2="2" y2="28"
            stroke={done ? 'rgba(16,185,129,0.55)' : 'rgba(255,255,255,0.07)'}
            strokeWidth="1"
            strokeDasharray={done ? 'none' : '3 3'}
          />
          {/* Travelling particle */}
          {active && (
            <motion.circle
              key={`${particleKey}-v`}
              r="2.5"
              fill="#3b82f6"
              filter={`url(#glow-${gradientId})`}
              initial={{ cy: 0, opacity: 1 }}
              animate={{ cy: 28, opacity: [1, 1, 0] }}
              transition={{ duration: PARTICLE_DURATION, ease: 'easeInOut' }}
              cx="2"
            />
          )}
          <defs>
            <filter id={`glow-${gradientId}`}>
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
        </svg>
      </div>
    );
  }

  // Horizontal connector (desktop)
  return (
    <div className="flex items-center shrink-0" style={{ width: 20, minWidth: 12 }}>
      <svg width="20" height="4" viewBox="0 0 20 4" style={{ overflow: 'visible', width: '100%' }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <filter id={`glow-${gradientId}`}>
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Arrow line */}
        <line
          x1="0" y1="2" x2="18" y2="2"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeDasharray={done || active ? 'none' : '3 3'}
          style={{ transition: 'stroke 0.4s' }}
        />
        {/* Arrowhead */}
        <polygon
          points="16,0 20,2 16,4"
          fill={done ? 'rgba(16,185,129,0.5)' : active ? '#3b82f6' : 'rgba(255,255,255,0.08)'}
          style={{ transition: 'fill 0.4s' }}
        />
        {/* Travelling particle */}
        {active && (
          <motion.circle
            key={particleKey}
            r="2.5"
            fill="#60a5fa"
            filter={`url(#glow-${gradientId})`}
            initial={{ cx: 0, opacity: 1 }}
            animate={{ cx: 18, opacity: [1, 1, 0] }}
            transition={{ duration: PARTICLE_DURATION, ease: 'linear' }}
            cy="2"
          />
        )}
      </svg>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

type RunPhase = 'idle' | 'running' | 'complete' | 'error-recovery';

export function AutomationFlowVisualizer() {
  const uid = useId();
  const [scenarioIdx, setScenarioIdx]   = useState(0);
  const [phase, setPhase]               = useState<RunPhase>('idle');
  const [statuses, setStatuses]         = useState<NodeStatus[]>([]);
  const [logLines, setLogLines]         = useState<string[]>([]);
  const [activeEdge, setActiveEdge]     = useState<number | null>(null);
  const [doneEdges, setDoneEdges]       = useState<Set<number>>(new Set());
  const [eventCount, setEventCount]     = useState(0);
  const [elapsed, setElapsed]           = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile]         = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const startRef = useRef<number>(0);

  const scenario = SCENARIOS[scenarioIdx];
  const nodes    = scenario.nodes;
  const nodeCount = nodes.length;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Reset state when scenario changes
  useEffect(() => {
    clearAllTimers();
    setPhase('idle');
    setStatuses(Array(nodeCount).fill('idle'));
    setLogLines(Array(nodeCount).fill(''));
    setActiveEdge(null);
    setDoneEdges(new Set());
    setElapsed(null);
  }, [scenarioIdx, nodeCount]);

  // Init on mount
  useEffect(() => {
    setStatuses(Array(nodeCount).fill('idle'));
    setLogLines(Array(nodeCount).fill(''));
  }, [nodeCount]);

  function clearAllTimers() {
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
  }

  function addTimer(fn: () => void, delay: number) {
    timerRef.current.push(setTimeout(fn, delay));
  }

  const runPipeline = useCallback((withError: boolean) => {
    if (phase === 'running') return;
    clearAllTimers();
    startRef.current = Date.now();

    // Reset everything
    setPhase('running');
    setElapsed(null);
    setDoneEdges(new Set());
    setActiveEdge(null);
    const fresh: NodeStatus[] = Array(nodeCount).fill('idle');
    const freshLogs: string[] = Array(nodeCount).fill('');
    setStatuses([...fresh]);
    setLogLines([...freshLogs]);

    const errorNodeIdx = withError ? 3 : -1; // API EXTERNA = index 3

    nodes.forEach((node, i) => {
      const base = i * (NODE_DELAY_MS + NODE_RUNNING_MS);

      // Fire edge particle just before node activates
      if (i > 0) {
        addTimer(() => setActiveEdge(i - 1), base - 50);
      }

      // Activate node
      addTimer(() => {
        setStatuses(prev => {
          const next = [...prev];
          next[i] = 'running';
          return next;
        });
        // Show first log line
        addTimer(() => {
          setLogLines(prev => {
            const next = [...prev];
            next[i] = node.logs[0];
            return next;
          });
        }, 150);
        // Second log
        addTimer(() => {
          setLogLines(prev => {
            const next = [...prev];
            next[i] = node.logs[1] ?? node.logs[0];
            return next;
          });
        }, 450);
        // Third log
        addTimer(() => {
          setLogLines(prev => {
            const next = [...prev];
            next[i] = node.logs[2] ?? node.logs[1] ?? node.logs[0];
            return next;
          });
        }, 720);
      }, base);

      // Complete node
      addTimer(() => {
        if (i === errorNodeIdx) {
          // Error state
          setStatuses(prev => { const n = [...prev]; n[i] = 'error'; return n; });
          setLogLines(prev => { const n = [...prev]; n[i] = node.errorLog ?? '⚠ Erro desconhecido'; return n; });

          // Retry after 2s
          addTimer(() => {
            setStatuses(prev => { const n = [...prev]; n[i] = 'retry'; return n; });
            setLogLines(prev => { const n = [...prev]; n[i] = '↺ Retry 1/3 — aguardando 2s...'; return n; });
          }, 1800);

          // Recover and continue
          addTimer(() => {
            setStatuses(prev => { const n = [...prev]; n[i] = 'success'; return n; });
            setLogLines(prev => { const n = [...prev]; n[i] = node.logs[2] ?? node.logs[0]; return n; });
            setDoneEdges(prev => new Set([...prev, i - 1]));

            // Continue remaining nodes
            const remaining = nodes.slice(i + 1);
            remaining.forEach((rNode, ri) => {
              const rBase = (ri + 1) * (NODE_DELAY_MS + NODE_RUNNING_MS);
              addTimer(() => setActiveEdge(i + ri), rBase - 50);
              addTimer(() => {
                setStatuses(prev => { const n = [...prev]; n[i + ri + 1] = 'running'; return n; });
                addTimer(() => { setLogLines(prev => { const n = [...prev]; n[i + ri + 1] = rNode.logs[0]; return n; }); }, 150);
                addTimer(() => { setLogLines(prev => { const n = [...prev]; n[i + ri + 1] = rNode.logs[1] ?? rNode.logs[0]; return n; }); }, 450);
                addTimer(() => { setLogLines(prev => { const n = [...prev]; n[i + ri + 1] = rNode.logs[2] ?? rNode.logs[0]; return n; }); }, 720);
              }, rBase);
              addTimer(() => {
                setStatuses(prev => { const n = [...prev]; n[i + ri + 1] = 'success'; return n; });
                setDoneEdges(prev => new Set([...prev, i + ri]));
                setActiveEdge(null);
                if (ri === remaining.length - 1) {
                  setPhase('complete');
                  setEventCount(c => c + 1);
                  setElapsed(Date.now() - startRef.current);
                }
              }, rBase + NODE_RUNNING_MS);
            });
          }, 4000); // recovery delay
        } else {
          // Normal success
          setStatuses(prev => { const n = [...prev]; n[i] = 'success'; return n; });
          if (i > 0) setDoneEdges(prev => new Set([...prev, i - 1]));
          setActiveEdge(null);

          if (i === nodeCount - 1) {
            setPhase('complete');
            setEventCount(c => c + 1);
            setElapsed(Date.now() - startRef.current);
          }
        }
      }, base + NODE_RUNNING_MS);
    });
  }, [phase, nodes, nodeCount]);

  const canRun = phase !== 'running';

  return (
    <div className="w-full relative rounded-xl overflow-hidden" style={{ background: '#040609' }}>
      <GridBg />

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="relative flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 border-b border-white/[0.07]"
        style={{ background: 'rgba(16,185,129,0.025)' }}>

        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg border border-emerald/30 bg-emerald/[0.07] flex items-center justify-center">
            <Activity size={13} className="text-emerald" />
          </div>
          <div>
            <span className="font-mono font-bold text-[10px] tracking-[0.25em] uppercase text-white/80">
              AUTOMATION FLOW
            </span>
            <p className="font-mono text-[7px] tracking-[0.2em] text-white/22 uppercase">
              event-driven pipeline visualizer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Scenario selector */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(o => !o)}
              disabled={phase === 'running'}
              className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-white/[0.1] bg-white/[0.03] font-mono text-[8px] tracking-[0.2em] uppercase text-white/40 hover:text-white/65 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            >
              <span className="text-emerald/60">CENÁRIO:</span>
              <span className="text-white/55">{SCENARIOS[scenarioIdx].label}</span>
              <ChevronDown size={9} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-1.5 right-0 z-20 bg-[#070b0f] border border-white/[0.1] rounded-lg overflow-hidden min-w-[180px] shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
                >
                  {SCENARIOS.map((sc, i) => (
                    <button
                      key={sc.id}
                      onClick={() => { setScenarioIdx(i); setDropdownOpen(false); }}
                      className={[
                        'w-full text-left px-3.5 py-2.5 font-mono text-[8px] tracking-[0.2em] uppercase transition-colors duration-150',
                        i === scenarioIdx
                          ? 'text-emerald bg-emerald/[0.07] border-l-2 border-emerald'
                          : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03] border-l-2 border-transparent',
                      ].join(' ')}
                    >
                      {sc.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA buttons */}
          <button
            onClick={() => runPipeline(false)}
            disabled={!canRun}
            className="flex items-center gap-1.5 h-8 px-4 rounded-lg border border-emerald/40 bg-emerald/[0.08] font-mono text-[8px] tracking-[0.25em] uppercase text-emerald hover:bg-emerald/15 hover:border-emerald/60 hover:shadow-[0_0_18px_rgba(16,185,129,0.2)] disabled:opacity-35 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.97]"
          >
            <Play size={9} />
            DISPARAR EVENTO
          </button>

          <button
            onClick={() => runPipeline(true)}
            disabled={!canRun}
            className="flex items-center gap-1.5 h-8 px-4 rounded-lg border border-amber-400/35 bg-amber-400/[0.06] font-mono text-[8px] tracking-[0.25em] uppercase text-amber-400/80 hover:bg-amber-400/12 hover:border-amber-400/55 disabled:opacity-35 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.97]"
          >
            <AlertTriangle size={9} />
            SIMULAR ERRO
          </button>
        </div>
      </div>

      {/* ── Pipeline canvas — overflow-x-auto as safety valve ── */}
      <div className="relative px-3 py-5 md:px-4 overflow-x-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={scenarioIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={[
              'flex gap-0',
              isMobile ? 'flex-col items-center' : 'flex-row items-start md:items-center justify-center',
            ].join(' ')}
          >
            {nodes.map((node, i) => (
              <div
                key={node.id}
                className={[
                  'flex',
                  isMobile ? 'flex-col items-center w-full max-w-[240px]' : 'flex-row items-center',
                ].join(' ')}
              >
                <NodeCard
                  node={node}
                  status={statuses[i] ?? 'idle'}
                  logLine={logLines[i] ?? ''}
                  index={i}
                  isMobile={isMobile}
                />
                {i < nodeCount - 1 && (
                  <Edge
                    fromIndex={i}
                    toIndex={i + 1}
                    totalNodes={nodeCount}
                    active={activeEdge === i}
                    done={doneEdges.has(i)}
                    isMobile={isMobile}
                    gradientId={`${uid}-edge-${i}`}
                  />
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <div className="relative flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-t border-white/[0.05]"
        style={{ background: 'rgba(0,0,0,0.25)' }}>

        {/* Event counter */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[7px] tracking-[0.3em] uppercase text-white/20">
            Eventos processados hoje:
          </span>
          <motion.span
            key={eventCount}
            initial={{ opacity: 0.4, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="font-mono font-bold text-[11px] text-emerald tabular-nums"
          >
            {eventCount.toLocaleString('pt-BR')}
          </motion.span>
        </div>

        {/* Pipeline result */}
        <AnimatePresence>
          {phase === 'complete' && elapsed !== null && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="font-mono text-[8px] tracking-[0.2em] uppercase text-emerald flex items-center gap-2"
            >
              <span className="text-emerald/50">✓</span>
              PIPELINE CONCLUÍDO — {elapsed}ms
            </motion.div>
          )}
          {(phase === 'running') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5"
            >
              <motion.span
                className="inline-block w-[3px] h-[10px] rounded-[1px] bg-blue-400/60"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.65, repeat: Infinity, repeatType: 'reverse' }}
              />
              <span className="font-mono text-[7px] tracking-[0.3em] uppercase text-blue-400/60">
                PROCESSANDO...
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <span className="font-mono text-[7px] tracking-[0.18em] uppercase text-white/10">
          Powered by Mezzold Automation Engine™
        </span>
      </div>
    </div>
  );
}
