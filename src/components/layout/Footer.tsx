import Link from 'next/link';

export function Footer() {
  return (
    <footer className="pt-24 pb-8 relative z-10 bg-[#020202]">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <h2 className="font-sans font-black text-2xl tracking-tighter mb-4">MEZZOLD STUDIO</h2>
          <p className="text-white/60 max-w-sm mb-6 text-sm">
            Engenharia de soluções digitais de alta performance. Construímos plataformas inovadoras para marcas SaaS e digital-first.
          </p>
        </div>
        <div>
          <h3 className="font-mono tracking-widest text-xs mb-6 uppercase text-white/40">Estúdio</h3>
          <ul className="space-y-4 text-sm">
            <li><Link href="/cases" className="hover:text-white transition-colors">Portfólio</Link></li>
            <li><Link href="/#services" className="hover:text-white transition-colors">Serviços</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-mono tracking-widest text-xs mb-6 uppercase text-white/40">Recursos</h3>
          <ul className="space-y-4 text-sm">
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link href="/docs" className="hover:text-white transition-colors">Documentação</Link></li>
            <li><Link href="/stack" className="hover:text-white transition-colors">Stack Tech</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 pt-8 border-t border-white/5 flex justify-center md:justify-between items-center text-xs text-white/40 font-mono">
        <p>© 2026 Mezzold Studio. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
