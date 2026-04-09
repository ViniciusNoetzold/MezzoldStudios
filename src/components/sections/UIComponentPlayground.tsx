'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MousePointer, Layers, ToggleLeft, Tag, Sparkles,
  Loader2, Check, ArrowRight, Zap, AlertCircle, CheckCircle2,
} from 'lucide-react';

// ── Tiny syntax highlighter ───────────────────────────────────────────────────

type Tok = [string, string];

function tokenize(code: string): Tok[][] {
  return code.split('\n').map(line => {
    if (line.trimStart().startsWith('//')) return [[line, 'text-white/22']];
    const toks: Tok[] = [];
    let i = 0;
    while (i < line.length) {
      const r = line.slice(i);
      // String
      if (r[0] === '"' || r[0] === "'") {
        const end = r.indexOf(r[0], 1);
        if (end > 0) { toks.push([r.slice(0, end + 1), 'text-emerald/65']); i += end + 1; continue; }
      }
      // JSX tag
      const tag = r.match(/^<\/?\w+/);
      if (tag) { toks.push([tag[0], 'text-electric-red/60']); i += tag[0].length; continue; }
      // Keyword
      const kw = r.match(/^(className|const|export|function|return|import|from|type|interface|default)\b/);
      if (kw) { toks.push([kw[0], 'text-cyan/70']); i += kw[0].length; continue; }
      // Attribute
      const attr = r.match(/^([a-zA-Z][a-zA-Z0-9-]*)(?==)/);
      if (attr) { toks.push([attr[0], 'text-amber-400/55']); i += attr[0].length; continue; }
      // Word
      const word = r.match(/^\w+/);
      if (word) { toks.push([word[0], 'text-white/42']); i += word[0].length; continue; }
      toks.push([r[0], 'text-white/32']); i++;
    }
    return toks;
  });
}

function CodeSnip({ code }: { code: string }) {
  const lines = tokenize(code);
  return (
    <div className="mt-3 rounded-md bg-[#080808] border border-white/[0.05] p-2.5 overflow-x-auto">
      <pre className="font-mono text-[9px] leading-[1.65]">
        {lines.map((toks, i) => (
          <div key={i}>
            {toks.map(([t, c], j) => <span key={j} className={c}>{t}</span>)}
          </div>
        ))}
      </pre>
    </div>
  );
}

// ── ItemCard ──────────────────────────────────────────────────────────────────

function ItemCard({ name, code, center = true, children }: {
  name: string; code: string; center?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col bg-black/25 border border-white/[0.05] rounded-lg p-3.5">
      <span className="font-mono text-[7px] tracking-[0.3em] uppercase text-white/22 mb-3">{name}</span>
      <div className={`flex-1 flex py-2 ${center ? 'items-center justify-center' : 'items-start'}`}>
        {children}
      </div>
      <CodeSnip code={code} />
    </div>
  );
}

// ── Interactive sub-components ────────────────────────────────────────────────

function DemoLoadingBtn() {
  const [on, setOn] = useState(false);
  function click() { setOn(true); setTimeout(() => setOn(false), 2200); }
  return (
    <button
      onClick={click}
      disabled={on}
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-white/60 font-mono text-xs tracking-widest uppercase transition-all duration-200 hover:border-white/35 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {on ? <Loader2 size={11} className="animate-spin shrink-0" /> : null}
      {on ? 'Enviando...' : 'Enviar'}
    </button>
  );
}

function DemoToggle() {
  const [on, setOn] = useState(false);
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setOn(v => !v)}
        className={`relative w-10 h-5 rounded-full border transition-all duration-200 ${on ? 'bg-cyan/15 border-cyan/60' : 'bg-white/5 border-white/15'}`}
      >
        <motion.div
          animate={{ x: on ? 20 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={`absolute top-0.5 w-4 h-4 rounded-full transition-colors duration-200 ${on ? 'bg-cyan' : 'bg-white/30'}`}
        />
      </button>
      <span className="font-mono text-[9px] uppercase tracking-widest text-white/35">{on ? 'Ativo' : 'Inativo'}</span>
    </div>
  );
}

