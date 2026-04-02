import Link from 'next/link';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-white/5 bg-[#020202]/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-sans font-black text-xl tracking-tighter text-white">
          MEZZOLD<span className="text-electric-red">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-mono tracking-widest uppercase">
          <Link href="/#services" className="hover:text-emerald transition-colors">Serviços</Link>
          <Link href="/cases" className="hover:text-cyan transition-colors">Portfólio</Link>
          <Link href="/blog" className="hover:text-white/80 transition-colors">Blog</Link>
        </nav>
        <Link href="/#contact" className="bg-white text-black font-sans font-bold px-6 py-2.5 rounded-full hover:bg-electric-red hover:text-white transition-all text-sm inline-block">
          Contato
        </Link>
      </div>
    </header>
  );
}
