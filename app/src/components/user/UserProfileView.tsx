import React from 'react';
import { ArrowLeft, Award, TrendingUp, Calendar, Target, Flame } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface UserProfileViewProps {
  userId: string;
  onBack: () => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({ userId, onBack }) => {
  // Mock user data - in real app this would come from API
  const userData = {
    id: userId,
    name: 'João Silva',
    email: 'joao@email.com',
    age: 28,
    gender: 'M' as const,
    objective: 'mass' as const,
    workoutType: 'gym' as const,
    frequency: 4,
    streak: 12,
    weight: 80,
    height: 175,
    totalWorkouts: 45,
    hasTrainer: false,
  };

  const calculateIMC = () => {
    const heightInMeters = userData.height / 100;
    return (userData.weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getObjectiveLabel = (objective: string) => {
    switch (objective) {
      case 'mass': return 'Ganho de massa';
      case 'fat_loss': return 'Perda de gordura';
      case 'health': return 'Saúde geral';
      default: return objective;
    }
  };

  const getObjectiveColor = (objective: string) => {
    switch (objective) {
      case 'mass': return 'text-accent-blue';
      case 'fat_loss': return 'text-accent-red';
      case 'health': return 'text-accent-green';
      default: return 'text-content-secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-content-primary">Perfil do Usuário</h1>
          <p className="text-content-secondary mt-1">
            Informações públicas de {userData.name}
          </p>
        </div>
      </div>

      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-background-tertiary rounded-full flex items-center justify-center">
              <span className="text-content-primary font-bold text-2xl">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-content-primary">
                {userData.name}
              </h2>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-content-secondary text-sm">
                  {userData.age} anos
                </span>
                <span className="text-content-secondary text-sm">
                  {userData.gender === 'M' ? 'Masculino' : 'Feminino'}
                </span>
              </div>
              <div className="flex items-center space-x-3 mt-2">
                <span className={`font-medium ${getObjectiveColor(userData.objective)}`}>
                  {getObjectiveLabel(userData.objective)}
                </span>
                {userData.hasTrainer && (
                  <span className="inline-block px-3 py-1 bg-accent-pink/20 text-accent-pink text-sm rounded-full">
                    <Award className="h-3 w-3 inline mr-1" />
                    Com Personal
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-content-brand mb-1">
            {calculateIMC()}
          </div>
          <div className="text-content-secondary text-sm">IMC</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-content-primary mb-1">
            {userData.streak}
          </div>
          <div className="text-content-secondary text-sm">Sequência</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-content-primary mb-1">
            {userData.totalWorkouts}
          </div>
          <div className="text-content-secondary text-sm">Treinos</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-content-primary mb-1">
            {userData.frequency}x
          </div>
          <div className="text-content-secondary text-sm">Por semana</div>
        </Card>
      </div>

      {/* Weekly Streak */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Flame className="h-6 w-6 text-accent-red" />
          <h3 className="text-lg font-semibold text-content-primary">Ofensiva Semanal</h3>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-content-secondary mb-1">{day}</div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                index < userData.frequency ? 'bg-accent-red text-white' : 'bg-background-tertiary text-content-secondary'
              }`}>
                {index < userData.frequency ? '🔥' : '—'}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <span className="text-content-primary font-bold">{userData.streak} dias consecutivos</span>
        </div>
      </Card>

      {/* Workout Stats */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Calendar className="h-6 w-6 text-accent-blue" />
          <h3 className="text-lg font-semibold text-content-primary">
            Estatísticas de Treino
          </h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-content-primary">
              {userData.totalWorkouts}
            </div>
            <div className="text-content-secondary text-sm">Total de treinos</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-content-primary">
              {userData.frequency}x
            </div>
            <div className="text-content-secondary text-sm">Por semana</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-content-primary">
              {userData.workoutType === 'gym' ? 'Musculação' : 'Cardio'}
            </div>
            <div className="text-content-secondary text-sm">Preferido</div>
          </div>
        </div>
      </Card>

      {/* Objective */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Target className="h-6 w-6 text-accent-green" />
          <h3 className="text-lg font-semibold text-content-primary">
            Objetivo Principal
          </h3>
        </div>
        <p className="text-content-secondary">
          {getObjectiveLabel(userData.objective)}
        </p>
      </Card>
    </div>
  );
};