import { Navbar } from '@/components/landing/navbar';
import { HeroSection } from '@/components/landing/hero-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { FaqSection } from '@/components/landing/faq-section';
import { CtaSection } from '@/components/landing/cta-section';
import { Footer } from '@/components/landing/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
