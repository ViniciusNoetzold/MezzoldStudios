import { GlassCard } from '../ui/GlassCard';
import { ExternalLink, Terminal, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export function PortfolioSection() {
  return (
    <section className="py-16 md:py-24 relative px-6 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.03),transparent_60%)]">
      <div className="container mx-auto">
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-mono tracking-widest text-[10px] md:text-xs uppercase text-emerald mb-4 bg-emerald/10 inline-block px-3 py-1 rounded-sm border border-emerald/20">[ PORTFÓLIO ]</h2>
            <h3 className="font-sans font-black text-4xl md:text-6xl tracking-tighter">SOLUÇÕES QUE<br/>GERAM RESULTADO</h3>
          </div>
          <Link href="/cases" className="text-xs md:text-sm font-mono tracking-widest uppercase text-white/60 hover:text-emerald transition-colors flex items-center gap-2">
            Ver Galeria Completa <ExternalLink size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <GlassCard glowColor="none" className="p-6 md:p-8 md:col-span-2 group hover:border-cyan/30">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2 aspect-video bg-white/5 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden relative">
                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.15),transparent_70%)]" />
                 <Terminal size={64} className="text-cyan/50" />
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex gap-2 mb-4 font-mono text-[9px] tracking-widest uppercase">
                  <span className="px-2 py-1 bg-cyan/10 text-cyan rounded">Web App</span>
                  <span className="px-2 py-1 bg-white/5 rounded text-white/60">SaaS</span>
                </div>
                <h4 className="font-sans font-black text-2xl md:text-3xl tracking-tighter mb-4 group-hover:text-cyan transition-colors">VANGUARD WEB</h4>
                <p className="text-white/60 mb-6 text-sm">
                  Plataforma de alta conversão projetada com micro-interações glassmorphism e carregamento instantâneo. Arquitetura otimizada para o máximo desempenho na era digital.
                </p>
                <button className="text-xs font-mono tracking-widest uppercase text-white hover:text-cyan transition-colors border-b border-cyan/30 pb-1">Analisar Case</button>
              </div>
            </div>
          </GlassCard>
          
          <GlassCard glowColor="none" className="p-6 md:p-8 hover:border-emerald/30 group">
            <div className="w-full aspect-video bg-white/5 rounded-xl border border-white/10 mb-6 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.15),transparent_70%)]" />
                <Zap size={48} className="text-emerald/50" />
            </div>
            <div className="flex gap-2 mb-4 font-mono text-[9px] tracking-widest uppercase">
              <span className="px-2 py-1 bg-emerald/10 text-emerald rounded">AI</span>
              <span className="px-2 py-1 bg-white/5 rounded text-white/60">Automação</span>
            </div>
            <h4 className="font-sans font-black text-xl md:text-2xl tracking-tighter mb-2 group-hover:text-emerald transition-colors">NEXUS CHAT</h4>
            <p className="text-white/60 text-xs md:text-sm">Agente de atendimento autônomo. Fluxos inteligentes focados em conversão e suporte técnico ultra escalável.</p>
          </GlassCard>

          <GlassCard glowColor="none" className="p-6 md:p-8 hover:border-electric-red/30 group">
            <div className="w-full aspect-video bg-white/5 rounded-xl border border-white/10 mb-6 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,0,51,0.15),transparent_70%)]" />
                <Shield size={48} className="text-electric-red/50" />
            </div>
            <div className="flex gap-2 mb-4 font-mono text-[9px] tracking-widest uppercase">
              <span className="px-2 py-1 bg-electric-red/10 text-electric-red rounded">Dashboard</span>
              <span className="px-2 py-1 bg-white/5 rounded text-white/60">Data</span>
            </div>
            <h4 className="font-sans font-black text-xl md:text-2xl tracking-tighter mb-2 group-hover:text-electric-red transition-colors">PULSE DASHBOARD</h4>
            <p className="text-white/60 text-xs md:text-sm">Painel de métricas premium, combinando UI minimalista e processamento de dados robusto no backend.</p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
