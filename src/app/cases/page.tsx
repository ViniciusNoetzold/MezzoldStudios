import { Header }    from '@/components/layout/Header';
import { Footer }    from '@/components/layout/Footer';
import { CasesGrid } from '@/components/sections/CasesGrid';
import Link from 'next/link';

export const metadata = {
  title:       'Cases | Mezzold Studio',
  description: 'Estudos de caso interativos e demonstrações ao vivo das especialidades da Mezzold Studio — performance, dashboards, automação, SaaS e mais.',
};

export default function CasesPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 relative z-10">
        <div className="container mx-auto max-w-5xl">

          {/* ── Hero section ── */}
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

            <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/30 max-w-lg">
              Demonstrações interativas e estudos de caso das nossas especialidades
              em performance, automação, design systems e micro-SaaS.
            </p>
          </div>

          {/* ── Cases grid + filters + modals ── */}
          <CasesGrid />

          {/* ── CTA section ── */}
          <section className="mt-24 relative">
            {/* Top divider */}
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px flex-1 bg-white/[0.06]" />
              <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-white/15">FIM DOS CASES</span>
              <div className="h-px flex-1 bg-white/[0.06]" />
            </div>

            {/* CTA card */}
            <div className="relative border border-white/[0.07] rounded-2xl p-10 md:p-14 overflow-hidden text-center bg-white/[0.015]">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-electric-red/20 rounded-tl-2xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-electric-red/20 rounded-br-2xl pointer-events-none" />

              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-electric-red/[0.025] via-transparent to-transparent pointer-events-none" />

              <p className="font-mono text-[9px] tracking-[0.45em] uppercase text-electric-red mb-5">
                [ PRÓXIMO PASSO ]
              </p>

              <h2 className="font-sans font-black text-[clamp(1.6rem,5vw,3rem)] tracking-tight text-white leading-tight mb-5">
                Não encontrou<br className="hidden md:block" /> o que procurava?
              </h2>

              <p className="font-mono text-[10px] md:text-xs tracking-[0.15em] text-white/35 max-w-sm mx-auto mb-8 leading-relaxed">
                Cada projeto da Mezzold é construído do zero para os requisitos específicos
                do cliente. Vamos conversar sobre o seu.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/#contact" className="inline-flex items-center justify-center h-12 px-6 rounded-full font-mono text-[9px] tracking-[0.25em] uppercase text-[#050505] bg-white hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300">
                  Solicitar Proposta
                </Link>
                <a
                  href="/stack"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/[0.08] text-white/35 font-mono text-[9px] tracking-[0.3em] uppercase hover:text-white/60 hover:border-white/18 transition-all duration-200"
                >
                  VER STACK TÉCNICO
                </a>
              </div>

              {/* Small stat row */}
              <div className="flex items-center justify-center gap-6 mt-10 pt-8 border-t border-white/[0.05]">
                {[
                  { value: '8+',     label: 'Cases publicados' },
                  { value: '100%',   label: 'Feito sob medida' },
                  { value: '< 48h',  label: 'Resposta garantida' },
                ].map(stat => (
                  <div key={stat.label} className="text-center">
                    <p className="font-sans font-black text-xl text-white tracking-tighter">{stat.value}</p>
                    <p className="font-mono text-[7px] tracking-[0.25em] uppercase text-white/22 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
