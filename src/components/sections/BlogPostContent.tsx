'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/code-block';
import type { BlogPost, Section } from '@/lib/blog-posts';

interface Props {
  post: BlogPost;
  nextPost: BlogPost;
  postNumber: number;
}

export function BlogPostContent({ post, nextPost, postNumber }: Props) {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [tocOpen, setTocOpen] = useState(false);

  // Extract headings with stable IDs
  const headings = post.content
    .filter((s) => s.type === 'heading')
    .map((s, i) => ({ id: `s${i + 1}`, text: s.text ?? '' }));

  // Pre-compute: for each content index, its heading number (1-based) if it's a heading
  const headingIndexMap = new Map<number, number>();
  {
    let count = 0;
    post.content.forEach((s, i) => {
      if (s.type === 'heading') headingIndexMap.set(i, ++count);
    });
  }

  // Reading progress bar
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // TOC active section via IntersectionObserver
  useEffect(() => {
    if (headings.length === 0) return;
    const observers: IntersectionObserver[] = [];
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActiveSection(id);
          });
        },
        { rootMargin: '-15% 0px -70% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []); // headings is stable (derived from prop)

  function renderSection(section: Section, i: number) {
    switch (section.type) {
      case 'heading': {
        const idx = headingIndexMap.get(i)!;
        return (
          <div
            key={i}
            id={`s${idx}`}
            className="mt-16 mb-7 scroll-mt-28"
          >
            <span className="block font-mono text-[10px] tracking-[0.22em] uppercase text-electric-red mb-2">
              [ {String(idx).padStart(2, '0')} ]
            </span>
            <h2
              className="font-black text-foreground leading-[1.15]"
              style={{
                fontSize: 'clamp(1.6rem, 2.6vw, 2.15rem)',
                letterSpacing: '-0.03em',
              }}
            >
              {section.text}
            </h2>
          </div>
        );
      }

      case 'paragraph':
        return (
          <p
            key={i}
            className="text-[17px] md:text-[19px] leading-[1.85] text-foreground/78 mb-7"
          >
            {section.text}
          </p>
        );

      case 'code':
        return <CodeBlock key={i} code={section.text ?? ''} lang={section.lang} />;

      case 'list':
        return (
          <ul key={i} className="my-7 space-y-3 pl-0">
            {section.items?.map((item, j) => (
              <li
                key={j}
                className="relative pl-6 text-[17px] md:text-[19px] leading-[1.8] text-foreground/78"
              >
                <span className="absolute left-0 top-[0.72em] w-1.5 h-1.5 rounded-full bg-electric-red" />
                {item}
              </li>
            ))}
          </ul>
        );

      case 'callout':
        return (
          <div
            key={i}
            className="relative bg-card border border-[var(--border)] rounded-xl my-9 px-7 py-7 md:px-8 md:py-7"
            style={{ borderLeft: '3px solid var(--color-electric-red)' }}
          >
            <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-electric-red mb-3">
              Nota
            </div>
            <p className="text-[16px] md:text-[17px] leading-[1.8] text-foreground/78">
              {section.text}
            </p>
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <>
      {/* ── READING PROGRESS BAR ── */}
      <div
        className="fixed top-0 left-0 h-[3px] z-[999] pointer-events-none"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #ff0033, rgba(255,0,51,.6))',
          transition: 'width 0.1s linear',
        }}
      />

      {/* ── ARTICLE HERO ── */}
      <section className="relative overflow-hidden pt-[160px] md:pt-[180px] pb-20 px-6">
        {/* Grid bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 20%, black 70%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 20%, black 70%, transparent 100%)',
          }}
        />
        {/* Red glow — top right */}
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            width: '60%',
            height: '80%',
            background:
              'radial-gradient(ellipse 60% 60% at 100% 0%, rgba(255,0,51,.07), transparent 70%)',
          }}
        />
        {/* Large decorative number */}
        <div
          className="blog-ghost-num absolute font-black leading-none pointer-events-none select-none"
          style={{
            right: '-1vw',
            bottom: '-0.05em',
            fontSize: 'clamp(12rem, 22vw, 22rem)',
            letterSpacing: '-0.06em',
          }}
        >
          {String(postNumber).padStart(2, '0')}
        </div>

        <div className="relative z-10 w-full max-w-[820px] mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-foreground/45 hover:text-foreground/80 transition-colors duration-200 mb-8"
          >
            ← Blog
          </Link>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-2 mb-7">
            <span
              className="font-mono text-[10px] tracking-[0.20em] uppercase px-3 py-1.5 border rounded text-electric-red"
              style={{ borderColor: 'rgba(255,0,51,.25)' }}
            >
              {post.category}
            </span>
            <span className="font-mono text-[10px] tracking-[0.20em] uppercase px-3 py-1.5 border border-[var(--border)] rounded text-foreground/55">
              {post.date}
            </span>
            <span className="font-mono text-[10px] tracking-[0.20em] uppercase px-3 py-1.5 border border-[var(--border)] rounded text-foreground/55">
              {post.readTime} de leitura
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-black text-foreground mb-8"
            style={{
              fontSize: 'clamp(2.1rem, 5vw, 3.5rem)',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
            }}
          >
            {post.title}
          </h1>

          {/* Lead excerpt with left bar */}
          <div className="flex gap-4 items-stretch mb-10">
            <div
              className="shrink-0 rounded-sm"
              style={{ width: '3px', background: 'var(--color-electric-red)' }}
            />
            <p className="text-[18px] md:text-[20px] leading-[1.75] text-foreground/80">
              {post.excerpt}
            </p>
          </div>

          {/* Byline */}
          <div className="flex items-center flex-wrap py-4 border-t border-b border-[var(--border)]">
            {[
              { label: 'Autor', val: 'Mezzold Studio' },
              { label: 'Categoria', val: post.category },
              { label: 'Leitura', val: post.readTime },
            ].map((item, idx, arr) => (
              <div key={item.label} className="flex items-center shrink-0">
                <div className={`flex flex-col gap-1 ${idx === 0 ? 'pr-6' : 'px-6'}`}>
                  <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-foreground/45">
                    {item.label}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.10em] uppercase text-foreground/75">
                    {item.val}
                  </span>
                </div>
                {idx < arr.length - 1 && (
                  <div className="w-px h-8 bg-[var(--border)]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3-COLUMN LAYOUT ── */}
      <div className="max-w-[1280px] mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-[220px_1fr_190px] lg:gap-x-12 items-start">

        {/* TOC — Desktop only */}
        <aside className="hidden lg:block sticky top-28">
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-foreground/50 mb-4 pb-3 border-b border-[var(--border)]">
            Sumário
          </div>
          <ul className="flex flex-col">
            {headings.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  className={`block py-2 pl-3.5 font-mono text-[11px] tracking-[0.06em] leading-[1.5] border-l transition-all duration-200 ${
                    activeSection === h.id
                      ? 'text-electric-red border-electric-red'
                      : 'text-foreground/55 border-[var(--border)] hover:text-foreground/85 hover:border-foreground/25'
                  }`}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Article body */}
        <article className="min-w-0 pt-10 lg:pt-0">
          {/* Mobile TOC toggle */}
          <button
            onClick={() => setTocOpen((v) => !v)}
            className="lg:hidden flex items-center gap-2.5 font-mono text-[10px] tracking-[0.20em] uppercase text-foreground/55 bg-card border border-[var(--border)] rounded-lg px-4 py-3 mb-7 w-full"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="15" y2="12" />
              <line x1="3" y1="18" x2="18" y2="18" />
            </svg>
            {tocOpen ? 'Fechar tópicos' : 'Ver tópicos'}
          </button>

          {/* Mobile TOC panel */}
          {tocOpen && (
            <div className="lg:hidden bg-card border border-[var(--border)] rounded-xl p-5 mb-7">
              <ul className="flex flex-col">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      onClick={() => setTocOpen(false)}
                      className="block py-2.5 pl-3.5 font-mono text-[12px] tracking-[0.06em] leading-[1.5] text-foreground/55 border-l border-[var(--border)] hover:text-foreground/85"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Content sections */}
          {post.content.map((section, i) => renderSection(section, i))}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-16 pt-8 border-t border-[var(--border)]">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] tracking-[0.20em] uppercase px-4 py-2 border border-[var(--border)] rounded-full text-foreground/55"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>

        {/* Sidebar — Desktop only */}
        <aside className="hidden lg:flex flex-col gap-5 sticky top-28 pt-0">
          <div className="bg-card border border-[var(--border)] rounded-xl p-5">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-foreground/50 mb-3.5">
              Tags
            </div>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] tracking-[0.15em] uppercase px-2.5 py-1.5 border border-[var(--border)] rounded text-foreground/55"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-card border border-[var(--border)] rounded-xl p-5">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-foreground/50 mb-2.5">
              Leitura
            </div>
            <div className="font-mono text-[12px] tracking-[0.10em] text-foreground/80">
              {post.readTime}
            </div>
          </div>
          <div className="bg-card border border-[var(--border)] rounded-xl p-5">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-foreground/50 mb-2.5">
              Publicado
            </div>
            <div className="font-mono text-[12px] tracking-[0.08em] text-foreground/80">
              {post.date}
            </div>
          </div>
        </aside>
      </div>

      {/* ── NEXT POST ── */}
      <div className="px-6 pb-16 max-w-[1280px] mx-auto">
        <div className="font-mono text-[11px] tracking-[0.28em] uppercase text-foreground/50 mb-3.5">
          Próximo artigo
        </div>
        <Link
          href={`/blog/${nextPost.slug}`}
          className="group flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-card border border-[var(--border)] rounded-xl px-7 py-7 sm:px-9 sm:py-8 hover:border-foreground/25 hover:-translate-y-1 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)] transition-all duration-300"
        >
          <span
            className="font-extrabold text-foreground leading-[1.3]"
            style={{ fontSize: 'clamp(1.15rem, 1.8vw, 1.5rem)', letterSpacing: '-0.03em' }}
          >
            {nextPost.title}
          </span>
          <span className="font-mono text-[11px] tracking-[0.20em] uppercase text-foreground/55 group-hover:text-electric-red whitespace-nowrap shrink-0 transition-colors duration-200">
            Ler próximo →
          </span>
        </Link>
      </div>

      {/* ── FINAL CTA ── */}
      <section className="px-6 pb-24">
        <div
          className="relative overflow-hidden max-w-[1280px] mx-auto bg-card border border-[var(--border)] rounded-[16px] grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-12 items-center"
          style={{ padding: 'clamp(36px, 5vw, 64px) clamp(28px, 4vw, 56px)' }}
        >
          {/* Left glow */}
          <div
            className="absolute top-0 left-0 pointer-events-none"
            style={{
              width: '60%',
              height: '100%',
              background:
                'radial-gradient(ellipse 80% 80% at 0% 50%, rgba(255,0,51,.06), transparent 70%)',
            }}
          />

          <div className="relative z-10">
            <div className="font-mono text-[11px] tracking-[0.28em] uppercase text-foreground/50 mb-4">
              [ PRÓXIMO PASSO ]
            </div>
            <h2
              className="font-black text-foreground mb-5"
              style={{
                fontSize: 'clamp(1.9rem, 3vw, 2.8rem)',
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
              }}
            >
              Seu projeto merece
              <br />
              mais do que parece bonito.
            </h2>
            <p className="text-[16px] md:text-[17px] leading-[1.75] text-foreground/78 max-w-[520px]">
              Performance, design e engenharia pensados juntos desde o início. É
              assim que construímos.
            </p>
          </div>

          <div className="relative z-10 flex flex-row md:flex-col gap-2.5 shrink-0 flex-wrap">
            <Link
              href="/contato"
              className="blog-newsletter-btn inline-flex items-center justify-center h-12 px-7 rounded-full bg-foreground text-black font-mono font-bold text-[10px] tracking-[0.22em] uppercase hover:bg-foreground/85 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
            >
              Iniciar projeto
            </Link>
            <Link
              href="/cases"
              className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-transparent text-foreground font-mono font-bold text-[10px] tracking-[0.22em] uppercase border border-[var(--border)] hover:border-foreground/25 hover:bg-foreground/[0.05] transition-all duration-200 whitespace-nowrap"
            >
              Ver portfólio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
