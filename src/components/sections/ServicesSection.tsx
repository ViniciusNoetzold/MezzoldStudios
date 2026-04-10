'use client';

import { FlippingCard } from '../ui/flipping-card';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { ChevronRight, Globe2, Package, BarChart2, LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface ServiceAttribute {
  label: string;
  value: string;
  valueColor?: string;
}

interface ServiceCardData {
  id: string;
  icon: LucideIcon;
  unit: string;
  front: {
    title: string;
    description: string;
  };
  back: {
    attributes: ServiceAttribute[];
    buttonText: string;
    buttonHref: string;
  };
}

const servicesData: ServiceCardData[] = [
  {
    id: "websites",
    icon: Globe2,
    unit: "PRESENÇA_DIGITAL",
    front: {
      title: "Desenvolvimento de Sites",
      description: "Criamos sites institucionais, landing pages e portfólios digitais que convertem visitantes em clientes. Design exclusivo, performance otimizada e código limpo — da concepção ao deploy.",
    },
    back: {
      attributes: [
        { label: "TIPO", value: "Sites & Landings" },
        { label: "PERFORMANCE", value: "Core Web Vitals A+" },
        { label: "SEO", value: "Otimizado" },
        { label: "ENTREGA", value: "Rápida e Eficiente" },
      ],
      buttonText: "Criar Meu Site",
      buttonHref: "/?msg=website#contact",
    },
  },
  {
    id: "micro-saas",
    icon: Package,
    unit: "PRODUTO_DIGITAL",
    front: {
      title: "Micro SaaS",
      description: "Desenvolvemos produtos de software focados, do zero ao mercado. Autenticação, billing, multi-tenancy e painel admin — tudo que você precisa para atrair seus primeiros usuários e escalar.",
    },
    back: {
      attributes: [
        { label: "MODELO", value: "Subscription-based" },
        { label: "AUTH", value: "Login Seguro" },
        { label: "BILLING", value: "Integrado" },
        { label: "ARQUITETURA", value: "Escalável" },
      ],
      buttonText: "Lançar Produto",
      buttonHref: "/?msg=saas#contact",
    },
  },
  {
    id: "dashboards",
    icon: BarChart2,
    unit: "DADOS_INTELIGENTES",
    front: {
      title: "Dashboards e Automação",
      description: "Transformamos dados brutos em painéis intuitivos de alta performance e eliminamos tarefas manuais com robôs inteligentes que operam 24/7, reduzindo seus custos operacionais.",
    },
    back: {
      attributes: [
        { label: "DADOS", value: "Tempo Real" },
        { label: "AUTOMAÇÃO", value: "24/7 Sem Pausas" },
        { label: "INTEGRAÇÕES", value: "APIs & Webhooks" },
        { label: "IMPACTO", value: "Redução de Custos" },
      ],
      buttonText: "Automatizar Fluxo",
      buttonHref: "/?msg=dashboards#contact",
    },
  },
];

function ServiceFront({ data }: { data: ServiceCardData }) {
  const Icon = data.icon;
  return (
    <div className="flex flex-col h-full w-full p-6 md:p-8 text-left bg-card/90 backdrop-blur-md border border-[var(--border)] relative overflow-hidden group-hover/flipping-card:opacity-0 transition-opacity duration-300">
      <div className="flex justify-between items-center mb-6 md:mb-10 font-mono text-[9px] md:text-[10px] font-bold text-foreground/40 tracking-[0.2em] uppercase">
        <span className="text-cyan-400 flex items-center gap-1.5">
          <Icon size={14} strokeWidth={2} />
        </span>
        <div className="h-[1px] bg-[var(--border)] flex-grow mx-3 md:mx-4"></div>
        <span>{data.unit}</span>
      </div>
      
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-sans font-black mb-3 md:mb-6 text-foreground leading-tight tracking-tight pr-4">
        {data.front.title}
      </h3>
      <p className="text-xs md:text-sm lg:text-base text-foreground/60 font-sans mb-auto leading-relaxed">
        {data.front.description}
      </p>
    </div>
  );
}

function ServiceBack({ data }: { data: ServiceCardData }) {
  const Icon = data.icon;
  return (
    <div className="flex flex-col h-full w-full p-6 md:p-8 text-left bg-card border border-[var(--border)] relative overflow-hidden group/back">
      
      {/* Subtle ambient glow */}
      <div className="absolute -top-32 -right-32 w-72 h-72 bg-foreground/[0.03] blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-2 mb-6 md:mb-8 pb-4 border-b border-[var(--border)] relative z-10">
        <span className="text-cyan-400"><Icon size={14} strokeWidth={2} /></span>
        <span className="font-mono text-[9px] md:text-[10px] text-foreground/30 tracking-[0.2em] uppercase">{data.unit}</span>
      </div>

      {/* Attributes — editorial style: big value + label */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 mb-auto relative z-10">
        {data.back.attributes.map(attr => (
          <div key={attr.label} className="flex flex-col gap-1">
            <span className={cn("font-sans font-black text-lg md:text-xl tracking-tight", attr.valueColor || "text-foreground")}>
              {attr.value}
            </span>
            <span className="font-mono text-[9px] uppercase text-foreground/30 tracking-[0.12em]">
              {attr.label}
            </span>
          </div>
        ))}
      </div>
      
      {/* CTA */}
      <div className="mt-6 md:mt-8 relative z-10">
        <Link
          href={data.back.buttonHref}
          className="group/btn w-full flex items-center justify-between px-5 py-3.5 rounded-lg bg-white text-black text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white/90 active:scale-[0.97] cursor-pointer pointer-events-auto"
        >
          <span>{data.back.buttonText}</span>
          <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

function MobileServiceCard({ data, isOpen, onToggle }: { data: ServiceCardData, isOpen: boolean, onToggle: () => void }) {
  const Icon = data.icon;
  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-controls={`service-details-${data.id}`}
      className={cn("flex flex-col rounded-2xl border transition-colors duration-300 overflow-hidden relative cursor-pointer", isOpen ? "border-foreground/20 bg-card" : "border-white/[0.08] bg-card/60 hover:bg-card")}
      onClick={onToggle}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
    >
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-foreground/[0.02] blur-[80px] rounded-full pointer-events-none" />

      {/* Front: icon + title + description */}
      <div className={cn("p-6 relative z-10", isOpen ? "border-b border-[var(--border)]" : "")}>
        <div className="flex justify-between items-center mb-5 font-mono text-[9px] font-bold text-foreground/40 tracking-[0.2em] uppercase">
          <span className="text-cyan-400 flex items-center gap-1.5">
            <Icon size={14} strokeWidth={2} />
          </span>
          <div className="h-[1px] bg-[var(--border)] flex-grow mx-3"></div>
          <span>{data.unit}</span>
        </div>
        
        <h3 className="text-2xl font-sans font-black mb-3 text-foreground leading-tight tracking-tight">
          {data.front.title}
        </h3>
        <p className="text-sm text-foreground/60 font-sans leading-relaxed">
          {data.front.description}
        </p>
      </div>

      {/* Expanded: editorial 2×2 grid + CTA */}
      <div
        id={`service-details-${data.id}`}
        className={cn(
          "relative z-10 overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-6 pt-5 flex flex-col gap-6">
          {/* 2×2 attribute grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            {data.back.attributes.map(attr => (
              <div key={attr.label} className="flex flex-col gap-1">
                <span className={cn("font-sans font-black text-xl tracking-tight", attr.valueColor || "text-foreground")}>
                  {attr.value}
                </span>
                <span className="font-mono text-[9px] uppercase text-foreground/30 tracking-[0.12em]">
                  {attr.label}
                </span>
              </div>
            ))}
          </div>
          
          {/* CTA — solid white, same as desktop */}
          <Link
            href={data.back.buttonHref}
            onClick={(e) => e.stopPropagation()}
            className="w-full flex items-center justify-between px-5 py-3.5 rounded-lg bg-white text-black text-[10px] font-extrabold uppercase tracking-[0.2em] transition-all hover:bg-white/90 active:scale-[0.97]"
          >
            <span>{data.back.buttonText}</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ServicesSection() {
  const [openCardId, setOpenCardId] = useState<string | null>(null);

  return (
    <section id="services" className="py-16 md:py-24 relative px-4 sm:px-6 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="container mx-auto relative z-10">
        <div className="mb-10 md:mb-16">
          <h3 className="font-sans font-black text-[clamp(1.75rem,4.5vw,3.75rem)] tracking-tighter uppercase leading-tight">As Especialidades<br/>Do Nosso Estúdio</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {servicesData.map((card) => (
            <React.Fragment key={card.id}>
              {/* Desktop version - Rotating FlippingCard */}
              <div className="hidden sm:block">
                <FlippingCard
                  width="100%"
                  height="clamp(420px, 38vw, 520px)"
                  frontContent={<ServiceFront data={card} />}
                  backContent={<ServiceBack data={card} />}
                />
              </div>

              {/* Mobile version - Interactive accordion card */}
              <div className="sm:hidden">
                <MobileServiceCard 
                  data={card} 
                  isOpen={openCardId === card.id}
                  onToggle={() => setOpenCardId(openCardId === card.id ? null : card.id)}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
