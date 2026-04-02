"use client";

import { Activity, Workflow, Sparkles, Blocks, Cpu, Zap, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useId } from 'react';
import { cn } from '@/lib/utils';
import { HoverEffect } from '../ui/card-hover-effect';

/* ─────────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────────── */
const features = [
  {
    id: 0,
    title: 'Sistemas de Monitoramento em Tempo Real',
    icon: Activity,
    shortTitle: 'MONITORAMENTO',
    description:
      'Dashboards estratégicos focados na visualização de dados complexos, transformando métricas brutas em interfaces de comando intuitivas e de alta performance. Arquitetamos pipelines de dados em tempo real com latência sub-milissegundo, utilizando WebSockets, SSE e renderização parcial no servidor para manter o estado sempre sincronizado.',
    tags: ['React.js', 'High-Precision UI', 'Data Streaming'],
    accent: 'emerald',
  },
  {
    id: 1,
    title: 'Automação de Fluxos Críticos',
    icon: Workflow,
    shortTitle: 'AUTOMAÇÃO',
    description:
      'Engenharia de processos para eliminar tarefas repetitivas. Integração de APIs e microsserviços que orquestram o seu negócio enquanto você foca no que importa. Pipelines event-driven com Node.js, Spring Boot e filas de mensagens para garantir zero perda de dados e rastreabilidade total de cada operação.',
    tags: ['Spring Boot', 'Node.js', 'Enterprise Automation'],
    accent: 'cyan',
  },
  {
    id: 2,
    title: 'Interfaces de Próxima Geração',
    icon: Sparkles,
    shortTitle: 'UI/UX',
    description:
      'Design focado em "Digitalism" e "Aero Glass". Criamos experiências visuais que não apenas funcionam, mas definem a identidade tecnológica da sua marca. Motion design cinematográfico com Framer Motion, shaders GLSL para fundos imersivos e sistemas de design customizados — sem templates, apenas originalidade radical.',
    tags: ['Motion Design', 'Framer Motion', 'Digitalism UI'],
    accent: 'violet',
  },
  {
    id: 3,
    title: 'Desenvolvimento de Micro-SaaS',
    icon: Blocks,
    shortTitle: 'MICRO-SAAS',
    description:
      'Da concepção ao lançamento. Arquitetura escalável para soluções de software específicas, focadas em resolver problemas pontuais com máxima eficiência. Stack moderna completa — autenticação, billing com Stripe, multi-tenancy e painel de administração — entregue em sprints ágeis e prontos para escala.',
    tags: ['Full-stack', 'Supabase', 'Scalable Architecture'],
    accent: 'orange',
  },
  {
    id: 4,
    title: 'Integração Hardware-Software (IoT)',
    icon: Cpu,
    shortTitle: 'IOT',
    description:
      'Conectando o mundo físico ao digital. Desenvolvimento de firmware e interfaces para controle de dispositivos inteligentes e monitoramento industrial remoto. Protocolos MQTT, OTA updates, dashboards de telemetria e alertas em tempo real — da placa embarcada até o painel web.',
    tags: ['ESP32 / M5Stack', 'MQTT', 'IoT Ecosystems'],
    accent: 'sky',
  },
  {
    id: 5,
    title: 'Otimização e Refatoração de Sistemas',
    icon: Zap,
    shortTitle: 'PERFORMANCE',
    description:
      'Diagnóstico e melhoria de performance em aplicações legadas. Redução de latência e otimização de banco de dados para sistemas que não podem parar. Profiling, query tuning, cache strategies e migração gradual — entregamos ganhos mensuráveis sem reescrever do zero o que já funciona.',
    tags: ['Java / Spring', 'Database Tuning', 'Low Latency'],
    accent: 'red',
  },
];

/* accent → tailwind color values */
const accentMap: Record<string, { border: string; glow: string; text: string; bg: string }> = {
  emerald: { border: 'border-emerald-500/60', glow: 'shadow-[0_0_24px_rgba(16,185,129,0.25)]', text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  cyan:    { border: 'border-cyan-500/60',    glow: 'shadow-[0_0_24px_rgba(6,182,212,0.25)]',   text: 'text-cyan-400',    bg: 'bg-cyan-500/10'    },
  violet:  { border: 'border-violet-500/60',  glow: 'shadow-[0_0_24px_rgba(139,92,246,0.25)]',  text: 'text-violet-400',  bg: 'bg-violet-500/10'  },
  orange:  { border: 'border-orange-500/60',  glow: 'shadow-[0_0_24px_rgba(249,115,22,0.25)]',  text: 'text-orange-400',  bg: 'bg-orange-500/10'  },
  sky:     { border: 'border-sky-500/60',     glow: 'shadow-[0_0_24px_rgba(14,165,233,0.25)]',  text: 'text-sky-400',     bg: 'bg-sky-500/10'     },
  red:     { border: 'border-red-500/60',     glow: 'shadow-[0_0_24px_rgba(239,68,68,0.25)]',   text: 'text-red-400',     bg: 'bg-red-500/10'     },
};

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 relative px-6 bg-[#030303] overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50" />

      <div className="mx-auto w-full max-w-6xl space-y-16 mt-8 mb-16 relative z-10">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-emerald-500 mb-6 font-bold">
            [ SOLUÇÕES DE ELITE ]
          </div>
          <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-7xl tracking-tighter text-white uppercase mb-6">
            Engenharia & Design Radical
          </h2>
          <p className="text-white/60 text-sm tracking-wide md:text-base leading-relaxed max-w-2xl mx-auto">
            Explora as nossas soluções avançadas desenvolvidas para a mais alta performance corporativa.
          </p>
        </motion.div>

        {/* Hover Effect Cards UI */}
        <HoverEffect 
          items={features.map((f) => ({
            ...f,
            accentData: accentMap[f.accent],
          }))} 
        />
      </div>
    </section>
  );
}
