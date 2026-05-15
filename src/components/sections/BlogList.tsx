'use client';
import { useState } from 'react';
import Link from 'next/link';
import { posts } from '@/lib/blog-posts';

const ALL_CATS = ['Todos', 'PERFORMANCE', 'PRODUTO', 'DESIGN', 'AUTOMAÇÃO'];

export function BlogList() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  const [featured, ...rest] = posts;

  const filtered = rest.filter((p) => {
    const matchCat = activeFilter === 'Todos' || p.category === activeFilter;
    const q = search.toLowerCase().trim();
    const matchQ =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-[58vh] flex items-end pt-[180px] md:pt-[200px] pb-[100px] px-6">
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.025) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 15%, black 75%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 15%, black 75%, transparent 100%)',
          }}
        />
        {/* Red glow */}
        <div
          className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 20% 0%, rgba(255,0,51,.07), transparent 70%)',
          }}
        />
        {/* Decorative large number */}
        <div
          className="absolute font-black leading-none pointer-events-none select-none text-white/[0.018]"
          style={{
            right: '-2vw',
            bottom: '-0.1em',
            fontSize: 'clamp(14rem, 28vw, 28rem)',
            letterSpacing: '-0.06em',
          }}
        >
          01
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1100px] mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-red shrink-0" />
            <span className="font-mono text-[9px] tracking-[0.30em] uppercase text-electric-red/80">
              MEZZOLD STUDIO
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] shrink-0" />
          </div>

          {/* Title */}
          <h1
            className="font-black uppercase text-foreground mb-7"
            style={{
              fontSize: 'clamp(4rem, 10vw, 9rem)',
              letterSpacing: '-0.05em',
              lineHeight: 0.88,
            }}
          >
            Blog<span className="text-electric-red">.</span>
          </h1>

          {/* Decorative rule */}
          <div className="flex items-center mb-7">
            <div className="flex-1 h-px bg-[var(--border)]" />
            <span className="mx-1.5 w-1.5 h-1.5 rounded-full bg-electric-red shrink-0" />
            <span className="mx-1.5 w-1.5 h-1.5 rounded-full bg-[#00e5ff] shrink-0" />
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          <p className="max-w-[620px] text-[16px] md:text-[17px] leading-[1.8] text-foreground/78 mb-10">
            Ideias, bastidores e estratégias sobre performance, design, código,
            automação e negócios digitais.
          </p>

          {/* Tag pills */}
          <div className="flex flex-wrap gap-2.5">
            {[
              'Artigos técnicos',
              'Estratégia digital',
              'Performance web',
              'SaaS e automação',
            ].map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] tracking-[0.22em] uppercase text-foreground/55 px-3 py-1.5 border border-[var(--border)] rounded-[4px]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED POST ── */}
      <section className="px-6 pb-20">
        <div className="max-w-[1100px] mx-auto">
          {/* Section label */}
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-foreground/50">
              [ DESTAQUE ]
            </span>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          <Link
            href={`/blog/${featured.slug}`}
            className="group relative overflow-hidden bg-[#0b0b0b] border border-[var(--border)] rounded-[16px] grid grid-cols-1 md:grid-cols-2 transition-all duration-300 hover:border-electric-red hover:-translate-y-1 hover:shadow-[0_0_60px_-20px_rgba(255,0,51,.18)]"
          >
            {/* Left panel */}
            <div className="px-7 py-8 md:px-[48px] md:py-[52px] flex flex-col relative z-10">
              <div className="font-mono text-[11px] tracking-[0.28em] uppercase text-electric-red mb-3.5">
                {featured.category}
              </div>
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-foreground/55 mb-5">
                {featured.date}&nbsp;·&nbsp;{featured.readTime} de leitura
              </div>
              <h2
                className="font-black text-foreground mb-5"
                style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.3rem)', letterSpacing: '-0.04em', lineHeight: 1.1 }}
              >
                {featured.title}
              </h2>
              <p className="text-[16px] md:text-[17px] leading-[1.8] text-foreground/78 mb-9 max-w-[460px] flex-1">
                {featured.excerpt}
              </p>
              <div className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.22em] uppercase text-electric-red group-hover:gap-4 transition-all duration-200">
                Ler artigo →
              </div>
            </div>

            {/* Right panel — decorative, hidden on mobile */}
            <div
              className="relative hidden md:flex items-center justify-center border-l border-[var(--border)]"
              style={{
                background:
                  'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,.012) 20px, rgba(255,255,255,.012) 21px)',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,0,51,.05), transparent 70%)',
                }}
              />
              <span
                className="font-black leading-none text-white/[0.04] select-none"
                style={{
                  fontSize: 'clamp(8rem, 18vw, 18rem)',
                  letterSpacing: '-0.06em',
                }}
              >
                01
              </span>
              <div className="absolute top-5 right-5 font-mono text-[8px] tracking-[0.22em] uppercase text-white/20 px-2 py-1 border border-[var(--border)] rounded">
                DESTAQUE
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── ALL POSTS ── */}
      <section className="px-6 pb-20">
        <div className="max-w-[1100px] mx-auto">
          {/* Section label */}
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-foreground/50">
              [ TODOS OS ARTIGOS ]
            </span>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          {/* Headline */}
          <div className="mb-10">
            <h2
              className="font-black text-foreground leading-[1.05]"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.04em' }}
            >
              Textos para quem constrói
              <br />
              <em className="not-italic font-light text-foreground/55">
                antes de decorar.
              </em>
            </h2>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground/35 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="search"
              placeholder="Buscar artigos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-9 pr-4 bg-[#111] border border-[var(--border)] rounded-lg text-foreground font-mono text-[12px] tracking-[0.06em] outline-none placeholder:text-foreground/45 focus:border-electric-red/40 transition-colors duration-200"
            />
          </div>

          {/* Category filters */}
          <div
            className="flex gap-2 pb-1 mb-12 overflow-x-auto"
            style={{ scrollbarWidth: 'none' }}
          >
            {ALL_CATS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`font-mono text-[10px] tracking-[0.22em] uppercase px-4 py-2 border rounded-full whitespace-nowrap transition-all duration-200 shrink-0 ${
                  activeFilter === cat
                    ? 'text-electric-red border-electric-red bg-electric-red/[0.06]'
                    : 'text-foreground/55 border-[var(--border)] hover:text-foreground hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts grid */}
          {filtered.length === 0 ? (
            <p className="font-mono text-[12px] tracking-[0.18em] uppercase text-foreground/55 py-10">
              Nenhum artigo encontrado.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filtered.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group relative overflow-hidden bg-[#0b0b0b] border border-[var(--border)] rounded-[12px] p-8 flex flex-col transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_0_40px_-15px_rgba(255,0,51,.10)]"
                >
                  {/* Top row: category + index number */}
                  <div className="flex items-start justify-between mb-[18px]">
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-electric-red">
                      {post.category}
                    </span>
                    <span
                      className="font-black leading-none text-white/[0.04] select-none"
                      style={{ fontSize: '5rem', letterSpacing: '-0.05em' }}
                    >
                      {String(i + 2).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Date + read time */}
                  <div className="flex items-center gap-3 mb-3.5">
                    <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-foreground/55">
                      {post.date}
                    </span>
                    <span className="w-[3px] h-[3px] rounded-full bg-white/20" />
                    <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-foreground/55">
                      {post.readTime} de leitura
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-extrabold text-foreground mb-3 leading-[1.25]"
                    style={{
                      fontSize: 'clamp(1.2rem, 1.8vw, 1.45rem)',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-[15px] md:text-[16px] leading-[1.75] text-foreground/78 mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[9px] tracking-[0.15em] uppercase px-2.5 py-1.5 border border-[var(--border)] rounded text-foreground/55"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-foreground/55 group-hover:text-electric-red flex items-center gap-1.5 transition-colors duration-200 whitespace-nowrap">
                      Ler →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="px-6 pb-24">
        <div className="max-w-[1100px] mx-auto">
          <div
            className="relative overflow-hidden bg-[#0b0b0b] border border-[var(--border)] rounded-[16px] grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            style={{ padding: 'clamp(36px, 5vw, 64px) clamp(28px, 4vw, 56px)' }}
          >
            {/* Right glow */}
            <div
              className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 60% 80% at 100% 50%, rgba(255,0,51,.05), transparent 70%)',
              }}
            />

            <div className="relative z-10">
              <div className="font-mono text-[11px] tracking-[0.28em] uppercase text-foreground/50 mb-4">
                [ INSIGHTS ]
              </div>
              <h3
                className="font-black text-foreground mb-4"
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1.05,
                }}
              >
                Receba ideias que mexem
                <br />
                com o seu digital.
              </h3>
              <p className="text-[15px] md:text-[16px] leading-[1.8] text-foreground/78">
                Estratégias, bastidores e provocações sobre sites, sistemas,
                performance e automação.
              </p>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="relative z-10 flex flex-col gap-3"
            >
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                required
                className="h-12 px-4 bg-[#111] border border-[var(--border)] rounded-lg text-foreground text-[15px] outline-none placeholder:text-foreground/45 focus:border-electric-red/40 transition-colors duration-200"
              />
              <button
                type="submit"
                className="h-12 px-6 rounded-lg bg-foreground text-black font-mono font-bold text-[10px] tracking-[0.22em] uppercase hover:bg-white/90 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200"
              >
                Receber insights
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
