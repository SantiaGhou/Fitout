import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { CTASection } from "@/components/sections/cta";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section id="hero">
        <HeroSection />
      </section>
      
      <section id="about">
        <AboutSection />
      </section>
      
      <section id="how-it-works">
        <HowItWorksSection />
      </section>
           
      <section id="cta">
        <CTASection />
      </section>
      
      <Footer />
    </main>
  );
}