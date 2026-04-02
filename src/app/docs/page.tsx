import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: "Documentação | Mezzold Studio",
};

export default function DocsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-32 pb-24 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
             <div className="sticky top-32">
                <h3 className="font-mono text-[10px] tracking-widest text-white/40 uppercase mb-4">ÍNDICE</h3>
                <ul className="space-y-3 text-sm font-sans text-white/70">
                   <li className="text-white font-bold border-l-2 border-cyan pl-3">Começando</li>
                   <li className="pl-3 hover:text-white cursor-pointer">Design System</li>
                   <li className="pl-3 hover:text-white cursor-pointer">Componentes Core</li>
                   <li className="pl-3 hover:text-white cursor-pointer">APIs & Integrações</li>
                   <li className="pl-3 hover:text-white cursor-pointer">Deploy</li>
                </ul>
             </div>
          </aside>
          
          {/* Content */}
          <article className="flex-1">
             <h1 className="font-sans font-black text-4xl md:text-5xl tracking-tighter mb-8 text-white">Começando</h1>
             <p className="text-white/60 mb-6 font-sans">Bem-vindo à documentação oficial dos padrões de engenharia do Mezzold Studio. Nossos projetos são estruturados priorizando escalabilidade e a percepção de performance (Time to Interactive reduzido ao máximo).</p>
             <h2 className="font-sans font-bold text-2xl mt-12 mb-4">A Stack Padrão</h2>
             <ul className="list-disc list-inside text-white/60 space-y-2 mb-8 font-sans">
                 <li>Next.js (App Router)</li>
                 <li>Tailwind CSS v4 (Design Tokens inline)</li>
                 <li>Lucide React para iconografia leve</li>
             </ul>
             <div className="bg-white/5 border border-white/10 rounded-lg p-6 font-mono text-xs text-cyan">
                 // Exemplo de código<br/>
                 const isPremium = true;
             </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
