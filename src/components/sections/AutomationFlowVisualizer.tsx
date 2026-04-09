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
  logs: string[];
  errorLog?: string;
}

interface Scenario {
  id: string;
  label: string;
  nodes: PipelineNode[];
}

// ── Scenarios (unchanged) ─────────────────────────────────────────────────────

const SCENARIOS: Scenario[] = [
  {
    id: 'ecommerce',
    label: 'E-commerce Order',
    nodes: [
      { id: 'trigger',      label: 'WEBHOOK',       sublabel: 'Trigger',        icon: Webhook,     logs: ['POST /webhook/order', 'payload: 2.4 KB', 'auth: Bearer ✓'],           errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'validate',     label: 'VALIDAÇÃO',      sublabel: 'Schema & Rules', icon: ShieldCheck, logs: ['Validando schema JSON...', 'Verificando estoque...', 'stock_id: OK'],  errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'enrich',       label: 'ENRIQUECIMENTO', sublabel: 'Customer Data',  icon: Sparkles,    logs: ['Buscando perfil CRM...', 'LTV: R$ 4.280', 'Segmento: Premium'],       errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'external-api', label: 'API EXTERNA',    sublabel: 'Payment Gateway',icon: Globe,       logs: ['POST api.stripe.com', 'amount: R$ 399,00', 'charge_id: ch_3Qx...'],  errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'process',      label: 'PROCESSAMENTO',  sublabel: 'Order Engine',   icon: Cpu,         logs: ['Reservando estoque...', 'Calculando frete...', 'ETA: 3–5 dias'],      errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'db',           label: 'DATABASE',       sublabel: 'PostgreSQL',     icon: Database,    logs: ['INSERT orders (1 row)', 'UPDATE inventory', 'tx committed OK'],       errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'notify',       label: 'NOTIFICAÇÃO',    sublabel: 'Email + Push',   icon: Bell,        logs: ['Enviando e-mail cliente...', 'Push notif: entregue', 'SMS: OK'],      errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
    ],
  },
  {
    id: 'saas-billing',
    label: 'SaaS Billing',
    nodes: [
      { id: 'trigger',      label: 'CRON JOB',       sublabel: 'Scheduler',      icon: Activity,    logs: ['schedule: 0 9 * * *', 'triggered: 09:00 UTC', '247 subscriptions'],  errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'validate',     label: 'VALIDAÇÃO',      sublabel: 'Plan & Status',  icon: ShieldCheck, logs: ['Checando planos ativos...', 'trial_end: 3 próximos', 'overdue: 12'], errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'enrich',       label: 'ENRIQUECIMENTO', sublabel: 'Usage Metrics',  icon: Sparkles,    logs: ['Coletando uso mensal...', 'api_calls: 84.302', 'storage: 12.4 GB'],  errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'external-api', label: 'API EXTERNA',    sublabel: 'Stripe Billing', icon: Globe,       logs: ['GET /subscriptions', 'charging 231 subs...', 'rate limit: ok'],      errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'process',      label: 'PROCESSAMENTO',  sublabel: 'Invoice Engine', icon: Cpu,         logs: ['Gerando 231 faturas...', 'Aplicando descontos...', 'tax: BR/SP'],     errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'db',           label: 'DATABASE',       sublabel: 'MongoDB',        icon: Database,    logs: ['upsert invoices: 231', 'update mrr: +R$12.8k', 'snapshot saved'],     errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'notify',       label: 'NOTIFICAÇÃO',    sublabel: 'Slack + Email',  icon: Bell,        logs: ['#billing channel: ✓', 'Relatório PDF enviado', 'audit log: OK'],     errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
    ],
  },
  {
    id: 'lead-capture',
    label: 'Lead Capture',
    nodes: [
      { id: 'trigger',      label: 'FORMULÁRIO',     sublabel: 'Web Hook',       icon: Webhook,     logs: ['POST /api/leads', 'origin: landing-v3', 'utm_source: google'],      errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'validate',     label: 'VALIDAÇÃO',      sublabel: 'Spam & Format',  icon: ShieldCheck, logs: ['reCAPTCHA score: 0.92', 'email syntax: OK', 'honeypot: clear'],     errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'enrich',       label: 'ENRIQUECIMENTO', sublabel: 'Lead Scoring',   icon: Sparkles,    logs: ['Clearbit lookup...', 'company: Acme Corp', 'score: 87/100'],        errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'external-api', label: 'API EXTERNA',    sublabel: 'HubSpot CRM',    icon: Globe,       logs: ['POST /crm/contacts', 'pipeline: MQL', 'owner: auto-assign'],        errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'process',      label: 'PROCESSAMENTO',  sublabel: 'Segmentation',   icon: Cpu,         logs: ['Classificando segmento...', 'ICP match: 94%', 'priority: HIGH'],    errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'db',           label: 'DATABASE',       sublabel: 'Supabase',       icon: Database,    logs: ['INSERT leads (1 row)', 'UPDATE score_history', 'realtime: emitted'],errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
      { id: 'notify',       label: 'NOTIFICAÇÃO',    sublabel: 'Sales Team',     icon: Bell,        logs: ['Slack #sales-hot: ✓', 'Email SDR: enviado', 'Calendly: agendado'],  errorLog: '⚠ Timeout após 5000ms — Ativando retry...' },
    ],
  },
];

// ── Timing constants (unchanged) ──────────────────────────────────────────────

const NODE_DELAY_MS     = 1100;
const NODE_RUNNING_MS   = 900;
const PARTICLE_DURATION = 0.75;

// ── Pipeline log entries ──────────────────────────────────────────────────────

interface LogEntry {
  id: number;
  time: string;
  node: string;
  msg: string;
  type: 'info' | 'success' | 'warn' | 'error';
}

let _logId = 0;
function makeLog(node: string, msg: string, type: LogEntry['type'] = 'info'): LogEntry {
  const now = new Date();
  const p   = (n: number) => String(n).padStart(2, '0');
  return {
    id:   ++_logId,
    time: `${p(now.getHours())}:${p(now.getMinutes())}:${p(now.getSeconds())}`,
    node, msg, type,
  };
}

// ── Status config (glassmorphism-aware) ───────────────────────────────────────

interface StatusCfg {
  borderClass: string;
  bgRgba:      string;
  glowShadow:  string;
  dotClass:    string;
  textClass:   string;
  edgeColor:   string;
}

const STATUS_CFG: Record<NodeStatus, StatusCfg> = {
  idle:    { borderClass: 'border-white/[0.10]',   bgRgba: 'rgba(255,255,255,0.04)', glowShadow: 'none',                              dotClass: 'bg-white/20',              textClass: 'text-white/30',  edgeColor: 'rgba(255,255,255,0.15)' },
  running: { borderClass: 'border-blue-400/75',    bgRgba: 'rgba(59,130,246,0.07)',  glowShadow: '0 0 20px rgba(59,130,246,0.30)',    dotClass: 'bg-blue-400 animate-pulse', textClass: 'text-blue-400',  edgeColor: '#3b82f6' },
  success: { borderClass: 'border-emerald/65',     bgRgba: 'rgba(16,185,129,0.07)',  glowShadow: '0 0 20px rgba(16,185,129,0.25)',    dotClass: 'bg-emerald',               textClass: 'text-emerald',   edgeColor: 'rgba(16,185,129,0.55)' },
  error:   { borderClass: 'border-red-500/70',     bgRgba: 'rgba(239,68,68,0.07)',   glowShadow: '0 0 20px rgba(239,68,68,0.28)',     dotClass: 'bg-red-500 animate-pulse',  textClass: 'text-red-400',   edgeColor: 'rgba(239,68,68,0.50)' },
  retry:   { borderClass: 'border-amber-400/70',   bgRgba: 'rgba(251,191,36,0.07)',  glowShadow: '0 0 20px rgba(251,191,36,0.22)',    dotClass: 'bg-amber-400 animate-pulse',textClass: 'text-amber-400', edgeColor: 'rgba(251,191,36,0.50)' },
};

// ── SVG grid background ───────────────────────────────────────────────────────

function GridBg() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px',
      }}
    />
  );
}

