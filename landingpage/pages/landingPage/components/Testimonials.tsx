import React, { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Personal Trainer',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'O FitOut revolucionou minha forma de treinar clientes. A IA realmente entende as necessidades individuais de cada pessoa.',
      rating: 5,
      results: 'Aumentou receita em 40%'
    },
    {
      name: 'João Santos',
      role: 'Atleta Amador',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'Perdi 15kg em 4 meses seguindo o plano personalizado. Nunca pensei que fosse possível com minha rotina corrida.',
      rating: 5,
      results: '-15kg em 4 meses'
    },
    {
      name: 'Ana Costa',
      role: 'Executiva',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'Finalmente encontrei um app que se adapta ao meu horário. Os treinos de 20 minutos são perfeitos para minha agenda.',
      rating: 5,
      results: 'Treinos eficientes'
    },
    {
      name: 'Carlos Mendes',
      role: 'Empresário',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'A análise nutricional é impressionante. Consegui ganhar massa muscular mantendo baixo percentual de gordura.',
      rating: 5,
      results: '+8kg massa magra'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const element = document.getElementById('testimonials');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isVisible, testimonials.length]);

  return (
    <section id="testimonials" className="py-20 bg-[#101010]">
      <div className="container mx-auto px-6">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            O que nossos <span className="text-[#F74D00]">usuários</span> dizem
          </h2>

          <div className="relative max-w-4xl mx-auto">
            {/* Main Testimonial */}
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-800 relative overflow-hidden">
              <Quote className="absolute top-6 left-6 text-[#F74D00] opacity-20" size={48} />
              
              <div className="relative z-10">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-500 ${
                      index === currentTestimonial 
                        ? 'opacity-100 transform translate-y-0' 
                        : 'opacity-0 transform translate-y-4 absolute inset-0'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                      {/* Avatar */}
                      <div className="relative">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-[#F74D00] shadow-lg transform hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-black flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center md:text-left">
                        <div className="flex justify-center md:justify-start mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              size={20}
                              className="text-yellow-400 fill-current transform hover:scale-125 transition-transform duration-200"
                              style={{ animationDelay: `${i * 100}ms` }}
                            />
                          ))}
                        </div>
                        
                        <blockquote className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed italic">
                          "{testimonial.content}"
                        </blockquote>
                        
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h4 className="text-white font-semibold text-lg">{testimonial.name}</h4>
                            <p className="text-gray-400">{testimonial.role}</p>
                          </div>
                          <div className="mt-4 md:mt-0">
                            <span className="bg-gradient-to-r from-[#F74D00] to-[#E63900] text-white px-4 py-2 rounded-full text-sm font-medium">
                              {testimonial.results}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-[#F74D00] w-8' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { number: '10K+', label: 'Usuários Ativos' },
              { number: '95%', label: 'Taxa de Satisfação' },
              { number: '2M+', label: 'Treinos Realizados' },
              { number: '4.9', label: 'Avaliação App Store' }
            ].map((stat, index) => (
              <div
                key={index}
                className={`text-center transform transition-all duration-700 hover:scale-105 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${800 + index * 100}ms` }}
              >
                <div className="text-2xl md:text-3xl font-bold text-[#F74D00] mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
