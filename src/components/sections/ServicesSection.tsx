import { FlippingCard } from '../ui/flipping-card';
import { cn } from '@/lib/utils';
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface ServiceAttribute {
  label: string;
  value: string;
  valueColor?: string;
}

interface ServiceCardData {
  id: string;
  tag: string;
  unit: string;
  front: {
    title: string;
    description: string;
  };
  back: {
    attributes: ServiceAttribute[];
    buttonText: string;
  };
}

const servicesData: ServiceCardData[] = [
  {
    id: "websites",
    tag: "01",
    unit: "PRESENÇA_DIGITAL",
    front: {
      title: "Desenvolvimento de Sites",
      description: "Criamos sites institucionais, landing pages e portfólios digitais que convertem visitantes em clientes. Design exclusivo, performance otimizada e código limpo — da concepção ao deploy.",
    },
    back: {
      attributes: [
        { label: "TIPO", value: "Sites & Landings" },
        { label: "PERFORMANCE", value: "Core Web Vitals A+" },
        { label: "SEO", value: "Otimizado", valueColor: "text-cyan-400" },
        { label: "ENTREGA", value: "Rápida e Eficiente" },
      ],
      buttonText: "Criar Meu Site",
    },
  },
  {
    id: "micro-saas",
    tag: "02",
    unit: "PRODUTO_DIGITAL",
    front: {
      title: "Micro SaaS",
      description: "Desenvolvemos produtos de software focados, do zero ao mercado. Autenticação, billing, multi-tenancy e painel admin — tudo que você precisa para atrair seus primeiros usuários e escalar.",
    },
    back: {
      attributes: [
        { label: "MODELO", value: "Subscription-based" },
        { label: "AUTH", value: "Login Seguro" },
        { label: "BILLING", value: "Integrado", valueColor: "text-blue-400" },
        { label: "ARQUITETURA", value: "Escalável" },
      ],
      buttonText: "Lançar Produto",
    },
  },
  {
    id: "dashboards",
    tag: "03",
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
        { label: "IMPACTO", value: "Redução de Custos", valueColor: "text-emerald-400" },
      ],
      buttonText: "Automatizar Fluxo",
    },
  },
];

function ServiceFront({ data }: { data: ServiceCardData }) {
  return (
    <div className="flex flex-col h-full w-full p-8 text-left bg-neutral-950/90 backdrop-blur-md border border-white/5 relative overflow-hidden group-hover/flipping-card:opacity-0 transition-opacity duration-300">
      <div className="flex justify-between items-center mb-10 font-mono text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">
        <span className="text-cyan-400">[ {data.tag} ]</span>
        <div className="h-[1px] bg-white/10 flex-grow mx-4"></div>
        <span>{data.unit}</span>
      </div>
      
      <h3 className="text-3xl md:text-4xl font-sans font-black mb-6 text-white leading-tight tracking-tight pr-4">
        {data.front.title}
      </h3>
      <p className="text-[14px] md:text-base text-white/60 font-sans mb-auto leading-relaxed">
        {data.front.description}
      </p>
    </div>
  );
}

function ServiceBack({ data }: { data: ServiceCardData }) {
  return (
    <div className="flex flex-col h-full w-full p-6 text-left bg-neutral-950 border border-white/[0.05] relative overflow-hidden group/back">
      
      {/* Background ambient glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none opacity-0 group-hover/back:opacity-100 transition-opacity duration-700" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/5 opacity-0 blur-[80px] rounded-full pointer-events-none group-hover/back:opacity-100 transition-opacity duration-700 delay-100" />

      {/* Terminal Header */}
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/[0.05] relative z-10">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-electric-red/80 shadow-[0_0_8px_rgba(255,0,51,0.5)]" />
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
        </div>
        <div className="font-mono text-[9px] md:text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">
          SYS_LOG // {data.unit}
        </div>
      </div>
      
      {/* Specs List */}
      <div className="flex flex-col gap-3 mb-auto relative z-10 w-full">
        {data.back.attributes.map(attr => (
          <div key={attr.label} className="flex justify-between items-center p-3 rounded-md bg-gradient-to-r from-white/[0.03] to-transparent border border-white/[0.05] hover:bg-white/[0.06] transition-colors relative overflow-hidden group/row">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/10 group-hover/row:bg-cyan-400 transition-colors" />
            <span className="text-white/40 font-mono text-[9px] md:text-[10px] tracking-[0.10em] uppercase flex items-center gap-2 pl-3">
              {attr.label}
            </span>
            <span className={cn("font-mono text-[9px] md:text-[10px] uppercase font-bold tracking-widest bg-black/80 px-2.5 py-1.5 rounded border border-white/5 backdrop-blur-sm", attr.valueColor || "text-white")}>
              {attr.value}
            </span>
          </div>
        ))}
      </div>
      
      {/* Footer Action */}
      <div className="mt-8 relative z-10">
        <button className="group/btn w-full flex items-center justify-between px-6 py-4 bg-white/[0.03] border border-white/10 rounded-sm text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-black cursor-pointer pointer-events-auto">
          <span>{data.back.buttonText}</span>
          <ChevronRight size={16} className="text-white/50 group-hover/btn:text-black group-hover/btn:translate-x-1 transition-all" />
        </button>
      </div>
    </div>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 relative px-6 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="container mx-auto relative z-10">
        <div className="mb-12 md:mb-16">
          <h2 className="font-mono tracking-widest text-[10px] md:text-xs uppercase text-white/40 mb-4">[ NOSSAS SOLUÇÕES ]</h2>
          <h3 className="font-sans font-black text-4xl md:text-6xl tracking-tighter uppercase">As Especialidades<br/>Do Nosso Estúdio</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {servicesData.map((card) => (
            <FlippingCard
              key={card.id}
              width="100%"
              height={440}
              frontContent={<ServiceFront data={card} />}
              backContent={<ServiceBack data={card} />}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
