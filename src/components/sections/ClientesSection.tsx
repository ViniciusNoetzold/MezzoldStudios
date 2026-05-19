'use client';

import Link from 'next/link';

interface Client {
  name: string;
  category: string;
  description: string;
  url: string;
  domain: string;
  tags: string[];
  accent: 'red' | 'cyan';
}

const CLIENTS: Client[] = [
  {
    name: 'Cliente 01',
    category: 'Site Institucional',
    description:
      'Presença digital premium com foco em clareza, velocidade e conversão. Interface limpa que comunica autoridade desde o primeiro scroll.',
    url: 'https://cliente01.com.br',
    domain: 'cliente01.com.br',
    tags: ['NEXT.JS', 'SEO', 'PERFORMANCE'],
    accent: 'red',
  },
  {
    name: 'Cliente 02',
    category: 'Landing Page',
    description:
      'Página estratégica criada para campanhas, captação e validação de oferta. Copy afiado, CTA direto, estrutura que converte.',
    url: 'https://cliente02.com.br',
    domain: 'cliente02.com.br',
    tags: ['DESIGN', 'COPY', 'CONVERSÃO'],
    accent: 'cyan',
  },
  {
    name: 'Cliente 03',
    category: 'Dashboard',
    description:
      'Interface visual para organizar dados, métricas e decisões em tempo real. Clareza de leitura mesmo em alto volume de informação.',
    url: 'https://cliente03.com.br',
    domain: 'cliente03.com.br',
    tags: ['DASHBOARD', 'AUTOMAÇÃO', 'UI'],
    accent: 'red',
  },
  {
    name: 'Cliente 04',
    category: 'Produto Digital',
    description:
      'Experiência web escalável para apresentação, validação e crescimento de produto. Arquitetura pensada para evoluir junto com o negócio.',
    url: 'https://cliente04.com.br',
    domain: 'cliente04.com.br',
    tags: ['SAAS', 'REACT', 'UX'],
    accent: 'cyan',
  },
];

const BENEFITS = [
  {
    num: '// 001',
    title: 'Prévia real',
    desc: 'Mostra o projeto funcionando visualmente antes do clique. O visitante já experimenta a estética antes de acessar o site.',
  },
  {
    num: '// 002',
    title: 'Mais confiança',
    desc: 'Transforma portfólio em experiência, não apenas em lista de nomes. Cada projeto fala por si antes mesmo de ser aberto.',
  },
  {
    num: '// 003',
    title: 'Tráfego qualificado',
    desc: 'Quem clica já chega no site do cliente entendendo o contexto do projeto. Intenção mais alta, resultado mais consistente.',
  },
];

