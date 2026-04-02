'use client';
import { GlassCard } from '../ui/GlassCard';

export function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 relative px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <h2 className="font-mono tracking-widest text-[10px] md:text-xs uppercase text-white/40 mb-6">[ CONTATO ]</h2>
            <h3 className="font-sans font-black text-4xl sm:text-5xl md:text-7xl tracking-tighter mb-8 leading-[0.9]">
              VAMOS DAR<br/>VIDA À SUA<br/><span className="text-electric-red">VISÃO.</span>
            </h3>
            <div className="font-mono text-[10px] md:text-xs tracking-widest uppercase text-white/60 space-y-4">
              <p>Email: <a href="mailto:hello@mezzold.studio" className="text-white hover:text-cyan transition-colors">hello@mezzold.studio</a></p>
              <p>Global / Remote First</p>
            </div>
          </div>
          
          <div>
            <GlassCard glowColor="none" className="p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan/10 blur-[50px] rounded-full pointer-events-none" />
              <form className="flex flex-col gap-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-white/40 mb-2">NOME COMPLETO</label>
                  <input type="text" className="w-full bg-[#020202]/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all font-sans text-white" placeholder="Seu nome" />
                </div>
                <div>
                  <label className="block font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-white/40 mb-2">EMAIL CORPORATIVO</label>
                  <input type="email" className="w-full bg-[#020202]/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all font-sans text-white" placeholder="nome@empresa.com" />
                </div>
                <div>
                  <label className="block font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-white/40 mb-2">MENSAGEM</label>
                  <textarea rows={4} className="w-full bg-[#020202]/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all font-sans resize-none text-white" placeholder="Conte-nos sobre o seu projeto..."></textarea>
                </div>
                <button className="w-full bg-white text-black font-sans font-bold py-4 rounded-lg mt-2 hover:bg-cyan hover:text-black transition-all flex items-center justify-center gap-2">
                  Enviar Proposta
                </button>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
