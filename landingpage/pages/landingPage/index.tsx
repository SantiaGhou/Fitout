import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Carousel } from "./components/Carrousel";


export function LandingPage() {
  return (
    <div>
        <Header />
        <Hero />
        <Carousel />
    </div>
  );
}