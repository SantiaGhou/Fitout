import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, Save } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

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
}

interface CreateWorkoutProps {
  studentId: string;
  studentName: string;
  onBack: () => void;
}

export const CreateWorkout: React.FC<CreateWorkoutProps> = ({ 
  studentId, 
  studentName, 
  onBack 
}) => {
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Mock existing workouts
  const existingWorkouts: Workout[] = [
    {
      id: '1',
      name: 'Peito e Tríceps',
      date: '2024-01-15',
      exercises: [
        { id: '1', name: 'Supino Reto', sets: 4, reps: '8-10', weight: 80, notes: 'Foco na execução' },
        { id: '2', name: 'Supino Inclinado', sets: 3, reps: '10-12', weight: 70 },
        { id: '3', name: 'Tríceps Pulley', sets: 3, reps: '12-15', weight: 40 },
      ]
    },
    {
      id: '2',
      name: 'Costas e Bíceps',
      date: '2024-01-13',
      exercises: [
        { id: '4', name: 'Puxada Frontal', sets: 4, reps: '8-10', weight: 60 },
        { id: '5', name: 'Remada Curvada', sets: 3, reps: '10-12', weight: 50 },
        { id: '6', name: 'Rosca Direta', sets: 3, reps: '12-15', weight: 20 },
      ]
    }
  ];

  const [newExercise, setNewExercise] = useState<Partial<Exercise>>({
    name: '',
    sets: 3,
    reps: '',
    weight: undefined,
    notes: ''
  });

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

      if (editingExercise) {
        setExercises(prev => prev.map(ex => ex.id === editingExercise.id ? exercise : ex));
        setEditingExercise(null);
      } else {
        setExercises(prev => [...prev, exercise]);
      }

      setNewExercise({ name: '', sets: 3, reps: '', weight: undefined, notes: '' });
      setShowForm(false);
    }
  };

  const handleEditExercise = (exercise: Exercise) => {
    setNewExercise(exercise);
    setEditingExercise(exercise);
    setShowForm(true);
  };

  const handleDeleteExercise = (exerciseId: string) => {
    setExercises(prev => prev.filter(ex => ex.id !== exerciseId));
  };

  const handleSaveWorkout = () => {
    if (workoutName && exercises.length > 0) {
      // Here you would save to API
      console.log('Saving workout:', { name: workoutName, exercises, studentId });
      alert('Treino salvo com sucesso!');
      setWorkoutName('');
      setExercises([]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-content-primary">Criar Treino</h1>
          <p className="text-content-secondary mt-1">
            Aluno: <span className="text-content-primary font-medium">{studentName}</span>
          </p>
        </div>
      </div>

      {/* Create New Workout */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-content-primary mb-4">Novo Treino</h2>
        
        <div className="space-y-4">
          <Input
            label="Nome do treino"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            placeholder="Ex: Peito e Tríceps"
          />

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-content-primary">Exercícios</h3>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Exercício
            </Button>
          </div>

          {showForm && (
            <Card className="p-4 bg-background-tertiary">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Input
                  label="Nome do exercício"
                  value={newExercise.name}
                  onChange={(e) => setNewExercise(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Supino reto"
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
              <div className="mt-4">
                <Input
                  label="Observações"
                  value={newExercise.notes}
                  onChange={(e) => setNewExercise(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Observações sobre a execução..."
                />
              </div>
              <div className="flex space-x-2 mt-4">
                <Button onClick={handleAddExercise}>
                  {editingExercise ? 'Atualizar' : 'Adicionar'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowForm(false);
                    setEditingExercise(null);
                    setNewExercise({ name: '', sets: 3, reps: '', weight: undefined, notes: '' });
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </Card>
          )}

          {exercises.length > 0 && (
            <div className="space-y-2">
              {exercises.map((exercise, index) => (
                <Card key={exercise.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <span className="text-content-secondary font-medium">
                          {index + 1}.
                        </span>
                        <div>
                          <h4 className="font-medium text-content-primary">{exercise.name}</h4>
                          <p className="text-content-secondary text-sm">
                            {exercise.sets} séries × {exercise.reps} reps
                            {exercise.weight && ` × ${exercise.weight}kg`}
                          </p>
                          {exercise.notes && (
                            <p className="text-content-secondary text-sm italic">
                              {exercise.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditExercise(exercise)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteExercise(exercise.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {exercises.length > 0 && (
            <Button onClick={handleSaveWorkout} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Salvar Treino
            </Button>
          )}
        </div>
      </Card>

      {/* Existing Workouts */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-content-primary mb-4">
          Treinos Existentes
        </h2>
        
        <div className="space-y-4">
          {existingWorkouts.map((workout) => (
            <Card key={workout.id} className="p-4 bg-background-tertiary">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-content-primary">{workout.name}</h3>
                  <p className="text-content-secondary text-sm">
                    Criado em {new Date(workout.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
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