import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { posts } from '@/lib/blog-posts';

export const metadata = {
  title: "Blog | Mezzold Studio",
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24 md:pt-32 pb-24 px-5 md:px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">

          {/* Header */}
          <div className="mb-12 md:mb-16">
            <p className="font-mono text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-electric-red mb-4">
              [ MEZZOLD STUDIO ]
            </p>
            <h1 className="font-sans font-black text-5xl md:text-7xl tracking-tighter text-white mb-3">
              BLOG<span className="text-electric-red">.</span>
            </h1>
            <p className="text-white/40 font-mono tracking-widest text-[10px] md:text-xs uppercase">
              IDEIAS, TÉCNICAS E BASTIDORES DO ESTÚDIO
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-5">
            {posts.map((post) => (
              <article
                key={post.slug}
                className={`group relative rounded-2xl border ${post.accentColor} bg-white/[0.03] overflow-hidden transition-all duration-300 hover:bg-white/[0.05] hover:border-white/20 active:scale-[0.99]`}
              >
                <Link href={`/blog/${post.slug}`} className="block p-6 md:p-8">
                  {/* Top row: category + meta */}
                  <div className="flex items-center justify-between mb-5">
                    <span className={`font-mono text-[9px] tracking-[0.3em] uppercase px-2.5 py-1 rounded border ${post.categoryColor} font-bold`}>
                      {post.category}
                    </span>
                    <span className="font-mono text-[9px] text-white/30 tracking-widest uppercase">
                      {post.date} · {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-sans font-black text-xl md:text-2xl tracking-tight text-white mb-3 leading-snug group-hover:text-white transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-white/50 font-sans text-sm leading-relaxed mb-6">
                    {post.excerpt}
                  </p>

                  {/* Footer: tags + CTA */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded border border-white/8 text-white/40 bg-white/[0.03]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                      Ler artigo
                      <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
