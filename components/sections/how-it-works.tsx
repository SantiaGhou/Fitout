"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { UserCheck, Brain, Activity, TrendingUp } from "lucide-react";

export function HowItWorksSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      icon: UserCheck,
      title: "Análise Inicial",
      description: "Avaliação completa do seu perfil físico, objetivos e histórico de saúde.",
      details: "Questionário detalhado + análise de composição corporal"
    },
    {
      icon: Brain,
      title: "IA Processa",
      description: "Nossa inteligência artificial cria seu plano personalizado de treino e dieta.",
      details: "Algoritmos analisam 200+ variáveis para otimização"
    },
    {
      icon: Activity,
      title: "Execução Guiada",
      description: "Treinos detalhados com vídeos e acompanhamento em tempo real.",
      details: "Feedback instantâneo e ajustes automáticos"
    },
    {
      icon: TrendingUp,
      title: "Evolução Contínua",
      description: "Monitoramento do progresso com ajustes semanais baseados nos resultados.",
      details: "Relatórios detalhados e metas atualizadas"
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Como a <span className="text-orange-500">IA</span> funciona?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Um processo científico e inteligente que se adapta completamente ao seu corpo e estilo de vida.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 transform -translate-y-1/2 rounded-full"></div>

          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-2 relative z-10">
                  <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className="text-sm text-orange-500 font-semibold mb-2">PASSO {index + 1}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">{step.description}</p>
                    <div className="text-sm text-gray-400 italic">{step.details}</div>
                  </div>
                </div>

                {/* Step connector for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-6">
                    <div className="w-1 h-8 bg-orange-500 rounded-full"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 border border-gray-700">
            <h3 className="text-3xl font-bold text-white mb-6">Tecnologia de Ponta</h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
              Nossa IA utiliza machine learning para analisar padrões de milhares de transformações 
              bem-sucedidas e aplicar esse conhecimento ao seu caso específico.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-black/50 rounded-xl">
                <div className="text-2xl font-bold text-orange-500 mb-2">200+</div>
                <div className="text-gray-400">Variáveis analisadas</div>
              </div>
              <div className="text-center p-6 bg-black/50 rounded-xl">
                <div className="text-2xl font-bold text-orange-500 mb-2">24/7</div>
                <div className="text-gray-400">Monitoramento ativo</div>
              </div>
              <div className="text-center p-6 bg-black/50 rounded-xl">
                <div className="text-2xl font-bold text-orange-500 mb-2">Real-time</div>
                <div className="text-gray-400">Ajustes automáticos</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}