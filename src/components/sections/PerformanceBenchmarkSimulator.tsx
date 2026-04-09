'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

// ── Types ──────────────────────────────────────────────────────────────────────

interface Metrics {
  score: number;
  lcp:   number;
  cls:   number;
  ttfb:  number;
  fid:   number;
}

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
    '> iniciando mezzold performance engine v4.2...',
    `> resolvendo dns → ${domain}`,
    '> estabelecendo conexão segura (tls 1.3)...',
    '> medindo time to first byte (ttfb)...',
    '> auditando recursos críticos do dom...',
    '> analisando largest contentful paint (lcp)...',
    '> calculando cumulative layout shift (cls)...',
    '> verificando first input delay (fid)...',
    '> processando core web vitals...',
    '> executando benchmark de performance avançado...',
    '> compilando e normalizando métricas...',
    `> ██████████████████ análise concluída — score ${score}/100`,
  ];
}

// ── Ring geometry ─────────────────────────────────────────────────────────────

const R    = 50;
const CIRC = 2 * Math.PI * R;

// ── Metric helpers ────────────────────────────────────────────────────────────

const METRIC_LABELS: Record<string, string> = { lcp: 'LCP', cls: 'CLS', ttfb: 'TTFB', fid: 'FID' };
const METRIC_DESCS: Record<string, string>  = { lcp: 'Velocidade de carregamento', cls: 'Estabilidade visual', ttfb: 'Tempo de resposta do servidor', fid: 'Resposta ao primeiro clique' };

