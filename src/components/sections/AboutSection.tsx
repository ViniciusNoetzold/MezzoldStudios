export function AboutSection() {
  const stats = [
    { value: "3+", label: "Anos de\nExperiência" },
    { value: "20+", label: "Projetos\nEntregues" },
    { value: "100%", label: "Foco em\nResultados" },
  ];

  return (
    <section className="pt-10 pb-16 md:py-28 lg:py-36 relative px-4 sm:px-6 overflow-hidden">
      {/* Same grid as the rest of the site */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/[0.06] to-transparent pointer-events-none"
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Eyebrow */}
        <p className="font-mono tracking-widest text-[10px] md:text-xs uppercase text-electric-red/60 mb-8 md:mb-12">
          [ QUEM SOMOS ]
        </p>

        {/* Two-column layout on md+ */}
        <div className="flex flex-col md:flex-row md:items-start md:gap-16 lg:gap-24">

          {/* Left: Headline */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="font-sans font-black tracking-tighter text-[clamp(1.75rem,4.5vw,3.75rem)] text-foreground leading-[1.05]">
              Acadêmicos<br />
              transformando<br />
              <span className="text-foreground/35">código em impacto.</span>
            </h2>
          </div>

          {/* Right: Body + Stats */}
          <div className="md:w-1/2 flex flex-col gap-8 md:gap-10">
            <p className="text-foreground/55 text-sm sm:text-base md:text-lg leading-relaxed">
              O <span className="text-foreground font-semibold">Mezzold Studio</span> é formado por acadêmicos de Ciência da Computação e entusiastas de tecnologia, dedicados a transformar conhecimento técnico em soluções digitais de alto impacto. Nossa missão é unir{' '}
              <span className="text-foreground font-semibold">inovação</span>
              {' '}e{' '}
              <span className="text-foreground font-semibold">excelência técnica</span>
              {' '}para entregar projetos que impulsionem negócios, focando sempre na evolução contínua como desenvolvedores e profissionais.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[var(--border)]">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="font-sans font-black text-2xl sm:text-3xl md:text-4xl text-foreground tracking-tight">
                    {s.value}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/35 whitespace-pre-line leading-snug">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
