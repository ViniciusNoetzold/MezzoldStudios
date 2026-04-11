import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GlassCard } from '@/components/ui/GlassCard';
import { BGPattern } from '@/components/ui/bg-pattern';
import { Atom, Box, Wind, Code2, Database, Triangle } from 'lucide-react';

export const metadata = {
  title: "Stack Tech | Mezzold Studio",
};

const technologies = [
  { name: 'Next.js', role: 'Framework', icon: Box, glow: 'group-hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] text-white' },
  { name: 'React', role: 'O Core', icon: Atom, glow: 'group-hover:shadow-[0_0_30px_rgba(0,216,255,0.2)] text-[#00D8FF]' },
  { name: 'Tailwind CSS', role: 'Styling API', icon: Wind, glow: 'group-hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] text-[#38BDF8]' },
  { name: 'TypeScript', role: 'Language Logic', icon: Code2, glow: 'group-hover:shadow-[0_0_30px_rgba(49,120,198,0.2)] text-[#3178C6]' },
  { name: 'Supabase', role: 'Postgres DB', icon: Database, glow: 'group-hover:shadow-[0_0_30px_rgba(62,207,142,0.2)] text-[#3ECF8E]' },
  { name: 'Vercel', role: 'Global Deploy', icon: Triangle, glow: 'group-hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] text-white' },
];

export default function StackPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-32 pb-24 px-6 relative z-10 min-h-[100dvh] bg-surface overflow-hidden selection:bg-electric-red/30">
        
        {/* Background Elements */}
        <BGPattern variant="dots" size={32} fill="rgba(255,255,255,0.06)" mask="fade-bottom" />
        
        {/* Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] bg-electric-red/10 blur-[140px] pointer-events-none rounded-full" />
        
        <div className="container mx-auto max-w-5xl relative z-10 pt-10">
          <div className="mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out fill-mode-both">
            <h1 className="font-sans font-black text-5xl md:text-7xl tracking-tighter mb-4 text-foreground uppercase drop-shadow-md">
              Stack<span className="text-electric-red animate-pulse">.</span>
            </h1>
            <p className="text-foreground/50 font-mono tracking-[0.2em] text-[10px] md:text-xs uppercase max-w-xl leading-relaxed">
              As engrenagens invisíveis de alta performance por trás do estúdio.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {technologies.map((tech, i) => (
              <div 
                key={i} 
                className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out fill-mode-both"
                style={{ animationDelay: `${150 * (i + 1)}ms` }}
              >
                <GlassCard className="group relative text-center p-8 flex flex-col items-center justify-center space-y-4 h-52 border border-[var(--border)] bg-foreground/[0.02] hover:bg-foreground/[0.04] hover:border-foreground/10 transition-all duration-500 overflow-hidden cursor-crosshair">
                  {/* Subtle radial gradient overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
                  
                  <div className={`transition-all duration-500 ease-out transform group-hover:scale-110 group-hover:-translate-y-2 p-4 rounded-2xl bg-surface border border-[var(--border)] shadow-2xl ${tech.glow}`}>
                    <tech.icon size={32} strokeWidth={1.5} />
                  </div>
                  
                  <div className="flex flex-col items-center transform transition-transform duration-500 group-hover:translate-y-1">
                    <h3 className="font-sans font-bold text-lg text-foreground mb-1 tracking-tight">{tech.name}</h3>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/40">{tech.role}</span>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
