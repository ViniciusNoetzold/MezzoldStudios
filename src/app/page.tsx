import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'Mezzold Studio | Software House Premium',
  description: 'Mezzold Studio constrói sites, Micro SaaS e dashboards ultra-rápidos com design inovador. Somos uma software house focada em marcas SaaS e empresas digital-first ambiciosas.',
  alternates: { canonical: 'https://mezzoldstudio.com.br' },
  openGraph: {
    url: 'https://mezzoldstudio.com.br',
    title: 'Mezzold Studio | Software House Premium',
    description: 'Mezzold Studio constrói sites, Micro SaaS e dashboards ultra-rápidos com design inovador para marcas digitais ambiciosas.',
  },
};
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SpecialtiesSection } from '@/components/sections/SpecialtiesSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { AccentProvider } from '@/components/layout/AccentProvider';

export default function Home() {
  return (
    <>
      <Header />
      <AccentProvider>
        <main className="flex-1">
          <HeroSection />
          <AboutSection />
          <SpecialtiesSection />
          <ServicesSection />
          <ProcessSection />
          <PortfolioSection />
          <ContactSection />
        </main>
      </AccentProvider>
      <Footer />
    </>
  );
}
