import React, { useState } from 'react';
import { Camera, Edit, Save, Award, TrendingUp, Calendar, User } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../contexts/AuthContext';

export const UserProfile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const profile = user?.profile as any;
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    weight: profile?.weight || 0,
    height: profile?.height || 0,
  });

  const calculateIMC = () => {
    if (profile?.height && profile?.weight) {
      const heightInMeters = profile.height / 100;
      return (profile.weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return '0';
  };

  const getIMCCategory = (imc: number) => {
    if (imc < 18.5) return { label: 'Abaixo do peso', color: 'text-accent-blue' };
    if (imc < 25) return { label: 'Peso normal', color: 'text-accent-green' };
    if (imc < 30) return { label: 'Sobrepeso', color: 'text-accent-lime' };
    return { label: 'Obesidade', color: 'text-accent-red' };
  };

  const handleSave = () => {
    updateProfile({
      ...profile,
      weight: editData.weight,
      height: editData.height,
    });
    // Update user name would require a different method
    setIsEditing(false);
  };

  const imc = parseFloat(calculateIMC());
  const imcCategory = getIMCCategory(imc);

  // Mock progress data
  const progressData = [
    { month: 'Jan', weight: 85 },
    { month: 'Fev', weight: 83 },
    { month: 'Mar', weight: 81 },
    { month: 'Abr', weight: 80 },
    { month: 'Mai', weight: 78 },
  ];

  const workoutStats = {
    totalWorkouts: 45,
    thisMonth: 12,
    streak: profile?.streak || 0,
    favorite: profile?.workoutType === 'gym' ? 'Musculação' : 
              profile?.workoutType === 'cardio' ? 'Cardio' : 
              profile?.workoutType === 'functional' ? 'Funcional' : 'Outro'
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-content-primary">Meu Perfil</h1>
        <p className="text-content-secondary mt-1">
          Acompanhe seu progresso e gerencie suas informações
        </p>
      </div>

      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-background-tertiary rounded-full flex items-center justify-center">
                {profile?.photo ? (
                  <img 
                    src={profile.photo} 
                    alt={user?.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-12 w-12 text-content-secondary" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-content-brand rounded-full flex items-center justify-center">
                <Camera className="h-4 w-4 text-white" />
              </button>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-content-primary">
                {user?.name || 'Usuário'}
              </h2>
              <p className="text-content-secondary">{user?.email}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-content-secondary text-sm">
                  {profile?.age} anos
                </span>
                <span className="text-content-secondary text-sm">
                  {profile?.gender === 'M' ? 'Masculino' : 'Feminino'}
                </span>
                <span className="text-content-secondary text-sm">
                  Tipo {profile?.bloodType}
                </span>
              </div>
              {profile?.hasTrainer && (
                <span className="inline-block mt-2 px-3 py-1 bg-accent-pink/20 text-accent-pink text-sm rounded-full">
                  <Award className="h-3 w-3 inline mr-1" />
                  Acompanhado por Personal
                </span>
              )}
            </div>
          </div>

          <Button 
            variant="outline" 
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? 'Cancelar' : 'Editar Perfil'}
          </Button>
        </div>
      </Card>

      {/* Edit Form */}
      {isEditing && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-content-primary mb-4">
            Editar Informações
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Nome"
              value={editData.name}
              onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
            />
            <Input
              label="Peso (kg)"
              type="number"
              value={editData.weight}
              onChange={(e) => setEditData(prev => ({ ...prev, weight: parseInt(e.target.value) }))}
            />
            <Input
              label="Altura (cm)"
              type="number"
              value={editData.height}
              onChange={(e) => setEditData(prev => ({ ...prev, height: parseInt(e.target.value) }))}
            />
          </div>
          <Button onClick={handleSave} className="mt-4">
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-content-brand mb-1">
            {calculateIMC()}
          </div>
          <div className="text-content-secondary text-sm mb-1">IMC</div>
          <div className={`text-xs font-medium ${imcCategory.color}`}>
            {imcCategory.label}
          </div>
        </Card>

        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-content-primary mb-1">
            {profile?.weight || 0}kg
          </div>
          <div className="text-content-secondary text-sm">Peso Atual</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-content-primary mb-1">
            {workoutStats.streak}
          </div>
          <div className="text-content-secondary text-sm">Sequência</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-content-primary mb-1">
            {workoutStats.totalWorkouts}
          </div>
          <div className="text-content-secondary text-sm">Treinos</div>
        </Card>
      </div>

      {/* Progress Chart */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="h-6 w-6 text-accent-green" />
          <h3 className="text-lg font-semibold text-content-primary">
            Evolução do Peso
          </h3>
        </div>
        
        <div className="space-y-3">
          {progressData.map((data, index) => (
            <div key={data.month} className="flex items-center space-x-4">
              <div className="w-12 text-content-secondary text-sm">
                {data.month}
              </div>
              <div className="flex-1 bg-background-tertiary rounded-full h-3 relative overflow-hidden">
                <div 
                  className="bg-accent-green h-3 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${Math.min(((90 - data.weight) / 10) * 100, 100)}%` 
                  }}
                ></div>
              </div>
              <div className="w-12 text-content-primary font-medium text-sm">
                {data.weight}kg
              </div>
            </div>
          ))}
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
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-content-primary">
              {workoutStats.totalWorkouts}
            </div>
            <div className="text-content-secondary text-sm">Total de treinos</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-content-primary">
              {workoutStats.thisMonth}
            </div>
            <div className="text-content-secondary text-sm">Este mês</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-content-primary">
              {profile?.frequency || 0}x
            </div>
            <div className="text-content-secondary text-sm">Por semana</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-content-primary">
              {workoutStats.favorite}
            </div>
            <div className="text-content-secondary text-sm">Preferido</div>
          </div>
        </div>
      </Card>

      {/* Objective and Preferences */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-content-primary mb-4">
          Objetivo e Preferências
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-content-primary mb-2">Objetivo Principal</h4>
            <p className="text-content-secondary">
              {profile?.objective === 'mass' ? 'Ganho de massa muscular' :
               profile?.objective === 'fat_loss' ? 'Perda de gordura' :
               profile?.objective === 'health' ? 'Melhoria da saúde' : 'Não definido'}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-content-primary mb-2">Horário Preferido</h4>
            <p className="text-content-secondary">
              {profile?.schedule === 'morning' ? 'Manhã' :
               profile?.schedule === 'afternoon' ? 'Tarde' :
               profile?.schedule === 'evening' ? 'Noite' : 'Flexível'}
            </p>
          </div>
          
          {profile?.allergies && (
            <div>
              <h4 className="font-medium text-content-primary mb-2">Alergias</h4>
              <p className="text-content-secondary">{profile.allergies}</p>
            </div>
          )}
          
          {profile?.avoidFoods && (
            <div>
              <h4 className="font-medium text-content-primary mb-2">Alimentos Evitados</h4>
              <p className="text-content-secondary">{profile.avoidFoods}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};