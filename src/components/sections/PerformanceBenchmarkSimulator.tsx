'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// ── Deterministic score generation from URL domain ────────────────────────────

function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
  }
  return Math.abs(hash);
}

function extractDomain(url: string): string {
  try {
    const u = new URL(url.startsWith('http') ? url : `https://${url}`);
    return u.hostname;
  } catch {
    return url.split('/')[0];
  }
}

interface Metrics {
  score: number;
  lcp: number;
  cls: number;
  ttfb: number;
  fid: number;
}

function generateMetrics(url: string): Metrics {
  const seed = hashString(extractDomain(url));
  return {
    score: 87 + (seed % 13),
    lcp:   1150 + ((seed >> 2)  % 950),
    cls:   parseFloat((0.01 + ((seed >> 5) % 7) / 100).toFixed(2)),
    ttfb:  175  + ((seed >> 8)  % 280),
    fid:   11   + ((seed >> 11) % 35),
  };
}

function validateUrl(url: string): boolean {
  try {
    const u = new URL(url.startsWith('http') ? url : `https://${url}`);
    return u.hostname.includes('.') && u.hostname.length > 3;
  } catch {
    return false;
  }
}

function buildLogs(domain: string, score: number): string[] {
  return [
    '> Iniciando Mezzold Performance Engine v4.2...',
    `> Resolvendo DNS → ${domain}`,
    '> Estabelecendo conexão segura (TLS 1.3)...',
    '> Medindo Time to First Byte (TTFB)...',
    '> Auditando recursos críticos do DOM...',
    '> Analisando Largest Contentful Paint (LCP)...',
    '> Calculando Cumulative Layout Shift (CLS)...',
    '> Verificando First Input Delay (FID)...',
    '> Processando Core Web Vitals...',
    '> Executando benchmark de performance avançado...',
    '> Compilando e normalizando métricas...',
    `> ██████████████████ ANÁLISE CONCLUÍDA — SCORE ${score}/100`,
  ];
}

// ── Ring geometry ─────────────────────────────────────────────────────────────
const R = 50;
const CIRC = 2 * Math.PI * R; // ≈ 314.16

// ── Metric helpers ────────────────────────────────────────────────────────────
const METRIC_LABELS: Record<string, string> = { lcp: 'LCP', cls: 'CLS', ttfb: 'TTFB', fid: 'FID' };

function metricBarPct(m: Metrics, key: keyof Omit<Metrics, 'score'>): number {
  switch (key) {
    case 'lcp':  return Math.round(68 + (1 - (m.lcp  - 1150) / 950)  * 30);
    case 'cls':  return Math.round(82 + (1 - (m.cls  - 0.01) / 0.06) * 16);
    case 'ttfb': return Math.round(72 + (1 - (m.ttfb - 175)  / 280)  * 24);
    case 'fid':  return Math.round(85 + (1 - (m.fid  - 11)   / 35)   * 13);
    default:     return 80;
  }
}

