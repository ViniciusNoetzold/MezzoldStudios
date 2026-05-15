import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StackSection } from '@/components/sections/StackSection';

export const metadata = {
  title: 'Stack Tech | Mezzold Studio',
  description:
    'Conheça a stack utilizada pela Mezzold Studio para construir sites, sistemas, dashboards e produtos digitais de alta performance.',
  alternates: { canonical: 'https://mezzoldstudio.com.br/stack' },
};

export default function StackPage() {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-hidden">
        <StackSection />
      </main>
      <Footer />
    </>
  );
}
