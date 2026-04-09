'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, Copy, Check, ExternalLink, Trash2, X, TrendingUp, ChevronRight } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────

interface LinkRecord {
  id:          string;
  slug:        string;
  originalUrl: string;
  createdAt:   number;
  clicks:      number;
  spark:       number[]; // 12 hourly values for mini sparkline
  daily:       number[]; // 7 daily values for detail bar chart
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function makeId() { return Math.random().toString(36).slice(2, 10); }

function makeSlug() {
  const c = 'abcdefghijkmnpqrstuvwxyz23456789';
  return Array.from({ length: 5 }, () => c[Math.floor(Math.random() * c.length)]).join('');
}

function genSpark(): number[] {
  return Array.from({ length: 12 }, () => Math.random() < 0.45 ? Math.floor(Math.random() * 18) + 1 : 0);
}

function genDaily(): number[] {
  return Array.from({ length: 7 }, () => Math.random() < 0.75 ? Math.floor(Math.random() * 60) + 1 : 0);
}

function isValidUrl(url: string): boolean {
  try {
    const u = new URL(url.startsWith('http') ? url : `https://${url}`);
    return u.hostname.includes('.');
  } catch { return false; }
}

function truncate(str: string, n = 36): string {
  return str.length > n ? str.slice(0, n) + '…' : str;
}

function fmtDate(ts: number): string {
  return new Date(ts).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

const DAY_LABELS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const DEMO_LINKS: LinkRecord[] = [
  { id: 'd1', slug: 'studio', originalUrl: 'https://mezzoldstudio.com.br/cases', createdAt: Date.now() - 86400000 * 2, clicks: 247, spark: [3,0,8,2,15,0,4,11,0,6,9,3], daily: [12,34,28,0,47,19,41] },
  { id: 'd2', slug: 'github', originalUrl: 'https://github.com/ViniciusNoetzold',   createdAt: Date.now() - 86400000 * 5, clicks: 183, spark: [0,5,0,9,3,0,17,2,8,0,4,6], daily: [8,0,22,15,0,38,27]  },
  { id: 'd3', slug: 'deploy', originalUrl: 'https://vercel.com/dashboard',            createdAt: Date.now() - 86400000 * 1, clicks: 89,  spark: [1,0,0,4,0,12,0,5,2,0,8,0], daily: [0,0,5,0,21,34,0]  },
];

const LS_KEY = 'mezzlink_v1';

// ── Mini sparkline ─────────────────────────────────────────────────────────────

function MiniSpark({ data }: { data: number[] }) {
  if (data.length < 2) return <div className="w-14 h-5" />;
  const max = Math.max(...data, 1);
  const W = 56; const H = 20; const P = 2;
  const pts: [number, number][] = data.map((v, i) => [
    P + (i / (data.length - 1)) * (W - P * 2),
    H - P - (v / max) * (H - P * 2),
  ]);
  const line = pts.reduce((acc, [x, y], i) => {
    if (i === 0) return `M${x} ${y}`;
    const [px, py] = pts[i - 1];
    const mx = px + (x - px) * 0.5;
    return `${acc} C${mx} ${py} ${mx} ${y} ${x} ${y}`;
  }, '');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-14 h-5" preserveAspectRatio="none">
      <path d={line} fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2" fill="#3b82f6" />
    </svg>
  );
}

// ── Bar chart (7 days) ─────────────────────────────────────────────────────────

function BarChart({ data }: { data: number[] }) {
  const max = Math.max(...data, 1);
  const W = 280; const H = 72; const BAR_W = 28; const GAP = 12;
  const today = new Date().getDay();
  const labels = Array.from({ length: 7 }, (_, i) => DAY_LABELS[(today - 6 + i + 7) % 7]);

  return (
    <svg viewBox={`0 0 ${W} ${H + 14}`} className="w-full" preserveAspectRatio="xMidYMid meet">
      {data.map((v, i) => {
        const barH = (v / max) * H;
        const x = i * (BAR_W + GAP);
        const y = H - barH;
        return (
          <g key={i}>
            {/* Track */}
            <rect x={x} y={0} width={BAR_W} height={H} rx="3" fill="rgba(255,255,255,0.03)" />
            {/* Bar */}
            <motion.rect
              x={x} y={y} width={BAR_W} height={barH} rx="3"
              fill="#3b82f6" opacity="0.75"
              initial={{ height: 0, y: H }}
              animate={{ height: barH, y }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: 'easeOut' }}
            />
            {/* Label */}
            <text x={x + BAR_W / 2} y={H + 11} textAnchor="middle" fontSize="7" fontFamily="monospace" fill="rgba(255,255,255,0.3)">
              {labels[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── KPI stat ───────────────────────────────────────────────────────────────────

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="relative border border-blue-500/[0.12] rounded-lg p-3 bg-blue-500/[0.03] overflow-hidden">
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-blue-500/25 rounded-tl-lg pointer-events-none" />
      <p className="font-mono text-[7px] tracking-[0.3em] uppercase text-white/22 mb-1.5">{label}</p>
      <motion.p key={value} initial={{ opacity: 0.4, y: -3 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}
        className="font-mono font-black text-lg text-blue-400 leading-none">
        {value}
      </motion.p>
      {sub && <p className="font-mono text-[7px] text-white/18 mt-1 truncate max-w-full">{sub}</p>}
    </div>
  );
}

// ── Clear confirmation modal ───────────────────────────────────────────────────

function ClearModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  const [val, setVal] = useState('');
  const valid = val === 'CONFIRMAR';
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-[#080808] border border-electric-red/25 rounded-xl p-5 w-full max-w-sm shadow-[0_0_40px_rgba(255,0,51,0.1)]" onClick={e => e.stopPropagation()}>
        <div className="font-mono text-[8px] leading-[1.8] text-white/30 mb-4 space-y-0.5">
          <p><span className="text-electric-red">{'>'}</span> AVISO: Esta ação eliminará todos os links.</p>
          <p><span className="text-electric-red">{'>'}</span> A operação é irreversível.</p>
          <p><span className="text-white/45">{'>'}</span> Digite <span className="text-electric-red font-bold">CONFIRMAR</span> para prosseguir:</p>
        </div>
        <input
          type="text"
          autoFocus
          value={val}
          onChange={e => setVal(e.target.value.toUpperCase())}
          onKeyDown={e => e.key === 'Enter' && valid && onConfirm()}
          placeholder="CONFIRMAR"
          className={`w-full h-10 px-3 font-mono text-sm rounded-lg border bg-black/50 text-white outline-none transition-colors duration-200 ${
            valid ? 'border-electric-red/50 text-electric-red' : 'border-white/[0.08]'
          }`}
        />
        <div className="flex gap-2 mt-3">
          <button onClick={onCancel} className="flex-1 h-9 font-mono text-[9px] tracking-widest uppercase border border-white/[0.08] text-white/30 rounded-lg hover:border-white/20 hover:text-white/50 transition-all duration-200">
            Cancelar
          </button>
          <button onClick={onConfirm} disabled={!valid} className="flex-1 h-9 font-mono text-[9px] tracking-widest uppercase border border-electric-red/40 text-electric-red bg-electric-red/[0.08] rounded-lg hover:bg-electric-red/15 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200">
            Executar
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Detail modal ───────────────────────────────────────────────────────────────

function DetailModal({ link, onClose, onDelete, onSimClick }: {
  link: LinkRecord; onClose: () => void; onDelete: () => void; onSimClick: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const shortUrl = `mzld.io/${link.slug}`;
  const qrData   = encodeURIComponent(`https://mzld.io/${link.slug}`);
  const qrUrl    = `https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${qrData}&bgcolor=0a0a0a&color=ededed&margin=8`;

  function copy() {
    navigator.clipboard.writeText(shortUrl).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        className="w-full max-w-md bg-[#080c12] border border-blue-500/20 rounded-xl overflow-hidden shadow-[0_0_60px_rgba(59,130,246,0.08)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div>
            <span className="font-mono font-bold text-sm text-blue-400">mzld.io/{link.slug}</span>
            <p className="font-mono text-[8px] text-white/25 mt-0.5 truncate max-w-[280px]">{link.originalUrl}</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-md border border-white/[0.07] flex items-center justify-center text-white/30 hover:text-white/60 hover:border-white/20 transition-all duration-200">
            <X size={12} />
          </button>
        </div>

        {/* Bar chart */}
        <div className="px-5 pt-4 pb-2">
          <span className="font-mono text-[7px] tracking-[0.3em] uppercase text-white/22 block mb-3">[ CLIQUES — ÚLTIMOS 7 DIAS ]</span>
          <BarChart data={link.daily} />
        </div>

        {/* QR + actions */}
        <div className="grid grid-cols-2 gap-4 px-5 py-4 border-t border-white/[0.05]">
          {/* Left: actions */}
          <div className="flex flex-col gap-2 justify-center">
            <button onClick={copy} className="flex items-center gap-2 h-9 px-3 rounded-lg border border-blue-500/25 bg-blue-500/[0.06] text-blue-400 font-mono text-[9px] tracking-[0.2em] uppercase hover:bg-blue-500/12 transition-all duration-200">
              {copied ? <Check size={11} /> : <Copy size={11} />}
              {copied ? 'Copiado!' : 'Copiar slug'}
            </button>
            <button onClick={() => { onSimClick(); onClose(); }} className="flex items-center gap-2 h-9 px-3 rounded-lg border border-white/[0.07] text-white/35 font-mono text-[9px] tracking-[0.2em] uppercase hover:border-white/18 hover:text-white/55 transition-all duration-200">
              <ExternalLink size={11} />
              Simular clique
            </button>
            <div className="mt-1 flex items-center gap-2">
              <span className="font-mono text-[8px] text-white/20">{link.clicks} cliques totais</span>
            </div>
          </div>

          {/* Right: QR code */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-[100px] h-[100px] rounded-lg overflow-hidden border border-white/[0.07] bg-[#0a0a0a] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrUrl} alt={`QR code for mzld.io/${link.slug}`} className="w-full h-full object-contain" loading="lazy" />
            </div>
            <span className="font-mono text-[7px] text-white/18 tracking-widest">mzld.io/{link.slug}</span>
          </div>
        </div>

        {/* Delete */}
        <div className="px-5 pb-4">
          <button onClick={onDelete} className="w-full h-9 rounded-lg border border-electric-red/20 text-electric-red/60 font-mono text-[9px] tracking-[0.25em] uppercase hover:bg-electric-red/[0.06] hover:border-electric-red/35 hover:text-electric-red/80 transition-all duration-200 flex items-center justify-center gap-2">
            <Trash2 size={11} />
            Deletar link
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function MezzLink() {
  const [mounted,    setMounted]    = useState(false);
  const [links,      setLinks]      = useState<LinkRecord[]>([]);
  const [input,      setInput]      = useState('');
  const [copying,    setCopying]    = useState<string | null>(null);
  const [detail,     setDetail]     = useState<LinkRecord | null>(null);
  const [showClear,  setShowClear]  = useState(false);

  const valid = isValidUrl(input);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as LinkRecord[];
        setLinks(parsed.length ? parsed : DEMO_LINKS);
      } else {
        setLinks(DEMO_LINKS);
      }
    } catch {
      setLinks(DEMO_LINKS);
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (mounted) localStorage.setItem(LS_KEY, JSON.stringify(links));
  }, [links, mounted]);

  // Derived analytics
  const totalClicks  = links.reduce((a, l) => a + l.clicks, 0);
  const mostPopular  = links.length ? links.reduce((a, b) => b.clicks > a.clicks ? b : a) : null;
  const clicksToday  = links.reduce((a, l) => a + (l.daily[6] ?? 0), 0);

  function addLink() {
    if (!valid) return;
    const url = input.startsWith('http') ? input : `https://${input}`;
    const rec: LinkRecord = {
      id: makeId(), slug: makeSlug(), originalUrl: url,
      createdAt: Date.now(), clicks: 0, spark: genSpark(), daily: genDaily(),
    };
    setLinks(prev => [rec, ...prev]);
    setInput('');
  }

  function simClick(id: string) {
    setLinks(prev => prev.map(l => l.id !== id ? l : {
      ...l,
      clicks: l.clicks + 1,
      spark: [...l.spark.slice(1), (l.spark[l.spark.length - 1] ?? 0) + 1],
      daily: l.daily.map((v, i) => i === 6 ? v + 1 : v),
    }));
  }

  function copySlug(slug: string) {
    navigator.clipboard.writeText(`mzld.io/${slug}`).then(() => {
      setCopying(slug);
      setTimeout(() => setCopying(null), 2000);
    });
  }

  function deleteLink(id: string) {
    setLinks(prev => prev.filter(l => l.id !== id));
    setDetail(null);
  }

  function clearAll() {
    setLinks([]);
    setShowClear(false);
    localStorage.removeItem(LS_KEY);
  }

  if (!mounted) {
    return <div className="w-full h-64 flex items-center justify-center">
      <span className="font-mono text-[9px] tracking-widest uppercase text-white/20">Carregando...</span>
    </div>;
  }

  return (
    <div className="w-full font-mono select-none" style={{ background: '#060810' }}>

      {/* ── App header ── */}
      <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-7 h-7 rounded-lg border border-blue-500/30 bg-blue-500/[0.08] flex items-center justify-center">
              <Link size={13} className="text-blue-400" />
            </div>
            <h2 className="font-sans font-black text-2xl tracking-tighter text-white">MEZZLINK</h2>
            <span className="font-mono text-[7px] tracking-[0.3em] uppercase px-2 py-0.5 rounded border border-blue-500/20 text-blue-400/60 bg-blue-500/[0.04]">
              MICRO-SAAS DEMO
            </span>
          </div>
          <p className="font-mono text-[8px] tracking-[0.15em] text-white/22">Encurte. Rastreie. Escale.</p>
        </div>

        <button
          onClick={() => setShowClear(true)}
          disabled={links.length === 0}
          className="font-mono text-[8px] tracking-[0.25em] uppercase px-3 py-1.5 rounded border border-electric-red/15 text-electric-red/40 hover:border-electric-red/30 hover:text-electric-red/65 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
        >
          Limpar tudo
        </button>
      </div>

      {/* ── Analytics KPIs ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        <Stat label="Total de links"   value={String(links.length)}                                          />
        <Stat label="Total de cliques" value={totalClicks.toLocaleString('pt-BR')}                          />
        <Stat label="Mais popular"     value={mostPopular ? `/${mostPopular.slug}` : '—'} sub={mostPopular ? `${mostPopular.clicks} cliques` : undefined} />
        <Stat label="Cliques hoje"     value={String(clicksToday)}                                           />
      </div>

      {/* ── Input ── */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && valid && addLink()}
            placeholder="cole sua URL longa aqui..."
            className={[
              'w-full h-10 pl-3 pr-10 rounded-lg border bg-black/40 text-white/80 text-xs placeholder:text-white/18 outline-none transition-all duration-200',
              input.length > 0 && valid
                ? 'border-blue-500/50 shadow-[0_0_12px_rgba(59,130,246,0.10)]'
                : input.length > 0
                ? 'border-electric-red/30'
                : 'border-white/[0.07] focus:border-white/18',
            ].join(' ')}
          />
          {input.length > 0 && (
            <div className={`absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${valid ? 'bg-blue-400' : 'bg-electric-red/60'}`} />
          )}
        </div>
        <button
          onClick={addLink}
          disabled={!valid}
          className="shrink-0 h-10 px-5 rounded-lg border font-mono text-[9px] tracking-[0.25em] uppercase transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed bg-blue-500/10 border-blue-500/35 text-blue-400 hover:bg-blue-500/18 hover:border-blue-500/55 hover:shadow-[0_0_20px_rgba(59,130,246,0.14)]"
        >
          Encurtar →
        </button>
      </div>

      {/* ── Links table ── */}
      {links.length === 0 ? (
        <div className="border border-white/[0.04] border-dashed rounded-lg py-12 flex flex-col items-center gap-3">
          <Link size={20} className="text-white/12" />
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/18">Nenhum link criado</span>
        </div>
      ) : (
        <div className="border border-white/[0.06] rounded-lg overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-[120px_1fr_70px_56px_52px_80px] gap-3 px-4 py-2 border-b border-white/[0.05] bg-white/[0.01]">
            {['SLUG', 'ORIGINAL', 'CLICKS', 'TREND', 'DATA', ''].map(h => (
              <span key={h} className="font-mono text-[7px] tracking-[0.25em] uppercase text-white/18">{h}</span>
            ))}
          </div>

          {/* Rows */}
          <AnimatePresence initial={false}>
            {links.map(link => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.18 }}
                className="group border-b border-white/[0.04] last:border-0 px-4 py-3 hover:bg-blue-500/[0.03] transition-colors duration-150"
              >
                {/* Mobile layout */}
                <div className="md:hidden flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono text-[10px] font-bold text-blue-400">mzld.io/{link.slug}</span>
                      <button onClick={() => copySlug(link.slug)} className="text-white/25 hover:text-blue-400 transition-colors duration-150">
                        {copying === link.slug ? <Check size={10} /> : <Copy size={10} />}
                      </button>
                    </div>
                    <span className="font-mono text-[8px] text-white/28 truncate block">{truncate(link.originalUrl, 40)}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-xs font-bold text-white/55">{link.clicks}</span>
                    <button onClick={() => setDetail(link)} className="w-7 h-7 rounded border border-white/[0.07] flex items-center justify-center text-white/25 hover:border-blue-500/30 hover:text-blue-400 transition-all duration-150">
                      <ChevronRight size={12} />
                    </button>
                  </div>
                </div>

                {/* Desktop layout */}
                <div className="hidden md:grid grid-cols-[120px_1fr_70px_56px_52px_80px] gap-3 items-center">
                  {/* Slug + copy */}
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-bold text-blue-400 truncate">/{link.slug}</span>
                    <button onClick={() => copySlug(link.slug)} className="shrink-0 text-white/22 hover:text-blue-400 transition-colors duration-150">
                      {copying === link.slug ? <Check size={9} /> : <Copy size={9} />}
                    </button>
                  </div>
                  {/* Original */}
                  <span className="font-mono text-[9px] text-white/30 truncate">{truncate(link.originalUrl)}</span>
                  {/* Clicks */}
                  <span className="font-mono text-[10px] font-bold text-white/60 tabular-nums">{link.clicks.toLocaleString('pt-BR')}</span>
                  {/* Spark */}
                  <MiniSpark data={link.spark} />
                  {/* Date */}
                  <span className="font-mono text-[8px] text-white/22 tabular-nums">{fmtDate(link.createdAt)}</span>
                  {/* Details */}
                  <button
                    onClick={() => setDetail(link)}
                    className="flex items-center gap-1 font-mono text-[8px] tracking-widest uppercase text-white/22 hover:text-blue-400 transition-colors duration-150 group-hover:text-white/40"
                  >
                    Detalhes <ChevronRight size={9} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* ── Detail modal ── */}
      <AnimatePresence>
        {detail && (
          <DetailModal
            key={detail.id}
            link={detail}
            onClose={() => setDetail(null)}
            onDelete={() => deleteLink(detail.id)}
            onSimClick={() => { simClick(detail.id); setDetail(prev => prev ? { ...prev, clicks: prev.clicks + 1 } : prev); }}
          />
        )}
      </AnimatePresence>

      {/* ── Clear confirmation ── */}
      <AnimatePresence>
        {showClear && (
          <ClearModal onConfirm={clearAll} onCancel={() => setShowClear(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
