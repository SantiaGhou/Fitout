import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Carousel } from "./components/Carrousel";
import { HowItWorks } from "./components/HowItWorks";


export function LandingPage() {
  return (
    <div>
        <Header />
        <Hero />
        <Carousel />
        <HowItWorks />
    </div>
  );
}