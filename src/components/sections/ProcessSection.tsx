"use client";

import { motion, AnimatePresence } from "motion/react";
import { Search, PenTool, Code, Rocket, ShieldCheck, TrendingUp, Globe2, RefreshCw } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CardSpotlight } from "@/components/ui/card-spotlight";

const phases = [
  {
    id: "01",
    icon: Search,
    title: "ANÁLISE DE\nECOSSISTEMA",
    desc: "Mapeamento profundo de arquitetura e identificação de vetores de crescimento para escala global.",
  },
  {
    id: "02",
    icon: PenTool,
    title: "INTERFACES\nCINEMATOGRÁFICAS",
    desc: "Sistemas de design de alta fidelidade com motion UI imersivo e foco em experiência de elite.",
  },
  {
    id: "03",
    icon: Code,
    title: "ENGENHARIA DE\nPRECISÃO",
    desc: "Codificação de alta performance utilizando stacks modernas e arquitetura resiliente de baixo acoplamento.",
  },
  {
    id: "04",
    icon: Rocket,
    title: "DEPLOY &\nOTIMIZAÇÃO",
    desc: "Orquestração de lançamento com monitoramento em tempo real e iteração baseada em inteligência de dados.",
  },
  {
    id: "05",
    icon: ShieldCheck,
    title: "SEGURANÇA &\nCOMPLIANCE",
    desc: "Auditoria contínua de código, blindagem criptográfica e adequação total a normas internacionais.",
  },
  {
    id: "06",
    icon: TrendingUp,
    title: "GROWTH\nINTELLIGENCE",
    desc: "Integração de analytics avançados e modelos de aprendizado para impulsionamento da base de usuários.",
  },
  {
    id: "07",
    icon: Globe2,
    title: "ESCALABILIDADE\nGLOBAL",
    desc: "Arquitetura distribuída cloud-native Edge-ready, projetada para suportar picos extremos de tráfego.",
  },
  {
    id: "08",
    icon: RefreshCw,
    title: "EVOLUÇÃO\nCONTÍNUA",
    desc: "Aprimoramento ininterrupto com CI/CD. Software que aprende e se adapta às mudanças do mercado.",
  },
];

/* ─── Mobile Scroll Timeline ──────────────────────────────── */
function MobileScrollTimeline() {
  return (
    <div className="md:hidden flex flex-col gap-10 relative mt-4">
      {/* Continuous vertical line */}
      <div className="absolute left-7 -translate-x-1/2 top-4 bottom-4 w-px bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.1)_5%,rgba(255,255,255,0.1)_95%,transparent)]" />

      {phases.map((phase, index) => {
        const Icon = phase.icon;

        return (
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="flex items-start gap-6 relative"
          >
            {/* Timeline Icon Node */}
            <div className="relative z-10 flex flex-col items-center shrink-0">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: "spring", damping: 20, delay: 0.1 }}
                className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center border border-[var(--border)] bg-card",
                  "bg-foreground/[0.02]"
                )}
                style={{
                  boxShadow: `0 0 25px rgba(255, 255, 255, 0.05)`
                }}
              >
                <Icon className="text-foreground/80" size={24} strokeWidth={1.5} />
              </motion.div>
            </div>

            {/* Content */}
            <div className="flex-1 pt-1 pb-2">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-[10px] font-bold text-foreground/40">
                  {phase.id}
                </span>
                <div className="h-px bg-[var(--border)] flex-grow" />
              </div>
              <h3 className="font-sans font-black text-xl text-foreground tracking-tight leading-[1.1] mb-3 whitespace-pre-line">
                {phase.title}
              </h3>
              <p className="text-foreground/50 text-sm leading-relaxed">
                {phase.desc}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Section ─────────────────────────────────────────────── */
export function ProcessSection() {
  return (
    <section className="relative bg-surface-secondary py-16 md:py-24 px-4 sm:px-6 lg:px-12">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-10 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >

          <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tighter text-foreground">
            COMO CONSTRUÍMOS<br />O FUTURO
          </h2>
        </motion.div>

        {/* ── Mobile: animated vertical timeline ── */}
        <MobileScrollTimeline />

        {/* ── Desktop: original spotlight grid ── */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
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
                  className="h-full p-8 md:p-10 transition-colors hover:border-[var(--border)]"
                  color="var(--bg-card)"
                  canvasColors={[[255, 255, 255], [100, 100, 100]]}
                  radius={300}
                >
                  <div className="flex justify-between items-start mb-12 relative z-10">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-[var(--border)] bg-foreground/[0.02]">
                      <Icon className="text-foreground/80" size={26} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-8 relative z-10">
                    <span className="font-mono text-[10px] md:text-xs font-bold text-foreground/40">{phase.id}</span>
                    <div className="h-[1px] bg-[var(--border)] flex-grow" />
                  </div>
                  <h3 className="font-sans font-black text-xl md:text-2xl text-foreground tracking-tight leading-[1.1] mb-6 whitespace-pre-line relative z-10">
                    {phase.title}
                  </h3>
                  <p className="text-foreground/50 text-sm leading-relaxed mt-auto relative z-10">
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