function DemoCheckbox() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex items-center gap-3 cursor-pointer" onClick={() => setChecked(v => !v)}>
      <button
        className={`w-5 h-5 rounded border transition-all duration-200 flex items-center justify-center shrink-0 ${
          checked ? 'bg-cyan/15 border-cyan' : 'bg-white/[0.03] border-white/20 hover:border-white/35'
        }`}
      >
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            >
              <Check size={10} className="text-cyan" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
      <span className="font-mono text-[9px] uppercase tracking-widest text-white/35 select-none">
        Aceito os termos
      </span>
    </div>
  );
}

function DemoParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  function move(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setT({ x: ((e.clientY - r.top) / r.height - 0.5) * -18, y: ((e.clientX - r.left) / r.width - 0.5) * 18 });
  }
  const reset = () => setT({ x: 0, y: 0 });
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={reset} className="w-full cursor-pointer select-none"
      style={{ perspective: '700px' }}>
      <div
        className="relative border border-cyan/20 bg-gradient-to-br from-cyan/[0.04] to-transparent rounded-xl p-5 overflow-hidden"
        style={{
          transform: `rotateX(${t.x}deg) rotateY(${t.y}deg)`,
          transition: t.x === 0 && t.y === 0 ? 'transform 0.5s ease' : 'transform 0.07s ease',
        }}
      >
        <div className="font-mono text-[8px] tracking-[0.3em] uppercase text-cyan/40 mb-2">Parallax Tilt</div>
        <div className="text-white font-bold text-sm mb-1">Hover para sentir →</div>
        <div className="text-white/30 text-[10px] font-mono">transform: rotateX / rotateY</div>
        {/* Glare */}
        <div className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ background: `radial-gradient(circle at ${50 + t.y * 2.5}% ${50 - t.x * 2.5}%, rgba(6,182,212,0.07), transparent 60%)` }}
        />
      </div>
    </div>
  );
}

function DemoSkeleton() {
  return (
    <div className="space-y-2 w-full">
      {[78, 62, 70].map((w, i) => (
        <div key={i} className="h-2.5 rounded-full overflow-hidden bg-white/[0.05]" style={{ width: `${w}%` }}>
          <motion.div
            className="h-full w-1/2"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }}
            animate={{ x: ['-200%', '400%'] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'linear', delay: i * 0.25 }}
          />
        </div>
      ))}
    </div>
  );
}

