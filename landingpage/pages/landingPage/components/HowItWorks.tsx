import React, { useEffect, useState } from 'react';
import { Smartphone, FileText, Dumbbell, BarChart3 } from 'lucide-react';

export function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const element = document.getElementById('how-it-works');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      icon: Smartphone,
      title: 'Você Entra no nosso app',
      description: 'Baixe o aplicativo e crie sua conta em segundos'
    },
    {
      icon: FileText,
      title: 'Responde nosso formulário',
      description: 'Conte sobre seus objetivos, limitações e preferências'
    },
    {
      icon: Dumbbell,
      title: 'Registra seu treino',
      description: 'Acompanhe seus exercícios e progressos em tempo real'
    },
    {
      icon: BarChart3,
      title: 'Nossa IA analisa seu perfil e monta sua dieta',
      description: 'Algoritmos avançados criam um plano personalizado para você'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#111012]">
      <div className="container mx-auto px-6">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            Como <span className="text-[#F74D00]">Funciona?</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-center transform transition-all duration-700 hover:scale-105 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#F74D00] to-[#E63900] rounded-full flex items-center justify-center mx-auto transform hover:rotate-12 transition-transform duration-300 group">
                    <step.icon size={32} className="text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-[#F74D00] to-transparent"></div>
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-white">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