/* ── Skeleton browser mockup ─────────────────────────────────── */
function SiteMockup({ accent }: { accent: 'red' | 'cyan' }) {
  const tagBg  = accent === 'red' ? 'bg-electric-red/40' : 'bg-cyan/40';
  const sectBg = accent === 'red' ? 'bg-electric-red/[0.35]' : 'bg-emerald/[0.35]';
  const featBg = accent === 'red' ? 'bg-electric-red/[0.20]' : 'bg-cyan/[0.20]';
  const btnBg  = accent === 'red' ? 'bg-white/[0.25]' : 'bg-cyan/[0.35]';

  return (
    <div className="w-full bg-[#0a0a0a]">
      {/* Nav */}
      <div className="flex items-center justify-between px-8 py-4 bg-[#050505] border-b border-white/[0.06]">
        <div className="w-20 h-3 rounded-sm bg-white/[0.25]" />
        <div className="flex gap-4">
          {[0, 1, 2].map(i => <div key={i} className="w-9 h-2 rounded-sm bg-white/10" />)}
        </div>
      </div>

      {/* Hero */}
      <div
        className="px-8 py-14 text-center border-b border-white/[0.05]"
        style={{ background: 'linear-gradient(180deg,#080808,#0f0f0f)' }}
      >
        <div className={`w-20 h-2 rounded-sm ${tagBg} mx-auto mb-4`} />
        <div className="w-[72%] h-7 rounded-sm bg-white/[0.22] mx-auto mb-2.5" />
        <div className="w-[52%] h-7 rounded-sm bg-white/[0.22] mx-auto mb-5" />
        <div className="w-[55%] h-2 rounded-sm bg-white/[0.08] mx-auto mb-2" />
        <div className="w-[42%] h-2 rounded-sm bg-white/[0.06] mx-auto mb-7" />
        <div className="flex gap-2.5 justify-center">
          <div className={`w-24 h-8 rounded-full ${btnBg}`} />
          <div className="w-24 h-8 rounded-full border border-white/15" />
        </div>
      </div>

      {/* Cards row */}
      <div className="px-8 py-12 border-b border-white/[0.05]">
        <div className={`w-16 h-2 rounded-sm ${sectBg} mb-3`} />
        <div className="w-[55%] h-[18px] rounded-sm bg-white/[0.18] mb-5" />
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map(i => (
            <div key={i} className="rounded-lg border border-white/[0.07] p-4 bg-white/[0.03]">
              <div className="w-7 h-7 rounded-md bg-white/[0.12] mb-2.5" />
              <div className="w-[70%] h-[9px] rounded-sm bg-white/[0.15] mb-2" />
              <div className="w-[90%] h-[7px] rounded-sm bg-white/[0.07] mb-1" />
              <div className="w-[65%] h-[7px] rounded-sm bg-white/[0.05]" />
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="px-8 py-12 bg-white/[0.02] border-b border-white/[0.05]">
        <div className={`w-16 h-2 rounded-sm ${sectBg} mb-3`} />
        <div className="w-[55%] h-[18px] rounded-sm bg-white/[0.18] mb-5" />
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map(i => (
            <div key={i} className="text-center p-4 border border-white/[0.06] rounded-lg bg-white/[0.02]">
              <div className="w-10 h-[18px] rounded-sm bg-white/[0.22] mx-auto mb-2" />
              <div className="w-[55%] h-[7px] rounded-sm bg-white/[0.08] mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Features row */}
      <div className="px-8 py-12 border-b border-white/[0.05]">
        <div className={`w-16 h-2 rounded-sm ${sectBg} mb-3`} />
        <div className="w-[55%] h-[18px] rounded-sm bg-white/[0.18] mb-5" />
        <div className="grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="rounded-lg border border-white/[0.07] p-5 bg-white/[0.03]">
              <div className={`w-6 h-6 rounded-md ${featBg} mb-3`} />
              <div className="w-[60%] h-[10px] rounded-sm bg-white/[0.15] mb-2" />
              <div className="w-[85%] h-[7px] rounded-sm bg-white/[0.07] mb-1" />
              <div className="w-[70%] h-[7px] rounded-sm bg-white/[0.06]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Single client card ───────────────────────────────────────── */
function ClientCard({ client }: { client: Client }) {
  const isRed = client.accent === 'red';

  return (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        'clientes-card group block rounded-3xl border border-[var(--border)] bg-[#0f0f0f] overflow-hidden',
        'cursor-pointer transition-all duration-500',
        isRed
          ? 'hover:border-electric-red/40 hover:shadow-[0_0_60px_-15px_rgba(255,0,51,0.20),0_20px_60px_-20px_rgba(0,0,0,0.6)]'
          : 'hover:border-cyan/40 hover:shadow-[0_0_60px_-15px_rgba(6,182,212,0.18),0_20px_60px_-20px_rgba(0,0,0,0.6)]',
      ].join(' ')}
    >
      {/* Browser chrome bar */}
      <div className="flex items-center gap-2.5 px-4 py-2.5 bg-foreground/[0.03] border-b border-[var(--border)]">
        <div className="flex gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 h-[26px] rounded-md bg-foreground/[0.05] border border-foreground/[0.07] flex items-center px-2.5 gap-1.5 min-w-0">
          <svg
            className="opacity-30 shrink-0"
            width="10" height="10"
            viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="font-mono text-[9px] tracking-[0.05em] text-foreground/40 truncate">
            {client.domain}
          </span>
        </div>
      </div>

      {/* Scrolling preview */}
      <div className="h-[260px] sm:h-[380px] overflow-hidden relative bg-[#080808]">
        <div className="preview-scroll w-full">
          <SiteMockup accent={client.accent} />
        </div>
      </div>

      {/* Card info */}
      <div className="px-7 pt-6 pb-7">
        <p className={`font-mono text-[9px] tracking-[0.25em] uppercase mb-2.5 ${isRed ? 'text-electric-red' : 'text-cyan'}`}>
          [ {client.category.toUpperCase()} ]
        </p>
        <h3 className="font-black text-[22px] tracking-tight text-foreground mb-2 leading-tight">
          {client.name}
        </h3>
        <p className="text-xs text-foreground/50 leading-relaxed mb-4">
          {client.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {client.tags.map(tag => (
            <span
              key={tag}
              className="font-mono text-[8px] tracking-[0.12em] uppercase px-2.5 py-1 rounded border border-foreground/[0.12] text-foreground/40 bg-foreground/[0.04]"
            >
              {tag}
            </span>
          ))}
        </div>
        <span
          className={[
            'inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.20em] uppercase',
            'text-foreground/35 transition-colors duration-300',
            isRed ? 'group-hover:text-foreground' : 'group-hover:text-cyan',
          ].join(' ')}
        >
          Visitar site
          <svg
            className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
            width="14" height="14"
            viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </a>
  );
}

/* ── Main section component ──────────────────────────────────── */
export function ClientesSection() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="min-h-[100svh] flex flex-col items-center justify-center relative overflow-hidden text-center px-7 pt-36 pb-24">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right,var(--grid-line) 1px,transparent 1px),linear-gradient(to bottom,var(--grid-line) 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Red top glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: '80vw',
            height: '45vh',
            background: 'radial-gradient(ellipse at top,rgba(255,0,51,.10),transparent 70%)',
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center,transparent 20%,var(--hero-vignette) 80%)' }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom,transparent,var(--hero-bottom-fade))' }}
        />
        {/* Large background number */}
        <span
          aria-hidden="true"
          className="clientes-ghost-num absolute bottom-14 right-10 font-black leading-none pointer-events-none select-none"
          style={{
            fontSize: 'clamp(8rem,20vw,18rem)',
            letterSpacing: '-0.06em',
          }}
        >
          01
        </span>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          <span className="font-mono text-[9px] tracking-[0.30em] uppercase text-electric-red/80 mb-[18px]">
            [ CLIENTES ]
          </span>
          <h1
            className="font-black text-foreground uppercase mb-6"
            style={{ fontSize: 'clamp(3rem,9vw,7.5rem)', letterSpacing: '-0.04em', lineHeight: 0.9 }}
          >
            Sites que não foram<br />
            feitos para ficar<br />
            <span className="text-electric-red">parados.</span>
          </h1>
          <p className="font-mono text-[13px] leading-[1.75] text-foreground/50 max-w-[520px] mb-10">
            Uma seleção de projetos digitais desenvolvidos pela Mezzold Studio — interfaces
            rápidas, estratégicas e prontas para transformar visitas em ação.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <a
              href="#gallery"
              className="clientes-primary-btn inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-foreground text-[#000] font-black text-[10px] tracking-[0.25em] uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.97] w-full max-w-[260px] sm:w-auto"
            >
              Ver clientes
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-foreground/[0.05] text-foreground font-bold text-[10px] tracking-[0.25em] uppercase border border-[var(--border)] backdrop-blur-sm transition-all duration-300 hover:bg-foreground/[0.10] hover:border-foreground/35 active:scale-[0.97] w-full max-w-[260px] sm:w-auto"
            >
              Solicitar projeto
            </Link>
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" className="py-14 sm:py-24 relative">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right,var(--grid-line) 1px,transparent 1px),linear-gradient(to bottom,var(--grid-line) 1px,transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom,transparent 0%,black 8%,black 92%,transparent 100%)',
          }}
        />
        <div className="container mx-auto max-w-6xl px-7 relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <span className="font-mono text-[9px] tracking-[0.30em] uppercase text-electric-red/80 mb-[18px] inline-block">
              [ VITRINE DIGITAL ]
            </span>
            <h2
              className="font-black text-foreground uppercase"
              style={{ fontSize: 'clamp(2rem,5vw,4rem)', letterSpacing: '-0.04em', lineHeight: 1 }}
            >
              {/* mobile */}
              <span className="sm:hidden">
                Toque no card.<br />
                Veja o site ganhar vida.<br />
                Toque para visitar.
              </span>
              {/* desktop */}
              <span className="hidden sm:inline">
                Passe o mouse.<br />
                Veja o site ganhar vida.<br />
                Clique para visitar.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {CLIENTS.map(client => (
              <ClientCard key={client.name} client={client} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-14 sm:py-24 relative bg-[var(--bg-secondary)]">
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right,var(--grid-line) 1px,transparent 1px),linear-gradient(to bottom,var(--grid-line) 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="container mx-auto max-w-6xl px-7 relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <span className="font-mono text-[9px] tracking-[0.30em] uppercase text-electric-red/80 mb-[18px] inline-block">
              [ POR QUE ISSO IMPORTA ]
            </span>
            <h2
              className="font-black text-foreground uppercase"
              style={{ fontSize: 'clamp(2rem,5vw,4rem)', letterSpacing: '-0.04em', lineHeight: 1 }}
            >
              Seu cliente precisa ver<br />
              antes de acreditar.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {BENEFITS.map(b => (
              <div
                key={b.num}
                className="border border-[var(--border)] rounded-2xl p-6 sm:p-8 bg-foreground/[0.02] transition-all duration-300 hover:bg-foreground/[0.04] hover:border-foreground/[0.14]"
              >
                <p className="font-mono text-[9px] tracking-[0.25em] text-electric-red/60 mb-5">
                  {b.num}
                </p>
                <h3 className="font-black text-[20px] tracking-tight text-foreground mb-2.5 leading-tight">
                  {b.title}
                </h3>
                <p className="text-xs text-foreground/50 leading-[1.7]">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="py-14 sm:py-24 relative overflow-hidden">
        {/* Center glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: '60vw',
            height: '60vh',
            background: 'radial-gradient(ellipse at center,rgba(255,0,51,.08),transparent 70%)',
          }}
        />
        <div className="container mx-auto max-w-6xl px-7 relative z-10">
          <div className="clientes-cta-card max-w-[720px] mx-auto text-center border border-[var(--border)] rounded-[28px] px-6 py-10 sm:px-12 sm:py-[72px] bg-[rgba(17,17,17,0.6)] backdrop-blur-md relative overflow-hidden">
            {/* Inner glow */}
            <div
              className="absolute inset-0 pointer-events-none rounded-[28px]"
              style={{
                background:
                  'radial-gradient(ellipse 90% 60% at 50% 0%,rgba(255,0,51,.08),transparent 70%)',
              }}
            />
            <span className="font-mono text-[9px] tracking-[0.30em] uppercase text-electric-red/80 mb-[18px] inline-block relative z-10">
              [ PRÓXIMO PROJETO ]
            </span>
            <h2
              className="font-black text-foreground uppercase mb-5 relative z-10"
              style={{ fontSize: 'clamp(2.5rem,6vw,5rem)', letterSpacing: '-0.04em', lineHeight: 0.92 }}
            >
              Quer seu site<br />
              aparecendo aqui?
            </h2>
            <p className="font-mono text-[13px] text-foreground/45 leading-[1.75] max-w-[440px] mx-auto mb-10 relative z-10">
              A Mezzold constrói sites, sistemas e experiências digitais com estética forte,
              performance real e estrutura pronta para crescer.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
              <Link
                href="/#contact"
                className="clientes-primary-btn inline-flex items-center justify-center h-12 px-7 rounded-full bg-foreground text-[#000] font-black text-[10px] tracking-[0.25em] uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.30)] hover:scale-[1.02] active:scale-[0.97] w-full sm:w-auto"
              >
                Solicitar proposta
              </Link>
              <Link
                href="/projetos"
                className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-foreground/[0.05] text-foreground font-bold text-[10px] tracking-[0.25em] uppercase border border-[var(--border)] backdrop-blur-sm transition-all duration-300 hover:bg-foreground/[0.10] hover:border-foreground/35 active:scale-[0.97] w-full sm:w-auto"
              >
                Ver projetos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
