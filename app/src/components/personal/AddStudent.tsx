import React, { useState } from 'react';
import { Search, UserPlus, ArrowLeft, Check } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
  objective: 'mass' | 'fat_loss' | 'health';
  hasTrainer: boolean;
}

interface AddStudentProps {
  onBack: () => void;
}

export const AddStudent: React.FC<AddStudentProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [addedStudents, setAddedStudents] = useState<Set<string>>(new Set());
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock users data
  const users: User[] = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@email.com',
      objective: 'mass',
      hasTrainer: false,
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@email.com',
      objective: 'fat_loss',
      hasTrainer: false,
    },
    {
      id: '3',
      name: 'Carlos Lima',
      email: 'carlos@email.com',
      objective: 'health',
      hasTrainer: true,
    },
    {
      id: '4',
      name: 'Ana Costa',
      email: 'ana@email.com',
      objective: 'fat_loss',
      hasTrainer: false,
    },
    {
      id: '5',
      name: 'Pedro Oliveira',
      email: 'pedro@email.com',
      objective: 'mass',
      hasTrainer: false,
    },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleAddStudent = (userId: string, userName: string) => {
    setAddedStudents(prev => new Set([...prev, userId]));
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);

    // Here you would typically make an API call to add the student
    console.log(`Adding student ${userName} (${userId})`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-content-primary">Adicionar Aluno</h1>
          <p className="text-content-secondary mt-1">
            Busque usuários cadastrados na plataforma
          </p>
        </div>
      </div>

      {showSuccess && (
        <Card className="bg-accent-green/10 border-accent-green/20">
          <div className="flex items-center space-x-3">
            <Check className="h-5 w-5 text-accent-green" />
            <span className="text-accent-green font-medium">
              Aluno adicionado com sucesso!
            </span>
          </div>
        </Card>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-content-secondary" />
        <Input
          placeholder="Buscar por nome ou e-mail..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filteredUsers.length === 0 ? (
          <Card className="text-center py-12">
            <Search className="h-12 w-12 mx-auto text-content-secondary mb-4" />
            <h3 className="text-lg font-medium text-content-primary mb-2">
              Nenhum usuário encontrado
            </h3>
            <p className="text-content-secondary">
              Tente buscar com outros termos
            </p>
          </Card>
        ) : (
          filteredUsers.map((user) => (
            <Card key={user.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-background-tertiary rounded-full flex items-center justify-center">
                    {user.photo ? (
                      <img 
                        src={user.photo} 
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-content-primary font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-content-primary">{user.name}</h3>
                    <p className="text-content-secondary text-sm">{user.email}</p>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className={`text-sm font-medium ${getObjectiveColor(user.objective)}`}>
                        {getObjectiveLabel(user.objective)}
                      </span>
                      {user.hasTrainer && (
                        <span className="text-xs bg-accent-pink/20 text-accent-pink px-2 py-1 rounded-full">
                          Tem Personal
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Ver Perfil
                  </Button>
                  {addedStudents.has(user.id) ? (
                    <Button size="sm" disabled className="bg-accent-green">
                      <Check className="h-4 w-4 mr-1" />
                      Adicionado
                    </Button>
                  ) : (
                    <Button 
                      size="sm"
                      onClick={() => handleAddStudent(user.id, user.name)}
                      disabled={user.hasTrainer}
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      {user.hasTrainer ? 'Indisponível' : 'Adicionar'}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};