function metricValue(m: Metrics, key: keyof Omit<Metrics, 'score'>): string {
  switch (key) {
    case 'lcp':  return `${(m.lcp / 1000).toFixed(1)}s`;
    case 'cls':  return m.cls.toFixed(2);
    case 'ttfb': return `${m.ttfb}ms`;
    case 'fid':  return `${m.fid}ms`;
    default:     return '';
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

type Phase = 'idle' | 'scanning' | 'result';

export function PerformanceBenchmarkSimulator() {
  const [url, setUrl]             = useState('');
  const [phase, setPhase]         = useState<Phase>('idle');
  const [logs, setLogs]           = useState<string[]>([]);
  const [metrics, setMetrics]     = useState<Metrics | null>(null);
  const [ringReady, setRingReady] = useState(false);
  const [barsReady, setBarsReady] = useState(false);
  const inputRef                  = useRef<HTMLInputElement>(null);

  const valid  = validateUrl(url);
  const domain = url ? extractDomain(url) : '';

  function startScan() {
    if (!valid || phase === 'scanning') return;
    const m   = generateMetrics(url);
    const seq = buildLogs(domain, m.score);

    setMetrics(m);
    setPhase('scanning');
    setLogs([]);
    setRingReady(false);
    setBarsReady(false);

    seq.forEach((line, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, line]);
        if (i === seq.length - 1) {
          setTimeout(() => {
            setPhase('result');
            setTimeout(() => setRingReady(true), 200);
            setTimeout(() => setBarsReady(true), 700);
          }, 480);
        }
      }, i * 310);
    });
  }

  function reset() {
    setPhase('idle');
    setUrl('');
    setMetrics(null);
    setLogs([]);
    setRingReady(false);
    setBarsReady(false);
    setTimeout(() => inputRef.current?.focus(), 80);
  }

  const ringOffset = metrics && ringReady
    ? CIRC * (1 - metrics.score / 100)
    : CIRC;

  const isElite = (metrics?.score ?? 0) >= 90;

  return (
    <div className="w-full">
      {/* Header label */}
      <div className="flex items-center gap-3 mb-5">
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-emerald">
          [ PERFORMANCE ]
        </span>
        <div className="flex-1 h-px bg-emerald/20" />
        <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/15">
          MEZZOLD ENGINE v4.2
        </span>
      </div>

      {/* Card */}
      <div className="relative border border-white/[0.08] bg-black/30 rounded-xl overflow-hidden backdrop-blur-sm">

        {/* Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] opacity-[0.025]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,1) 3px,rgba(255,255,255,1) 4px)' }}
        />

        {/* Corner brackets */}
        <div className="absolute top-0 left-0   w-6 h-6 border-t border-l border-emerald/50 rounded-tl-xl pointer-events-none z-[2]" />
        <div className="absolute top-0 right-0  w-6 h-6 border-t border-r border-emerald/20 rounded-tr-xl pointer-events-none z-[2]" />
        <div className="absolute bottom-0 left-0  w-6 h-6 border-b border-l border-emerald/20 rounded-bl-xl pointer-events-none z-[2]" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-emerald/20 rounded-br-xl pointer-events-none z-[2]" />

        <div className="relative z-[3] p-5 md:p-7">

          {/* ── URL input ── */}
          <AnimatePresence>
            {phase !== 'result' && (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6, height: 0 }}
                transition={{ duration: 0.25 }}
                className="mb-5"
              >
                <label className="block font-mono text-[9px] tracking-[0.3em] uppercase text-white/35 mb-2.5">
                  URL do site a analisar
                </label>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={url}
                      onChange={e => setUrl(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && valid && phase === 'idle' && startScan()}
                      placeholder="meusite.com.br"
                      disabled={phase === 'scanning'}
                      className={[
                        'w-full h-11 px-4 pr-10 rounded-lg bg-black/50 font-mono text-sm text-white',
                        'placeholder:text-white/15 outline-none border transition-all duration-300',
                        'disabled:opacity-40 disabled:cursor-not-allowed',
                        url.length > 0 && valid
                          ? 'border-emerald/50 shadow-[0_0_16px_rgba(16,185,129,0.12)]'
                          : url.length > 0
                          ? 'border-red-500/30'
                          : 'border-white/[0.07] focus:border-white/20',
                      ].join(' ')}
                    />
                    {url.length > 0 && (
                      <div className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-colors duration-300 ${valid ? 'bg-emerald' : 'bg-red-500/50'}`} />
                    )}
                  </div>

                  <button
                    onClick={startScan}
                    disabled={!valid || phase === 'scanning'}
                    className={[
                      'h-11 px-6 rounded-lg font-mono text-[10px] tracking-[0.3em] uppercase font-bold',
                      'whitespace-nowrap border transition-all duration-200',
                      valid && phase === 'idle'
                        ? 'bg-emerald/10 border-emerald/40 text-emerald hover:bg-emerald/20 hover:border-emerald/60 hover:shadow-[0_0_24px_rgba(16,185,129,0.18)] active:scale-[0.97]'
                        : 'bg-white/[0.02] border-white/[0.06] text-white/15 cursor-not-allowed',
                    ].join(' ')}
                  >
                    {phase === 'scanning' ? 'Analisando...' : 'Analisar performance'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Terminal ── */}
          <AnimatePresence>
            {phase === 'scanning' && metrics && (
              <motion.div
                key="terminal"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="rounded-lg border border-emerald/[0.12] bg-[#030a05] overflow-hidden">
                  {/* Terminal bar */}
                  <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-emerald/[0.08] bg-black/40">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400/30" />
                    <div className="w-2 h-2 rounded-full bg-emerald/35" />
                    <span className="ml-2 font-mono text-[8px] tracking-[0.25em] uppercase text-white/15">
                      mezzold_diagnostic_shell — {domain}
                    </span>
                  </div>
                  {/* Log output */}
                  <div className="p-4 font-mono text-[11px] leading-relaxed min-h-[200px]">
                    {logs.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.12 }}
                        className={
                          line.includes('CONCLUÍDA')
                            ? 'text-emerald font-bold'
                            : 'text-emerald/55'
                        }
                      >
                        {line}
                      </motion.div>
                    ))}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.9 }}
                      className="inline-block w-2 h-[13px] bg-emerald/60 align-middle ml-0.5"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Results ── */}
          <AnimatePresence>
            {phase === 'result' && metrics && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              >
                {/* Top row: classification + reset */}
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-start justify-between mb-6 gap-3"
                >
                  <div>
                    <span className={`font-mono text-[10px] tracking-[0.4em] uppercase font-bold ${isElite ? 'text-emerald' : 'text-cyan'}`}>
                      {isElite ? '⬡ ELITE PERFORMANCE' : '◈ HIGH PERFORMANCE'}
                    </span>
                    <p className="font-mono text-[9px] text-white/20 tracking-wider mt-1">
                      {domain}
                    </p>
                  </div>
                  <button
                    onClick={reset}
                    className="shrink-0 font-mono text-[9px] tracking-[0.2em] uppercase text-white/20 hover:text-white/50 border border-white/[0.07] hover:border-white/20 rounded px-3 py-1.5 transition-all duration-200"
                  >
                    Nova análise
                  </button>
                </motion.div>

                {/* Score ring + metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-6 mb-6">

                  {/* Circular score */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 240, damping: 22 }}
                    className="flex flex-col items-center gap-2 sm:border-r sm:border-white/[0.06] sm:pr-4"
                  >
                    <div className="relative">
                      <svg width="128" height="128" viewBox="0 0 120 120">
                        <defs>
                          <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%"   stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#10b981" />
                          </linearGradient>
                          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="2.5" result="blur" />
                            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                          </filter>
                        </defs>
                        {/* Track */}
                        <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />
                        {/* Progress */}
                        <circle
                          cx="60" cy="60" r={R}
                          fill="none"
                          stroke="url(#sg)"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={CIRC}
                          strokeDashoffset={ringOffset}
                          transform="rotate(-90 60 60)"
                          filter="url(#glow)"
                          style={{ transition: 'stroke-dashoffset 1.3s cubic-bezier(0.34,1.56,0.64,1)' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.45 }}
                          className="font-mono font-black text-[2rem] text-white leading-none"
                        >
                          {metrics.score}
                        </motion.span>
                        <span className="font-mono text-[8px] tracking-widest uppercase text-white/25 mt-0.5">score</span>
                      </div>
                    </div>
                    <span className={`font-mono text-[8px] tracking-[0.2em] uppercase ${isElite ? 'text-emerald/50' : 'text-cyan/50'}`}>
                      {isElite ? 'ELITE' : 'HIGH'} TIER
                    </span>
                  </motion.div>

                  {/* Metric bars */}
                  <div className="flex flex-col justify-center gap-4">
                    {(['lcp', 'cls', 'ttfb', 'fid'] as const).map((key, i) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 + i * 0.08 }}
                      >
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/35">
                            {METRIC_LABELS[key]}
                          </span>
                          <span className="font-mono text-[10px] font-bold text-white/65">
                            {metricValue(metrics, key)}
                          </span>
                        </div>
                        <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: barsReady ? `${metricBarPct(metrics, key)}%` : 0 }}
                            transition={{ duration: 0.9, delay: i * 0.09, ease: [0.34, 1.56, 0.64, 1] }}
                            style={{
                              background: 'linear-gradient(90deg, #06b6d4, #10b981)',
                              boxShadow: '0 0 8px rgba(16,185,129,0.35)',
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Footer: badge + CTA */}
                <div className="border-t border-white/[0.05] pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/12">
                    Powered by Mezzold Engine™
                  </span>
                  <a
                    href="/#contact"
                    className="group font-mono text-[9px] tracking-[0.15em] uppercase text-emerald/50 hover:text-emerald transition-colors duration-200 flex items-center gap-1.5"
                  >
                    Sua plataforma poderia ter isso
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">
                      → Falar com a Mezzold
                    </span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
