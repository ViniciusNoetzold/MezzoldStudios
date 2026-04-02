export function AboutSection() {
  return (
    <section className="py-24 md:py-32 relative text-center px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-mono tracking-widest text-[10px] md:text-xs uppercase text-white/40 mb-8">[ QUEM SOMOS ]</h2>
        <h3 className="font-sans font-bold text-xl md:text-4xl text-white mb-8 leading-tight">
          Um estúdio compacto para equipes SaaS ambiciosas.
        </h3>
        <p className="font-sans text-lg md:text-3xl text-white/60 leading-snug">
          Unimos estratégia de produto, engenharia de alta velocidade e design cinematográfico para criar plataformas que parecem <span className="text-white">inevitáveis</span>.
        </p>
      </div>
    </section>
  );
}
