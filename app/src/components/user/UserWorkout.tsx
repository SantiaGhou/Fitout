import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, Dumbbell } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../contexts/AuthContext';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: number;
  notes?: string;
}

interface Workout {
  id: string;
  name: string;
  date: string;
  exercises: Exercise[];
  completed: boolean;
}

export const UserWorkout: React.FC = () => {
  const { user } = useAuth();
  const profile = user?.profile as any;
  const hasTrainer = profile?.hasTrainer;

  const [showForm, setShowForm] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [newExercise, setNewExercise] = useState<Partial<Exercise>>({
    name: '',
    sets: 3,
    reps: '',
    weight: undefined,
    notes: ''
  });

  // Mock workouts data
  const userWorkouts: Workout[] = [
    {
      id: '1',
      name: 'Peito e Tríceps',
      date: '2024-01-15',
      completed: true,
      exercises: [
        { id: '1', name: 'Supino Reto', sets: 4, reps: '8-10', weight: 80 },
        { id: '2', name: 'Supino Inclinado', sets: 3, reps: '10-12', weight: 70 },
        { id: '3', name: 'Tríceps Pulley', sets: 3, reps: '12-15', weight: 40 },
      ]
    },
    {
      id: '2',
      name: 'Costas e Bíceps',
      date: '2024-01-13',
      completed: false,
      exercises: [
        { id: '4', name: 'Puxada Frontal', sets: 4, reps: '8-10', weight: 60 },
        { id: '5', name: 'Remada Curvada', sets: 3, reps: '10-12', weight: 50 },
      ]
    }
  ];

  const todayWorkout = userWorkouts.find(w => w.date === new Date().toISOString().split('T')[0]);

  const handleAddExercise = () => {
    if (newExercise.name && newExercise.reps) {
      const exercise: Exercise = {
        id: Date.now().toString(),
        name: newExercise.name,
        sets: newExercise.sets || 3,
        reps: newExercise.reps,
        weight: newExercise.weight,
        notes: newExercise.notes
      };

      setExercises(prev => [...prev, exercise]);
      setNewExercise({ name: '', sets: 3, reps: '', weight: undefined, notes: '' });
    }
  };

  const handleSaveWorkout = () => {
    if (workoutName && exercises.length > 0) {
      console.log('Saving workout:', { name: workoutName, exercises });
      alert('Treino salvo com sucesso!');
      setWorkoutName('');
      setExercises([]);
      setShowForm(false);
    }
  };

  const handleCompleteWorkout = (workoutId: string) => {
    console.log('Completing workout:', workoutId);
    alert('Treino marcado como concluído!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-content-primary">Meus Treinos</h1>
          <p className="text-content-secondary mt-1">
            {hasTrainer 
              ? 'Treinos criados pelo seu personal trainer'
              : 'Gerencie seus treinos personalizados'
            }
          </p>
        </div>
        {!hasTrainer && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Treino
          </Button>
        )}
      </div>

      {/* Today's Workout */}
      {todayWorkout && (
        <Card className="p-6 border-content-brand">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Dumbbell className="h-6 w-6 text-content-brand" />
              <div>
                <h2 className="text-xl font-semibold text-content-primary">
                  Treino de Hoje
                </h2>
                <p className="text-content-secondary">{todayWorkout.name}</p>
              </div>
            </div>
            {!todayWorkout.completed && (
              <Button onClick={() => handleCompleteWorkout(todayWorkout.id)}>
                Marcar como Concluído
              </Button>
            )}
          </div>

          <div className="space-y-3">
            {todayWorkout.exercises.map((exercise, index) => (
              <div key={exercise.id} className="flex items-center space-x-4 p-3 bg-background-tertiary rounded-lg">
                <span className="text-content-secondary font-medium w-6">
                  {index + 1}.
                </span>
                <div className="flex-1">
                  <h4 className="font-medium text-content-primary">{exercise.name}</h4>
                  <p className="text-content-secondary text-sm">
                    {exercise.sets} séries × {exercise.reps} reps
                    {exercise.weight && ` × ${exercise.weight}kg`}
                  </p>
                </div>
                <div className="w-6 h-6 border-2 border-content-brand rounded-full flex items-center justify-center">
                  {todayWorkout.completed && (
                    <div className="w-3 h-3 bg-content-brand rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Create New Workout Form */}
      {showForm && !hasTrainer && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-content-primary mb-4">Criar Novo Treino</h2>
          
          <div className="space-y-4">
            <Input
              label="Nome do treino"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              placeholder="Ex: Peito e Tríceps"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Input
                label="Exercício"
                value={newExercise.name}
                onChange={(e) => setNewExercise(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nome do exercício"
              />
              <Input
                label="Séries"
                type="number"
                value={newExercise.sets}
                onChange={(e) => setNewExercise(prev => ({ ...prev, sets: parseInt(e.target.value) }))}
              />
              <Input
                label="Repetições"
                value={newExercise.reps}
                onChange={(e) => setNewExercise(prev => ({ ...prev, reps: e.target.value }))}
                placeholder="Ex: 8-10"
              />
              <Input
                label="Carga (kg)"
                type="number"
                value={newExercise.weight || ''}
                onChange={(e) => setNewExercise(prev => ({ ...prev, weight: e.target.value ? parseInt(e.target.value) : undefined }))}
                placeholder="Opcional"
              />
            </div>

            <Input
              label="Observações"
              value={newExercise.notes}
              onChange={(e) => setNewExercise(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Observações sobre a execução..."
            />

            <div className="flex space-x-2">
              <Button onClick={handleAddExercise}>
                Adicionar Exercício
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
            </div>

            {exercises.length > 0 && (
              <div className="space-y-2 mt-4">
                <h3 className="font-medium text-content-primary">Exercícios Adicionados:</h3>
                {exercises.map((exercise, index) => (
                  <div key={exercise.id} className="flex items-center justify-between p-3 bg-background-tertiary rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-content-secondary">{index + 1}.</span>
                      <div>
                        <span className="text-content-primary font-medium">{exercise.name}</span>
                        <p className="text-content-secondary text-sm">
                          {exercise.sets}×{exercise.reps}
                          {exercise.weight && ` (${exercise.weight}kg)`}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setExercises(prev => prev.filter(ex => ex.id !== exercise.id))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button onClick={handleSaveWorkout} className="w-full mt-4">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Treino
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Workout History */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-content-primary mb-4">
          Histórico de Treinos
        </h2>
        
        <div className="space-y-4">
          {userWorkouts.map((workout) => (
            <Card key={workout.id} className="p-4 bg-background-tertiary">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-content-primary">{workout.name}</h3>
                  <p className="text-content-secondary text-sm">
                    {new Date(workout.date).toLocaleDateString('pt-BR')}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    workout.completed 
                      ? 'bg-accent-green/20 text-accent-green' 
                      : 'bg-accent-blue/20 text-accent-blue'
                  }`}>
                    {workout.completed ? 'Concluído' : 'Pendente'}
                  </span>
                </div>
                {!hasTrainer && (
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditWorkout(workout.id)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteWorkout(workout.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                {workout.exercises.map((exercise, index) => (
                  <div key={exercise.id} className="flex items-center space-x-3 text-sm">
                    <span className="text-content-secondary w-6">{index + 1}.</span>
                    <span className="text-content-primary flex-1">{exercise.name}</span>
                    <span className="text-content-secondary">
                      {exercise.sets}×{exercise.reps}
                      {exercise.weight && ` (${exercise.weight}kg)`}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};