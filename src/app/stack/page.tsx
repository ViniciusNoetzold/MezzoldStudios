import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GlassCard } from '@/components/ui/GlassCard';

export const metadata = {
  title: "Stack Tech | Mezzold Studio",
};

export default function StackPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-32 pb-24 px-6 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <h1 className="font-sans font-black text-5xl md:text-7xl tracking-tighter mb-4 text-white uppercase">Stack<span className="text-emerald">.</span></h1>
          <p className="text-white/60 mb-12 font-mono tracking-widest text-[10px] md:text-xs uppercase">AS TECNOLOGIAS POR TRÁS DO ESTÚDIO</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <GlassCard className="text-center p-6 flex flex-col items-center justify-center">
                 <h3 className="font-sans font-bold text-lg">Next.js</h3>
                 <span className="font-mono text-[9px] uppercase text-white/40 mt-1">Framework</span>
             </GlassCard>
             <GlassCard className="text-center p-6 flex flex-col items-center justify-center">
                 <h3 className="font-sans font-bold text-lg">React</h3>
                 <span className="font-mono text-[9px] uppercase text-white/40 mt-1">O Core</span>
             </GlassCard>
             <GlassCard className="text-center p-6 flex flex-col items-center justify-center">
                 <h3 className="font-sans font-bold text-lg">Tailwind CSS</h3>
                 <span className="font-mono text-[9px] uppercase text-white/40 mt-1">Styling API</span>
             </GlassCard>
             <GlassCard className="text-center p-6 flex flex-col items-center justify-center">
                 <h3 className="font-sans font-bold text-lg">TypeScript</h3>
                 <span className="font-mono text-[9px] uppercase text-white/40 mt-1">Language Logic</span>
             </GlassCard>
             <GlassCard className="text-center p-6 flex flex-col items-center justify-center">
                 <h3 className="font-sans font-bold text-lg">Supabase</h3>
                 <span className="font-mono text-[9px] uppercase text-white/40 mt-1">Postgres DB</span>
             </GlassCard>
             <GlassCard className="text-center p-6 flex flex-col items-center justify-center">
                 <h3 className="font-sans font-bold text-lg">Vercel</h3>
                 <span className="font-mono text-[9px] uppercase text-white/40 mt-1">Global Deploy</span>
             </GlassCard>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
