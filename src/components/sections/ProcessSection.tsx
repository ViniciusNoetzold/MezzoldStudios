"use client";

import { motion } from "motion/react";
import { Search, PenTool, Code, Rocket, ShieldCheck, TrendingUp, Globe2, RefreshCw } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { CardSpotlight } from "@/components/ui/card-spotlight";

const phases = [
  {
    id: "01",
    numColor: "text-blue-500",
    bgLight: "bg-blue-500/10",
    iconColor: "text-blue-500",
    icon: Search,
    title: "ANÁLISE DE\nECOSSISTEMA",
    desc: "Mapeamento profundo de arquitetura e identificação de vetores de crescimento para escala global.",
    spotlightColor: "#060e1f",
    canvasColors: [[59, 130, 246], [37, 99, 235]] as number[][],
  },
  {
    id: "02",
    numColor: "text-purple-500",
    bgLight: "bg-purple-500/10",
    iconColor: "text-purple-500",
    icon: PenTool,
    title: "INTERFACES\nCINEMATOGRÁFICAS",
    desc: "Sistemas de design de alta fidelidade com motion UI imersivo e foco em experiência de elite.",
    spotlightColor: "#0e0618",
    canvasColors: [[139, 92, 246], [109, 40, 217]] as number[][],
  },
  {
    id: "03",
    numColor: "text-emerald-500",
    bgLight: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
    icon: Code,
    title: "ENGENHARIA DE\nPRECISÃO",
    desc: "Codificação de alta performance utilizando stacks modernas e arquitetura resiliente de baixo acoplamento.",
    spotlightColor: "#03140c",
    canvasColors: [[16, 185, 129], [5, 150, 105]] as number[][],
  },
  {
    id: "04",
    numColor: "text-orange-500",
    bgLight: "bg-orange-500/10",
    iconColor: "text-orange-500",
    icon: Rocket,
    title: "DEPLOY &\nOTIMIZAÇÃO",
    desc: "Orquestração de lançamento com monitoramento em tempo real e iteração baseada em inteligência de dados.",
    spotlightColor: "#180800",
    canvasColors: [[249, 115, 22], [234, 88, 12]] as number[][],
  },
  {
    id: "05",
    numColor: "text-red-500",
    bgLight: "bg-red-500/10",
    iconColor: "text-red-500",
    icon: ShieldCheck,
    title: "SEGURANÇA &\nCOMPLIANCE",
    desc: "Auditoria contínua de código, blindagem criptográfica e adequação total a normas internacionais.",
    spotlightColor: "#180000",
    canvasColors: [[239, 68, 68], [220, 38, 38]] as number[][],
  },
  {
    id: "06",
    numColor: "text-cyan-500",
    bgLight: "bg-cyan-500/10",
    iconColor: "text-cyan-500",
    icon: TrendingUp,
    title: "GROWTH\nINTELLIGENCE",
    desc: "Integração de analytics avançados e modelos de aprendizado para impulsionamento da base de usuários.",
    spotlightColor: "#001518",
    canvasColors: [[6, 182, 212], [8, 145, 178]] as number[][],
  },
  {
    id: "07",
    numColor: "text-amber-500",
    bgLight: "bg-amber-500/10",
    iconColor: "text-amber-500",
    icon: Globe2,
    title: "ESCALABILIDADE\nGLOBAL",
    desc: "Arquitetura distribuída cloud-native Edge-ready, projetada para suportar picos extremos de tráfego.",
    spotlightColor: "#181000",
    canvasColors: [[245, 158, 11], [217, 119, 6]] as number[][],
  },
  {
    id: "08",
    numColor: "text-indigo-500",
    bgLight: "bg-indigo-500/10",
    iconColor: "text-indigo-500",
    icon: RefreshCw,
    title: "EVOLUÇÃO\nCONTÍNUA",
    desc: "Aprimoramento ininterrupto com CI/CD. Software que aprende e se adapta às mudanças do mercado.",
    spotlightColor: "#080a1e",
    canvasColors: [[99, 102, 241], [79, 70, 229]] as number[][],
  },
];

export function ProcessSection() {
  return (
    <section className="relative bg-[#0a0a0a] py-24 px-6 md:px-12 lg:px-24">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6 flex items-center gap-4">
            <div className="w-12 h-px bg-white/20" />
            [ EXECUTION_PIPELINE ]
          </div>
          <h2 className="font-sans font-black text-4xl md:text-6xl lg:text-7xl tracking-tighter text-white">
            COMO CONSTRUÍMOS<br />O FUTURO
          </h2>
        </motion.div>

        {/* Static Grid of CardSpotlight */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <CardSpotlight
                  className="h-full p-8 md:p-10 transition-colors hover:border-white/10"
                  color={phase.spotlightColor}
                  canvasColors={phase.canvasColors}
                  radius={300}
                >
                  {/* Icon + Phase label */}
                  <div className="flex justify-between items-start mb-12 relative z-10">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5", phase.bgLight)}>
                      <Icon className={phase.iconColor} size={26} strokeWidth={1.5} />
                    </div>
                    <div className="font-mono text-[9px] text-white/20 tracking-[0.2em] uppercase mt-2">
                      PHASE_{phase.id}
                    </div>
                  </div>

                  {/* Number divider */}
                  <div className="flex items-center gap-4 mb-8 relative z-10">
                    <span className={cn("font-mono text-[10px] md:text-xs font-bold", phase.numColor)}>{phase.id}</span>
                    <div className="h-[1px] bg-white/10 flex-grow" />
                  </div>

                  {/* Title */}
                  <h3 className="font-sans font-black text-xl md:text-2xl text-white tracking-tight leading-[1.1] mb-6 whitespace-pre-line relative z-10">
                    {phase.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/50 text-sm leading-relaxed mt-auto relative z-10">
                    {phase.desc}
                  </p>
                </CardSpotlight>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
