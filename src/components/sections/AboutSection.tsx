export function AboutSection() {
  return (
    <section className="py-24 md:py-32 relative text-center px-6 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <h2 className="font-mono tracking-widest text-[10px] md:text-xs uppercase text-white/40 mb-8">[ QUEM SOMOS ]</h2>
        <h3 className="font-sans font-bold text-xl md:text-4xl text-white mb-8 leading-tight">
          Acadêmicos de Computação transformando conhecimento técnico em soluções de alto impacto.
        </h3>
        <p className="font-sans text-base md:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">
          Somos um time de acadêmicos de Ciência da Computação e entusiastas de tecnologia, dedicados a transformar conhecimento técnico em soluções digitais de alto impacto. Nossa missão é unir <span className="text-white">inovação</span> e <span className="text-white">excelência técnica</span> para entregar projetos que impulsionem negócios, focando sempre na evolução contínua como desenvolvedores e profissionais.
        </p>
      </div>
    </section>
  );
}
