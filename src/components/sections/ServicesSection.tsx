import { GlassCard } from '../ui/GlassCard';
import { Cpu, LayoutTemplate, Bot } from 'lucide-react';

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 relative px-6">
      <div className="container mx-auto">
        <div className="mb-12 md:mb-16">
          <h2 className="font-mono tracking-widest text-[10px] md:text-xs uppercase text-white/40 mb-4">[ SERVIÇOS ]</h2>
          <h3 className="font-sans font-black text-4xl md:text-6xl tracking-tighter">SOLUÇÕES DE ELITE</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <GlassCard glowColor="cyan" className="p-8 group">
            <div className="font-mono tracking-widest text-xs text-white/40 mb-8 border-b border-white/10 pb-4">01</div>
            <Cpu className="text-cyan mb-6" size={40} />
            <h4 className="font-sans font-bold text-2xl mb-4 group-hover:text-cyan transition-colors">Micro SaaS & Ferramentas</h4>
            <p className="text-white/60 text-sm font-sans mb-6">
              Sprints ágeis, arquiteturas serverless e desenvolvimento full-stack focado no seu core business.
            </p>
            <div className="flex gap-2 flex-wrap font-mono text-[9px] tracking-widest uppercase mt-auto">
                <span className="bg-white/5 px-2 py-1 rounded text-white/70">NEXT.JS</span>
                <span className="bg-white/5 px-2 py-1 rounded text-white/70">SUPABASE</span>
            </div>
          </GlassCard>
          
          <GlassCard glowColor="emerald" className="p-8 group">
            <div className="font-mono tracking-widest text-xs text-white/40 mb-8 border-b border-white/10 pb-4">02</div>
            <LayoutTemplate className="text-emerald mb-6" size={40} />
            <h4 className="font-sans font-bold text-2xl mb-4 group-hover:text-emerald transition-colors">Websites & Portfólios</h4>
            <p className="text-white/60 text-sm font-sans mb-6">
              Landing pages premium, visualmente imersivas e ultra otimizadas para conversão e SEO.
            </p>
            <div className="flex gap-2 flex-wrap font-mono text-[9px] tracking-widest uppercase mt-auto">
                <span className="bg-white/5 px-2 py-1 rounded text-white/70">TAILWIND</span>
                <span className="bg-white/5 px-2 py-1 rounded text-white/70">WEBGL</span>
            </div>
          </GlassCard>
          
          <GlassCard glowColor="red" className="p-8 group">
            <div className="font-mono tracking-widest text-xs text-white/40 mb-8 border-b border-white/10 pb-4">03</div>
            <Bot className="text-electric-red mb-6" size={40} />
            <h4 className="font-sans font-bold text-2xl mb-4 group-hover:text-electric-red transition-colors">Automação & Chatbots</h4>
            <p className="text-white/60 text-sm font-sans mb-6">
              Integrações de API complexas e agentes autônomos por IA que rodam 24/7 com precisão absurda.
            </p>
            <div className="flex gap-2 flex-wrap font-mono text-[9px] tracking-widest uppercase mt-auto">
                <span className="bg-white/5 px-2 py-1 rounded text-white/70">AI AGENTS</span>
                <span className="bg-white/5 px-2 py-1 rounded text-white/70">APIs</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
