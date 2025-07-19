import React from 'react';
import { Coffee, Sun, Moon, Apple, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { useAuth } from '../../contexts/AuthContext';

interface Meal {
  id: string;
  name: string;
  time: string;
  foods: string[];
  calories: number;
}

export const UserDiet: React.FC = () => {
  const { user } = useAuth();
  const profile = user?.profile as any;
  
  // Check if user worked out today (mock data)
  const workedOutToday = true; // This would come from actual workout data

  const dietPlan: Meal[] = workedOutToday ? [
    {
      id: '1',
      name: 'Café da Manhã',
      time: '07:00',
      foods: [
        '2 fatias de pão integral',
        '2 ovos mexidos',
        '1 banana',
        '1 copo de leite desnatado'
      ],
      calories: 450
    },
    {
      id: '2',
      name: 'Lanche da Manhã',
      time: '10:00',
      foods: [
        '1 iogurte grego',
        '1 colher de granola',
        '1 punhado de castanhas'
      ],
      calories: 280
    },
    {
      id: '3',
      name: 'Almoço',
      time: '12:30',
      foods: [
        '150g de frango grelhado',
        '1 xícara de arroz integral',
        'Salada verde à vontade',
        '1 colher de azeite'
      ],
      calories: 650
    },
    {
      id: '4',
      name: 'Lanche da Tarde',
      time: '15:30',
      foods: [
        '1 shake de whey protein',
        '1 banana',
        '1 colher de pasta de amendoim'
      ],
      calories: 320
    },
    {
      id: '5',
      name: 'Jantar',
      time: '19:00',
      foods: [
        '150g de salmão grelhado',
        'Batata doce assada',
        'Brócolis refogado',
        'Salada de folhas verdes'
      ],
      calories: 580
    },
    {
      id: '6',
      name: 'Ceia',
      time: '21:30',
      foods: [
        '1 copo de leite desnatado',
        '2 castanhas do Brasil'
      ],
      calories: 180
    }
  ] : [
    {
      id: '1',
      name: 'Café da Manhã',
      time: '07:00',
      foods: [
        '1 fatia de pão integral',
        '1 ovo cozido',
        '1 fruta pequena',
        'Chá verde'
      ],
      calories: 280
    },
    {
      id: '2',
      name: 'Almoço',
      time: '12:30',
      foods: [
        'Salada completa com proteína magra',
        '1 colher de azeite',
        '1 fatia pequena de pão integral'
      ],
      calories: 400
    },
    {
      id: '3',
      name: 'Lanche',
      time: '15:30',
      foods: [
        '1 iogurte natural',
        '1 punhado pequeno de frutas vermelhas'
      ],
      calories: 150
    },
    {
      id: '4',
      name: 'Jantar',
      time: '19:00',
      foods: [
        'Sopa de legumes',
        '100g de proteína magra',
        'Salada verde'
      ],
      calories: 350
    }
  ];

  const totalCalories = dietPlan.reduce((sum, meal) => sum + meal.calories, 0);

  const getMealIcon = (mealName: string) => {
    if (mealName.toLowerCase().includes('café')) return Coffee;
    if (mealName.toLowerCase().includes('almoço')) return Sun;
    if (mealName.toLowerCase().includes('jantar') || mealName.toLowerCase().includes('ceia')) return Moon;
    return Apple;
  };

  const getObjectiveMessage = () => {
    switch (profile?.objective) {
      case 'mass':
        return 'Dieta para ganho de massa muscular - Rica em proteínas e carboidratos';
      case 'fat_loss':
        return 'Dieta para perda de gordura - Controlada em calorias e rica em nutrientes';
      case 'health':
        return 'Dieta para saúde geral - Balanceada e nutritiva';
      default:
        return 'Dieta personalizada baseada no seu perfil';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-content-primary">Minha Dieta</h1>
        <p className="text-content-secondary mt-1">
          {getObjectiveMessage()}
        </p>
      </div>

      {/* Daily Summary */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-content-primary">
            Resumo do Dia
          </h2>
          <div className="text-right">
            <div className="text-2xl font-bold text-content-brand">
              {totalCalories}
            </div>
            <div className="text-content-secondary text-sm">calorias totais</div>
          </div>
        </div>

        {!workedOutToday && (
          <Card className="bg-accent-blue/10 border-accent-blue/20 mb-4">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-accent-blue" />
              <div>
                <p className="text-accent-blue font-medium">
                  Você não treinou hoje
                </p>
                <p className="text-content-secondary text-sm">
                  Aqui estão sugestões de refeições mais leves para o dia
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-content-primary">
              {Math.round(totalCalories * 0.3)}
            </div>
            <div className="text-content-secondary text-sm">Proteínas</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-content-primary">
              {Math.round(totalCalories * 0.45)}
            </div>
            <div className="text-content-secondary text-sm">Carboidratos</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-content-primary">
              {Math.round(totalCalories * 0.25)}
            </div>
            <div className="text-content-secondary text-sm">Gorduras</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-content-primary">
              2.5L
            </div>
            <div className="text-content-secondary text-sm">Água</div>
          </div>
        </div>
      </Card>

      {/* Meal Plan */}
      <div className="grid gap-4">
        {dietPlan.map((meal) => {
          const MealIcon = getMealIcon(meal.name);
          
          return (
            <Card key={meal.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-content-brand/20 rounded-full flex items-center justify-center">
                    <MealIcon className="h-5 w-5 text-content-brand" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-content-primary">
                      {meal.name}
                    </h3>
                    <p className="text-content-secondary text-sm">{meal.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-content-brand">
                    {meal.calories}
                  </div>
                  <div className="text-content-secondary text-sm">kcal</div>
                </div>
              </div>

              <div className="space-y-2">
                {meal.foods.map((food, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-content-brand rounded-full"></div>
                    <span className="text-content-primary">{food}</span>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Tips */}
      <Card className="p-6 bg-background-tertiary">
        <h3 className="text-lg font-semibold text-content-primary mb-3">
          💡 Dicas Importantes
        </h3>
        <div className="space-y-2 text-content-secondary">
          <p>• Beba pelo menos 2,5L de água ao longo do dia</p>
          <p>• Faça as refeições nos horários sugeridos</p>
          <p>• Evite alimentos processados e açúcares refinados</p>
          {profile?.allergies && (
            <p>• ⚠️ Lembre-se das suas restrições: {profile.allergies}</p>
          )}
          {profile?.avoidFoods && (
            <p>• ❌ Alimentos a evitar: {profile.avoidFoods}</p>
          )}
        </div>
      </Card>
    </div>
  );
};