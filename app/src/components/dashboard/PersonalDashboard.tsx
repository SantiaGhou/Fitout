import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Search, Plus, TrendingUp, Award, Calendar } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../contexts/AuthContext';

export const PersonalDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for students
  const students = [
    { id: '1', name: 'João Silva', progress: 85, streak: 12, lastWorkout: '2024-01-15' },
    { id: '2', name: 'Maria Santos', progress: 92, streak: 8, lastWorkout: '2024-01-14' },
    { id: '3', name: 'Carlos Lima', progress: 67, streak: 5, lastWorkout: '2024-01-13' },
  ];

  const stats = [
    { label: 'Total de Alunos', value: students.length, icon: Users, color: 'text-accent-blue' },
    { label: 'Ativos esta semana', value: students.filter(s => s.streak > 0).length, icon: TrendingUp, color: 'text-accent-green' },
    { label: 'Média de progresso', value: `${Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length)}%`, icon: Award, color: 'text-accent-lime' },
    { label: 'Treinos hoje', value: '5', icon: Calendar, color: 'text-accent-pink' },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-content-primary">
            Dashboard Personal
          </h1>
          <p className="text-content-secondary mt-1">
            Gerencie seus alunos e acompanhe o progresso
          </p>
        </div>
        <Button onClick={() => handleNavigation('/students/add')}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Aluno
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
            <div className="text-2xl font-bold text-content-primary">{stat.value}</div>
            <div className="text-sm text-content-secondary">{stat.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-content-primary">Meus Alunos</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-content-secondary" />
                <Input
                  placeholder="Buscar alunos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <Card key={student.id} variant="hover" className="p-4 cursor-pointer" onClick={() => handleNavigation('/students')}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-background-tertiary rounded-full flex items-center justify-center">
                          <span className="text-content-primary font-medium">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-content-primary">{student.name}</h4>
                          <p className="text-sm text-content-secondary">
                            Sequência: {student.streak} dias
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-content-primary">
                          {student.progress}%
                        </div>
                        <div className="text-sm text-content-secondary">progresso</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-background-tertiary rounded-full h-2">
                        <div 
                          className="bg-accent-green h-2 rounded-full transition-all duration-300"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto mb-4 text-content-secondary" />
                  <p className="text-content-secondary">Nenhum aluno encontrado</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => handleNavigation('/students/add')}
                  >
                    Adicionar primeiro aluno
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-content-primary mb-4">Ações Rápidas</h3>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => handleNavigation('/students')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Gerenciar Alunos
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => handleNavigation('/sessions')}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Agendar Sessão
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => handleNavigation('/students')}
              >
                <Search className="h-4 w-4 mr-2" />
                Buscar Alunos
              </Button>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-content-primary mb-4">Atividade Hoje</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-content-secondary">Treinos criados</span>
                <span className="text-content-primary font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-content-secondary">Dietas ajustadas</span>
                <span className="text-content-primary font-medium">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-content-secondary">Mensagens</span>
                <span className="text-content-primary font-medium">8</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};