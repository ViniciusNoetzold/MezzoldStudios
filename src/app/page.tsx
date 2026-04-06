import { Header } from '@/components/layout/Header';
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
