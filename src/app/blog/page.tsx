import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GlassCard } from '@/components/ui/GlassCard';

export const metadata = {
  title: "Blog | Mezzold Studio",
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-32 pb-24 px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <h1 className="font-sans font-black text-5xl md:text-7xl tracking-tighter mb-4 text-white">BLOG<span className="text-electric-red">.</span></h1>
          <p className="text-white/60 mb-12 font-mono tracking-widest text-xs uppercase">ARTIGOS TÉCNICOS E ENGENHARIA DE PRODUTO</p>
          
          <div className="space-y-6">
            <GlassCard className="p-8">
              <div className="font-mono text-[10px] tracking-widest text-emerald uppercase mb-2">Engenharia · 2 Abril 2026</div>
              <h2 className="font-sans font-bold text-2xl mb-4 hover:text-cyan transition-colors cursor-pointer">Micro Frontends com Next.js e Module Federation</h2>
              <p className="text-white/60 font-sans text-sm">Explorando a arquitetura escalável de aplicações empresariais usando as últimas features do App Router.</p>
            </GlassCard>
            <GlassCard className="p-8">
              <div className="font-mono text-[10px] tracking-widest text-emerald uppercase mb-2">UX Design · 28 Março 2026</div>
              <h2 className="font-sans font-bold text-2xl mb-4 hover:text-cyan transition-colors cursor-pointer">Desconstruindo o Glassmorphism Premium</h2>
              <p className="text-white/60 font-sans text-sm">Como utilizar backdrop-blur e malhas CSS otimizadas para criar interfaces ricas sem comprometer a performance.</p>
            </GlassCard>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
