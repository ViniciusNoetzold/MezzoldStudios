import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BlogList } from '@/components/sections/BlogList';
import { posts } from '@/lib/blog-posts';

export const metadata = {
  title: 'Blog | Mezzold Studio',
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24 md:pt-32 pb-24 px-4 sm:px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">

          {/* Page header */}
          <div className="mb-16 md:mb-20">

            {/* Top label row */}
            <div className="flex items-center gap-3 mb-6">
              <p className="font-mono text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-electric-red">
                [ MEZZOLD STUDIO ]
              </p>
              <div className="h-px flex-1 bg-[var(--border)]" />
              <p className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-foreground/20">
                {posts.length} ARTIGOS
              </p>
            </div>

            {/* Title */}
            <h1 className="font-sans font-black text-[clamp(4rem,12vw,7rem)] leading-none tracking-tighter text-foreground mb-6">
              BLOG<span className="text-electric-red">.</span>
            </h1>

            {/* Bottom row: description + decorative line */}
            <div className="flex items-center gap-6">
              <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-foreground/35 whitespace-nowrap">
                IDEIAS, TÉCNICAS E BASTIDORES DO ESTÚDIO
              </p>
              <div className="h-px flex-1 bg-gradient-to-r from-foreground/10 to-transparent" />
            </div>

          </div>

          <BlogList />

        </div>
      </main>
      <Footer />
    </>
  );
}
