import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GlassCard } from '@/components/ui/GlassCard';

export const metadata = {
  title: "Cases | Mezzold Studio",
};

export default function CasesPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-32 pb-24 px-6 relative z-10">
        <div className="container mx-auto flex flex-col">
          <h1 className="font-sans font-black text-5xl md:text-7xl tracking-tighter mb-4 text-white">PORTFÓLIO<span className="text-cyan">.</span></h1>
          <p className="text-white/60 mb-12 font-mono tracking-widest text-[10px] md:text-xs uppercase">ESTUDOS DE CASO E DESENVOLVIMENTOS RECENTES</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <GlassCard className="h-[400px] flex flex-col justify-end p-6 relative overflow-hidden group">
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.2),transparent_70%)] opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
               <div className="relative z-10">
                 <h3 className="font-sans font-bold text-2xl">Vanguard Web</h3>
                 <p className="font-mono text-[10px] tracking-widest uppercase text-cyan mt-2">SaaS · Landing Page</p>
               </div>
            </GlassCard>
            <GlassCard className="h-[400px] flex flex-col justify-end p-6 relative overflow-hidden group">
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.2),transparent_70%)] opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
               <div className="relative z-10">
                 <h3 className="font-sans font-bold text-2xl">Nexus Chat</h3>
                 <p className="font-mono text-[10px] tracking-widest uppercase text-emerald mt-2">Automação · IA Agent</p>
               </div>
            </GlassCard>
            <GlassCard className="h-[400px] flex flex-col justify-end p-6 relative overflow-hidden group">
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,51,0.2),transparent_70%)] opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
               <div className="relative z-10">
                 <h3 className="font-sans font-bold text-2xl">Pulse Dashboard</h3>
                 <p className="font-mono text-[10px] tracking-widest uppercase text-electric-red mt-2">Data · Analytics</p>
               </div>
            </GlassCard>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
