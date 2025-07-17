import { Plus_Jakarta_Sans } from 'next/font/google'
import { HeroSlider } from './HeroSlider'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export function Hero() {
  return (
    <main
      className="relative flex flex-col items-center justify-center min-h-screen
                 bg-[url('/assets/images/hero-bg.png')] bg-cover bg-center px-4"
    >
      <div className="flex flex-col items-center max-w-7xl w-full pt-28 text-white text-center">
        <h1
          className={`${plusJakarta.className} text-4xl md:text-5xl lg:text-6xl max-w-3xl font-bold drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]`}
        >
          Se seu corpo não é padrão. Seu plano também não deveria ser.
        </h1>

        <div className="mt-12 w-full flex justify-center">
          <HeroSlider />
        </div>

        <button
          className=" mt-7 mb-7 px-4 py-2 rounded-md bg-[#F74D00] hover:bg-[#F74D00] transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-[#F74D00]/40"
        >
          Comece agora
        </button>
      </div>
    </main>
  )
}
