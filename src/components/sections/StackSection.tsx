'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';

/* ── Scroll-reveal wrapper ────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Inline SVG tech icons ────────────────────────────────────── */
const NextjsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 004.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 00-2.499-.523A33.119 33.119 0 0011.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 01.237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 01.233-.296c.096-.05.13-.054.5-.054z" fill="currentColor" />
  </svg>
);

const ReactIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="2.5" fill="#06b6d4" />
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#06b6d4" strokeWidth="1.2" fill="none" />
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#06b6d4" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#06b6d4" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)" />
  </svg>
);

const TailwindIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#06b6d4" />
  </svg>
);

const TypeScriptIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#3178C6" />
    <path d="M13.736 12.387V19H11.68v-6.613H9.167V10.6H16.25v1.787h-2.514zM5.36 15.294c.262.414.641.735 1.133.964.492.222.98.333 1.462.333.46 0 .845-.097 1.153-.29.31-.193.464-.463.464-.81 0-.273-.085-.499-.255-.679-.17-.18-.385-.329-.644-.449-.26-.12-.628-.263-1.104-.43-.65-.22-1.18-.44-1.59-.657a2.924 2.924 0 01-.979-.886c-.24-.364-.36-.808-.36-1.334 0-.56.147-1.04.44-1.44.293-.4.693-.703 1.2-.91C6.846 9.1 7.415 9 8.047 9c.67 0 1.267.112 1.79.336.524.224.936.553 1.237.988l-1.399 1.077c-.198-.3-.452-.53-.762-.688a2.18 2.18 0 00-1.02-.237c-.408 0-.74.085-.998.255a.78.78 0 00-.385.677c0 .215.072.393.216.535.144.142.325.26.543.353.218.094.56.22 1.025.38.677.22 1.215.437 1.613.65.398.213.718.49.96.832.24.341.36.764.36 1.27 0 .598-.154 1.107-.462 1.525-.308.418-.722.734-1.244.947-.521.214-1.1.32-1.736.32-.723 0-1.382-.13-1.978-.391-.596-.262-1.087-.643-1.473-1.143l1.427-1.091z" fill="white" />
  </svg>
);

const SupabaseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C.01 13.046.703 14.5 1.954 14.5H12.1V22.9c.015.987 1.26 1.41 1.874.637l9.262-11.653c.753-.997.06-2.45-1.19-2.45H11.9V1.036z" fill="#3ECF8E" />
  </svg>
);

const VercelIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor" />
  </svg>
);

/* ── Data ─────────────────────────────────────────────────────── */
const CORE_STACK = [
  {
    name: 'Next.js', category: 'Framework', icon: <NextjsIcon />,
    desc: 'Framework React para criar experiências rápidas, escaláveis e otimizadas para SEO.',
    tags: ['SSR', 'SEO', 'PERFORMANCE'],
  },
  {
    name: 'React', category: 'Interface', icon: <ReactIcon />,
    desc: 'Base para interfaces modernas, componentizadas e preparadas para evolução contínua.',
    tags: ['UI', 'COMPONENTS', 'STATE'],
  },
  {
    name: 'Tailwind CSS', category: 'Estilo', icon: <TailwindIcon />,
    desc: 'Sistema utilitário para criar interfaces consistentes, responsivas e altamente customizáveis.',
    tags: ['DESIGN SYSTEM', 'RESPONSIVO', 'UI'],
  },
  {
    name: 'TypeScript', category: 'Linguagem', icon: <TypeScriptIcon />,
    desc: 'Mais segurança no código, menos erros invisíveis e manutenção mais previsível.',
    tags: ['TYPES', 'SAFETY', 'SCALE'],
  },
  {
    name: 'Supabase', category: 'Backend', icon: <SupabaseIcon />,
    desc: 'Banco de dados, autenticação e APIs para produtos digitais que precisam sair do papel rápido.',
    tags: ['POSTGRES', 'AUTH', 'API'],
  },
  {
    name: 'Vercel', category: 'Deploy', icon: <VercelIcon />,
    desc: 'Deploy global, performance em produção e infraestrutura otimizada para aplicações modernas.',
    tags: ['EDGE', 'DEPLOY', 'CDN'],
  },
];

