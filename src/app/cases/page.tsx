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

          <GlassCard className="flex flex-col items-center justify-center py-24 px-8 text-center">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 mb-6">[ STATUS ]</div>
            <h2 className="font-sans font-black text-3xl md:text-5xl tracking-tighter text-white mb-4">Em produção</h2>
            <p className="text-white/40 font-mono text-xs max-w-sm">
              Nossos cases estão sendo preparados com cuidado. Em breve, exemplos reais do nosso trabalho estarão disponíveis aqui.
            </p>
          </GlassCard>
        </div>
      </main>
      <Footer />
    </>
  );
}
