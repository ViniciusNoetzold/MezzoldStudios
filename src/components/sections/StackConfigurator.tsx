'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe, Layers, Server, Cloud, Plug,
  ChevronRight, ChevronLeft, RotateCcw, Check,
  Zap, Building2, Rocket, ExternalLink,
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────

type StepKey = 'product' | 'frontend' | 'backend' | 'infra' | 'integrations';

interface StepOption { id: string; label: string; sublabel: string; weight: number; }

interface StepDef {
  key: StepKey;
  icon: React.FC<{ size?: number; className?: string }>;
  subtitle: string;
  title: string;
  multiple: boolean;
  options: StepOption[];
}

interface Selections {
  product: string | null;
  frontend: string | null;
  backend: string | null;
  infra: string | null;
  integrations: string[];
}

// ── Step definitions ──────────────────────────────────────────────────────────

const STEP_DEFS: StepDef[] = [
  {
    key: 'product', icon: Globe,
    subtitle: 'ETAPA 1 — QUE TIPO DE PROJETO VOCÊ PRECISA?',
    title: 'Que tipo de produto você quer construir?',
    multiple: false,
    options: [
      { id: 'site',      label: 'Site Institucional', sublabel: 'Presença online profissional',      weight: 1 },
      { id: 'landing',   label: 'Landing Page',        sublabel: 'Conversão e geração de leads',      weight: 1 },
      { id: 'saas',      label: 'Micro-SaaS',          sublabel: 'Produto digital recorrente',        weight: 2 },
      { id: 'dashboard', label: 'Dashboard',            sublabel: 'Visualização e análise de dados',   weight: 2 },
      { id: 'ecommerce', label: 'E-commerce',           sublabel: 'Loja virtual completa',             weight: 3 },
      { id: 'api',       label: 'API / Backend',        sublabel: 'Serviço headless ou interno',       weight: 2 },
    ],
  },
  {
    key: 'frontend', icon: Layers,
    subtitle: 'ETAPA 2 — COMO SERÁ A APARÊNCIA?',
    title: 'Escolha o stack de interface',
    multiple: false,
    options: [
      { id: 'nextjs',  label: 'Next.js',       sublabel: 'Rápido, moderno, ideal para a maioria dos projetos', weight: 2 },
      { id: 'nuxt',    label: 'Nuxt.js',       sublabel: 'Vue com superpoderes',            weight: 2 },
      { id: 'react',   label: 'React SPA',     sublabel: 'Client-side altamente dinâmico',  weight: 2 },
      { id: 'vue',     label: 'Vue.js',        sublabel: 'Reativo e progressivo',           weight: 1 },
      { id: 'astro',   label: 'Astro',         sublabel: 'Content-first, zero JS',          weight: 1 },
      { id: 'html',    label: 'HTML/CSS Puro', sublabel: 'Simples e ultraperformático',     weight: 1 },
    ],
  },
  {
    key: 'backend', icon: Server,
    subtitle: 'ETAPA 3 — COMO FUNCIONARÁ POR DENTRO?',
    title: 'Escolha o stack de servidor',
    multiple: false,
    options: [
      { id: 'express',  label: 'Node.js + Express',  sublabel: 'API REST clássica e flexível',     weight: 2 },
      { id: 'nextapi',  label: 'Next.js API Routes', sublabel: 'Backend no mesmo projeto',          weight: 1 },
      { id: 'spring',   label: 'Spring Boot',        sublabel: 'Java enterprise-grade',             weight: 3 },
      { id: 'fastapi',  label: 'FastAPI',            sublabel: 'Python assíncrono de alta perf',    weight: 2 },
      { id: 'supabase', label: 'Supabase',           sublabel: 'Banco de dados pronto, sem complicação', weight: 1 },
      { id: 'firebase', label: 'Firebase',           sublabel: 'Google BaaS serverless',            weight: 1 },
    ],
  },
  {
    key: 'infra', icon: Cloud,
    subtitle: 'ETAPA 4 — ONDE VAI RODAR?',
    title: 'Onde vai rodar?',
    multiple: false,
    options: [
      { id: 'vercel',     label: 'Vercel',         sublabel: 'Hospedagem automática, sem servidor para gerenciar', weight: 1 },
      { id: 'aws',        label: 'AWS',            sublabel: 'Escala enterprise global',      weight: 3 },
      { id: 'railway',    label: 'Railway',        sublabel: 'Deploy simples e eficiente',    weight: 1 },
      { id: 'vps',        label: 'VPS Linux',      sublabel: 'Controle total do servidor',    weight: 2 },
      { id: 'docker',     label: 'Docker + Cloud', sublabel: 'Containerizado e portátil',     weight: 3 },
      { id: 'serverless', label: 'Serverless',     sublabel: 'Pay-per-use sem servidor',      weight: 2 },
    ],
  },
  {
    key: 'integrations', icon: Plug,
    subtitle: 'ETAPA 5 — COM O QUE PRECISA SE CONECTAR?',
    title: 'Selecione as integrações',
    multiple: true,
    options: [
      { id: 'stripe',    label: 'Stripe',           sublabel: 'Pagamentos online e assinaturas', weight: 1 },
      { id: 'auth',      label: 'Login & Autenticação', sublabel: 'Área de membros segura — Auth0, Clerk, NextAuth', weight: 1 },
      { id: 'analytics', label: 'Analytics',        sublabel: 'GA4, Mixpanel, Posthog',    weight: 1 },
      { id: 'crm',       label: 'CRM',              sublabel: 'HubSpot, Pipedrive, Zoho',  weight: 2 },
      { id: 'email',     label: 'Email Marketing',  sublabel: 'Resend, Mailchimp, Brevo',  weight: 1 },
      { id: 'storage',   label: 'Storage / CDN',    sublabel: 'S3, R2, Cloudflare',        weight: 1 },
      { id: 'maps',      label: 'Maps / Geo',       sublabel: 'Google Maps, Mapbox',       weight: 1 },
      { id: 'ai',        label: 'AI / LLM',         sublabel: 'OpenAI, Gemini, Claude',    weight: 3 },
    ],
  },
];

