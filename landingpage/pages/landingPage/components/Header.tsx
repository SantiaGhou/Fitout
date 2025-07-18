import Image from "next/image";
import Logo from "../../../public/assets/svg/Logo.svg";

export function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-between items-center p-10 text-white bg-gradient-to-b from-[#0F0F10] to-transparent">
      <div>
        <Image src={Logo} alt="Logo" />
      </div>
      <nav>
        <ul className="flex gap-10 font-poppins text-lg ">
          <li>
            <a
              href="#como-funciona"
              className="transition-all duration-200 hover:scale-105 hover:text-[#F74D00] hover:underline hover:underline-offset-4 hover:decoration-[#F74D00]"
            >
              Como Funciona?
            </a>
          </li>
          <li>
            <a
              href="#nossa-ia"
              className="transition-all duration-200 hover:scale-105 hover:text-[#F74D00] hover:underline hover:underline-offset-4 hover:decoration-[#F74D00]"
            >
              Nossa I.A
            </a>
          </li>
          <li>
            <a
              href="#para-treinadores"
              className="transition-all duration-200 hover:scale-105 hover:text-[#F74D00] hover:underline hover:underline-offset-4 hover:decoration-[#F74D00]"
            >
              Para Treinadores
            </a>
          </li>
          <li>
            <a
              href="#depoimentos"
              className="transition-all duration-200 hover:scale-105 hover:text-[#F74D00] hover:underline hover:underline-offset-4 hover:decoration-[#F74D00]"
            >
              Depoimentos
            </a>
          </li>
        </ul>
      </nav>
      <div>
        <button className="px-4 py-2 rounded-md bg-[#F74D00] hover:bg-[#F74D00] transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-[#F74D00]/40">
          Entrar
        </button>
      </div>
    </header>
  );
}