function DemoProgress() {
  const bars = [
    { label: 'Performance',    pct: 94, color: '#10b981' },
    { label: 'SEO',            pct: 88, color: '#06b6d4' },
    { label: 'Acessibilidade', pct: 76, color: '#f59e0b' },
  ];
  return (
    <div className="space-y-3 w-full">
      {bars.map(({ label, pct, color }, i) => (
        <div key={label}>
          <div className="flex justify-between mb-1.5">
            <span className="font-mono text-[8px] uppercase tracking-widest text-white/30">{label}</span>
            <span className="font-mono text-[9px] font-bold" style={{ color }}>{pct}</span>
          </div>
          <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease: 'easeOut' }}
              style={{ background: color, boxShadow: `0 0 6px ${color}55` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Section components ────────────────────────────────────────────────────────

function ButtonsSection({ variant }: { variant: 'filled' | 'outlined' }) {
  const f = variant === 'filled';
  const primary = f
    ? 'bg-electric-red/10 border-electric-red text-electric-red hover:bg-electric-red/18 hover:shadow-[0_0_18px_rgba(255,0,51,0.18)]'
    : 'border-electric-red/50 text-electric-red/80 hover:border-electric-red';
  const ghost = f
    ? 'bg-white/[0.04] border-white/18 text-white/65 hover:bg-white/[0.08]'
    : 'border-white/12 text-white/45 hover:border-white/28';

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
      <ItemCard name="Primary" code={`<button className="
  border border-red
  text-red px-5 py-2
  hover:bg-red/10">
  Primary
</button>`}>
        <button className={`px-5 py-2 rounded-lg border font-mono text-[10px] tracking-widest uppercase transition-all duration-200 ${primary}`}>
          Primary
        </button>
      </ItemCard>

      <ItemCard name="Ghost" code={`<button className="
  border border-white/20
  text-white/60 px-4 py-2
  hover:bg-white/5">
  Ghost
</button>`}>
        <button className={`px-5 py-2 rounded-lg border font-mono text-[10px] tracking-widest uppercase transition-all duration-200 ${ghost}`}>
          Ghost
        </button>
      </ItemCard>

      <ItemCard name="Destructive" code={`<button className="
  border-red-500/40
  bg-red-500/8 text-red-400
  hover:bg-red-500/15">
  Destruir
</button>`}>
        <button className="px-5 py-2 rounded-lg border border-red-500/40 bg-red-500/[0.06] text-red-400 font-mono text-[10px] tracking-widest uppercase hover:bg-red-500/12 transition-all duration-200">
          Destruir
        </button>
      </ItemCard>

      <ItemCard name="Icon Button" code={`<button className="
  w-9 h-9 rounded-lg
  border border-white/15
  flex items-center justify-center">
  <ArrowRight size={14} />
</button>`}>
        <button className="w-10 h-10 rounded-lg border border-white/15 bg-white/[0.02] flex items-center justify-center text-white/45 hover:border-white/30 hover:text-white/75 hover:bg-white/[0.05] transition-all duration-200">
          <ArrowRight size={15} />
        </button>
      </ItemCard>

      <ItemCard name="Loading State" code={`<button disabled>
  <Loader2
    className="animate-spin" />
  Enviando...
</button>`}>
        <DemoLoadingBtn />
      </ItemCard>

      <ItemCard name="Disabled" code={`<button disabled
  className="opacity-40
    cursor-not-allowed
    border border-white/15">
  Inativo
</button>`}>
        <button disabled className="px-5 py-2 rounded-lg border border-white/15 text-white/35 font-mono text-[10px] tracking-widest uppercase opacity-40 cursor-not-allowed">
          Inativo
        </button>
      </ItemCard>
    </div>
  );
}

function CardsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
      <ItemCard name="Glassmorphism" code={`<div className="
  backdrop-blur-md
  bg-white/5
  border border-white/10
  rounded-xl p-5">
  {children}
</div>`}>
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 w-full text-center">
          <div className="font-mono text-[8px] text-white/30 tracking-widest uppercase mb-1.5">Glass Panel</div>
          <div className="text-white/70 text-xs font-bold">Mezzold Studio</div>
        </div>
      </ItemCard>

      <ItemCard name="Neon Border" code={`<div className="
  border border-cyan/40
  bg-cyan/[0.03]
  shadow-[0_0_20px
    rgba(6,182,212,0.12)]
  rounded-xl p-5">
</div>`}>
        <div className="border border-cyan/40 bg-cyan/[0.03] rounded-xl p-4 w-full text-center shadow-[0_0_20px_rgba(6,182,212,0.10)]">
          <div className="font-mono text-[8px] text-cyan/45 tracking-widest uppercase mb-1.5">Neon Card</div>
          <div className="text-white/70 text-xs font-bold">Design System</div>
        </div>
      </ItemCard>

      <ItemCard name="Feature Card" code={`<div className="p-5">
  <Icon className="text-red mb-3
    shrink-0" size={16} />
  <h3>Feature</h3>
  <p className="text-white/50">
    Description text here.
  </p>
</div>`}>
        <div className="border border-white/[0.07] bg-white/[0.02] rounded-xl p-4 w-full">
          <div className="w-7 h-7 rounded-md border border-electric-red/30 bg-electric-red/[0.07] flex items-center justify-center mb-2.5">
            <Zap size={12} className="text-electric-red" />
          </div>
          <div className="text-white text-xs font-bold mb-1">Feature</div>
          <div className="text-white/35 text-[10px] leading-relaxed">Entrega de valor real</div>
        </div>
      </ItemCard>
    </div>
  );
}

function InputsSection() {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      <ItemCard name="Default" code={`<input
  placeholder="Digite aqui"
  className="border
    border-white/10 bg-black/40
    rounded-lg px-3 h-10" />`}>
        <input
          type="text"
          placeholder="Digite aqui"
          className="w-full h-10 px-3 rounded-lg border border-white/10 bg-black/40 text-white/70 text-xs font-mono placeholder:text-white/20 outline-none"
        />
      </ItemCard>

      <ItemCard name="Focus State" code={`<input
  className="border
    border-cyan/50
    ring-1 ring-cyan/20
    focus:outline-none" />`}>
        <input
          type="text"
          defaultValue="Em foco"
          className="w-full h-10 px-3 rounded-lg border border-cyan/55 bg-black/40 text-white/70 text-xs font-mono outline-none ring-2 ring-cyan/15 shadow-[0_0_12px_rgba(6,182,212,0.12)]"
        />
      </ItemCard>

      <ItemCard name="Error State" code={`<div>
  <input className="border
    border-red-500/60
    text-red-400" />
  <p className="text-red-400
    text-xs mt-1">Campo inválido</p>
</div>`} center={false}>
        <div className="w-full space-y-1.5">
          <input
            type="text"
            defaultValue="email-invalido"
            className="w-full h-10 px-3 rounded-lg border border-red-500/55 bg-red-500/[0.04] text-red-400/80 text-xs font-mono outline-none"
          />
          <div className="flex items-center gap-1.5">
            <AlertCircle size={10} className="text-red-400 shrink-0" />
            <span className="font-mono text-[9px] text-red-400/70">Campo inválido</span>
          </div>
        </div>
      </ItemCard>

      <ItemCard name="Success State" code={`<div className="relative">
  <input className="border
    border-emerald/55
    text-emerald/80 pr-9" />
  <CheckCircle2
    className="absolute right-3
      text-emerald" size={14} />
</div>`} center={false}>
        <div className="w-full space-y-1.5">
          <div className="relative">
            <input
              type="text"
              defaultValue="vinicius@mezzold.com"
              className="w-full h-10 px-3 pr-9 rounded-lg border border-emerald/55 bg-emerald/[0.04] text-emerald/80 text-xs font-mono outline-none"
            />
            <CheckCircle2 size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald" />
          </div>
          <span className="font-mono text-[9px] text-emerald/60">Email validado ✓</span>
        </div>
      </ItemCard>

      <ItemCard name="Toggle Switch" code={`// State: const [on, setOn]
<button onClick={() => setOn(!on)}
  className={on
    ? "bg-cyan/15 border-cyan"
    : "bg-white/5 border-white/15"}>
  <div className="thumb" />
</button>`}>
        <DemoToggle />
      </ItemCard>

      <ItemCard name="Checkbox" code={`// State: const [checked, set]
<button onClick={() => set(!checked)}
  className={checked
    ? "border-cyan bg-cyan/15"
    : "border-white/20"}>
  {checked && <Check size={10} />}
</button>`}>
        <DemoCheckbox />
      </ItemCard>
    </div>
  );
}

function BadgesSection() {
  const status = [
    { label: 'Online',      dot: 'bg-emerald',        text: 'text-emerald/70',        border: 'border-emerald/20',        bg: 'bg-emerald/[0.06]'        },
    { label: 'Offline',     dot: 'bg-white/30',       text: 'text-white/45',          border: 'border-white/[0.08]',      bg: 'bg-white/[0.03]'          },
    { label: 'Pending',     dot: 'bg-amber-400',      text: 'text-amber-400/70',      border: 'border-amber-400/20',      bg: 'bg-amber-400/[0.06]'      },
    { label: 'Manutenção',  dot: 'bg-electric-red',   text: 'text-electric-red/70',   border: 'border-electric-red/20',   bg: 'bg-electric-red/[0.06]'   },
  ];
  const tech = ['Next.js', 'TypeScript', 'React', 'Tailwind', 'Node.js', 'PostgreSQL'];
  const cats = ['[ PERFORMANCE ]', '[ DESIGN ]', '[ BACKEND ]', '[ SAAS ]'];

  return (
    <div className="space-y-5">
      {/* Status */}
      <div>
        <span className="font-mono text-[7px] tracking-[0.35em] uppercase text-white/20 block mb-2.5">Status Badges</span>
        <div className="flex flex-wrap gap-2">
          {status.map(s => (
            <span key={s.label} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-mono text-[9px] ${s.border} ${s.bg} ${s.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot} ${s.label === 'Online' ? 'animate-pulse' : ''}`} />
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* Tech tags */}
      <div>
        <span className="font-mono text-[7px] tracking-[0.35em] uppercase text-white/20 block mb-2.5">Tech Stack Tags</span>
        <div className="flex flex-wrap gap-1.5">
          {tech.map(t => (
            <span key={t} className="font-mono text-[8px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-md border border-white/[0.08] bg-white/[0.03] text-white/45 hover:border-white/20 hover:text-white/65 transition-colors duration-150 cursor-default">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Category labels */}
      <div>
        <span className="font-mono text-[7px] tracking-[0.35em] uppercase text-white/20 block mb-2.5">Category Labels</span>
        <div className="flex flex-wrap gap-2">
          {cats.map((c, i) => {
            const colors = ['text-electric-red border-electric-red/25 bg-electric-red/[0.06]', 'text-cyan border-cyan/25 bg-cyan/[0.06]', 'text-emerald border-emerald/25 bg-emerald/[0.06]', 'text-amber-400 border-amber-400/25 bg-amber-400/[0.06]'];
            return (
              <span key={c} className={`font-mono text-[8px] tracking-[0.3em] uppercase px-3 py-1 rounded border ${colors[i]}`}>
                {c}
              </span>
            );
          })}
        </div>
      </div>

      {/* Code snippet for the whole section */}
      <CodeSnip code={`// Status badge pattern
<span className="flex items-center gap-1.5
  px-2.5 py-1 rounded-full border
  border-emerald/20 bg-emerald/[0.06]
  text-emerald/70 font-mono text-xs">
  <span className="w-1.5 h-1.5
    rounded-full bg-emerald animate-pulse" />
  Online
</span>`} />
    </div>
  );
}

function MotionSection() {
  return (
    <div className="space-y-3">
      {/* Parallax full width */}
      <ItemCard name="Parallax Tilt Card" code={`// onMouseMove → rotateX / rotateY
style={{
  transform: \`perspective(700px)
    rotateX(\${tilt.x}deg)
    rotateY(\${tilt.y}deg)\`,
  transition: "transform 0.07s ease",
}}`}>
        <DemoParallax />
      </ItemCard>

      {/* Two columns: skeleton + progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <ItemCard name="Skeleton Loader" code={`// Shimmer via motion animate
animate={{ x: ["-200%", "400%"] }}
transition={{
  repeat: Infinity,
  duration: 1.6,
  ease: "linear",
}}`}>
          <DemoSkeleton />
        </ItemCard>

        <ItemCard name="Progress Bars" code={`// Animated on mount
initial={{ width: 0 }}
animate={{ width: \`\${pct}%\` }}
transition={{
  duration: 1.1,
  ease: "easeOut",
}}`}>
          <DemoProgress />
        </ItemCard>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

type Tab = 'buttons' | 'cards' | 'inputs' | 'badges' | 'motion';

const TABS: { id: Tab; label: string; desc: string; Icon: React.FC<{ size?: number; className?: string }> }[] = [
  { id: 'buttons', label: 'Botões',      desc: 'Ações claras que guiam o usuário',             Icon: MousePointer },
  { id: 'cards',   label: 'Cards',       desc: 'Blocos de informação com hierarquia visual',    Icon: Layers       },
  { id: 'inputs',  label: 'Formulários', desc: 'Entrada de dados com feedback inteligente',     Icon: ToggleLeft   },
  { id: 'badges',  label: 'Etiquetas',   desc: 'Status e categorias em um olhar',               Icon: Tag          },
  { id: 'motion',  label: 'Animações',   desc: 'Movimento que comunica, não distrai',           Icon: Sparkles     },
];

export function UIComponentPlayground() {
  const [tab,     setTab]     = useState<Tab>('buttons');
  const [variant, setVariant] = useState<'filled' | 'outlined'>('filled');

  return (
    <div className="w-full flex flex-col md:flex-row border border-white/[0.07] rounded-xl overflow-hidden bg-[#050505]">

      {/* ── Sidebar ── */}
      <div className="md:w-44 md:border-r border-b md:border-b-0 border-white/[0.06] flex md:flex-col shrink-0 overflow-x-auto md:overflow-x-visible">

        {/* Logo row (desktop only) */}
        <div className="hidden md:flex items-center gap-2 px-4 py-3.5 border-b border-white/[0.06]">
          <span className="font-mono text-[7px] tracking-[0.22em] uppercase text-white/18">[ BIBLIOTECA DE COMPONENTES ]</span>
        </div>

        {/* Tabs */}
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={[
              'flex items-center gap-2 px-4 py-3 md:py-2.5 whitespace-nowrap shrink-0 md:shrink-0 transition-all duration-150 relative',
              tab === id
                ? 'text-electric-red bg-electric-red/[0.06] border-b-2 md:border-b-0 md:border-l-2 border-electric-red'
                : 'text-white/28 hover:text-white/52 hover:bg-white/[0.025]',
            ].join(' ')}
          >
            <Icon size={12} className="shrink-0" />
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase">{label}</span>
          </button>
        ))}

        {/* Variant toggle — buttons only, desktop */}
        {tab === 'buttons' && (
          <div className="hidden md:block px-4 py-4 border-t border-white/[0.06] mt-auto">
            <span className="font-mono text-[7px] tracking-[0.3em] uppercase text-white/18 block mb-2">Variante</span>
            {(['filled', 'outlined'] as const).map(v => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`block w-full text-left font-mono text-[8px] tracking-[0.2em] uppercase px-2 py-1 rounded mb-0.5 transition-all duration-150 ${
                  variant === v ? 'text-electric-red bg-electric-red/[0.07]' : 'text-white/22 hover:text-white/42'
                }`}
              >
                {v === 'filled' ? 'Preenchido' : 'Outlined'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Preview panel — fixed height keeps all tabs the same size ── */}
      <div
        className="flex-1 min-w-0 overflow-y-auto"
        style={{ height: '540px' }}
      >
        <div
          className="min-h-full p-4 md:p-5"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.032) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        >
          {/* Section header */}
          <div className="flex items-center gap-3 mb-1">
            <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-electric-red">
              [ {TABS.find(t => t.id === tab)?.label.toUpperCase()} ]
            </span>
            <div className="flex-1 h-px bg-electric-red/18" />
            {/* Variant toggle — mobile (buttons only) */}
            {tab === 'buttons' && (
              <div className="flex md:hidden gap-1.5">
                {(['filled', 'outlined'] as const).map(v => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`font-mono text-[7px] tracking-widest uppercase px-2 py-1 rounded border transition-all duration-150 ${
                      variant === v ? 'border-electric-red/40 text-electric-red bg-electric-red/[0.07]' : 'border-white/[0.07] text-white/22'
                    }`}
                  >
                    {v === 'filled' ? 'Fill' : 'Out'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tab description */}
          <p className="font-mono text-[8px] tracking-[0.1em] text-white/28 italic mb-4">
            {TABS.find(t => t.id === tab)?.desc}
          </p>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.17 }}
            >
              {tab === 'buttons' && <ButtonsSection variant={variant} />}
              {tab === 'cards'   && <CardsSection />}
              {tab === 'inputs'  && <InputsSection />}
              {tab === 'badges'  && <BadgesSection />}
              {tab === 'motion'  && <MotionSection />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
