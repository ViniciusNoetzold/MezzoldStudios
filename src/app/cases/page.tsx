import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CasesGrid } from '@/components/sections/CasesGrid';

export const metadata = {
  title: 'Cases | Mezzold Studio',
  description: 'Estudos de caso e demonstrações interativas dos projetos e especialidades da Mezzold Studio.',
};

export default function CasesPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 relative z-10">
        <div className="container mx-auto max-w-5xl">

          {/* Page header */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <p className="font-mono text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-electric-red">
                [ MEZZOLD STUDIO ]
              </p>
              <div className="h-px flex-1 bg-white/[0.06]" />
              <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/15">
                ESTUDOS DE CASO
              </p>
            </div>

            <h1 className="font-sans font-black text-[clamp(3.5rem,11vw,6.5rem)] leading-none tracking-tighter text-white mb-5">
              PORTFÓLIO<span className="text-electric-red">.</span>
            </h1>

            <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/30 max-w-md">
              Demonstrações interativas e estudos de caso das nossas especialidades
            </p>
          </div>

          <CasesGrid />

        </div>
      </main>
      <Footer />
    </>
  );
}
