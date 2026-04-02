"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Search, PenTool, Code, Rocket, ShieldCheck, TrendingUp, Globe2, RefreshCw } from "lucide-react";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

const phases = [
  {
    id: "01",
    numColor: "text-blue-500",
    bgLight: "bg-blue-500/10",
    iconColor: "text-blue-500",
    icon: Search,
    title: "ANÁLISE DE\nECOSSISTEMA",
    desc: "Mapeamento profundo de arquitetura e identificação de vetores de crescimento para escala global."
  },
  {
    id: "02",
    numColor: "text-purple-500",
    bgLight: "bg-purple-500/10",
    iconColor: "text-purple-500",
    icon: PenTool,
    title: "INTERFACES\nCINEMATOGRÁFICAS",
    desc: "Sistemas de design de alta fidelidade com motion UI imersivo e foco em experiência de elite."
  },
  {
    id: "03",
    numColor: "text-emerald-500",
    bgLight: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
    icon: Code,
    title: "ENGENHARIA DE\nPRECISÃO",
    desc: "Codificação de alta performance utilizando stacks modernas e arquitetura resiliente de baixo acoplamento."
  },
  {
    id: "04",
    numColor: "text-orange-900",
    bgLight: "bg-orange-500/10",
    iconColor: "text-orange-500",
    icon: Rocket,
    title: "DEPLOY &\nOTIMIZAÇÃO",
    desc: "Orquestração de lançamento com monitoramento em tempo real e iteração baseada em inteligência de dados."
  },
  {
    id: "05",
    numColor: "text-red-500",
    bgLight: "bg-red-500/10",
    iconColor: "text-red-500",
    icon: ShieldCheck,
    title: "SEGURANÇA &\nCOMPLIANCE",
    desc: "Auditoria contínua de código, blindagem criptográfica e adequação total a normas internacionais."
  },
  {
    id: "06",
    numColor: "text-cyan-500",
    bgLight: "bg-cyan-500/10",
    iconColor: "text-cyan-500",
    icon: TrendingUp,
    title: "GROWTH\nINTELLIGENCE",
    desc: "Integração de analytics avançados e modelos de aprendizado para impulsionamento da base de usuários."
  },
  {
    id: "07",
    numColor: "text-amber-500",
    bgLight: "bg-amber-500/10",
    iconColor: "text-amber-500",
    icon: Globe2,
    title: "ESCALABILIDADE\nGLOBAL",
    desc: "Arquitetura distribuída cloud-native Edge-ready, projetada para suportar picos extremos de tráfego."
  },
  {
    id: "08",
    numColor: "text-indigo-500",
    bgLight: "bg-indigo-500/10",
    iconColor: "text-indigo-500",
    icon: RefreshCw,
    title: "EVOLUÇÃO\nCONTÍNUA",
    desc: "Aprimoramento ininterrupto com CI/CD. Software que aprende e se adapta às mudanças do mercado."
  }
];

export function ProcessSection() {
  const targetRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Smooth out the scroll progress for a buttery feel
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Move horizontally based on scroll.
  // 81% pulls it enough to the left to see the final card gracefully.
  const x = useTransform(springProgress, [0, 1], ["0%", "-81%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#0a0a0a]">
      {/* Background Grid Pattern inside sticky to stay static relative to viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center pt-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40 z-0" />
        
        <div className="relative z-10 w-full mb-12 text-center md:text-left md:px-24">
          <div className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6 flex items-center justify-center md:justify-start gap-4">
             <div className="w-12 h-px bg-white/20"></div>
             [ EXECUTION_PIPELINE ]
          </div>
          <h2 className="font-sans font-black text-4xl md:text-6xl lg:text-7xl tracking-tighter text-white">
             COMO CONSTRUÍMOS<br/>O FUTURO
          </h2>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="relative z-10 flex items-center">
          <motion.div 
            style={{ x }} 
            className="flex gap-6 items-stretch px-6 md:px-24 w-max"
          >
            {phases.map((phase) => {
              const Icon = phase.icon;
              return (
                <div key={phase.id} className="flex-none w-[80vw] sm:w-[45vw] md:w-[350px] lg:w-[420px] h-full flex flex-col bg-[#0f0f0f] border border-white/5 rounded-3xl p-8 md:p-10 hover:border-white/10 transition-colors">
                  <div className="flex justify-between items-start mb-12">
                    <div className={cn("w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border border-white/5", phase.bgLight)}>
                       <Icon className={phase.iconColor} size={28} strokeWidth={1.5} />
                    </div>
                    <div className="font-mono text-[9px] text-white/20 tracking-[0.2em] uppercase mt-2">
                       PHASE_{phase.id}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-8">
                    <span className={cn("font-mono text-[10px] md:text-xs font-bold", phase.numColor)}>{phase.id}</span>
                    <div className="h-[1px] bg-white/10 flex-grow"></div>
                  </div>

                  <h3 className="font-sans font-black text-2xl md:text-3xl text-white tracking-tight leading-[1.1] mb-6 whitespace-pre-line">
                    {phase.title}
                  </h3>
                  
                  <p className="text-white/50 text-sm md:text-base leading-relaxed mt-auto">
                    {phase.desc}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Floating Start Project Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="absolute bottom-12 right-12 z-20 hidden md:flex items-center gap-6 bg-[#141414]/80 backdrop-blur-md border border-white/10 rounded-full pl-3 pr-8 py-2.5 cursor-pointer hover:bg-white/10 transition-colors group"
        >
          <div className="flex -space-x-3 opacity-60">
            <div className="w-8 h-8 rounded-full border-[1.5px] border-white/30 z-30 bg-[#141414]" />
            <div className="w-8 h-8 rounded-full border-[1.5px] border-white/30 z-20 bg-[#141414]" />
            <div className="w-8 h-8 rounded-full border-[1.5px] border-white/30 z-10 bg-[#141414]" />
          </div>
          <div className="flex items-center gap-2">
             <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">PRONTO PARA ESCALAR?</span>
             <span className="font-sans font-bold text-[10px] text-white uppercase tracking-widest group-hover:underline underline-offset-4 pointer-events-auto">INICIAR PROJETO</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