const CRITERIA = [
  {
    num: '01', title: 'Performance real',
    desc: 'Sites e aplicações precisam carregar rápido, responder bem e manter experiência fluida em qualquer dispositivo ou condição de rede.',
  },
  {
    num: '02', title: 'Escalabilidade',
    desc: 'A estrutura precisa suportar evolução sem virar uma bagunça técnica. Arquitetura que cresce junto com o produto.',
  },
  {
    num: '03', title: 'Manutenção simples',
    desc: 'Código organizado, tipado e componentizado reduz retrabalho no futuro. Quem mantém também precisa entender.',
  },
  {
    num: '04', title: 'Entrega mais rápida',
    desc: 'Boas ferramentas encurtam o caminho entre ideia, protótipo e produto publicado. Velocidade de entrega é vantagem competitiva.',
  },
];

const ARCH_LAYERS = [
  { label: 'Camada de Interface',      title: 'Interface do Usuário',   tech: 'React + Tailwind CSS',       accent: 'red'  },
  { label: 'Camada de Aplicação',      title: 'Lógica e Roteamento',    tech: 'Next.js + TypeScript',       accent: 'cyan' },
  { label: 'Camada de Dados',          title: 'Banco e Autenticação',   tech: 'Supabase + PostgreSQL',      accent: 'red'  },
  { label: 'Camada de Infraestrutura', title: 'Deploy e Distribuição',  tech: 'Vercel + Edge Network',      accent: 'cyan' },
];

const USE_CASES = [
  {
    num: '01', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: 'Sites institucionais',
    desc: 'Sites rápidos, bonitos, bem estruturados e preparados para SEO e crescimento orgânico.',
    tags: ['SITE', 'SEO', 'PERFORMANCE'],
  },
  {
    num: '02', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
    title: 'Landing pages',
    desc: 'Páginas de campanha com foco em conversão, velocidade e clareza da proposta de valor.',
    tags: ['CONVERSÃO', 'CAMPANHA', 'COPY'],
  },
  {
    num: '03', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="8" height="8" rx="2" /><rect x="14" y="14" width="8" height="8" rx="2" />
      </svg>
    ),
    title: 'Dashboards',
    desc: 'Interfaces para visualizar dados, métricas e operações em tempo real com alta performance.',
    tags: ['DADOS', 'UI', 'AUTOMAÇÃO'],
  },
  {
    num: '04', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Micro SaaS',
    desc: 'Produtos digitais enxutos, escaláveis e prontos para validação rápida de mercado.',
    tags: ['SAAS', 'MVP', 'PRODUTO'],
  },
];

const EXTRA_TOOLS = [
  'Framer Motion', 'Zod', 'Prisma', 'Stripe', 'Resend',
  'shadcn/ui', 'GitHub', 'Docker', 'PostgreSQL', 'APIs externas',
];

/* ── Section heading ──────────────────────────────────────────── */
function SectionHead({
  eyebrow, title, sub,
}: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <Reveal className="mb-16">
      <p className="font-mono text-[9px] tracking-[0.30em] uppercase text-electric-red/80 mb-6 inline-block">
        {eyebrow}
      </p>
      <h2 className="font-black text-foreground uppercase leading-[1.0] tracking-tighter mb-0"
        style={{ fontSize: 'clamp(2rem,4.5vw,3.75rem)' }}>
        {title}
      </h2>
      {sub && (
        <p className="text-sm leading-[1.75] text-foreground/50 max-w-[540px] mt-4">{sub}</p>
      )}
    </Reveal>
  );
}

