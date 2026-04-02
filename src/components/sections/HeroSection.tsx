import { GlassCard } from '../ui/GlassCard';
import { ArrowRight, Code2, Zap, Layers } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(6,182,212,0.15),transparent_50%)] pointer-events-none" />
      <div className="absolute top-0 w-full h-[50vh] bg-[radial-gradient(ellipse_at_center,rgba(255,0,51,0.08),transparent_70%)] pointer-events-none opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <span className="font-mono tracking-widest text-[10px] md:text-xs uppercase text-emerald mb-6 bg-emerald/5 px-4 py-1.5 rounded-full border border-emerald/20 animate-pulse">
          Mezzold Studio · Software House Premium
        </span>
        
        <h1 className="font-sans font-black text-6xl sm:text-7xl md:text-9xl tracking-tighter text-white mb-6 leading-[0.9]">
          MEZZOLD
        </h1>
        
        <div className="font-mono text-xs md:text-sm tracking-widest uppercase mb-8 flex items-center text-white/80 flex-wrap justify-center gap-1">
          <span>Criamos </span>
          <span className="text-white border-r-2 border-electric-red pr-1 animate-[pulse_1s_step-end_infinite]">
            [inovação, performance, design]
          </span>
        </div>
        
        <p className="max-w-2xl text-white/60 text-base md:text-xl mb-12">
          Construímos plataformas ultra-rápidas e com design inovador que parecem vivas—feitas para marcas SaaS e digital-first ambiciosas.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-24 w-full sm:w-auto">
          <Link href="#contact" className="bg-white text-black font-sans font-bold px-8 py-4 rounded-full hover:bg-electric-red hover:text-white transition-all hover:glow-red flex items-center justify-center gap-2">
            Iniciar Projeto <ArrowRight size={18} />
          </Link>
          <Link href="/cases" className="glass-panel text-white font-sans font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-all flex items-center justify-center">
            Ver Portfólio
          </Link>
        </div>
        
        {/* Floating Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <GlassCard glowColor="cyan" className="flex flex-col items-center text-center p-8">
            <Layers className="text-cyan mb-4" size={32} />
            <h3 className="font-sans font-bold text-lg mb-2">Experiências Fluidas</h3>
            <p className="text-white/50 text-xs md:text-sm font-mono tracking-widest uppercase text-[10px]">MOTION APPS</p>
          </GlassCard>
          <GlassCard glowColor="emerald" className="flex flex-col items-center text-center p-8 md:-translate-y-6">
            <Code2 className="text-emerald mb-4" size={32} />
            <h3 className="font-sans font-bold text-lg mb-2">Precisão Neon</h3>
            <p className="text-white/50 text-xs md:text-sm font-mono tracking-widest uppercase text-[10px]">CSS GLASSMORPHISM</p>
          </GlassCard>
          <GlassCard glowColor="red" className="flex flex-col items-center text-center p-8">
            <Zap className="text-electric-red mb-4" size={32} />
            <h3 className="font-sans font-bold text-lg mb-2">Performance de Elite</h3>
            <p className="text-white/50 text-xs md:text-sm font-mono tracking-widest uppercase text-[10px]">ULTRA FAST 0 SEC</p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
