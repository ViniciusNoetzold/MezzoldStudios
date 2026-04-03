import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GlassCard } from '@/components/ui/GlassCard';

export const metadata = {
  title: "Serviços | Mezzold Studio",
};

const services = [
  {
    tag: "01",
    color: "text-cyan-400",
    borderColor: "border-cyan-500/30",
    title: "Desenvolvimento de Sites",
    description:
      "Sites institucionais, landing pages e portfólios digitais que convertem visitantes em clientes. Design exclusivo, código limpo e performance otimizada para garantir a melhor experiência e presença online.",
    highlights: ["Landing Pages", "Sites Institucionais", "Portfólios Digitais", "E-commerce"],
  },
  {
    tag: "02",
    color: "text-blue-400",
    borderColor: "border-blue-500/30",
    title: "Micro SaaS",
    description:
      "Desenvolvemos produtos de software focados do zero ao mercado. Autenticação segura, sistema de cobrança integrado, painel administrativo e arquitetura escalável — tudo que você precisa para lançar e crescer.",
    highlights: ["Autenticação & Billing", "Painel Admin", "Multi-tenancy", "Escalabilidade"],
  },
  {
    tag: "03",
    color: "text-emerald-400",
    borderColor: "border-emerald-500/30",
    title: "Dashboards e Automação",
    description:
      "Transformamos dados brutos em painéis de controle intuitivos e de alta performance. Eliminamos tarefas manuais com robôs inteligentes que operam 24/7, reduzindo custos operacionais e aumentando a eficiência.",
    highlights: ["Dashboards em Tempo Real", "Automação de Processos", "Integrações via API", "Relatórios Inteligentes"],
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-32 pb-24 px-6 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <h1 className="font-sans font-black text-5xl md:text-7xl tracking-tighter mb-4 text-white">SERVIÇOS<span className="text-electric-red">.</span></h1>
          <p className="text-white/60 mb-16 font-mono tracking-widest text-[10px] md:text-xs uppercase">O QUE CONSTRUÍMOS PARA VOCÊ</p>

          <div className="space-y-6">
            {services.map((service) => (
              <GlassCard key={service.tag} className={`p-8 border ${service.borderColor}`}>
                <div className={`font-mono text-[10px] tracking-[0.3em] uppercase ${service.color} mb-3 font-bold`}>
                  [ {service.tag} ]
                </div>
                <h2 className="font-sans font-black text-2xl md:text-3xl tracking-tight text-white mb-4">
                  {service.title}
                </h2>
                <p className="text-white/60 font-sans text-sm md:text-base leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.highlights.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest px-3 py-1.5 rounded border border-white/10 text-white/50 bg-white/[0.03]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
