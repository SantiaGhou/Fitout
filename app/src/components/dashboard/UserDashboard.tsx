import React from 'react';
import { Flame, Target, TrendingUp, Users, Calendar, Award } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

interface StreakData {
  current: number;
  best: number;
  lastWorkout: string;
  weekData: boolean[];
}

interface UserProfile {
  streak: StreakData;
  workoutDays: string[]; 
  height?: number;
  weight?: number;
  workoutType?: string;
}

interface User {
  name: string;
  profile?: UserProfile;
}

interface AuthContext {
  user: User | null;
}

interface UserDashboardProps {
  onNavigate?: (page: string) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth() as AuthContext;

  const streak = user?.profile?.streak || { current: 10, best: 1, lastWorkout: '', weekData: [] };
  const workoutDays = user?.profile?.workoutDays?.length || 0;

  // Calculate IMC
  const calculateIMC = () => {
    if (user?.profile?.height && user?.profile?.weight) {
      const heightInMeters = user.profile.height / 100;
      return (user.profile.weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return '0';
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const stats = [
    { label: 'Sequência atual', value: streak.current, icon: Flame, color: 'text-[#F74D00]' },
    { label: 'Dias treinados', value: workoutDays, icon: Target, color: 'text-accent-green' },
    {
      label: 'Peso atual',
      value: `${user?.profile?.weight || 0}kg`,
      icon: TrendingUp,
      color: 'text-accent-blue',
    },
    { label: 'IMC', value: calculateIMC(), icon: Award, color: 'text-accent-lime' },
  ];

  // Render streak calendar for the week
  const renderStreakCalendar = () => {
    const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
    return (
      <div className="flex space-x-2">
        {days.map((day, index) => (
          <div
            key={day}
            className={`w-10 h-10 rounded-[10px] flex items-center justify-center text-sm ${
              streak.weekData[index]
                ? 'bg-accent-green text-white'
                : 'bg-background-gray text-content-secondary'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  return (
    
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-content-primary">
            {getGreeting()}, {user?.name || 'Atleta'}!
          </h1>
          <p className="text-content-secondary mt-1">
            Continue sua jornada fitness
          </p>
        </div>
      </div>
    
          <Card className="bg-gradient-to-r from-black to-zinc-800 border-accent-green/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3">
              <Flame className="text-[#F74D00]" size={24} />
      </div>
            <div>
              <h3 className="text-xl font-bold text-content-primary">Ofensiva Atual</h3>
              <p className="text-content-secondary">Continue assim!</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-[#F74D00]">{streak.current}</div>
            <div className="text-sm text-content-secondary">dias</div>
          </div>
        </div>

        <div className="mb-4 radius-24 bg-gradient-to-r from-black to-zinc-800 p-4">
          <div className="flex justify-betweentext-sm text-content-secondary mb-2">
            <span>Esta semana</span>
            <span>Melhor: {streak.best} dias</span>
          </div>
          {renderStreakCalendar()}
        </div>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
            <div className="text-2xl font-bold text-content-primary">{stat.value}</div>
            <div className="text-sm text-content-secondary">{stat.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card variant="hover">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="h-6 w-6 text-accent-green" />
            <h3 className="text-lg font-semibold text-content-primary">Treino de Hoje</h3>
          </div>
          <p className="text-content-secondary mb-4">
            {user?.profile?.workoutType === 'gym'
              ? 'Musculação - Peito e Tríceps'
              : 'Nenhum treino programado para hoje'}
          </p>
          <Button className="w-full" onClick={() => onNavigate?.('workout')}>
            {user?.profile?.workoutType ? 'Iniciar Treino' : 'Criar Treino'}
          </Button>
        </Card>

        <Card variant="hover">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="h-6 w-6 text-accent-blue" />
            <h3 className="text-lg font-semibold text-content-primary">Dieta de Hoje</h3>
          </div>
          <p className="text-content-secondary mb-4">
            Plano nutricional personalizado baseado no seu objetivo
          </p>
          <Button variant="outline" className="w-full" onClick={() => onNavigate?.('diet')}>
            Ver Dieta
          </Button>
        </Card>
      </div>

      <Card>
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="h-6 w-6 text-accent-lime" />
          <h3 className="text-lg font-semibold text-content-primary">Progresso da Semana</h3>
        </div>
        <div className="space-y-3">
          {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'].map((day, index) => (
            <div key={day} className="flex items-center space-x-3">
              <div className="w-8 text-content-secondary text-sm">{day}</div>
              <div className="flex-1 bg-background-tertiary rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    index < workoutDays ? 'bg-accent-green' : 'bg-background-gray'
                  }`}
                  style={{ width: index < workoutDays ? '100%' : '0%' }}
                ></div>
              </div>
              <div className="text-sm text-content-secondary">
                {index < workoutDays ? '✓' : '—'}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card variant="hover">
        <div className="flex items-center space-x-3 mb-4">
          <Users className="h-6 w-6 text-accent-pink" />
          <h3 className="text-lg font-semibold text-content-primary">Comunidade</h3>
        </div>
        <p className="text-content-secondary mb-4">
          Conecte-se com outros atletas e personal trainers
        </p>
        <Button variant="outline" className="w-full" onClick={() => onNavigate?.('community')}>
          Explorar Comunidade
        </Button>
      </Card>


    </div>
  );
};