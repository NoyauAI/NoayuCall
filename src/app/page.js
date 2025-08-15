import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FinalCtaSection from "@/components/landing/FinalCtaSection";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <FinalCtaSection>
          <Button size="lg" className="bg-white cursor-pointer text-blue-600 font-bold py-3 px-8 rounded-lg text-lg hover:bg-slate-100 transition-colors shadow-2xl">
            Começar grátis
          </Button>
        </FinalCtaSection>
      </main>
      <Footer />
    </div>
  );
}