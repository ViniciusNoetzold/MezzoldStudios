import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProjetosSection } from '@/components/sections/ProjetosSection';

export const metadata = {
  title: 'Projetos | Mezzold Studio',
  description:
    'Sites, sistemas, dashboards e experiências digitais criadas pela Mezzold Studio para performance, clareza e impacto real.',
  alternates: { canonical: 'https://mezzoldstudio.com.br/projetos' },
};

export default function ProjetosPage() {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-hidden">
        <ProjetosSection />
      </main>
      <Footer />
    </>
  );
}
