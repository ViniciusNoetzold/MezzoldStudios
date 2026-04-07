import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CodeBlock } from '@/components/ui/code-block';
import { posts, getPostBySlug, type Section } from '@/lib/blog-posts';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Blog Mezzold`,
    description: post.excerpt,
  };
}

function renderSection(section: Section, i: number, headingIndex: number) {
  switch (section.type) {

    case 'heading':
      return (
        <h2 key={i} className="group flex items-start gap-4 mt-12 mb-5">
          <span className="shrink-0 font-mono text-[10px] tracking-[0.2em] text-electric-red mt-[6px] md:mt-[7px] select-none">
            {String(headingIndex).padStart(2, '0')}
          </span>
          <span className="font-sans font-black text-xl md:text-2xl tracking-tight text-white leading-snug">
            {section.text}
          </span>
        </h2>
      );

    case 'paragraph':
      return (
        <p key={i} className="text-white/60 font-sans text-[15px] md:text-base leading-[1.85] mb-6 tracking-[0.01em]">
          {section.text}
        </p>
      );

    case 'code':
      return <CodeBlock key={i} code={section.text ?? ''} lang={section.lang} />;

    case 'list':
      return (
        <ul key={i} className="my-6 space-y-3 pl-0">
          {section.items?.map((item, j) => (
            <li key={j} className="flex gap-4 text-white/60 text-[15px] md:text-base leading-[1.75]">
              <span className="shrink-0 font-mono text-electric-red text-[10px] mt-[5px] select-none">▸</span>
              {item}
            </li>
          ))}
        </ul>
      );

    case 'callout':
      return (
        <div key={i} className="my-8 relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.025]">
          {/* Left accent */}
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-electric-red" />
          {/* Top label */}
          <div className="flex items-center gap-2 px-5 pt-4 pb-3 border-b border-white/[0.06]">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-electric-red font-bold">
              NOTA
            </span>
          </div>
          <p className="px-5 py-4 text-white/70 text-[14px] md:text-[15px] leading-[1.8] font-sans">
            {section.text}
          </p>
        </div>
      );

    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const nextPost = posts[currentIndex + 1] ?? posts[0];

  // Pre-count headings for numbered labels
  let headingCount = 0;

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 md:pt-32 pb-24 px-5 md:px-6 relative z-10">
        <div className="container mx-auto max-w-2xl">

          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-white/30 hover:text-white/70 transition-colors duration-200 mb-12 group"
          >
            <ArrowLeft size={11} className="transition-transform group-hover:-translate-x-0.5" />
            Blog
          </Link>

          {/* Article header */}
          <header className="mb-10">

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
              <span className={`font-mono text-[9px] tracking-[0.3em] uppercase px-2.5 py-1 rounded-md border ${post.categoryColor} font-bold`}>
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[9px] text-white/25 tracking-[0.15em] uppercase">
                <Calendar size={9} /> {post.date}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-sans font-black text-3xl md:text-[2.6rem] tracking-tight text-white leading-[1.15] mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-white/45 text-[15px] md:text-base leading-[1.8] border-l-[2px] border-electric-red pl-5">
              {post.excerpt}
            </p>

          </header>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-white/[0.07]" />
            <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-white/15">
              MEZZOLD STUDIO
            </span>
            <div className="h-px flex-1 bg-white/[0.07]" />
          </div>

          {/* Article body */}
          <article>
            {post.content.map((section, i) => {
              if (section.type === 'heading') headingCount++;
              return renderSection(section, i, headingCount);
            })}
          </article>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/[0.07]">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg border border-white/[0.08] text-white/35 bg-white/[0.03]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Next post */}
          <div className="mt-12 pt-8 border-t border-white/[0.07]">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/25 mb-4">
              Próximo artigo
            </p>
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group flex items-start justify-between gap-4 p-5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.16] transition-all duration-200"
            >
              <span className="font-sans font-bold text-sm md:text-[15px] text-white/80 group-hover:text-white leading-snug transition-colors duration-200">
                {nextPost.title}
              </span>
              <ArrowRight
                size={15}
                className="shrink-0 mt-0.5 text-white/25 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-white/70"
              />
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
