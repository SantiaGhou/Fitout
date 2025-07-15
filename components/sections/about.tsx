"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Brain, Target, Zap, Shield } from "lucide-react";

export function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Brain,
      title: "IA que Aprende",
      description: "Algoritmos que analisam seu progresso e ajustam treinos em tempo real para máxima eficiência."
    },
    {
      icon: Target,
      title: "100% Personalizado",
      description: "Cada treino e refeição é criado especificamente para seu corpo, objetivos e limitações."
    },
    {
      icon: Zap,
      title: "Resultados Acelerados",
      description: "Otimização contínua baseada em dados científicos para transformação mais rápida."
    },
    {
      icon: Shield,
      title: "Seguro e Eficaz",
      description: "Protocolos validados por especialistas em educação física e nutrição esportiva."
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            O que é o <span className="text-orange-500">FitOut</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A primeira plataforma que combina inteligência artificial com ciência do exercício 
            para criar transformações físicas reais e duradouras.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-12 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-8">Números que Comprovam</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">95%</div>
              <div className="text-gray-300">Atingem seus objetivos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">50k+</div>
              <div className="text-gray-300">Vidas transformadas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">-18kg</div>
              <div className="text-gray-300">Perda média de peso</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">4.9★</div>
              <div className="text-gray-300">Avaliação dos usuários</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}