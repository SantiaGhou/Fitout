import React, { useState } from 'react';
import { Plus, Search, TrendingUp, Calendar, User } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface Student {
  id: string;
  name: string;
  email: string;
  photo?: string;
  workoutDays: number;
  progress: number;
  objective: 'mass' | 'fat_loss' | 'health';
  addedAt: string;
}

interface StudentsListProps {
  onAddStudent: () => void;
  onCreateWorkout: (studentId: string) => void;
  onScheduleSession: (studentId: string) => void;
}

export const StudentsList: React.FC<StudentsListProps> = ({
  onAddStudent,
  onCreateWorkout,
  onScheduleSession,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock students data
  const students: Student[] = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@email.com',
      workoutDays: 12,
      progress: 85,
      objective: 'mass',
      addedAt: '2024-01-01',
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@email.com',
      workoutDays: 18,
      progress: 92,
      objective: 'fat_loss',
      addedAt: '2024-01-05',
    },
    {
      id: '3',
      name: 'Carlos Lima',
      email: 'carlos@email.com',
      workoutDays: 8,
      progress: 67,
      objective: 'health',
      addedAt: '2024-01-10',
    },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-content-primary">Meus Alunos</h1>
          <p className="text-content-secondary mt-1">
            Gerencie e acompanhe o progresso dos seus alunos
          </p>
        </div>
        <Button onClick={onAddStudent}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Aluno
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-content-secondary" />
          <Input
            placeholder="Buscar alunos por nome ou e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredStudents.length === 0 ? (
          <Card className="text-center py-12">
            <User className="h-12 w-12 mx-auto text-content-secondary mb-4" />
            <h3 className="text-lg font-medium text-content-primary mb-2">
              {searchTerm ? 'Nenhum aluno encontrado' : 'Nenhum aluno cadastrado'}
            </h3>
            <p className="text-content-secondary mb-4">
              {searchTerm 
                ? 'Tente buscar com outros termos'
                : 'Comece adicionando seu primeiro aluno'
              }
            </p>
            {!searchTerm && (
              <Button onClick={onAddStudent}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Aluno
              </Button>
            )}
          </Card>
        ) : (
          filteredStudents.map((student) => (
            <Card key={student.id} className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-background-tertiary rounded-full flex items-center justify-center">
                    {student.photo ? (
                      <img 
                        src={student.photo} 
                        alt={student.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-content-primary font-bold text-lg">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-content-primary">
                      {student.name}
                    </h3>
                    <p className="text-content-secondary text-sm">{student.email}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`text-sm font-medium ${getObjectiveColor(student.objective)}`}>
                        {getObjectiveLabel(student.objective)}
                      </span>
                      <span className="text-content-secondary text-sm">
                        {student.workoutDays} dias treinados
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="text-center lg:text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-accent-green" />
                      <span className="text-lg font-bold text-content-primary">
                        {student.progress}%
                      </span>
                    </div>
                    <div className="w-32 bg-background-tertiary rounded-full h-2">
                      <div 
                        className="bg-accent-green h-2 rounded-full transition-all duration-300"
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onCreateWorkout(student.id)}
                    >
                      Criar Treino
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onScheduleSession(student.id)}
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      Agendar
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};