// ── Tech display config ───────────────────────────────────────────────────────

const TD: Record<string, { abbr: string; color: string; bg: string }> = {
  site:       { abbr: 'WEB',  color: '#60a5fa', bg: 'rgba(96,165,250,0.12)'  },
  landing:    { abbr: 'LP',   color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  saas:       { abbr: 'SaaS', color: '#34d399', bg: 'rgba(52,211,153,0.12)'  },
  dashboard:  { abbr: 'DASH', color: '#06b6d4', bg: 'rgba(6,182,212,0.12)'   },
  ecommerce:  { abbr: 'ECOM', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)'  },
  api:        { abbr: 'API',  color: '#ff4d6e', bg: 'rgba(255,77,110,0.12)'  },
  nextjs:     { abbr: 'NXT',  color: '#e2e8f0', bg: 'rgba(226,232,240,0.09)' },
  nuxt:       { abbr: 'NUXT', color: '#34d399', bg: 'rgba(52,211,153,0.12)'  },
  react:      { abbr: 'RCT',  color: '#60a5fa', bg: 'rgba(96,165,250,0.12)'  },
  vue:        { abbr: 'VUE',  color: '#34d399', bg: 'rgba(52,211,153,0.12)'  },
  astro:      { abbr: 'AST',  color: '#f97316', bg: 'rgba(249,115,22,0.12)'  },
  html:       { abbr: 'HTML', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)'  },
  express:    { abbr: 'EXP',  color: '#84cc16', bg: 'rgba(132,204,22,0.12)'  },
  nextapi:    { abbr: 'NAPI', color: '#e2e8f0', bg: 'rgba(226,232,240,0.09)' },
  spring:     { abbr: 'SPR',  color: '#34d399', bg: 'rgba(52,211,153,0.12)'  },
  fastapi:    { abbr: 'FAPI', color: '#06b6d4', bg: 'rgba(6,182,212,0.12)'   },
  supabase:   { abbr: 'SB',   color: '#34d399', bg: 'rgba(52,211,153,0.12)'  },
  firebase:   { abbr: 'FB',   color: '#f59e0b', bg: 'rgba(245,158,11,0.12)'  },
  vercel:     { abbr: 'VCL',  color: '#e2e8f0', bg: 'rgba(226,232,240,0.09)' },
  aws:        { abbr: 'AWS',  color: '#f59e0b', bg: 'rgba(245,158,11,0.12)'  },
  railway:    { abbr: 'RWY',  color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  vps:        { abbr: 'VPS',  color: '#60a5fa', bg: 'rgba(96,165,250,0.12)'  },
  docker:     { abbr: 'DCK',  color: '#60a5fa', bg: 'rgba(96,165,250,0.12)'  },
  serverless: { abbr: 'SLS',  color: '#f97316', bg: 'rgba(249,115,22,0.12)'  },
  stripe:     { abbr: 'STR',  color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  auth:       { abbr: 'AUTH', color: '#60a5fa', bg: 'rgba(96,165,250,0.12)'  },
  analytics:  { abbr: 'ANA',  color: '#34d399', bg: 'rgba(52,211,153,0.12)'  },
  crm:        { abbr: 'CRM',  color: '#f59e0b', bg: 'rgba(245,158,11,0.12)'  },
  email:      { abbr: 'MAIL', color: '#06b6d4', bg: 'rgba(6,182,212,0.12)'   },
  storage:    { abbr: 'CDN',  color: '#84cc16', bg: 'rgba(132,204,22,0.12)'  },
  maps:       { abbr: 'GEO',  color: '#f97316', bg: 'rgba(249,115,22,0.12)'  },
  ai:         { abbr: 'AI',   color: '#ff0033', bg: 'rgba(255,0,51,0.12)'    },
};

// ── Tier config ───────────────────────────────────────────────────────────────

const TIER_CFG = {
  Starter: {
    color: '#34d399', border: 'border-emerald/40',  shadow: 'shadow-[0_0_30px_rgba(52,211,153,0.1)]',
    icon: Rocket,
    label: 'STARTER BUILD',
    message: 'Projeto objetivo — podemos entregar rápido e com qualidade. Esse stack foi projetado para lançar em semanas.',
  },
  Pro: {
    color: '#60a5fa', border: 'border-blue-400/40',  shadow: 'shadow-[0_0_30px_rgba(96,165,250,0.1)]',
    icon: Zap,
    label: 'PRO BUILD',
    message: 'Projeto robusto — temos experiência sólida com esse perfil. Esse é o centro do nosso portfólio, com mais de 20 projetos entregues nesse nível.',
  },
  Enterprise: {
    color: '#ff4d6e', border: 'border-red-400/40', shadow: 'shadow-[0_0_30px_rgba(255,77,110,0.1)]',
    icon: Building2,
    label: 'ENTERPRISE BUILD',
    message: 'Projeto de alta complexidade — esse é exatamente o nosso core. Arquitetura de alto nível com zero tolerância a falhas, para sistemas que não podem parar.',
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function calcScore(sel: Selections) {
  let w = 0;
  const singles: StepKey[] = ['product', 'frontend', 'backend', 'infra'];
  singles.forEach((k, i) => {
    const val = sel[k as keyof Selections] as string | null;
    if (val) w += STEP_DEFS[i].options.find(o => o.id === val)?.weight ?? 0;
  });
  sel.integrations.forEach(id => {
    w += STEP_DEFS[4].options.find(o => o.id === id)?.weight ?? 0;
  });
  const tier = w <= 6 ? 'Starter' : w <= 13 ? 'Pro' : 'Enterprise';
  const weeks = 2 + Math.round(w * 0.65);
  return { w, tier: tier as 'Starter' | 'Pro' | 'Enterprise', weeks };
}

function buildUrl(sel: Selections): string {
  const parts = [sel.product, sel.frontend, sel.backend, sel.infra, ...sel.integrations].filter(Boolean);
  return `/#contact?stack=${parts.join('-')}`;
}

function getLabel(stepIdx: number, id: string) {
  return STEP_DEFS[stepIdx]?.options.find(o => o.id === id)?.label ?? id;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function TechBadge({ id }: { id: string }) {
  const td = TD[id];
  return (
    <span
      className="font-mono font-bold text-[8px] tracking-wider px-2 py-1 rounded-md border"
      style={{ color: td?.color ?? '#fff', background: td?.bg ?? 'rgba(255,255,255,0.07)', borderColor: (td?.color ?? '#fff') + '30' }}
    >
      {td?.abbr ?? id.toUpperCase().slice(0, 4)}
    </span>
  );
}

function OptionCard({ opt, selected, onSelect, blue = false }: {
  opt: StepOption; selected: boolean; onSelect: () => void; blue?: boolean;
}) {
  const td = TD[opt.id];
  const accent = blue ? '#60a5fa' : (td?.color ?? '#60a5fa');
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={!selected ? {
        backgroundColor: 'rgba(96, 165, 250, 0.07)',
        borderColor: 'rgba(96, 165, 250, 0.30)',
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.12)',
      } : {}}
      onClick={onSelect}
      className="relative flex items-start gap-3 p-3.5 rounded-xl border text-left w-full"
      style={{
        backgroundColor: selected ? 'rgba(96, 165, 250, 0.12)' : 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(12px)',
        borderColor: selected ? 'rgba(96, 165, 250, 0.60)' : 'rgba(255,255,255,0.08)',
        boxShadow: selected ? '0 0 24px rgba(59,130,246,0.20), inset 0 1px 0 rgba(255,255,255,0.08)' : 'none',
      }}
    >
      {/* Corner */}
      {selected && <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 rounded-tl-xl pointer-events-none" style={{ borderColor: accent + 'aa' }} />}

      {/* Badge */}
      <div
        className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-[7px] tracking-wider border"
        style={{
          color: selected ? (td?.color ?? accent) : 'rgba(255,255,255,0.25)',
          background: selected ? (td?.bg ?? 'rgba(96,165,250,0.1)') : 'rgba(255,255,255,0.03)',
          borderColor: selected ? (td?.color ?? accent) + '40' : 'rgba(255,255,255,0.06)',
          transition: 'all 0.2s',
        }}
      >
        {td?.abbr ?? opt.label.slice(0, 4).toUpperCase()}
      </div>

      <div className="flex-1 min-w-0">
        <span className={`font-sans font-bold text-sm block transition-colors duration-200 ${selected ? 'text-white' : 'text-white/65'}`}>
          {opt.label}
        </span>
        <span className="font-mono text-[8.5px] tracking-[0.08em] text-white/25 mt-0.5 block">
          {opt.sublabel}
        </span>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center border"
            style={{ borderColor: accent + '60', background: accent + '18' }}
          >
            <Check size={9} style={{ color: accent }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function Sidebar({ sel, step }: { sel: Selections; step: number }) {
  const cats: { label: string; key: StepKey; stepIdx: number }[] = [
    { label: 'PRODUTO',      key: 'product',      stepIdx: 0 },
    { label: 'FRONTEND',     key: 'frontend',     stepIdx: 1 },
    { label: 'BACKEND',      key: 'backend',      stepIdx: 2 },
    { label: 'INFRA',        key: 'infra',        stepIdx: 3 },
    { label: 'INTEGRAÇÕES',  key: 'integrations', stepIdx: 4 },
  ];

  return (
    <div
      className="hidden md:flex flex-col w-48 shrink-0 border-l border-white/[0.07]"
      style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(16px)' }}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.05]">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500/55" />
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/35" />
        <div className="w-1.5 h-1.5 rounded-full bg-emerald/40" />
        <span className="ml-2 font-mono text-[6.5px] tracking-[0.35em] uppercase text-white/18">config.stack</span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {cats.map(({ label, key, stepIdx }) => {
          const isActive = stepIdx === step;
          const ids: string[] = key === 'integrations' ? sel.integrations : (sel[key] ? [sel[key] as string] : []);
          return (
            <div key={key}>
              <span className={`font-mono text-[6.5px] tracking-[0.35em] uppercase block mb-1.5 ${isActive ? 'text-blue-400' : ids.length ? 'text-white/30' : 'text-white/12'}`}>
                {isActive ? '▶ ' : ''}{label}
              </span>
              <AnimatePresence>
                {ids.map(id => {
                  const td = TD[id];
                  return (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.18 }}
                      className="flex items-center gap-1.5 mb-1 px-1.5 py-0.5 rounded"
                      style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.30)' }}
                    >
                      <span className="font-mono text-[6.5px] font-bold px-1 py-0.5 rounded"
                        style={{ color: td?.color ?? '#fff', background: td?.bg ?? 'rgba(255,255,255,0.07)' }}>
                        {td?.abbr ?? id.slice(0, 4).toUpperCase()}
                      </span>
                      <span className="font-mono text-[7.5px] text-white/35 truncate">{getLabel(stepIdx, id)}</span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {ids.length === 0 && isActive && (
                <span className="font-mono text-[7px] text-white/12 italic">aguardando...</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Step variants (directional slide) ─────────────────────────────────────────

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

// ── Main Component ─────────────────────────────────────────────────────────────

const INIT_SEL: Selections = { product: null, frontend: null, backend: null, infra: null, integrations: [] };
const STEP_KEYS: StepKey[] = ['product', 'frontend', 'backend', 'infra', 'integrations'];

export function StackConfigurator() {
  const [step, setStep]       = useState(0); // 0-4 = wizard, 5 = result
  const [dir, setDir]         = useState(1);
  const [sel, setSel]         = useState<Selections>(INIT_SEL);

  function toggleOption(stepIdx: number, id: string) {
    const key = STEP_KEYS[stepIdx];
    if (key === 'integrations') {
      setSel(p => ({ ...p, integrations: p.integrations.includes(id) ? p.integrations.filter(x => x !== id) : [...p.integrations, id] }));
    } else {
      setSel(p => ({ ...p, [key]: p[key] === id ? null : id }));
    }
  }

  function isSelected(stepIdx: number, id: string) {
    const key = STEP_KEYS[stepIdx];
    return key === 'integrations' ? sel.integrations.includes(id) : sel[key] === id;
  }

  function canNext(stepIdx: number) {
    const key = STEP_KEYS[stepIdx];
    return key === 'integrations' ? true : sel[key] !== null;
  }

  function goNext() { setDir(1); setStep(s => s + 1); }
  function goBack() { setDir(-1); setStep(s => s - 1); }
  function reset()  { setDir(-1); setStep(0); setSel(INIT_SEL); }

  const score = calcScore(sel);
  const tier  = TIER_CFG[score.tier];
  const TierIcon = tier.icon;

  // All selected ids for result display
  const allSelected = [
    sel.product, sel.frontend, sel.backend, sel.infra, ...sel.integrations,
  ].filter(Boolean) as string[];

  return (
    <div
      className="w-full flex flex-col border border-white/[0.07] rounded-xl overflow-hidden"
      style={{
        background: 'rgba(10, 10, 10, 0.80)',
        backdropFilter: 'blur(24px) saturate(160%)',
      }}
    >

      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/[0.07]"
        style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}>
        <div>
          <span className="font-mono font-bold text-[10px] tracking-[0.3em] uppercase text-white/70">STACK CONFIGURATOR</span>
          <p className="font-mono text-[7px] tracking-[0.2em] text-white/20 mt-0.5">Monte o projeto ideal para o seu negócio</p>
        </div>
        {step > 0 && step < 5 && (
          <button onClick={reset} className="flex items-center gap-1.5 font-mono text-[8px] tracking-[0.2em] uppercase text-white/25 hover:text-white/50 transition-colors duration-200">
            <RotateCcw size={9} /> Recomeçar
          </button>
        )}
      </div>

      <div className="flex flex-1 min-h-0">
        {/* ── Wizard area ── */}
        <div className="flex-1 flex flex-col min-w-0 p-4 md:p-5">

          {/* Progress bar (only on steps 0-4) */}
          {step < 5 && (
            <div className="flex items-center gap-1 mb-5">
              {[0,1,2,3,4].map(i => (
                <div key={i} className="flex-1 h-0.5 rounded-full overflow-hidden bg-white/[0.08]">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #3b82f6, #10b981)', boxShadow: '0 0 8px rgba(59,130,246,0.5)' }}
                    initial={{ width: 0 }}
                    animate={{ width: i <= step ? '100%' : '0%' }}
                    transition={{ duration: 0.35, delay: i === step ? 0.1 : 0 }}
                  />
                </div>
              ))}
              <span className="font-mono text-[8px] text-white/20 ml-1.5 shrink-0 tabular-nums">{Math.min(step + 1, 5)}/5</span>
            </div>
          )}

          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="flex-1"
            >
              {step < 5 ? (
                // ── Wizard step ──────────────────────────────────────────────
                <div>
                  {/* Step header */}
                  <div className="mb-4">
                    <span className="font-mono text-[8px] tracking-[0.38em] uppercase text-blue-400/70 block mb-1.5">
                      {STEP_DEFS[step].subtitle}
                      {STEP_DEFS[step].multiple && <span className="ml-2 text-white/20">(multi-select)</span>}
                    </span>
                    <h3 className="font-sans font-black text-lg md:text-xl tracking-tight text-white leading-snug">
                      {STEP_DEFS[step].title}
                    </h3>
                  </div>

                  {/* Options grid */}
                  <div className={`grid gap-2 ${STEP_DEFS[step].multiple ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
                    {STEP_DEFS[step].options.map(opt => (
                      <OptionCard
                        key={opt.id}
                        opt={opt}
                        selected={isSelected(step, opt.id)}
                        onSelect={() => toggleOption(step, opt.id)}
                      />
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.05]">
                    <button
                      onClick={goBack}
                      disabled={step === 0}
                      className="flex items-center gap-1.5 font-mono text-[8px] tracking-[0.25em] uppercase px-4 py-2 rounded-lg border border-white/[0.08] text-white/30 hover:text-white/55 hover:border-white/18 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      <ChevronLeft size={11} /> Voltar
                    </button>

                    <button
                      onClick={goNext}
                      disabled={!canNext(step)}
                      className="flex items-center gap-1.5 font-mono text-[8px] tracking-[0.25em] uppercase px-5 py-2 rounded-lg border border-blue-400/40 bg-blue-400/[0.08] text-blue-400 hover:bg-blue-400/15 hover:border-blue-400/60 hover:shadow-[0_0_16px_rgba(96,165,250,0.18)] disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.97]"
                    >
                      {step === 4 ? 'Ver resultado' : 'Próxima etapa'} <ChevronRight size={11} />
                    </button>
                  </div>
                </div>
              ) : (
                // ── Result screen ────────────────────────────────────────────
                <div>
                  {/* Score card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: 0.05 }}
                    className={`relative border rounded-xl p-5 mb-4 overflow-hidden ${tier.border}`}
                    style={{
                      background: score.tier === 'Enterprise' ? 'rgba(255,77,110,0.06)' : score.tier === 'Pro' ? 'rgba(96,165,250,0.06)' : 'rgba(16,185,129,0.06)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: score.tier === 'Enterprise' ? '0 0 40px rgba(255,77,110,0.10)' : score.tier === 'Pro' ? '0 0 40px rgba(59,130,246,0.10)' : '0 0 40px rgba(16,185,129,0.10)',
                    }}
                  >
                    {/* Corner */}
                    <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 rounded-tl-xl pointer-events-none" style={{ borderColor: tier.color + '80' }} />

                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl border flex items-center justify-center shrink-0" style={{ borderColor: tier.color + '40', background: tier.color + '12' }}>
                        <TierIcon size={22} style={{ color: tier.color }} />
                      </div>
                      <div>
                        <span className="font-mono font-bold text-[9px] tracking-[0.45em] block" style={{ color: tier.color }}>
                          {tier.label}
                        </span>
                        <p className="font-sans font-black text-2xl md:text-3xl text-white tracking-tight mt-0.5">
                          {score.weeks} semanas
                        </p>
                        <p className="font-mono text-[8px] text-white/30 tracking-wider mt-0.5">
                          estimativa de entrega · complexity score {score.w}
                        </p>
                      </div>
                    </div>

                    {/* Message */}
                    <p className="font-mono text-[10px] leading-[1.75] text-white/50 border-l-2 pl-3 mb-4" style={{ borderColor: tier.color + '50' }}>
                      {tier.message}
                      {sel.integrations.includes('ai') && score.tier === 'Enterprise' && (
                        <span className="text-red-400/80"> Com integração AI/LLM — a competência mais estratégica de 2025.</span>
                      )}
                    </p>

                    {/* Tech badges */}
                    <div className="mb-1">
                      <span className="font-mono text-[7px] tracking-[0.3em] uppercase text-white/20 block mb-2">[ SEU STACK ]</span>
                      <div className="flex flex-wrap gap-1.5">
                        {allSelected.map(id => <TechBadge key={id} id={id} />)}
                        {allSelected.length === 0 && <span className="font-mono text-[8px] text-white/15">Nenhuma seleção</span>}
                      </div>
                    </div>
                  </motion.div>

                  {/* CTA + Reset */}
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <a
                      href={buildUrl(sel)}
                      className="flex-1 flex items-center justify-center gap-2 h-11 rounded-lg border font-mono text-[9px] tracking-[0.3em] uppercase transition-all duration-200 active:scale-[0.97]"
                      style={{
                        borderColor: tier.color + '55',
                        background: tier.color + '10',
                        color: tier.color,
                        boxShadow: `0 0 20px ${tier.color}18`,
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = tier.color + '1e'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = tier.color + '10'; }}
                    >
                      <ExternalLink size={12} /> QUERO UMA PROPOSTA PARA ESSE PROJETO →
                    </a>
                    <button
                      onClick={reset}
                      className="flex items-center justify-center gap-2 h-11 px-5 rounded-lg border border-white/[0.08] font-mono text-[8px] tracking-[0.25em] uppercase text-white/30 hover:text-white/55 hover:border-white/18 transition-all duration-200"
                    >
                      <RotateCcw size={10} /> Recomeçar
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Sidebar ── */}
        {step < 5 && <Sidebar sel={sel} step={step} />}
      </div>
    </div>
  );
}
