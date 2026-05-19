import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PROJECTS_META, getProjectBySlug } from '@/lib/projects-data';
import { ProjectDemo } from './ProjectDemo';

// ── Accent token map ──────────────────────────────────────────────────────────

const ACCENT = {
  red: {
    cat:     'text-electric-red',
    tag:     'border-electric-red/20 text-electric-red/70 bg-electric-red/[0.04]',
    line:    'bg-electric-red',
    dot:     'bg-electric-red',
  },
  cyan: {
    cat:     'text-cyan',
    tag:     'border-cyan/20 text-cyan/70 bg-cyan/[0.04]',
    line:    'bg-cyan',
    dot:     'bg-cyan',
  },
  emerald: {
    cat:     'text-emerald',
    tag:     'border-emerald/20 text-emerald/70 bg-emerald/[0.04]',
    line:    'bg-emerald',
    dot:     'bg-emerald',
  },
} as const;

// ── Static generation ─────────────────────────────────────────────────────────

export function generateStaticParams() {
  return PROJECTS_META.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Projetos — Mezzold Studio`,
    description: project.description,
    alternates: {
      canonical: `https://mezzoldstudio.com.br/projetos/${slug}`,
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ProjetoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const ac = ACCENT[project.accent];

  return (
    <>
      <Header />
      <main className="flex-1 relative z-10">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative pt-36 pb-14 px-6 overflow-hidden">
          {/* Subtle grid */}
          <div className="absolute inset-0 section-grid opacity-25 pointer-events-none" />
          {/* Accent top line */}
          <div className={`absolute top-0 left-0 right-0 h-px ${ac.line} opacity-50`} />

          <div className="container mx-auto max-w-[1120px]">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2.5 mb-10">
              <Link
                href="/projetos"
                className="font-mono text-[9px] tracking-[0.25em] uppercase text-foreground/40 hover:text-foreground/70 transition-colors duration-200"
              >
                ← Projetos
              </Link>
              <span className="font-mono text-[9px] text-foreground/20">/</span>
              <span className={`font-mono text-[9px] tracking-[0.20em] uppercase truncate max-w-[200px] ${ac.cat}`}>
                {project.slug}
              </span>
            </nav>

            {/* Content grid */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-10 md:gap-16 items-start">
              {/* Left: headline */}
              <div>
                <p className={`font-mono text-[9px] tracking-[0.30em] uppercase mb-4 ${ac.cat}`}>
                  {project.catLabel}
                </p>
                <h1 className="font-black text-[clamp(2rem,5vw,3.5rem)] tracking-tighter leading-[1.05] text-foreground uppercase mb-6">
                  {project.title}
                </h1>
                <p className="text-foreground/60 leading-relaxed max-w-[560px] text-base">
                  {project.description}
                </p>
                <div className="flex gap-2 flex-wrap mt-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`font-mono text-[8px] tracking-[0.14em] uppercase px-3 py-1.5 rounded-full border ${ac.tag}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: meta card */}
              <div className="border border-foreground/10 rounded-2xl p-6 bg-foreground/[0.02]">
                {[
                  { label: 'Tipo',  value: project.tipo  },
                  { label: 'Ano',   value: project.ano   },
                  { label: 'Stack', value: project.stack },
                ].map(({ label, value }, i) => (
                  <div key={label} className={i > 0 ? 'pt-4 mt-4 border-t border-foreground/[0.07]' : ''}>
                    <p className="font-mono text-[8px] tracking-[0.22em] uppercase text-foreground/30 mb-1">
                      {label}
                    </p>
                    <p className="font-mono text-[11px] text-foreground/70">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Demo interativo ───────────────────────────────────────────────── */}
        <section className="pb-0">
          <div className="container mx-auto max-w-[1120px] px-6">
            <div className={`h-px ${ac.line} opacity-25 mb-10`} />
            <p className="font-mono text-[9px] tracking-[0.30em] uppercase text-foreground/35 mb-8">
              [ DEMONSTRAÇÃO INTERATIVA ]
            </p>
          </div>
          <ProjectDemo slug={slug} />
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-[1120px]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-foreground/10 pt-10">
              <div>
                <p className="font-mono text-[9px] tracking-[0.30em] uppercase text-electric-red/70 mb-2">
                  [ PRÓXIMO PASSO ]
                </p>
                <p className="font-black text-[clamp(1.2rem,3vw,1.8rem)] tracking-tighter text-foreground uppercase leading-tight">
                  Quer algo assim?
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Link
                  href="/#contact"
                  className="font-mono text-[10px] tracking-[0.2em] uppercase px-6 py-3 rounded-full bg-electric-red text-white hover:bg-electric-red/90 transition-all duration-200 shadow-[0_0_24px_rgba(255,0,51,.20)] min-h-[44px] flex items-center justify-center"
                >
                  Solicitar proposta
                </Link>
                <Link
                  href="/projetos"
                  className="font-mono text-[10px] tracking-[0.2em] uppercase px-6 py-3 rounded-full border border-foreground/20 text-foreground/60 hover:border-foreground/35 hover:text-foreground transition-all duration-200 min-h-[44px] flex items-center justify-center"
                >
                  ← Ver todos os projetos
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
