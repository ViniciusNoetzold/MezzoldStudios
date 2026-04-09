'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Link, Copy, Check, ExternalLink, Trash2, X,
  TrendingUp, ChevronRight, MousePointerClick, Activity,
} from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

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

// ── Helpers (logic unchanged) ─────────────────────────────────────────────────

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

// ── Mini sparkline (with gradient fill) ───────────────────────────────────────

function MiniSpark({ data, uid }: { data: number[]; uid: string }) {
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
  const fill = `${line} L${pts[pts.length - 1][0]} ${H - P} L${pts[0][0]} ${H - P} Z`;
  const gradId = `sg-${uid}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-14 h-5" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0"    />
        </linearGradient>
      </defs>
      <path d={fill} fill={`url(#${gradId})`} />
      <path d={line} fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2" fill="#60a5fa" />
    </svg>
  );
}

// ── Bar chart (7 days, gradient bars) ────────────────────────────────────────

function BarChart({ data }: { data: number[] }) {
  const max = Math.max(...data, 1);
  const W = 280; const H = 72; const BAR_W = 28; const GAP = 12;
  const today = new Date().getDay();
  const labels = Array.from({ length: 7 }, (_, i) => DAY_LABELS[(today - 6 + i + 7) % 7]);

  return (
    <svg viewBox={`0 0 ${W} ${H + 14}`} className="w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="bar-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {data.map((v, i) => {
        const barH = (v / max) * H;
        const x = i * (BAR_W + GAP);
        const y = H - barH;
        return (
          <g key={i}>
            <rect x={x} y={0} width={BAR_W} height={H} rx="3" fill="rgba(255,255,255,0.025)" />
            <motion.rect
              x={x} rx="3" width={BAR_W}
              fill="url(#bar-grad)"
              initial={{ height: 0, y: H }}
              animate={{ height: barH, y }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: 'easeOut' }}
            />
            <text x={x + BAR_W / 2} y={H + 12} textAnchor="middle" fontSize="7"
              fontFamily="monospace" fill="rgba(255,255,255,0.28)">
              {labels[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────

function Stat({ label, value, sub, icon: Icon }: {
  label: string; value: string; sub?: string; icon?: LucideIcon;
}) {
  return (
    <motion.div
      whileHover={{ y: -1 }}
      transition={{ duration: 0.15 }}
      className="relative border border-white/[0.07] rounded-xl p-4 overflow-hidden group hover:border-blue-500/25 transition-colors duration-300"
      style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.028) 0%, rgba(255,255,255,0.008) 100%)' }}
    >
      {/* Corner accent */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-blue-500/25 rounded-tl-xl pointer-events-none" />

      {/* Icon */}
      {Icon && (
        <div className="w-7 h-7 rounded-lg border border-blue-500/15 bg-blue-500/[0.06] flex items-center justify-center mb-3">
          <Icon size={13} className="text-blue-400/80" />
        </div>
      )}

      <p className="font-mono text-[7px] tracking-[0.3em] uppercase text-white/22 mb-2">{label}</p>
      <motion.p
        key={value}
        initial={{ opacity: 0.4, y: -3 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="font-mono font-black text-xl leading-none text-white"
        style={{ textShadow: '0 0 22px rgba(96,165,250,0.30)' }}
      >
        <span className="text-blue-400">{value}</span>
      </motion.p>
      {sub && <p className="font-mono text-[7px] text-white/22 mt-1.5 truncate max-w-full">{sub}</p>}
    </motion.div>
  );
}

// ── Clear confirmation modal ──────────────────────────────────────────────────

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
          type="text" autoFocus value={val}
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
          <button onClick={onConfirm} disabled={!valid} className="flex-1 h-9 font-mono text-[9px] tracking-widest uppercase border border-electric-red/40 text-electric-red bg-electric-red/[0.08] rounded-lg hover:bg-electric-red/15 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2">
            <Trash2 size={10} /> Executar
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Detail modal ──────────────────────────────────────────────────────────────

function DetailModal({ link, onClose, onDelete, onSimClick }: {
  link: LinkRecord; onClose: () => void; onDelete: () => void; onSimClick: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const shortUrl = `mzld.io/${link.slug}`;
  const qrData   = encodeURIComponent(`https://mzld.io/${link.slug}`);
  // 2× resolution → sharp at 120px; blue dots on near-black bg matching MezzLink colours
  const qrUrl    = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${qrData}&bgcolor=04080f&color=60a5fa&margin=12`;

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
        className="w-full max-w-md rounded-xl overflow-hidden border border-blue-500/20 shadow-[0_0_60px_rgba(59,130,246,0.10)]"
        style={{ background: 'linear-gradient(145deg, #090e18, #060a12)' }}
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
          <div className="flex flex-col gap-2 justify-center">
            <button onClick={copy} className="flex items-center gap-2 h-9 px-3 rounded-lg border border-blue-500/25 bg-blue-500/[0.06] text-blue-400 font-mono text-[9px] tracking-[0.2em] uppercase hover:bg-blue-500/12 transition-all duration-200">
              {copied ? <Check size={11} /> : <Copy size={11} />}
              {copied ? 'Copiado!' : 'Copiar slug'}
            </button>
            <button onClick={() => { onSimClick(); onClose(); }} className="flex items-center gap-2 h-9 px-3 rounded-lg border border-white/[0.07] text-white/35 font-mono text-[9px] tracking-[0.2em] uppercase hover:border-white/18 hover:text-white/55 transition-all duration-200">
              <ExternalLink size={11} /> Simular clique
            </button>
            <span className="font-mono text-[8px] text-white/20 mt-1">{link.clicks} cliques totais</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            {/* QR code — neon glassmorphism frame */}
            <div
              className="relative w-[120px] h-[120px] rounded-xl overflow-hidden border border-blue-500/30 flex items-center justify-center"
              style={{
                background: 'radial-gradient(ellipse at center, #04080f 60%, #060d1f 100%)',
                boxShadow: '0 0 28px rgba(59,130,246,0.12), inset 0 0 12px rgba(59,130,246,0.04)',
              }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500/40 rounded-tl-xl pointer-events-none" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500/40 rounded-tr-xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500/40 rounded-bl-xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500/40 rounded-br-xl pointer-events-none" />

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrUrl}
                alt={`QR code for ${shortUrl}`}
                className="w-[96px] h-[96px] object-contain relative z-10"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const sib = e.currentTarget.nextElementSibling as HTMLElement | null;
                  if (sib) sib.style.display = 'flex';
                }}
              />
              {/* Offline fallback — stylised QR grid */}
              <div className="hidden absolute inset-0 items-center justify-center">
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Top-left finder */}
                  <rect x="4"  y="4"  width="20" height="20" rx="2" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.6"/>
                  <rect x="9"  y="9"  width="10" height="10" rx="1" fill="#60a5fa" opacity="0.7"/>
                  {/* Top-right finder */}
                  <rect x="48" y="4"  width="20" height="20" rx="2" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.6"/>
                  <rect x="53" y="9"  width="10" height="10" rx="1" fill="#60a5fa" opacity="0.7"/>
                  {/* Bottom-left finder */}
                  <rect x="4"  y="48" width="20" height="20" rx="2" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.6"/>
                  <rect x="9"  y="53" width="10" height="10" rx="1" fill="#60a5fa" opacity="0.7"/>
                  {/* Data dots */}
                  {[30,36,42,30,42,30,36,42].map((x,i) => <rect key={i} x={x} y={[4,4,4,12,12,20,20,20][i]} width="4" height="4" rx="1" fill="#3b82f6" opacity="0.45" />)}
                  {[4,12,20,30,30,36,42,4,12,20].map((x,i) => <rect key={i} x={x} y={[30,30,30,30,36,36,36,42,42,42][i]} width="4" height="4" rx="1" fill="#3b82f6" opacity="0.35" />)}
                </svg>
              </div>
            </div>
            <span className="font-mono text-[6.5px] text-blue-400/30 tracking-[0.2em] uppercase">{shortUrl}</span>
          </div>
        </div>

        {/* Delete */}
        <div className="px-5 pb-4">
          <button onClick={onDelete} className="w-full h-9 rounded-lg border border-electric-red/20 text-electric-red/60 font-mono text-[9px] tracking-[0.25em] uppercase hover:bg-electric-red/[0.06] hover:border-electric-red/35 hover:text-electric-red/80 transition-all duration-200 flex items-center justify-center gap-2">
            <Trash2 size={11} /> Deletar link
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function MezzLink() {
  const [mounted,   setMounted]   = useState(false);
  const [links,     setLinks]     = useState<LinkRecord[]>([]);
  const [input,     setInput]     = useState('');
  const [copying,   setCopying]   = useState<string | null>(null);
  const [detail,    setDetail]    = useState<LinkRecord | null>(null);
  const [showClear, setShowClear] = useState(false);

  const valid = isValidUrl(input);

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
    } catch { setLinks(DEMO_LINKS); }
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem(LS_KEY, JSON.stringify(links));
  }, [links, mounted]);

  const totalClicks = links.reduce((a, l) => a + l.clicks, 0);
  const mostPopular = links.length ? links.reduce((a, b) => b.clicks > a.clicks ? b : a) : null;
  const clicksToday = links.reduce((a, l) => a + (l.daily[6] ?? 0), 0);

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
      ...l, clicks: l.clicks + 1,
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
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <span className="font-mono text-[9px] tracking-widest uppercase text-white/20">Carregando...</span>
      </div>
    );
  }

  return (
    <div
      className="w-full font-mono select-none rounded-2xl border border-blue-500/[0.10] p-5 md:p-6"
      style={{
        background: 'radial-gradient(ellipse at 15% 0%, rgba(59,130,246,0.06) 0%, #060810 55%)',
        boxShadow: '0 0 60px rgba(59,130,246,0.04), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >

      {/* ── App header (centered) ── */}
      <div className="relative flex flex-col items-center text-center gap-1 mb-6">
        {/* Logo + badge */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg border border-blue-500/30 bg-blue-500/[0.08] flex items-center justify-center">
            <Link size={13} className="text-blue-400" />
          </div>
          <h2 className="font-sans font-black text-2xl tracking-tighter text-white">MEZZLINK</h2>
          <span className="font-mono text-[7px] tracking-[0.3em] uppercase px-2 py-0.5 rounded border border-blue-500/20 text-blue-400/60 bg-blue-500/[0.04]">
            MICRO-SAAS DEMO
          </span>
        </div>
        <p className="font-mono text-[8px] tracking-[0.18em] text-white/25">Encurte. Rastreie. Escale.</p>

        {/* Clear all — absolute top-right */}
        <button
          onClick={() => setShowClear(true)}
          disabled={links.length === 0}
          className="absolute right-0 top-0 flex items-center gap-1.5 font-mono text-[8px] tracking-[0.2em] uppercase px-3 py-2 rounded-lg border border-electric-red/18 text-electric-red/40 hover:border-electric-red/40 hover:text-electric-red/70 hover:bg-electric-red/[0.04] disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
        >
          <Trash2 size={10} /> Limpar
        </button>
      </div>

      {/* ── KPI cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-5">
        <Stat label="Total de links"   value={String(links.length)}             icon={Link}              />
        <Stat label="Total de cliques" value={totalClicks.toLocaleString('pt-BR')} icon={MousePointerClick} />
        <Stat label="Mais popular"     value={mostPopular ? `/${mostPopular.slug}` : '—'}
              sub={mostPopular ? `${mostPopular.clicks} cliques` : undefined}    icon={TrendingUp}        />
        <Stat label="Cliques hoje"     value={String(clicksToday)}              icon={Activity}          />
      </div>

      {/* ── Input bar ── */}
      <div className="flex gap-2.5 mb-5">
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && valid && addLink()}
            placeholder="cole sua URL longa aqui..."
            className={[
              'w-full h-11 pl-4 pr-10 rounded-xl border bg-white/[0.03] text-white/85 text-sm placeholder:text-white/18 outline-none transition-all duration-200',
              input.length > 0 && valid
                ? 'border-blue-500/50 shadow-[0_0_16px_rgba(59,130,246,0.12)]'
                : input.length > 0
                ? 'border-electric-red/30'
                : 'border-white/[0.08] focus:border-blue-500/30 focus:shadow-[0_0_12px_rgba(59,130,246,0.07)]',
            ].join(' ')}
          />
          {input.length > 0 && (
            <div className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-colors duration-200 ${valid ? 'bg-blue-400' : 'bg-electric-red/60'}`} />
          )}
        </div>
        <button
          onClick={addLink}
          disabled={!valid}
          className="shrink-0 h-11 px-6 rounded-xl border font-mono text-[9px] tracking-[0.25em] uppercase transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed bg-blue-500/[0.08] border-blue-500/30 text-blue-400 hover:bg-blue-500/15 hover:border-blue-500/50 hover:shadow-[0_0_24px_rgba(59,130,246,0.14)] active:scale-[0.98]"
        >
          Encurtar →
        </button>
      </div>

      {/* ── Links table ── */}
      {links.length === 0 ? (
        <div className="border border-white/[0.04] border-dashed rounded-xl py-14 flex flex-col items-center gap-3">
          <Link size={20} className="text-white/12" />
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/18">Nenhum link criado</span>
        </div>
      ) : (
        <div className="border border-white/[0.07] rounded-xl overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-[120px_1fr_72px_60px_52px_80px] gap-3 px-4 py-2.5 border-b border-white/[0.06]"
            style={{ background: 'rgba(255,255,255,0.018)' }}>
            {['SLUG', 'URL ORIGINAL', 'CLIQUES', 'TREND', 'DATA', ''].map(h => (
              <span key={h} className="font-mono text-[7px] tracking-[0.28em] uppercase text-white/20 last:text-right">{h}</span>
            ))}
          </div>

          {/* Rows */}
          <AnimatePresence initial={false}>
            {links.map((link, rowIdx) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.18 }}
                className={[
                  'group border-b border-white/[0.04] last:border-0 px-4 py-3 hover:bg-blue-500/[0.04] transition-colors duration-150',
                  rowIdx % 2 !== 0 ? 'bg-white/[0.012]' : '',
                ].join(' ')}
              >
                {/* Mobile */}
                <div className="md:hidden flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono text-[10px] font-bold text-blue-400">mzld.io/{link.slug}</span>
                      <button onClick={() => copySlug(link.slug)} className="text-white/22 hover:text-blue-400 transition-colors duration-150">
                        {copying === link.slug ? <Check size={10} /> : <Copy size={10} />}
                      </button>
                    </div>
                    <span className="font-mono text-[8px] text-white/28 truncate block">{truncate(link.originalUrl, 40)}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-xs font-bold text-white/55 tabular-nums">{link.clicks}</span>
                    <button onClick={() => setDetail(link)} className="w-7 h-7 rounded border border-white/[0.07] flex items-center justify-center text-white/25 hover:border-blue-500/30 hover:text-blue-400 transition-all duration-150">
                      <ChevronRight size={12} />
                    </button>
                  </div>
                </div>

                {/* Desktop */}
                <div className="hidden md:grid grid-cols-[120px_1fr_72px_60px_52px_80px] gap-3 items-center">
                  {/* Slug */}
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-bold text-blue-400 truncate">/{link.slug}</span>
                    <button onClick={() => copySlug(link.slug)} className="shrink-0 text-white/22 hover:text-blue-400 transition-colors duration-150">
                      {copying === link.slug ? <Check size={9} /> : <Copy size={9} />}
                    </button>
                  </div>
                  {/* Original */}
                  <span className="font-mono text-[9px] text-white/32 truncate">{truncate(link.originalUrl)}</span>
                  {/* Clicks — right-aligned */}
                  <span className="font-mono text-[10px] font-bold text-white/65 tabular-nums text-right">{link.clicks.toLocaleString('pt-BR')}</span>
                  {/* Sparkline */}
                  <MiniSpark data={link.spark} uid={link.id} />
                  {/* Date — right-aligned */}
                  <span className="font-mono text-[8px] text-white/25 tabular-nums text-right">{fmtDate(link.createdAt)}</span>
                  {/* Details */}
                  <button
                    onClick={() => setDetail(link)}
                    className="flex items-center justify-end gap-1 font-mono text-[8px] tracking-wider uppercase text-white/22 hover:text-blue-400 group-hover:text-white/40 transition-colors duration-150"
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
        {showClear && <ClearModal onConfirm={clearAll} onCancel={() => setShowClear(false)} />}
      </AnimatePresence>
    </div>
  );
}
