import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ClientesSection } from '@/components/sections/ClientesSection';

export const metadata = {
  title: 'Clientes | Mezzold Studio',
  description:
    'Veja sites e projetos digitais desenvolvidos pela Mezzold Studio com prévias interativas e acesso direto aos projetos publicados.',
};

export default function ClientesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ClientesSection />
      </main>
      <Footer />
    </>
  );
}
