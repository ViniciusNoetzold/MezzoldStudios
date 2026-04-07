'use client';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { posts } from '@/lib/blog-posts';

export function BlogList() {
  const [featured, ...rest] = posts;

  return (
    <div>
      {/* ── Featured post ── */}
      <Link
        href={`/blog/${featured.slug}`}
        className="group block border-t border-white/[0.08] pt-10 pb-12 md:pt-14 md:pb-16"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12">
          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-6">
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-electric-red">
                {featured.category}
              </span>
              <span className="w-px h-2.5 bg-white/20" />
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30">
                {featured.date}
              </span>
              <span className="w-px h-2.5 bg-white/20" />
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/30">
                {featured.readTime} leitura
              </span>
            </div>

            {/* Title */}
            <h2 className="font-sans font-black text-[1.65rem] sm:text-3xl md:text-4xl lg:text-[2.75rem] tracking-tighter text-white leading-[1.08] mb-5 group-hover:text-white/90 transition-colors duration-300">
              {featured.title}
            </h2>

            {/* Excerpt */}
            <p className="text-white/60 text-sm md:text-base leading-[1.8] max-w-xl">
              {featured.excerpt}
            </p>

            {/* CTA */}
            <div className="mt-8 inline-flex items-center gap-2">
              <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/25 group-hover:text-electric-red transition-colors duration-300">
                Ler artigo
              </span>
              <ArrowUpRight
                size={13}
                className="text-white/20 group-hover:text-electric-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
              />
            </div>
          </div>

          {/* Index number */}
          <div className="shrink-0 self-start md:self-end select-none">
            <span className="font-mono font-black text-[6rem] md:text-[9rem] leading-none text-white/[0.07] group-hover:text-electric-red/[0.18] transition-colors duration-500">
              01
            </span>
          </div>
        </div>
      </Link>

      {/* ── Divider ── */}
      <div className="h-px bg-white/[0.13]" />

      {/* ── Grid of remaining posts ── */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {rest.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={[
              'group relative flex flex-col py-9 md:py-11 border-b border-white/[0.13]',
              'hover:bg-white/[0.015] transition-colors duration-300',
              // Right border on left-column cells
              i % 2 === 0 ? 'md:border-r md:border-white/[0.13] md:pr-10' : 'md:pl-10',
            ].join(' ')}
          >
            {/* Top row: meta + index */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-electric-red/80">
                  {post.category}
                </span>
                <span className="w-px h-2.5 bg-white/20" />
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25">
                  {post.readTime} leitura
                </span>
              </div>
              <span className="font-mono font-black text-[2.25rem] leading-none text-white/[0.09] group-hover:text-electric-red/[0.22] transition-colors duration-500 select-none shrink-0">
                {String(i + 2).padStart(2, '0')}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-sans font-black text-lg md:text-xl tracking-tight text-white leading-[1.2] mb-3 group-hover:text-white/90 transition-colors duration-300">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-white/55 text-sm leading-[1.75] line-clamp-2 mb-6 flex-1">
              {post.excerpt}
            </p>

            {/* Date + CTA */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/20">
                {post.date}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/20 group-hover:text-electric-red transition-colors duration-300">
                  Ler
                </span>
                <ArrowUpRight
                  size={11}
                  className="text-white/15 group-hover:text-electric-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                />
              </div>
            </div>

            {/* Bottom accent line on hover */}
            <div className="absolute bottom-0 left-0 h-px w-0 bg-electric-red group-hover:w-full transition-all duration-500 ease-out" />
          </Link>
        ))}
      </div>
    </div>
  );
}
