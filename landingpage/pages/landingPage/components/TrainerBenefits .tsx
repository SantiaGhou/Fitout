import {
  Clock,
  TrendingUp,
  Users,
  Brain,
  Target,
  Smartphone,
  BarChart3,
  Heart,
  Zap,
  Shield,
  CheckCircle,
  Star
} from 'lucide-react';

export const TrainerBenefits = () => {
  const benefitCategories = [
    {
      title: "Eficiência Operacional",
      icon: <Clock className="h-6 w-6" aria-hidden="true" />,
      color: "primary",
      benefits: [
        {
          icon: <Clock className="h-5 w-5" aria-hidden="true" />,
          title: "Economize 70% do tempo",
          description: "Crie dietas personalizadas em minutos, não horas"
        },
        {
          icon: <Smartphone className="h-5 w-5" aria-hidden="true" />,
          title: "Trabalhe de qualquer lugar",
          description: "App móvel completo para atender seus alunos onde estiver"
        },
        {
          icon: <Zap className="h-5 w-5" aria-hidden="true" />,
          title: "Automação inteligente",
          description: "IA que aprende e otimiza seus métodos de trabalho"
        }
      ]
    },
    {
      title: "Resultados Superiores",
      icon: <TrendingUp className="h-6 w-6" aria-hidden="true" />,
      color: "secondary",
      benefits: [
        {
          icon: <Target className="h-5 w-5" aria-hidden="true" />,
          title: "Precisão cientificamente comprovada",
          description: "Algoritmos baseados em estudos nutricionais mais recentes"
        },
        {
          icon: <TrendingUp className="h-5 w-5" aria-hidden="true" />,
          title: "Aumento de 85% na aderência",
          description: "Seus alunos seguem dietas mais personalizadas e realistas"
        },
        {
          icon: <Heart className="h-5 w-5" aria-hidden="true" />,
          title: "Resultados 3x mais rápidos",
          description: "Combinação perfeita entre treino e alimentação"
        }
      ]
    },
    {
      title: "Gestão de Clientes",
      icon: <Users className="h-6 w-6" aria-hidden="true" />,
      color: "accent",
      benefits: [
        {
          icon: <Users className="h-5 w-5" aria-hidden="true" />,
          title: "Acompanhe mais alunos",
          description: "Gerencie até 3x mais clientes com a mesma qualidade"
        },
        {
          icon: <BarChart3 className="h-5 w-5" aria-hidden="true" />,
          title: "Relatórios detalhados",
          description: "Evolução completa de cada aluno em tempo real"
        },
        {
          icon: <CheckCircle className="h-5 w-5" aria-hidden="true" />,
          title: "Histórico completo",
          description: "Todos os treinos e dietas organizados automaticamente"
        }
      ]
    },
    {
      title: "Diferencial Competitivo",
      icon: <Star className="h-6 w-6" aria-hidden="true" />,
      color: "secondary",
      benefits: [
        {
          icon: <Brain className="h-5 w-5" aria-hidden="true" />,
          title: "Seja o primeiro com IA",
          description: "Destaque-se oferecendo tecnologia de ponta"
        },
        {
          icon: <Shield className="h-5 w-5" aria-hidden="true" />,
          title: "Respaldo científico",
          description: "Dietas baseadas em dados, não em achismos"
        },
        {
          icon: <Star className="h-5 w-5" aria-hidden="true" />,
          title: "Satisfação garantida",
          description: "Clientes mais felizes e resultados mais consistentes"
        }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-[#1f1f1f]',
          border: 'border-[#2e2e2e]',
          text: 'text-white',
          hover: 'hover:bg-[#2c2c2c]'
        };
      case 'secondary':
        return {
          bg: 'bg-[#2a2a2a]',
          border: 'border-[#3d3d3d]',
          text: 'text-white',
          hover: 'hover:bg-[#3a3a3a]'
        };
      case 'accent':
        return {
          bg: 'bg-[#222]',
          border: 'border-[#333]',
          text: 'text-white',
          hover: 'hover:bg-[#333]'
        };
      default:
        return {
          bg: 'bg-[#1f1f1f]',
          border: 'border-[#2e2e2e]',
          text: 'text-white',
          hover: 'hover:bg-[#2c2c2c]'
        };
    }
  };

  return (
    <section className="py-20 bg-[#171717] text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-[#2c2c2c] border border-[#3a3a3a] rounded-full px-4 py-2 mb-6 select-none">
              <Target className="h-4 w-4 text-white" aria-hidden="true" />
              <span className="text-sm font-medium text-white">Benefícios exclusivos</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Por que <span className="text-primary text-white font-extrabold">milhares</span> de personal trainers <br className="hidden md:block" />
              escolhem o <span className="text-white underline decoration-primary">FitOut</span>?
            </h2>

            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Descubra como nossa plataforma pode transformar sua carreira e potencializar
              os resultados dos seus alunos de forma nunca vista antes.
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {benefitCategories.map((category, categoryIndex) => {
              const colors = getColorClasses(category.color);

              return (
                <div
                  key={categoryIndex}
                  className={`rounded-2xl p-8 border ${colors.border} ${colors.bg} hover:scale-[1.01] transition-all duration-500 ease-in-out animate-slide-up`}
                  style={{ animationDelay: `${categoryIndex * 0.1}s` }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-xl border ${colors.border}`}>
                      <div className={colors.text}>
                        {category.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.benefits.map((benefit, benefitIndex) => (
                      <div
                        key={benefitIndex}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#2a2a2a] transition-colors"
                      >
                        <div className={`p-2 rounded-lg ${colors.bg} ${colors.text} flex-shrink-0`}>
                          {benefit.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{benefit.title}</h4>
                          <p className="text-sm text-gray-400">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center rounded-2xl p-10 bg-gradient-to-r from-[#202020] via-[#2b2b2b] to-[#202020] animate-fade-in">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Pronto para revolucionar sua metodologia?</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Junte-se aos profissionais que já descobriram o futuro do personal training
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                className="bg-white text-black hover:bg-gray-300 px-8 py-3 rounded-lg font-semibold transition-all"
              >
                Começar Teste Gratuito
              </button>
              <button
                type="button"
                className="border border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold transition-all"
              >
                Agendar Demonstração
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