/* ── Main component ───────────────────────────────────────────── */
export function StackSection() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
        {/* Backgrounds */}
        <div className="absolute inset-0 section-grid opacity-40 pointer-events-none" />
        <div className="absolute top-[-10%] left-[30%] w-[60vw] h-[50vh] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center,rgba(255,0,51,.09),transparent 70%)' }} />
        <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[40vh] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center,rgba(6,182,212,.05),transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center,transparent 30%,rgba(var(--bg-primary-raw,2,2,2),.75) 85%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-[280px] pointer-events-none"
          style={{ background: 'linear-gradient(to bottom,transparent,var(--bg-primary))' }} />

        {/* Big ghost number */}
        <span aria-hidden="true"
          className="absolute right-10 top-1/2 -translate-y-1/2 font-black leading-none pointer-events-none select-none"
          style={{ fontSize: 'clamp(14rem,28vw,22rem)', letterSpacing: '-0.08em', color: 'rgba(255,255,255,.02)' }}>
          01
        </span>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1152px] mx-auto px-8 pb-20 pt-[180px] md:pt-[220px]">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="font-mono text-[9px] tracking-[0.30em] uppercase text-electric-red/80 mb-7 flex items-center gap-2">
              <span className="inline-block w-10 h-px bg-electric-red/50" />
              [ STACK TECH ]
            </p>
            <h1 className="font-black text-foreground uppercase mb-7 max-w-[900px]"
              style={{ fontSize: 'clamp(3rem,8vw,7.5rem)', letterSpacing: '-0.05em', lineHeight: '0.90' }}>
              As ferramentas invisíveis<br />
              por trás da<br />
              <span className="text-electric-red relative">
                performance.
                <span className="absolute bottom-1 left-0 right-0 h-[3px] rounded-sm"
                  style={{ background: 'linear-gradient(to right,#e63030,transparent)' }} />
              </span>
            </h1>
            <p className="font-mono text-sm leading-[1.75] text-foreground/50 max-w-[520px] mb-12">
              Tecnologias escolhidas para construir sites, sistemas, dashboards e produtos digitais rápidos, escaláveis e fáceis de evoluir.
            </p>

            {/* Divider */}
            <div className="w-full h-px mb-10"
              style={{ background: 'linear-gradient(to right,rgba(255,0,51,.25),rgba(6,182,212,.15),transparent)' }} />

            {/* Metrics */}
            <div className="flex gap-10 mb-12 flex-wrap">
              {['Performance', 'Escala', 'Manutenção'].map((m, i) => (
                <React.Fragment key={m}>
                  {i > 0 && <div className="w-px h-9 bg-[var(--border)] self-center hidden sm:block" />}
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] tracking-[0.20em] text-electric-red/70">0{i + 1}</span>
                    <span className="font-bold text-xs tracking-[0.08em] uppercase text-foreground/60">{m}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex gap-3 flex-wrap">
              <a href="#core"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-foreground text-[#020202] font-extrabold text-[10px] tracking-[0.25em] uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,.25)] hover:scale-[1.02] active:scale-[.97]">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1v10M1 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Ver tecnologias
              </a>
              <Link href="/#contact"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-foreground/[0.04] text-foreground font-bold text-[10px] tracking-[0.25em] uppercase border border-[var(--border)] backdrop-blur-sm transition-all duration-300 hover:bg-foreground/[0.08] hover:border-foreground/25 active:scale-[.97]">
                Falar sobre projeto
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CORE STACK ────────────────────────────────────────── */}
      <section id="core" className="py-[120px] relative overflow-hidden">
        <div className="section-grid absolute inset-0 opacity-50 pointer-events-none" />
        <div className="container mx-auto max-w-[1152px] px-8 relative z-10">
          <SectionHead
            eyebrow="[ CORE STACK ]"
            title={<>A base que usamos<br />para construir rápido<br />sem perder <span className="text-electric-red">controle.</span></>}
          />

          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px border border-[var(--border)] rounded-[20px] overflow-hidden">
              {CORE_STACK.map((item) => (
                <div key={item.name}
                  className="group relative bg-card p-9 transition-all duration-300 hover:bg-[color-mix(in_srgb,var(--bg-card)_60%,transparent)] hover:-translate-y-1 hover:z-10 hover:shadow-[0_20px_60px_rgba(0,0,0,.5)] overflow-hidden"
                >
                  {/* Red hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%,rgba(230,48,48,.06),transparent 70%)' }} />
                  {/* Red border on hover */}
                  <div className="absolute inset-0 border border-electric-red/20 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="flex items-start justify-between mb-7 relative z-10">
                    <div className="w-11 h-11 rounded-[10px] border border-[var(--border)] bg-foreground/[0.04] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </div>
                    <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-cyan px-2 py-1 rounded border border-cyan/20 bg-cyan/[0.06]">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="font-black text-[22px] tracking-tight text-foreground mb-2.5 relative z-10">
                    {item.name}
                  </h3>
                  <p className="text-xs leading-[1.70] text-foreground/50 mb-6 relative z-10">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 relative z-10">
                    {item.tags.map(tag => (
                      <span key={tag}
                        className="font-mono text-[8px] tracking-[0.12em] uppercase px-2 py-[3px] rounded border border-[var(--border)] text-foreground/35 bg-foreground/[0.03] transition-all duration-200 group-hover:border-foreground/12 group-hover:text-foreground/55">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CRITERIA ──────────────────────────────────────────── */}
      <section className="py-[120px] relative overflow-hidden bg-surface-secondary">
        <div className="section-grid absolute inset-0 opacity-50 pointer-events-none" />
        <div className="container mx-auto max-w-[1152px] px-8 relative z-10">
          <SectionHead
            eyebrow="[ CRITÉRIO ]"
            title={<>Não é sobre usar<br />a tecnologia <span className="text-electric-red">da moda.</span></>}
            sub="É sobre escolher ferramentas que reduzem atrito, aumentam velocidade e deixam o produto pronto para crescer."
          />

          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-[var(--border)] rounded-[20px] overflow-hidden">
              {CRITERIA.map((c) => (
                <div key={c.num}
                  className="group relative bg-card p-11 transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--bg-card)_60%,transparent)] overflow-hidden">
                  {/* Ghost number */}
                  <span aria-hidden="true"
                    className="absolute top-5 right-7 font-black leading-none pointer-events-none select-none transition-colors duration-300 text-foreground/[0.04] group-hover:text-electric-red/[0.06]"
                    style={{ fontSize: 'clamp(4rem,8vw,7rem)', letterSpacing: '-0.06em' }}>
                    {c.num}
                  </span>
                  <h3 className="relative z-10 font-extrabold text-[18px] tracking-tight text-foreground mb-3 flex items-center gap-2.5">
                    <span className="inline-block w-3 h-0.5 rounded-sm bg-electric-red shrink-0" />
                    {c.title}
                  </h3>
                  <p className="relative z-10 text-[13px] leading-[1.72] text-foreground/50">{c.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ARCHITECTURE ──────────────────────────────────────── */}
      <section className="py-[120px] relative overflow-hidden">
        <div className="section-grid absolute inset-0 opacity-50 pointer-events-none" />
        <div className="container mx-auto max-w-[1152px] px-8 relative z-10">
          <SectionHead
            eyebrow="[ ARQUITETURA ]"
            title={<>Cada peça tem<br />uma função <span className="text-electric-red">clara.</span></>}
            sub="Um sistema coeso onde cada camada sabe o que faz e conversa bem com as outras."
          />

          {/* Desktop diagram */}
          <Reveal delay={0.1} className="hidden md:block max-w-[820px]">
            <div className="flex flex-col gap-0">
              {ARCH_LAYERS.map((layer, i) => {
                const isRed = layer.accent === 'red';
                const dotColor = isRed ? 'bg-electric-red shadow-[0_0_16px_rgba(230,48,48,.40)]' : 'bg-cyan shadow-[0_0_16px_rgba(6,182,212,.40)]';
                const techColor = isRed ? 'text-electric-red' : 'text-cyan';
                const leftBorder = isRed ? 'border-l-electric-red/40 group-hover:border-l-electric-red' : 'border-l-cyan/40 group-hover:border-l-cyan';
                const isLast = i === ARCH_LAYERS.length - 1;

                return (
                  <div key={layer.label} className="grid gap-0" style={{ gridTemplateColumns: '64px 1fr' }}>
                    {/* Left timeline */}
                    <div className="flex flex-col items-center" style={{ paddingTop: i === 0 ? '20px' : '0' }}>
                      {i > 0 && <div className="w-px flex-none h-2"
                        style={{ background: 'linear-gradient(to bottom,rgba(230,48,48,.30),rgba(6,182,212,.20))' }} />}
                      <div className={`w-3 h-3 rounded-full shrink-0 z-10 relative ${dotColor}`} />
                      {!isLast && <div className="w-px flex-1 min-h-[40px]"
                        style={{ background: 'linear-gradient(to bottom,rgba(230,48,48,.30),rgba(6,182,212,.20))' }} />}
                    </div>
                    {/* Card */}
                    <div className={`group border border-[var(--border)] rounded-[14px] p-6 bg-card my-2 transition-all duration-300 hover:border-foreground/16 hover:translate-x-1.5 overflow-hidden border-l-2 ${leftBorder}`}>
                      <p className="font-mono text-[8px] tracking-[0.25em] uppercase text-foreground/35 mb-1.5">{layer.label}</p>
                      <h4 className="font-extrabold text-[16px] tracking-tight text-foreground mb-1">{layer.title}</h4>
                      <p className={`font-mono text-[10px] tracking-[0.12em] ${techColor} opacity-80`}>{layer.tech}</p>
                    </div>
                  </div>
                );
              })}

              {/* Result node */}
              <div className="grid gap-0" style={{ gridTemplateColumns: '64px 1fr' }}>
                <div className="flex flex-col items-center">
                  <div className="w-px flex-none h-2"
                    style={{ background: 'linear-gradient(to bottom,rgba(230,48,48,.30),rgba(6,182,212,.20))' }} />
                  <div className="w-3 h-3 rounded-full shrink-0"
                    style={{ background: 'linear-gradient(135deg,#e63030,#06b6d4)', boxShadow: '0 0 20px rgba(230,48,48,.30)' }} />
                </div>
                <div className="border border-electric-red/25 rounded-[14px] p-6 my-2 text-center relative overflow-hidden"
                  style={{ background: 'rgba(230,48,48,.04)' }}>
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 50% 0%,rgba(230,48,48,.07),transparent 70%)' }} />
                  <p className="font-mono text-[8px] tracking-[0.25em] uppercase text-electric-red/60 mb-1.5 relative z-10">Output</p>
                  <p className="font-extrabold text-[16px] tracking-tight text-foreground relative z-10">Performance + Escala + Experiência</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Mobile timeline */}
          <Reveal delay={0.1} className="md:hidden">
            <div className="relative flex flex-col gap-0 pl-8">
              <div className="absolute left-1.5 top-4 bottom-4 w-px"
                style={{ background: 'linear-gradient(to bottom,#e63030,#06b6d4)' }} />
              {[...ARCH_LAYERS, { label: 'Output', title: 'Performance + Escala + Experiência', tech: '', accent: 'red' as const }].map((item, i) => {
                const isRed = item.accent === 'red';
                const dotBg = i === ARCH_LAYERS.length
                  ? 'linear-gradient(135deg,#e63030,#06b6d4)'
                  : isRed ? '#e63030' : '#06b6d4';
                const techColor = isRed ? 'text-electric-red' : 'text-cyan';
                return (
                  <div key={item.label} className="relative mb-6">
                    <div className="absolute -left-[26px] top-1.5 w-2.5 h-2.5 rounded-full"
                      style={{ background: dotBg, boxShadow: `0 0 10px ${isRed ? 'rgba(230,48,48,.40)' : 'rgba(6,182,212,.40)'}` }} />
                    <p className="font-mono text-[8px] tracking-[0.25em] uppercase text-foreground/35 mb-1">{item.label}</p>
                    <h4 className="font-extrabold text-[14px] text-foreground mb-0.5">{item.title}</h4>
                    {item.tech && <p className={`font-mono text-[10px] ${techColor}`}>{item.tech}</p>}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── USE CASES ─────────────────────────────────────────── */}
      <section className="py-[120px] relative overflow-hidden bg-surface-secondary">
        <div className="section-grid absolute inset-0 opacity-50 pointer-events-none" />
        <div className="container mx-auto max-w-[1152px] px-8 relative z-10">
          <SectionHead
            eyebrow="[ ONDE USAMOS ]"
            title={<>A stack muda.<br />O <span className="text-electric-red">padrão</span> não.</>}
            sub="A mesma base sólida se adapta a diferentes contextos — de landing pages a produtos SaaS completos."
          />

          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {USE_CASES.map((uc) => (
                <div key={uc.num}
                  className="group relative border border-[var(--border)] rounded-[18px] p-9 bg-card overflow-hidden transition-all duration-300 hover:border-foreground/14 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,.4)]">
                  {/* Cyan hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[18px]"
                    style={{ background: 'radial-gradient(ellipse 90% 60% at 50% 0%,rgba(6,182,212,.06),transparent 70%)' }} />
                  {/* Ghost number */}
                  <span aria-hidden="true"
                    className="absolute bottom-[-10px] right-5 font-black leading-none pointer-events-none select-none text-foreground/[0.03] group-hover:text-cyan/[0.04] transition-colors duration-300"
                    style={{ fontSize: 'clamp(5rem,10vw,8rem)', letterSpacing: '-0.06em' }}>
                    {uc.num}
                  </span>

                  <div className="w-11 h-11 rounded-[10px] border border-[var(--border)] bg-foreground/[0.04] flex items-center justify-center mb-5 relative z-10 transition-transform duration-300 group-hover:scale-110">
                    {uc.icon}
                  </div>
                  <h3 className="font-extrabold text-[18px] tracking-tight text-foreground mb-2.5 relative z-10">{uc.title}</h3>
                  <p className="text-[13px] leading-[1.72] text-foreground/50 mb-5 relative z-10">{uc.desc}</p>
                  <div className="flex flex-wrap gap-1.5 relative z-10">
                    {uc.tags.map(tag => (
                      <span key={tag}
                        className="font-mono text-[8px] tracking-[0.12em] uppercase px-2 py-[3px] rounded border border-cyan/18 text-cyan/60 bg-cyan/[0.05]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── EXPANDED STACK ────────────────────────────────────── */}
      <section className="py-[120px] relative overflow-hidden">
        <div className="section-grid absolute inset-0 opacity-50 pointer-events-none" />
        <div className="container mx-auto max-w-[1152px] px-8 relative z-10">
          <SectionHead
            eyebrow="[ FERRAMENTAS COMPLEMENTARES ]"
            title={<>Quando o projeto pede,<br />a stack <span className="text-electric-red">cresce.</span></>}
          />

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-10">
              {EXTRA_TOOLS.map(tool => (
                <span key={tool}
                  className="font-mono text-[10px] tracking-[0.15em] uppercase px-4 py-[9px] rounded-lg border border-[var(--border)] text-foreground/50 bg-card transition-all duration-200 hover:border-foreground/18 hover:text-foreground hover:bg-foreground/[0.05] hover:-translate-y-0.5 cursor-default">
                  {tool}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-[13px] text-foreground/40 leading-[1.7] max-w-[560px] italic border-l-2 border-electric-red/25 pl-4">
              Nem todo projeto precisa de tudo. A stack é escolhida conforme o problema, não por excesso de ferramenta.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section id="cta" className="pb-0 pt-[120px] relative">
        <div className="container mx-auto max-w-[1152px] px-8">
          <Reveal>
            <div className="relative border border-[var(--border)] rounded-[24px] p-20 bg-card text-center overflow-hidden">
              {/* Top glow */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%,rgba(230,48,48,.07),transparent 65%)' }} />
              {/* Bottom line */}
              <div className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(to right,transparent,rgba(230,48,48,.30),rgba(6,182,212,.20),transparent)' }} />

              <p className="font-mono text-[9px] tracking-[0.30em] uppercase text-electric-red/70 mb-7 block relative z-10">
                [ PRÓXIMO PROJETO ]
              </p>
              <h2 className="font-black text-foreground uppercase mb-7 relative z-10"
                style={{ fontSize: 'clamp(2.5rem,6vw,5rem)', letterSpacing: '-0.05em', lineHeight: '0.92' }}>
                Tecnologia certa<br />não aparece.<br />O resultado <span className="text-electric-red">aparece.</span>
              </h2>
              <p className="text-[14px] leading-[1.75] text-foreground/50 max-w-[520px] mx-auto mb-10 relative z-10">
                A Mezzold escolhe, desenha e implementa a stack ideal para criar produtos digitais rápidos, bonitos e preparados para crescer.
              </p>
              <div className="flex gap-3 justify-center flex-wrap mb-14 relative z-10">
                <Link href="/#contact"
                  className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-electric-red text-white font-extrabold text-[10px] tracking-[0.25em] uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(230,48,48,.35)] hover:scale-[1.02] active:scale-[.97]">
                  Solicitar proposta
                </Link>
                <Link href="/projetos"
                  className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-foreground/[0.04] text-foreground font-bold text-[10px] tracking-[0.25em] uppercase border border-[var(--border)] backdrop-blur-sm transition-all duration-300 hover:bg-foreground/[0.08] hover:border-foreground/25 active:scale-[.97]">
                  Ver projetos
                </Link>
              </div>
              <div className="flex gap-3 justify-center flex-wrap relative z-10">
                {['NEXT.JS', 'REACT', 'TYPESCRIPT', 'SUPABASE', 'VERCEL'].map(p => (
                  <span key={p}
                    className="font-mono text-[8px] tracking-[0.20em] uppercase px-3 py-1.5 rounded border border-[var(--border)] text-foreground/25 bg-foreground/[0.02]">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
