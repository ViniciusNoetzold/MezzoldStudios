'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Code2, Diamond, Zap, TrendingUp, ShieldCheck } from 'lucide-react';

const specialties = [
  {
    icon: Code2,
    topic: "Engenharia",
    title: "Engenharia de Software Escalável",
    description: "Construímos fundações robustas para o seu digital. Desde a modelagem de banco de dados até a orquestração de deploy, nosso código é desenhado para durar e escalar sem gargalos."
  },
  {
    icon: Diamond,
    topic: "Design",
    title: "Estética de Elite & Quiet Luxury",
    description: "Acreditamos que menos é mais quando executado com perfeição. Criamos interfaces minimalistas, imersivas e arquitetadas milimetricamente para maximizar a conversão e o encanto."
  },
  {
    icon: Zap,
    topic: "Performance",
    title: "Performance Absoluta A+",
    description: "Cada milissegundo conta. Aplicamos metodologias estritas de otimização de renderização e cache para garantir que seu projeto seja instantâneo, fluido e sem falhas operacionais."
  },
  {
    icon: TrendingUp,
    topic: "Conversão",
    title: "Arquitetura Focada em Conversão",
    description: "Não construímos apenas sites bonitos. Toda a estrutura é desenhada com princípios de UX e neurodesign para guiar o usuário e transformar cliques em resultados reais."
  },
  {
    icon: ShieldCheck,
    topic: "Parceria",
    title: "Parceria Estratégica",
    description: "Operamos como um braço de tecnologia estendido do seu negócio. Seu sucesso é nosso sucesso, fornecendo suporte contínuo e evoluções precisas de longo prazo."
  }
];

export function SpecialtiesSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 relative px-4 sm:px-6 overflow-hidden bg-[#0a0a0a]">
      {/* Standard grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40" />

      <div className="container mx-auto max-w-6xl relative z-10 w-full flex flex-col items-center">
        <h3 className="font-sans font-black tracking-tighter text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white mb-10 md:mb-16 text-center uppercase leading-tight">
          Por que escolher<br />
          Nosso Estúdio
        </h3>

        {/* Carousel: 1 card mobile, 2 on tablet, 3 on desktop */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-3 md:-ml-4">
            {specialties.map((item, index) => (
              <CarouselItem key={index} className="pl-3 md:pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3">
                <Card className="bg-white/[0.02] border-white/[0.05] h-full rounded-2xl overflow-hidden hover:bg-white/[0.04] transition-colors group">
                  <CardContent className="p-6 md:p-8 lg:p-10 flex flex-col h-full gap-5">
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500 text-electric-red">
                      <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[10px] uppercase text-white/40 tracking-widest">
                        // {item.topic}
                      </span>
                      <h4 className="text-white font-bold text-lg md:text-xl lg:text-2xl tracking-tight leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-white/60 text-sm leading-relaxed mt-1">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Nav arrows only on large screens where there's space for them */}
          <div className="hidden lg:block">
            <CarouselPrevious className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white left-[-3rem]" />
            <CarouselNext className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white right-[-3rem]" />
          </div>
        </Carousel>

        {/* Mobile drag hint */}
        <p className="mt-5 text-white/20 text-[10px] font-mono tracking-widest uppercase lg:hidden">
          ← deslize para ver mais →
        </p>
      </div>
    </section>
  );
}
