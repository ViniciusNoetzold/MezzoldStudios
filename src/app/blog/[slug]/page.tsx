import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { posts, getPostBySlug, type Section } from '@/lib/blog-posts';

/* ── Static params for all posts ── */
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

/* ── Per-post metadata ── */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Blog Mezzold`,
    description: post.excerpt,
  };
}

/* ── Content renderer ── */
function renderSection(section: Section, i: number) {
  switch (section.type) {
    case 'heading':
      return (
        <h2
          key={i}
          className="font-sans font-black text-xl md:text-2xl tracking-tight text-white mt-10 mb-4 leading-snug"
        >
          {section.text}
        </h2>
      );

    case 'paragraph':
      return (
        <p
          key={i}
          className="text-white/65 font-sans text-sm md:text-base leading-relaxed mb-5"
        >
          {section.text}
        </p>
      );

    case 'code':
      return (
        <div key={i} className="my-6 rounded-xl overflow-hidden border border-white/8">
          {/* Terminal chrome */}
          <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white/[0.04] border-b border-white/8">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            {section.lang && (
              <span className="ml-2 font-mono text-[9px] tracking-widest uppercase text-white/30">
                {section.lang}
              </span>
            )}
          </div>
          <pre className="overflow-x-auto p-5 bg-[#0a0a0a] text-white/75 font-mono text-[12px] md:text-[13px] leading-relaxed">
            <code>{section.text}</code>
          </pre>
        </div>
      );

    case 'list':
      return (
        <ul key={i} className="my-5 space-y-3 pl-0">
          {section.items?.map((item, j) => (
            <li key={j} className="flex gap-3 text-white/65 text-sm md:text-base leading-relaxed">
              <span className="mt-[5px] shrink-0 w-1.5 h-1.5 rounded-full bg-electric-red" />
              {item}
            </li>
          ))}
        </ul>
      );

    case 'callout':
      return (
        <div
          key={i}
          className="my-6 px-5 py-4 rounded-xl border border-white/10 bg-white/[0.03] relative overflow-hidden"
        >
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-electric-red rounded-l-xl" />
          <p className="text-white/80 text-sm md:text-base leading-relaxed font-sans italic pl-2">
            {section.text}
          </p>
        </div>
      );

    default:
      return null;
  }
}

/* ── Page ── */
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const nextPost = posts[currentIndex + 1] ?? posts[0];

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 md:pt-32 pb-24 px-5 md:px-6 relative z-10">
        <div className="container mx-auto max-w-2xl">

          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-white/40 hover:text-white transition-colors mb-10 group"
          >
            <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-1" />
            Blog
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className={`font-mono text-[9px] tracking-[0.3em] uppercase px-2.5 py-1 rounded border ${post.categoryColor} font-bold`}>
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[9px] text-white/30 tracking-widest uppercase">
                <Calendar size={10} /> {post.date}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[9px] text-white/30 tracking-widest uppercase">
                <Clock size={10} /> {post.readTime}
              </span>
            </div>

            <h1 className="font-sans font-black text-3xl md:text-4xl tracking-tight text-white leading-snug mb-4">
              {post.title}
            </h1>

            <p className="text-white/50 text-sm md:text-base leading-relaxed border-l-2 border-electric-red pl-4">
              {post.excerpt}
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-white/8" />
            <span className="font-mono text-[9px] tracking-widest uppercase text-white/20">MEZZOLD STUDIO</span>
            <div className="h-px flex-1 bg-white/8" />
          </div>

          {/* Article body */}
          <article>
            {post.content.map((section, i) => renderSection(section, i))}
          </article>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-white/8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded border border-white/10 text-white/40 bg-white/[0.03]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Next post */}
          <div className="mt-12 pt-8 border-t border-white/8">
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-3">
              Próximo artigo
            </p>
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group flex items-start justify-between gap-4 p-5 rounded-xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-200 active:scale-[0.99]"
            >
              <span className="font-sans font-bold text-sm md:text-base text-white leading-snug">
                {nextPost.title}
              </span>
              <ArrowRight
                size={16}
                className="shrink-0 mt-0.5 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-white"
              />
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