// ── Node card ─────────────────────────────────────────────────────────────────

interface NodeCardProps {
  node:     PipelineNode;
  status:   NodeStatus;
  logLine:  string;
  index:    number;
  isMobile: boolean;
}

function NodeCard({ node, status, logLine, index, isMobile }: NodeCardProps) {
  const cfg  = STATUS_CFG[status];
  const Icon = node.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: isMobile ? 10 : 0, x: isMobile ? 0 : 10 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className={[
        'relative flex flex-col border rounded-xl p-3 transition-all duration-300 select-none overflow-hidden',
        isMobile ? 'w-full' : 'flex-1 min-w-0',
        cfg.borderClass,
      ].join(' ')}
      style={{
        background:    cfg.bgRgba,
        backdropFilter: 'blur(12px)',
        boxShadow:     cfg.glowShadow,
        minHeight:     110,
        minWidth:      isMobile ? undefined : 118,
      }}
    >
      {/* Corner accent */}
      <div className={`absolute top-0 left-0 w-4 h-4 border-t border-l rounded-tl-xl pointer-events-none ${cfg.borderClass}`} />

      {/* Status indicator */}
      <div className={`absolute top-2.5 right-2.5 w-2 h-2 rounded-full ${cfg.dotClass}`} />

      {/* Icon — 40px container */}
      <div
        className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-2.5 shrink-0 transition-all duration-300 ${cfg.borderClass}`}
        style={{ background: status === 'idle' ? 'rgba(255,255,255,0.03)' : cfg.bgRgba }}
      >
        <Icon size={17} className={`${cfg.textClass} transition-colors duration-300`} />
      </div>

      {/* Node name */}
      <span className={`font-mono font-black text-[7.5px] tracking-[0.22em] uppercase block leading-tight ${cfg.textClass} transition-colors duration-300`}>
        {node.label}
      </span>

      {/* Sublabel */}
      <span className="font-mono text-[6.5px] tracking-[0.12em] text-white/22 uppercase mt-0.5 block leading-tight truncate">
        {node.sublabel}
      </span>

      {/* Mini log bubble */}
      <AnimatePresence>
        {logLine && (
          <motion.div
            key={logLine}
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className={[
              'font-mono text-[7px] leading-relaxed px-2 py-1.5 rounded-md bg-black/40 border border-white/[0.05]',
              status === 'error' ? 'text-red-400' : status === 'retry' ? 'text-amber-400' : 'text-emerald/65',
            ].join(' ')}>
              {logLine}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Animated edge ─────────────────────────────────────────────────────────────

interface EdgeProps {
  fromIndex:  number;
  toIndex:    number;
  totalNodes: number;
  active:     boolean;
  done:       boolean;
  isMobile:   boolean;
  gradientId: string;
}

function Edge({ fromIndex, active, done, isMobile, gradientId }: EdgeProps) {
  const [particleKey, setParticleKey] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line
    if (active) setParticleKey(k => k + 1);
  }, [active]);

  const idleColor    = 'rgba(255,255,255,0.15)';
  const doneColor    = 'rgba(16,185,129,0.55)';
  const activeGradId = gradientId;
  const glowFiltId   = `glow-${gradientId}`;

  if (isMobile) {
    return (
      <div className="flex flex-col items-center py-0.5 shrink-0" style={{ height: 32, width: 2 }}>
        <svg width="4" height="32" viewBox="0 0 4 32" style={{ overflow: 'visible' }}>
          <defs>
            <filter id={glowFiltId}>
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <line
            x1="2" y1="0" x2="2" y2="32"
            stroke={done ? doneColor : active ? '#3b82f6' : idleColor}
            strokeWidth="2"
            strokeDasharray={done || active ? 'none' : '4 4'}
            style={{ transition: 'stroke 0.35s', filter: active ? 'drop-shadow(0 0 4px #3b82f6)' : 'none' }}
          />
          {active && (
            <motion.circle
              key={`${particleKey}-v`}
              r="3" fill="#3b82f6"
              filter={`url(#${glowFiltId})`}
              initial={{ cy: 0, opacity: 1 }}
              animate={{ cy: 32, opacity: [1, 1, 0] }}
              transition={{ duration: PARTICLE_DURATION, ease: 'easeInOut' }}
              cx="2"
            />
          )}
        </svg>
      </div>
    );
  }

  // Horizontal connector (desktop) — 28px wide
  return (
    <div className="flex items-center shrink-0" style={{ width: 28, minWidth: 16 }}>
      <svg width="28" height="6" viewBox="0 0 28 6" style={{ overflow: 'visible', width: '100%' }}>
        <defs>
          <linearGradient id={activeGradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <filter id={glowFiltId}>
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Main line */}
        <line
          x1="0" y1="3" x2="24" y2="3"
          stroke={done ? doneColor : active ? `url(#${activeGradId})` : idleColor}
          strokeWidth="2"
          strokeDasharray={done || active ? 'none' : '4 4'}
          style={{
            transition: 'stroke 0.35s',
            filter: active ? 'drop-shadow(0 0 4px #3b82f6)' : 'none',
          }}
        />

        {/* Arrowhead */}
        <polygon
          points="22,0.5 28,3 22,5.5"
          fill={done ? 'rgba(16,185,129,0.55)' : active ? '#3b82f6' : idleColor}
          style={{ transition: 'fill 0.35s' }}
        />

        {/* Travelling particle */}
        {active && (
          <motion.circle
            key={particleKey}
            r="3" fill="#60a5fa"
            filter={`url(#${glowFiltId})`}
            initial={{ cx: 0, opacity: 1 }}
            animate={{ cx: 24, opacity: [1, 1, 0] }}
            transition={{ duration: PARTICLE_DURATION, ease: 'linear' }}
            cy="3"
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

  const [scenarioIdx,  setScenarioIdx]  = useState(0);
  const [phase,        setPhase]        = useState<RunPhase>('idle');
  const [statuses,     setStatuses]     = useState<NodeStatus[]>([]);
  const [logLines,     setLogLines]     = useState<string[]>([]);
  const [activeEdge,   setActiveEdge]   = useState<number | null>(null);
  const [doneEdges,    setDoneEdges]    = useState<Set<number>>(new Set());
  const [eventCount,   setEventCount]   = useState(0);
  const [elapsed,      setElapsed]      = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile,     setIsMobile]     = useState(false);
  const [pipelineLogs, setPipelineLogs] = useState<LogEntry[]>([]);

  const timerRef   = useRef<ReturnType<typeof setTimeout>[]>([]);
  const startRef   = useRef<number>(0);
  const logsBoxRef = useRef<HTMLDivElement>(null);

  const scenario  = SCENARIOS[scenarioIdx];
  const nodes     = scenario.nodes;
  const nodeCount = nodes.length;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Auto-scroll pipeline logs
  useEffect(() => {
    if (logsBoxRef.current) {
      logsBoxRef.current.scrollTop = logsBoxRef.current.scrollHeight;
    }
  }, [pipelineLogs]);

  function clearAllTimers() {
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
  }

  useEffect(() => {
    clearAllTimers();
    setPhase('idle');
    setStatuses(Array(nodeCount).fill('idle'));
    setLogLines(Array(nodeCount).fill(''));
    setActiveEdge(null);
    setDoneEdges(new Set());
    setElapsed(null);
    setPipelineLogs([]);
  }, [scenarioIdx, nodeCount]);

  useEffect(() => {
    setStatuses(Array(nodeCount).fill('idle'));
    setLogLines(Array(nodeCount).fill(''));
  }, [nodeCount]);

  function addTimer(fn: () => void, delay: number) {
    timerRef.current.push(setTimeout(fn, delay));
  }

  const runPipeline = useCallback((withError: boolean) => {
    if (phase === 'running') return;
    clearAllTimers();
    startRef.current = Date.now();

    setPhase('running');
    setElapsed(null);
    setDoneEdges(new Set());
    setActiveEdge(null);
    setPipelineLogs([makeLog('SISTEMA', `iniciando pipeline "${scenario.label.toLowerCase()}"...`, 'info')]);

    const fresh:     NodeStatus[] = Array(nodeCount).fill('idle');
    const freshLogs: string[]     = Array(nodeCount).fill('');
    setStatuses([...fresh]);
    setLogLines([...freshLogs]);

    const errorNodeIdx = withError ? 3 : -1;

    nodes.forEach((node, i) => {
      const base = i * (NODE_DELAY_MS + NODE_RUNNING_MS);

      if (i > 0) {
        addTimer(() => setActiveEdge(i - 1), base - 50);
      }

      // Activate node
      addTimer(() => {
        setStatuses(prev => { const n = [...prev]; n[i] = 'running'; return n; });
        setPipelineLogs(prev => [...prev, makeLog(node.label, node.logs[0], 'info')]);

        addTimer(() => {
          setLogLines(prev => { const n = [...prev]; n[i] = node.logs[0]; return n; });
        }, 150);
        addTimer(() => {
          setLogLines(prev => { const n = [...prev]; n[i] = node.logs[1] ?? node.logs[0]; return n; });
          setPipelineLogs(prev => [...prev, makeLog(node.label, node.logs[1] ?? node.logs[0], 'info')]);
        }, 450);
        addTimer(() => {
          setLogLines(prev => { const n = [...prev]; n[i] = node.logs[2] ?? node.logs[1] ?? node.logs[0]; return n; });
        }, 720);
      }, base);

      // Complete node
      addTimer(() => {
        if (i === errorNodeIdx) {
          setStatuses(prev => { const n = [...prev]; n[i] = 'error'; return n; });
          setLogLines(prev => { const n = [...prev]; n[i] = node.errorLog ?? '⚠ Erro desconhecido'; return n; });
          setPipelineLogs(prev => [...prev, makeLog(node.label, node.errorLog ?? '⚠ erro desconhecido', 'error')]);

          addTimer(() => {
            setStatuses(prev => { const n = [...prev]; n[i] = 'retry'; return n; });
            setLogLines(prev => { const n = [...prev]; n[i] = '↺ Retry 1/3 — aguardando 2s...'; return n; });
            setPipelineLogs(prev => [...prev, makeLog(node.label, '↺ retry 1/3 — aguardando 2s...', 'warn')]);
          }, 1800);

          addTimer(() => {
            setStatuses(prev => { const n = [...prev]; n[i] = 'success'; return n; });
            setLogLines(prev => { const n = [...prev]; n[i] = node.logs[2] ?? node.logs[0]; return n; });
            setDoneEdges(prev => new Set([...prev, i - 1]));
            setPipelineLogs(prev => [...prev, makeLog(node.label, '✓ recuperado — continuando...', 'success')]);

            const remaining = nodes.slice(i + 1);
            remaining.forEach((rNode, ri) => {
              const rBase = (ri + 1) * (NODE_DELAY_MS + NODE_RUNNING_MS);
              addTimer(() => setActiveEdge(i + ri), rBase - 50);
              addTimer(() => {
                setStatuses(prev => { const n = [...prev]; n[i + ri + 1] = 'running'; return n; });
                setPipelineLogs(prev => [...prev, makeLog(rNode.label, rNode.logs[0], 'info')]);
                addTimer(() => { setLogLines(prev => { const n = [...prev]; n[i + ri + 1] = rNode.logs[0]; return n; }); }, 150);
                addTimer(() => { setLogLines(prev => { const n = [...prev]; n[i + ri + 1] = rNode.logs[1] ?? rNode.logs[0]; return n; }); }, 450);
                addTimer(() => { setLogLines(prev => { const n = [...prev]; n[i + ri + 1] = rNode.logs[2] ?? rNode.logs[0]; return n; }); }, 720);
              }, rBase);
              addTimer(() => {
                setStatuses(prev => { const n = [...prev]; n[i + ri + 1] = 'success'; return n; });
                setDoneEdges(prev => new Set([...prev, i + ri]));
                setActiveEdge(null);
                if (ri === remaining.length - 1) {
                  const ms = Date.now() - startRef.current;
                  setPhase('complete');
                  setEventCount(c => c + 1);
                  setElapsed(ms);
                  setPipelineLogs(prev => [...prev, makeLog('SISTEMA', `✓ pipeline concluído em ${ms}ms`, 'success')]);
                }
              }, rBase + NODE_RUNNING_MS);
            });
          }, 4000);
        } else {
          setStatuses(prev => { const n = [...prev]; n[i] = 'success'; return n; });
          if (i > 0) setDoneEdges(prev => new Set([...prev, i - 1]));
          setActiveEdge(null);
          setPipelineLogs(prev => [...prev, makeLog(node.label, `✓ ${node.logs[2] ?? node.logs[0]}`, 'success')]);

          if (i === nodeCount - 1) {
            const ms = Date.now() - startRef.current;
            setPhase('complete');
            setEventCount(c => c + 1);
            setElapsed(ms);
            setPipelineLogs(prev => [...prev, makeLog('SISTEMA', `✓ pipeline concluído em ${ms}ms`, 'success')]);
          }
        }
      }, base + NODE_RUNNING_MS);
    });
  }, [phase, nodes, nodeCount, scenario.label]);

  const canRun = phase !== 'running';

  return (
    <div
      className="w-full relative rounded-xl overflow-hidden border border-white/[0.07] flex flex-col"
      style={{
        background:    'rgba(8, 8, 8, 0.82)',
        backdropFilter: 'blur(24px)',
        minHeight:     600,
      }}
    >

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div
        className="relative flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 border-b border-white/[0.07] shrink-0"
        style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}
      >
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
              className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-white/[0.10] bg-white/[0.03] font-mono text-[8px] tracking-[0.2em] uppercase text-white/40 hover:text-white/65 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
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
                  className="absolute top-full mt-1.5 right-0 z-20 border border-white/[0.10] rounded-lg overflow-hidden min-w-[180px] shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
                  style={{ background: 'rgba(6,8,12,0.95)', backdropFilter: 'blur(16px)' }}
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

          {/* Run buttons */}
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

      {/* ── Pipeline canvas ─────────────────────────────────────────────────── */}
      <div
        className="relative flex-1 px-3 py-5 md:px-4 overflow-x-auto"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderLeft: 'none',
          borderRight: 'none',
        }}
      >
        <GridBg />

        <AnimatePresence mode="wait">
          <motion.div
            key={scenarioIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={[
              'relative flex gap-0 h-full',
              isMobile ? 'flex-col items-center' : 'flex-row items-center justify-center',
            ].join(' ')}
            style={{ minHeight: 160 }}
          >
            {nodes.map((node, i) => (
              <div
                key={node.id}
                className={[
                  'flex',
                  isMobile ? 'flex-col items-center w-full max-w-[260px]' : 'flex-row items-center',
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

      {/* ── Pipeline logs ───────────────────────────────────────────────────── */}
      <div
        className="shrink-0 border-t border-white/[0.07]"
        style={{ background: 'rgba(0,0,0,0.40)', backdropFilter: 'blur(8px)' }}
      >
        {/* Logs header */}
        <div className="flex items-center justify-between gap-2 px-4 py-2 border-b border-white/[0.05]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/45" />
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald/30" />
            </div>
            <span className="font-mono text-[7px] tracking-[0.38em] uppercase text-white/22">[ PIPELINE LOGS ]</span>
          </div>
          <span className="font-mono text-[6.5px] tracking-[0.2em] uppercase text-white/14">
            {pipelineLogs.length} eventos
          </span>
        </div>

        {/* Log entries */}
        <div
          ref={logsBoxRef}
          className="overflow-y-auto px-3 py-2 space-y-0.5"
          style={{ height: 140 }}
        >
          {pipelineLogs.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <span className="font-mono text-[8px] tracking-widest text-white/15 uppercase">
                aguardando eventos...
              </span>
            </div>
          ) : (
            pipelineLogs.map(entry => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.12 }}
                className="flex items-start gap-2 font-mono text-[9px] leading-relaxed"
              >
                <span className="text-white/20 shrink-0">[{entry.time}]</span>
                <span className="text-blue-400/60 shrink-0 truncate max-w-[90px]">{entry.node.toLowerCase()}</span>
                <span className="text-white/18 shrink-0">→</span>
                <span className={[
                  'flex-1 min-w-0',
                  entry.type === 'success' ? 'text-emerald/70'
                  : entry.type === 'error'  ? 'text-red-400/75'
                  : entry.type === 'warn'   ? 'text-amber-400/70'
                  : 'text-white/35',
                ].join(' ')}>
                  {entry.msg}
                </span>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <div
        className="relative shrink-0 flex flex-wrap items-center justify-between gap-2 px-4 border-t border-white/[0.07]"
        style={{ height: 48, background: 'rgba(0,0,0,0.28)' }}
      >
        {/* Event counter */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[7px] tracking-[0.28em] uppercase text-white/22">
            EVENTOS PROCESSADOS HOJE:
          </span>
          <motion.span
            key={eventCount}
            initial={{ opacity: 0.4, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="font-mono font-black text-[13px] text-emerald tabular-nums"
          >
            {eventCount.toLocaleString('pt-BR')}
          </motion.span>
        </div>

        {/* Pipeline status */}
        <AnimatePresence>
          {phase === 'complete' && elapsed !== null && (
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="font-mono text-[8px] tracking-[0.2em] uppercase text-emerald flex items-center gap-1.5"
            >
              <span className="text-emerald/55">✓</span>
              CONCLUÍDO — {elapsed}ms
            </motion.div>
          )}
          {phase === 'running' && (
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
              <span className="font-mono text-[7px] tracking-[0.28em] uppercase text-blue-400/60">
                PROCESSANDO...
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Powered by */}
        <span className="font-mono text-[6.5px] tracking-[0.18em] uppercase text-white/12">
          POWERED BY MEZZOLD AUTOMATION ENGINE™
        </span>
      </div>
    </div>
  );
}
