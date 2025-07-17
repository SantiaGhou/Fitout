import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Carousel } from "./components/Carrousel";
import { HowItWorks } from "./components/HowItWorks";
import { AISection } from "./components/AiSection";
import { Testimonials } from "./components/Testimonials";
import { TrainerBenefits } from "./components/TrainerBenefits ";


export function LandingPage() {
  return (
    <div>
        <Header />
        <Hero />
        <Carousel />
        <HowItWorks />
        <AISection />
        <TrainerBenefits />
        <Testimonials />
    </div>
  );
}