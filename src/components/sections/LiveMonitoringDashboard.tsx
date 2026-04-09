'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pause, Play, Activity } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────

interface KPIs {
  requests: number;
  latency:  number;
  errors:   number;
}

interface SparkPoint { id: number; v: number; }

interface StatusDist { s200: number; s301: number; s404: number; s500: number; }

interface Endpoint { path: string; latency: number; base: number; }

interface LogEntry {
  id:       number;
  time:     string;
  method:   'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  status:   200 | 301 | 404 | 500;
  latency:  number;
}

// ── Data helpers ───────────────────────────────────────────────────────────────

let _uid = 0;
const uid = () => ++_uid;

/** Two overlapping sine waves + jitter → organic-looking signal */
function wave(base: number, amp: number): number {
  const t = Date.now() / 1000;
  const s = Math.sin(t * 0.31) * 0.55 + Math.sin(t * 0.73 + 1.4) * 0.3 + (Math.random() - 0.5) * 0.15;
  return Math.round(Math.max(0, base + amp * s));
}

function pickW<T>(items: readonly T[], weights: number[]): T {
  let r = Math.random() * weights.reduce((a, b) => a + b, 0);
  for (let i = 0; i < items.length; i++) { r -= weights[i]; if (r <= 0) return items[i]; }
  return items[items.length - 1];
}

const METHODS    = ['GET', 'POST', 'PUT', 'DELETE'] as const;
const METHOD_W   = [68, 20, 8, 4];
const STATUSES   = [200, 301, 404, 500] as const;
const STATUS_W   = [87, 7, 4.5, 1.5];
const LOG_PATHS  = ['/api/users', '/api/orders', '/dashboard', '/auth/login', '/api/metrics', '/api/webhooks', '/api/analytics'];

const BASE_ENDPOINTS: Endpoint[] = [
  { path: '/api/users',   latency: 22, base: 22 },
  { path: '/api/orders',  latency: 38, base: 38 },
  { path: '/dashboard',   latency: 15, base: 15 },
  { path: '/auth/login',  latency: 48, base: 48 },
  { path: '/api/metrics', latency: 12, base: 12 },
];

function makeLog(): LogEntry {
  return {
    id:       uid(),
    time:     new Date().toLocaleTimeString('pt-BR', { hour12: false }),
    method:   pickW(METHODS, METHOD_W),
    endpoint: LOG_PATHS[Math.floor(Math.random() * LOG_PATHS.length)],
    status:   pickW(STATUSES, STATUS_W),
    latency:  Math.max(5, wave(25, 28)),
  };
}

function initSparkData(): SparkPoint[] {
  return Array.from({ length: 22 }, () => ({ id: uid(), v: wave(2000, 650) }));
}

// ── Sparkline ──────────────────────────────────────────────────────────────────

function Sparkline({ pts }: { pts: SparkPoint[] }) {
  if (pts.length < 2) return null;

  const vals = pts.map(p => p.v);
  const lo   = Math.min(...vals) * 0.92;
  const hi   = Math.max(...vals) * 1.06;
  const W = 600; const H = 72; const P = 3;

  const xy: [number, number][] = vals.map((v, i) => [
    P + (i / (vals.length - 1)) * (W - P * 2),
    H - P - ((v - lo) / (hi - lo || 1)) * (H - P * 2),
  ]);

  const line = xy.reduce((acc, [x, y], i) => {
    if (i === 0) return `M${x} ${y}`;
    const [px, py] = xy[i - 1];
    const mx = px + (x - px) * 0.5;
    return `${acc} C${mx} ${py} ${mx} ${y} ${x} ${y}`;
  }, '');

  const fill = `${line} L${xy[xy.length - 1][0]} ${H} L${xy[0][0]} ${H}Z`;
  const last = xy[xy.length - 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-full">
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#06b6d4" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0"    />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map(p => (
        <line key={p} x1={0} y1={H * p} x2={W} y2={H * p} stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
      ))}
      <path d={fill} fill="url(#sg)" />
      <path d={line} fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r="5" fill="#06b6d4" opacity="0.18" />
      <circle cx={last[0]} cy={last[1]} r="2.5" fill="#06b6d4" />
    </svg>
  );
}

// ── Donut ──────────────────────────────────────────────────────────────────────

const DR    = 36; // donut radius
const DCIRC = 2 * Math.PI * DR; // ≈ 226.19
const DCOL  = ['#10b981', '#06b6d4', '#f59e0b', '#ff0033'] as const;
const DLBL  = ['HTTP 200', 'HTTP 301', 'HTTP 404', 'HTTP 500'] as const;

