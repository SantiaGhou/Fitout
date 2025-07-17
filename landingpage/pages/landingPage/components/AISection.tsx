import React, { useEffect, useState } from 'react';
import { Brain, Target, Zap, Clock } from 'lucide-react';

export function AISection() {
  const [isVisible, setIsVisible] = useState(false);
  const [chartAnimated, setChartAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          setTimeout(() => setChartAnimated(true), 500);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('ai-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const chartData = [
    { height: 60, color: 'bg-green-500', delay: 0 },
    { height: 80, color: 'bg-yellow-500', delay: 200 },
    { height: 45, color: 'bg-red-500', delay: 400 },
    { height: 95, color: 'bg-blue-500', delay: 600 },
    { height: 70, color: 'bg-purple-500', delay: 800 }
  ];

  const features = [
    { icon: Brain, text: 'IA Avançada' },
    { icon: Target, text: 'Precisão' },
    { icon: Zap, text: 'Rapidez' },
    { icon: Clock, text: 'Tempo Real' }
  ];

  return (
    <section id="ai-section" className="py-20 bg-[#111012] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            Nossa <span className="text-[#F74D00]">I.A</span>
          </h2>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Chart */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700">
                  <div className="flex items-end space-x-4 h-48">
                    {chartData.map((bar, index) => (
                      <div
                        key={index}
                        className={`w-12 ${bar.color} rounded-t transition-all duration-1000 ease-out transform hover:scale-110`}
                        style={{
                          height: chartAnimated ? `${bar.height}%` : '0%',
                          transitionDelay: `${bar.delay}ms`
                        }}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 text-gray-400 text-sm">
                    <span>Jan</span>
                    <span>Fev</span>
                    <span>Mar</span>
                    <span>Abr</span>
                    <span>Mai</span>
                  </div>
                </div>

                {/* Floating Icons */}
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`absolute w-12 h-12 bg-gradient-to-br from-[#F74D00] to-[#E63900] rounded-full flex items-center justify-center transform transition-all duration-1000 ${
                      chartAnimated ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}
                    style={{
                      top: `${20 + index * 20}%`,
                      [index % 2 === 0 ? 'left' : 'right']: '-24px',
                      transitionDelay: `${1000 + index * 200}ms`
                    }}
                  >
                    <feature.icon size={20} className="text-white" />
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="lg:w-1/2">
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Nossa IA analisa seus treinos em tempo real, ajusta sua dieta com base no desempenho e entrega 
                sugestões inteligentes para você <span className="text-[#F74D00] font-semibold">evoluir</span> mais rápido.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg transform transition-all duration-700 hover:bg-gray-800 hover:scale-105 ${
                      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                    }`}
                    style={{ transitionDelay: `${1200 + index * 100}ms` }}
                  >
                    <feature.icon size={24} className="text-[#F74D00]" />
                    <span className="text-white font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
