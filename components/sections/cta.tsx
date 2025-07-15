"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Trophy } from "lucide-react";

export function CTASection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,165,0,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl lg:text-6xl font-bold text-white mb-6"
          >
            Sua transformação começa <span className="text-orange-500">agora</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-gray-300 mb-12 leading-relaxed"
          >
            Junte-se a mais de 50.000 pessoas que já transformaram seus corpos com inteligência artificial. 
            Resultados reais, sem enrolação.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-12 py-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
              onClick={() => {
                // Aqui você pode adicionar lógica de cadastro/redirecionamento
                console.log('Iniciar cadastro');
              }}
            >
              Começar Transformação
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gray-600 text-black hover:bg-gray-800 px-12 py-6 rounded-xl text-lg transition-all duration-300"
              onClick={() => {
                // Aqui você pode adicionar lógica de login/redirecionamento
                console.log('Fazer login');
              }}
            >
              Fazer Login
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid md:grid-cols-3 gap-8 mb-12"
          >
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
              <Shield className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <div className="text-2xl font-bold text-white mb-2">7 dias grátis</div>
              <div className="text-gray-300">Teste sem compromisso</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
              <Clock className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <div className="text-2xl font-bold text-white mb-2">Resultados em 30 dias</div>
              <div className="text-gray-300">Ou seu dinheiro de volta</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
              <Trophy className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <div className="text-2xl font-bold text-white mb-2">Suporte premium</div>
              <div className="text-gray-300">Especialistas 24/7</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <p className="text-gray-400 text-sm mb-4">
              Mais de 50.000 transformações realizadas • Avaliação 4.9/5 ⭐
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <span>✓ Sem fidelidade</span>
              <span>✓ Cancele quando quiser</span>
              <span>✓ Dados seguros</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}