function Donut({ d }: { d: StatusDist }) {
  const raw  = [d.s200, d.s301, d.s404, d.s500];
  const sum  = raw.reduce((a, b) => a + b, 0);
  const pcts = raw.map(v => v / sum);
  let cum = 0;

  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 100 100" className="w-[88px] h-[88px] shrink-0">
        {/* Track */}
        <circle cx="50" cy="50" r={DR} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="11" />
        {/* Segments */}
        {pcts.map((pct, i) => {
          const seg = pct * DCIRC;
          const rot = cum * 360 - 90;
          cum += pct;
          return (
            <circle
              key={i}
              cx="50" cy="50" r={DR}
              fill="none"
              stroke={DCOL[i]}
              strokeWidth="11"
              strokeDasharray={`${seg} ${DCIRC}`}
              transform={`rotate(${rot} 50 50)`}
            />
          );
        })}
        {/* Center text */}
        <text x="50" y="47" textAnchor="middle" fill="white"                 fontSize="11" fontFamily="monospace" fontWeight="bold">{Math.round(d.s200)}%</text>
        <text x="50" y="57" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="6.5" fontFamily="monospace">2xx OK</text>
      </svg>

      <div className="flex flex-col gap-1.5">
        {DCOL.map((col, i) => (
          <div key={i} className="flex items-center gap-2 text-[9px] font-mono">
            <span className="w-1.5 h-1.5 rounded-[2px] shrink-0" style={{ background: col }} />
            <span className="text-white/35">{DLBL[i]}</span>
            <span className="text-white/60 font-bold ml-auto pl-2">{raw[i].toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Endpoint bars ──────────────────────────────────────────────────────────────

function EndpointBars({ eps }: { eps: Endpoint[] }) {
  const max = Math.max(...eps.map(e => e.latency)) * 1.25;
  return (
    <div className="flex flex-col gap-3">
      {eps.map(ep => (
        <div key={ep.path}>
          <div className="flex justify-between mb-1">
            <span className="font-mono text-[8px] text-white/30 truncate max-w-[130px]">{ep.path}</span>
            <span className="font-mono text-[9px] font-bold text-cyan">{ep.latency}ms</span>
          </div>
          <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${(ep.latency / max) * 100}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #3b82f6, #06b6d4)' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── KPI card ───────────────────────────────────────────────────────────────────

function KPI({ label, value, sub, dim = false }: { label: string; value: string; sub?: string; dim?: boolean }) {
  return (
    <div className="relative border border-cyan/[0.09] rounded-lg p-3.5 bg-cyan/[0.025] overflow-hidden">
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan/30 rounded-tl-lg pointer-events-none" />
      <p className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/25 mb-2">{label}</p>
      <motion.p
        key={value}
        initial={{ opacity: 0.4, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className={`font-mono font-black text-xl leading-none ${dim ? 'text-white/40' : 'text-cyan'}`}
      >
        {value}
      </motion.p>
      {sub && <p className="font-mono text-[8px] text-white/20 mt-1.5">{sub}</p>}
    </div>
  );
}

// ── Log colors ─────────────────────────────────────────────────────────────────

const SCOL: Record<number, string> = {
  200: 'text-emerald', 301: 'text-cyan', 404: 'text-amber-400', 500: 'text-electric-red',
};
const MCOL: Record<string, string> = {
  GET: 'text-cyan/65', POST: 'text-emerald/65', PUT: 'text-amber-400/65', DELETE: 'text-red-400/65',
};

// ── Main component ─────────────────────────────────────────────────────────────

export function LiveMonitoringDashboard() {
  const [ts,        setTs]        = useState('');
  const [paused,    setPaused]    = useState(false);
  const [kpi,       setKpi]       = useState<KPIs>({ requests: 2000, latency: 24, errors: 0 });
  const [spark,     setSpark]     = useState<SparkPoint[]>(initSparkData);
  const [dist,      setDist]      = useState<StatusDist>({ s200: 87, s301: 7, s404: 4.5, s500: 1.5 });
  const [endpoints, setEndpoints] = useState<Endpoint[]>(BASE_ENDPOINTS.map(e => ({ ...e })));
  const [logs,      setLogs]      = useState<LogEntry[]>(() => Array.from({ length: 5 }, makeLog));
  const pausedRef = useRef(false);
  
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  // Timestamp — always ticks
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString('pt-BR', { hour12: false });
    // eslint-disable-next-line
    setTs(fmt());
    const id = setInterval(() => setTs(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  // KPIs + sparkline — every 1.5 s
  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      const requests = Math.max(1200, Math.min(2800, wave(2000, 680)));
      const latency  = Math.max(12,   Math.min(48,   wave(28, 17)));
      const errors   = Math.random() < 0.07 ? Math.floor(Math.random() * 3) + 1 : 0;
      setKpi({ requests, latency, errors });
      setSpark(prev => [...prev.slice(-29), { id: uid(), v: requests }]);
    }, 1500);
    return () => clearInterval(id);
  }, []);

  // Status distribution — every 5 s
  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      const s200 = 83 + Math.random() * 7;
      const s301 = 5  + Math.random() * 4;
      const s404 = 3  + Math.random() * 2.5;
      const s500 = Math.max(0.4, 100 - s200 - s301 - s404);
      const t    = s200 + s301 + s404 + s500;
      setDist({ s200: s200/t*100, s301: s301/t*100, s404: s404/t*100, s500: s500/t*100 });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Endpoint latencies — every 4 s
  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setEndpoints(prev => prev.map(ep => ({
        ...ep,
        latency: Math.max(5, Math.round(ep.base * (0.82 + Math.random() * 0.40))),
      })));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  // Logs — every 3 s
  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setLogs(prev => [makeLog(), ...prev].slice(0, 8));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full select-none">

      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2.5">
          <Activity size={13} className="text-cyan shrink-0" />
          <span className="font-mono font-bold text-[11px] tracking-[0.2em] uppercase text-white">
            MEZZOLD CONTROL CENTER
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* ONLINE badge */}
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald" />
            </span>
            <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-emerald">ONLINE</span>
          </div>

          {/* Pause / Resume */}
          <button
            onClick={() => setPaused(p => !p)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded border font-mono text-[8px] tracking-[0.2em] uppercase transition-all duration-200 ${
              paused
                ? 'border-amber-400/35 text-amber-400 bg-amber-400/5 hover:bg-amber-400/10'
                : 'border-white/[0.07] text-white/25 hover:text-white/50 hover:border-white/15'
            }`}
          >
            {paused ? <Play size={8} /> : <Pause size={8} />}
            {paused ? 'Resumir' : 'Pausar'}
          </button>

          {/* Clock */}
          <span className="font-mono text-[9px] tabular-nums text-white/18">{ts}</span>
        </div>
      </div>

      {/* ── Context line ── */}
      <p className="font-mono text-[9px] tracking-[0.12em] text-white/30 italic mb-4">
        É assim que monitoramos sistemas em produção — em tempo real, sem surpresas.
      </p>

      {/* ── KPIs ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
        <KPI label="Acessos por segundo" value={kpi.requests.toLocaleString('pt-BR')} sub="req/s" />
        <KPI label="Velocidade de resposta"  value={`${kpi.latency}ms`}            sub="avg p50" />
        <KPI label="Disponibilidade do sistema" value="99.97%"                    sub="últimos 30d" dim />
        <KPI
          label="Falhas por hora"
          value={String(kpi.errors)}
          sub="error rate"
          dim={kpi.errors === 0}
        />
      </div>

      {/* ── Sparkline ── */}
      <div className="border border-white/[0.06] rounded-lg bg-black/25 p-3.5 mb-3">
        <div className="flex items-center justify-between mb-2.5">
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/25">
            [ ACESSOS EM TEMPO REAL ]
          </span>
          <motion.span
            key={kpi.requests}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            className="font-mono text-[9px] font-bold text-cyan tabular-nums"
          >
            {kpi.requests.toLocaleString('pt-BR')} req/s
          </motion.span>
        </div>
        <div className="h-[72px] w-full">
          <Sparkline pts={spark} />
        </div>
      </div>

      {/* ── Charts row ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div className="border border-white/[0.06] rounded-lg bg-black/25 p-4">
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/25 block mb-3">
            [ SAÚDE DAS REQUISIÇÕES ]
          </span>
          <Donut d={dist} />
        </div>

        <div className="border border-white/[0.06] rounded-lg bg-black/25 p-4">
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/25 block mb-3">
            [ VELOCIDADE POR PÁGINA ]
          </span>
          <EndpointBars eps={endpoints} />
        </div>
      </div>

      {/* ── Log table ── */}
      <div className="border border-white/[0.06] rounded-lg bg-black/25 p-4">
        <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/25 block mb-3">
          [ ATIVIDADE RECENTE ]
        </span>

        {/* Header row */}
        <div className="grid grid-cols-[58px_48px_1fr_40px_42px] gap-2 pb-2 border-b border-white/[0.04]">
          {['HORA', 'MÉT.', 'ENDPOINT', 'ST.', 'LAT.'].map(h => (
            <span key={h} className="font-mono text-[7px] tracking-[0.2em] uppercase text-white/15">{h}</span>
          ))}
        </div>

        {/* Rows */}
        <div className="mt-1 overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            {logs.map(log => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="grid grid-cols-[58px_48px_1fr_40px_42px] gap-2 py-1.5 border-b border-white/[0.03] last:border-0"
              >
                <span className="font-mono text-[8px] tabular-nums text-white/22">{log.time}</span>
                <span className={`font-mono text-[8px] font-bold ${MCOL[log.method]}`}>{log.method}</span>
                <span className="font-mono text-[8px] text-white/35 truncate">{log.endpoint}</span>
                <span className={`font-mono text-[8px] font-bold ${SCOL[log.status]}`}>{log.status}</span>
                <span className="font-mono text-[8px] text-white/30 tabular-nums">{log.latency}ms</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