function metricBarPct(m: Metrics, key: keyof Omit<Metrics, 'score'>): number {
  switch (key) {
    case 'lcp':  return Math.min(100, Math.round(68 + (1 - (m.lcp  - 1150) / 950)  * 30));
    case 'cls':  return Math.min(100, Math.round(82 + (1 - (m.cls  - 0.01) / 0.06) * 16));
    case 'ttfb': return Math.min(100, Math.round(72 + (1 - (m.ttfb - 175)  / 280)  * 24));
    case 'fid':  return Math.min(100, Math.round(85 + (1 - (m.fid  - 11)   / 35)   * 13));
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

// ── Demo / pre-loaded state ───────────────────────────────────────────────────

const DEMO_METRICS: Metrics = { score: 94, lcp: 1200, cls: 0.02, ttfb: 180, fid: 8 };
const DEMO_DOMAIN  = 'mezzoldstudio.com.br';

// ── Sub-components ────────────────────────────────────────────────────────────

function ScoreRing({ m, ready, uid }: { m: Metrics; ready: boolean; uid: string }) {
  const offset  = ready ? CIRC * (1 - m.score / 100) : CIRC;
  const isElite = m.score >= 90;
  const gradId  = `perf-grad-${uid}`;
  const glowId  = `perf-glow-${uid}`;

  return (
    <div className="relative w-[148px] h-[148px] shrink-0">
      <svg width="148" height="148" viewBox="0 0 120 120">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor={isElite ? '#06b6d4' : '#60a5fa'} />
            <stop offset="100%" stopColor={isElite ? '#10b981' : '#06b6d4'} />
          </linearGradient>
          <filter id={glowId} x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Track */}
        <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="7" />
        {/* Progress */}
        <circle
          cx="60" cy="60" r={R}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
          transform="rotate(-90 60 60)"
          filter={`url(#${glowId})`}
          style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.34,1.56,0.64,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
          className="font-mono font-black leading-none text-white"
          style={{ fontSize: '2.4rem' }}
        >
          {m.score}
        </motion.span>
        <span className="font-mono text-[7.5px] tracking-widest uppercase text-white/25 mt-0.5">score</span>
      </div>
    </div>
  );
}

function MetricBarsPanel({ m, ready, animDelay = 0 }: { m: Metrics; ready: boolean; animDelay?: number }) {
  return (
    <div className="flex flex-col gap-3.5 w-full">
      {(['lcp', 'cls', 'ttfb', 'fid'] as const).map((key, i) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: animDelay + i * 0.07, duration: 0.25 }}
        >
          <div className="flex justify-between items-center mb-1.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] tracking-[0.28em] uppercase text-white/50 font-bold">
                {METRIC_LABELS[key]}
              </span>
              <span className="font-mono text-[7px] text-white/18 hidden sm:block">{METRIC_DESCS[key]}</span>
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: animDelay + 0.3 + i * 0.07 }}
              className="font-mono text-[11px] font-bold text-emerald/80"
            >
              {metricValue(m, key)}
            </motion.span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: ready ? `${metricBarPct(m, key)}%` : 0 }}
              transition={{ duration: 1.0, delay: animDelay + 0.1 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                background: 'linear-gradient(90deg, #06b6d4, #10b981)',
                boxShadow: '0 0 8px rgba(16,185,129,0.4)',
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Phase type ────────────────────────────────────────────────────────────────

type Phase = 'idle' | 'scanning' | 'result';

// ── Main component ─────────────────────────────────────────────────────────────

export function PerformanceBenchmarkSimulator() {
  const [url,       setUrl]       = useState('');
  const [phase,     setPhase]     = useState<Phase>('idle');
  const [logs,      setLogs]      = useState<string[]>([]);
  const [metrics,   setMetrics]   = useState<Metrics | null>(null);
  const [ringReady, setRingReady] = useState(false);
  const [barsReady, setBarsReady] = useState(false);

  const inputRef      = useRef<HTMLInputElement>(null);
  const scanLogsRef   = useRef<HTMLDivElement>(null);
  const resultLogsRef = useRef<HTMLDivElement>(null);

  const valid  = validateUrl(url);
  const domain = url ? extractDomain(url) : '';

  // Auto-scroll both log views
  useEffect(() => {
    [scanLogsRef, resultLogsRef].forEach(ref => {
      if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
    });
  }, [logs]);

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

  const isElite = (metrics?.score ?? 0) >= 90;

  // ── Shared glass styles ──────────────────────────────────────────────────────

  const glassCard: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.04)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(96, 165, 250, 0.15)',
  };

  return (
    <div className="w-full font-mono select-none">

      {/* ── Section label ── */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-emerald">
          [ PERFORMANCE ]
        </span>
        <div className="flex-1 h-px bg-emerald/20" />
        <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/15">
          Testado pela Mezzold
        </span>
      </div>

      {/* ── Main container ── */}
      <div
        className="relative border border-white/[0.07] rounded-xl overflow-hidden flex flex-col"
        style={{
          background: 'rgba(10, 10, 10, 0.80)',
          backdropFilter: 'blur(24px)',
          minHeight: '580px',
        }}
      >
        {/* Scanlines overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] opacity-[0.018]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,1) 3px,rgba(255,255,255,1) 4px)' }}
        />

        {/* Corner brackets */}
        <div className="absolute top-0 left-0    w-5 h-5 border-t border-l border-emerald/45 rounded-tl-xl pointer-events-none z-[2]" />
        <div className="absolute top-0 right-0   w-5 h-5 border-t border-r border-emerald/18 rounded-tr-xl pointer-events-none z-[2]" />
        <div className="absolute bottom-0 left-0  w-5 h-5 border-b border-l border-emerald/18 rounded-bl-xl pointer-events-none z-[2]" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-emerald/18 rounded-br-xl pointer-events-none z-[2]" />

        {/* Header bar */}
        <div
          className="relative z-[3] flex items-center justify-between gap-3 px-5 py-3 border-b border-white/[0.07] shrink-0"
          style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-400/30" />
            <div className="w-2 h-2 rounded-full bg-emerald/35" />
            <span className="ml-2 font-mono text-[7.5px] tracking-[0.35em] uppercase text-white/20">
              performance.benchmark
            </span>
          </div>
          <div className="flex items-center gap-3">
            {phase === 'result' && (
              <button
                onClick={reset}
                className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/25 hover:text-white/55 border border-white/[0.07] hover:border-white/20 rounded px-3 py-1 transition-all duration-200"
              >
                Nova análise
              </button>
            )}
            <span className="font-mono text-[7px] tracking-[0.2em] uppercase text-white/15">
              Mezzold Engine
            </span>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="relative z-[3] flex-1 p-4 md:p-5 flex flex-col gap-4">

          {/* ── URL Input — always visible except result ── */}
          <AnimatePresence>
            {phase !== 'result' && (
              <motion.div
                key="input-bar"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.22 }}
                className="shrink-0"
              >
                <label className="block font-mono text-[8.5px] tracking-[0.32em] uppercase text-white/30 mb-2">
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
                        'w-full h-11 px-4 pr-10 rounded-lg font-mono text-sm text-white',
                        'placeholder:text-white/15 outline-none border transition-all duration-300',
                        'disabled:opacity-40 disabled:cursor-not-allowed',
                        url.length > 0 && valid
                          ? 'border-emerald/50 shadow-[0_0_16px_rgba(16,185,129,0.12)]'
                          : url.length > 0
                          ? 'border-red-500/30'
                          : 'border-white/[0.10] focus:border-blue-400/30 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.10)]',
                      ].join(' ')}
                      style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(8px)' }}
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
                    {phase === 'scanning' ? 'Analisando...' : 'Testar agora →'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ═══════════════════════════════════════════════════════════
              IDLE — Pre-loaded demo with rich content
          ════════════════════════════════════════════════════════════ */}
          {phase === 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="flex-1 flex flex-col"
            >
              {/* Section header */}
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[7px] tracking-[0.4em] uppercase text-white/20">[ ÚLTIMA ANÁLISE ]</span>
                <div className="flex-1 h-px bg-white/[0.05]" />
                <span className="font-mono text-[7px] text-emerald/45 tracking-wider">{DEMO_DOMAIN}</span>
              </div>

              {/* Two-column layout */}
              <div className="flex flex-col sm:flex-row gap-3 flex-1">

                {/* Left: Score ring card */}
                <div
                  className="sm:w-[38%] flex flex-col items-center justify-center gap-3 rounded-xl p-5"
                  style={glassCard}
                >
                  <ScoreRing m={DEMO_METRICS} ready uid="demo" />

                  {/* Elite badge */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.55, type: 'spring', stiffness: 300, damping: 22 }}
                    className="font-mono font-bold text-[7.5px] tracking-[0.32em] uppercase px-3 py-1.5 rounded-lg text-center"
                    style={{
                      color: '#10b981',
                      background: 'rgba(16,185,129,0.10)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(16,185,129,0.35)',
                      boxShadow: '0 0 20px rgba(16,185,129,0.22)',
                    }}
                  >
                    Site extremamente rápido ✓
                  </motion.div>

                  <span className="font-mono text-[7px] text-white/18 tracking-wider mt-1">
                    Análise feita pela Mezzold
                  </span>
                </div>

                {/* Right: Metrics + hint */}
                <div
                  className="sm:flex-1 flex flex-col gap-4 rounded-xl p-4"
                  style={glassCard}
                >
                  <MetricBarsPanel m={DEMO_METRICS} ready animDelay={0.15} />

                  <div className="mt-auto pt-3 border-t border-white/[0.05] flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-blue-400/30" />
                    <p className="font-mono text-[7.5px] text-white/20 tracking-wider">
                      insira uma URL acima para analisar seu site
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              SCANNING — Terminal logs
          ════════════════════════════════════════════════════════════ */}
          <AnimatePresence>
            {phase === 'scanning' && metrics && (
              <motion.div
                key="scanning-view"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col gap-3"
              >
                {/* Scanning indicator */}
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.1 }}
                    className="w-2 h-2 rounded-full bg-emerald"
                  />
                  <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-emerald/60">
                    Analisando {domain}...
                  </span>
                </div>

                {/* Terminal */}
                <div
                  className="rounded-xl border border-emerald/[0.14] overflow-hidden flex-1 flex flex-col"
                  style={{ background: 'rgba(2, 8, 4, 0.90)' }}
                >
                  <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-emerald/[0.08] shrink-0" style={{ background: 'rgba(0,0,0,0.40)' }}>
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400/30" />
                    <div className="w-2 h-2 rounded-full bg-emerald/35" />
                    <span className="ml-2 font-mono text-[7.5px] tracking-[0.28em] uppercase text-white/15">
                      mezzold_diagnostic_shell — {domain}
                    </span>
                  </div>
                  <div
                    ref={scanLogsRef}
                    className="p-4 overflow-y-auto flex-1"
                    style={{ height: '120px', maxHeight: '120px' }}
                  >
                    {logs.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.1 }}
                        className={`font-mono text-[10px] leading-relaxed ${line.includes('análise concluída') ? 'text-emerald font-bold' : 'text-emerald/55'}`}
                      >
                        {line}
                      </motion.div>
                    ))}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.85 }}
                      className="inline-block w-2 h-[12px] bg-emerald/60 align-middle ml-0.5"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ═══════════════════════════════════════════════════════════
              RESULT — Two-column with score + metrics + terminal + CTA
          ════════════════════════════════════════════════════════════ */}
          <AnimatePresence>
            {phase === 'result' && metrics && (
              <motion.div
                key="result-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col gap-3"
              >
                {/* Classification bar */}
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                  className="flex items-center gap-3 shrink-0"
                >
                  <span className={`font-mono text-[9px] tracking-[0.4em] uppercase font-bold ${isElite ? 'text-emerald' : 'text-cyan'}`}>
                    {isElite ? 'Site extremamente rápido ✓' : 'Site com boa performance ◈'}
                  </span>
                  <span className="font-mono text-[7px] text-white/20 tracking-wider">{domain}</span>
                </motion.div>

                {/* Two-column grid */}
                <div className="flex flex-col sm:flex-row gap-3 flex-1">

                  {/* ── Left (40%): Score ring + badge + powered by ── */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.93 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.12, type: 'spring', stiffness: 240, damping: 22 }}
                    className="sm:w-[38%] flex flex-col items-center justify-center gap-3 rounded-xl p-5"
                    style={glassCard}
                  >
                    <ScoreRing m={metrics} ready={ringReady} uid="result" />

                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.55, type: 'spring', stiffness: 300, damping: 22 }}
                      className="font-mono font-bold text-[7.5px] tracking-[0.32em] uppercase px-3 py-1.5 rounded-lg text-center"
                      style={{
                        color:        isElite ? '#10b981' : '#06b6d4',
                        background:   isElite ? 'rgba(16,185,129,0.10)'  : 'rgba(6,182,212,0.10)',
                        backdropFilter: 'blur(12px)',
                        border:       `1px solid ${isElite ? 'rgba(16,185,129,0.35)' : 'rgba(6,182,212,0.35)'}`,
                        boxShadow:    `0 0 20px ${isElite ? 'rgba(16,185,129,0.22)' : 'rgba(6,182,212,0.22)'}`,
                      }}
                    >
                      {isElite ? 'Site extremamente rápido ✓' : 'Site com boa performance ◈'}
                    </motion.div>

                    <span className="font-mono text-[7px] text-white/18 tracking-wider mt-1">
                      Análise feita pela Mezzold
                    </span>
                  </motion.div>

                  {/* ── Right (60%): Metrics + terminal + CTA ── */}
                  <div className="sm:flex-1 flex flex-col gap-3">

                    {/* Metric bars */}
                    <div className="rounded-xl p-4" style={glassCard}>
                      <MetricBarsPanel m={metrics} ready={barsReady} animDelay={0.2} />
                    </div>

                    {/* Terminal logs */}
                    <div
                      className="rounded-xl border border-emerald/[0.12] overflow-hidden"
                      style={{ background: 'rgba(2,8,4,0.85)' }}
                    >
                      <div className="flex items-center gap-2 px-3 py-2 border-b border-emerald/[0.07]" style={{ background: 'rgba(0,0,0,0.35)' }}>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald/40" />
                        <span className="font-mono text-[7px] tracking-[0.28em] uppercase text-white/15">diagnostic log</span>
                      </div>
                      <div
                        ref={resultLogsRef}
                        className="p-3 overflow-y-auto"
                        style={{ height: '120px' }}
                      >
                        {logs.map((line, i) => (
                          <div
                            key={i}
                            className={`font-mono text-[9px] leading-relaxed ${line.includes('análise concluída') ? 'text-emerald font-bold' : 'text-emerald/45'}`}
                          >
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div
                      className="rounded-xl p-4 flex items-center justify-between gap-3"
                      style={glassCard}
                    >
                      <div>
                        <p className="font-mono text-[9px] text-white/45 leading-relaxed">
                          Quer que seu site tenha essa performance?
                        </p>
                        <p className="font-mono text-[7.5px] text-white/20 mt-0.5">
                          Construímos isso do zero para cada cliente.
                        </p>
                      </div>
                      <Link
                        href="/#contact"
                        className="shrink-0 inline-flex items-center gap-1.5 h-10 px-4 rounded-lg border font-mono text-[8px] tracking-[0.22em] uppercase font-bold transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,0,51,0.3)] active:scale-[0.97] whitespace-nowrap"
                        style={{
                          background: 'rgba(255,0,51,0.08)',
                          borderColor: 'rgba(255,0,51,0.40)',
                          color: '#ff0033',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,0,51,0.16)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,0,51,0.08)'; }}
                      >
                        → Falar com a Mezzold
                      </Link>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
