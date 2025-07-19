import React, { useState } from 'react';
import { Search, UserPlus, Target, Calendar, Filter, Flame } from 'lucide-react'; // Added Flame import
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { RadioGroup } from '../ui/RadioGroup';

interface CommunityUser {
  id: string;
  name: string;
  photo?: string;
  objective: 'mass' | 'fat_loss' | 'health';
  frequency: number;
  streak: number;
  isFollowing: boolean;
}

export const Community: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [objectiveFilter, setObjectiveFilter] = useState<'all' | 'mass' | 'fat_loss' | 'health'>('all'); // Typed state
  const [frequencyFilter, setFrequencyFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all'); // Typed state
  const [showFilters, setShowFilters] = useState(false);
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set(['2', '4']));

  // Mock community users
  const communityUsers: CommunityUser[] = [
    {
      id: '1',
      name: 'João Silva',
      objective: 'mass',
      frequency: 5,
      streak: 12,
      isFollowing: false,
    },
    {
      id: '2',
      name: 'Maria Santos',
      objective: 'fat_loss',
      frequency: 4,
      streak: 8,
      isFollowing: true,
    },
    {
      id: '3',
      name: 'Carlos Lima',
      objective: 'health',
      frequency: 3,
      streak: 15,
      isFollowing: false,
    },
    {
      id: '4',
      name: 'Ana Costa',
      objective: 'fat_loss',
      frequency: 6,
      streak: 22,
      isFollowing: true,
    },
    {
      id: '5',
      name: 'Pedro Oliveira',
      objective: 'mass',
      frequency: 5,
      streak: 5,
      isFollowing: false,
    },
    {
      id: '6',
      name: 'Lucia Ferreira',
      objective: 'health',
      frequency: 4,
      streak: 18,
      isFollowing: false,
    }
  ];

  const filteredUsers = communityUsers.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesObjective = objectiveFilter === 'all' || user.objective === objectiveFilter;
    const matchesFrequency =
      frequencyFilter === 'all' ||
      (frequencyFilter === 'low' && user.frequency <= 2) ||
      (frequencyFilter === 'medium' && user.frequency >= 3 && user.frequency <= 4) ||
      (frequencyFilter === 'high' && user.frequency >= 5);

    return matchesSearch && matchesObjective && matchesFrequency;
  });

  const getObjectiveLabel = (objective: string) => {
    switch (objective) {
      case 'mass':
        return 'Ganho de massa';
      case 'fat_loss':
        return 'Perda de gordura';
      case 'health':
        return 'Saúde geral';
      default:
        return objective;
    }
  };

  const getObjectiveColor = (objective: string) => {
    switch (objective) {
      case 'mass':
        return 'text-accent-blue';
      case 'fat_loss':
        return 'text-accent-red';
      case 'health':
        return 'text-accent-green';
      default:
        return 'text-content-secondary';
    }
  };

  const getFrequencyLabel = (frequency: number) => {
    if (frequency <= 2) return 'Baixa';
    if (frequency <= 4) return 'Média';
    return 'Alta';
  };

  const handleFollowUser = (userId: string) => {
    setFollowedUsers((prev) => {
      const newSet = new Set(prev); // Create a new Set for immutability
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const handleViewProfile = (userId: string) => {
    console.log(`Viewing profile for user ${userId}`);
    // In a real app, this would navigate to the profile page
  };

  const objectiveOptions = [
    { value: 'all', label: 'Todos os objetivos' },
    { value: 'mass', label: 'Ganho de massa' },
    { value: 'fat_loss', label: 'Perda de gordura' },
    { value: 'health', label: 'Saúde geral' },
  ];

  const frequencyOptions = [
    { value: 'all', label: 'Todas as frequências' },
    { value: 'low', label: 'Baixa (1-2x/semana)' },
    { value: 'medium', label: 'Média (3-4x/semana)' },
    { value: 'high', label: 'Alta (5+x/semana)' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-content-primary">Comunidade</h1>
        <p className="text-content-secondary mt-1">
          Conecte-se com outros atletas e compartilhe sua jornada
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-content-secondary" />
            <Input
              placeholder="Buscar usuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>

        {showFilters && (
          <Card className="p-4">
            <div className="grid md:grid-cols-2 gap-4">
              <RadioGroup
                label="Objetivo"
                options={objectiveOptions}
                value={objectiveFilter}
                onChange={setObjectiveFilter}
                name="objective"
              />
              <RadioGroup
                label="Frequência de treino"
                options={frequencyOptions}
                value={frequencyFilter}
                        onChange={setFrequencyFilter}
                        name="frequency"
                      />
                    </div>
                  </Card>
                )}
              </div>

              {/* Users Grid */}
              <div className="grid gap-4">
                {filteredUsers.length === 0 ? (
                  <Card className="text-center py-12">
                    <Search className="h-12 w-12 mx-auto text-content-secondary mb-4" />
                    <h3 className="text-lg font-medium text-content-primary mb-2">
                      Nenhum usuário encontrado
                    </h3>
                    <p className="text-content-secondary">
                      Tente ajustar os filtros ou termos de busca
                    </p>
                  </Card>
                ) : (
                  filteredUsers.map((user) => (
                    <Card key={user.id} className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-background-tertiary rounded-full flex items-center justify-center">
                            {user.photo ? (
                              <img
                                src={user.photo}
                                alt={user.name}
                                className="w-16 h-16 rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-content-primary font-bold text-lg">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-content-primary">
                              {user.name}
                            </h3>
                            <div className="flex items-center space-x-4 mt-1">
                              <div className="flex items-center space-x-1">
                                <Target className="h-4 w-4 text-content-secondary" />
                                <span className={`text-sm font-medium ${getObjectiveColor(user.objective)}`}>
                                  {getObjectiveLabel(user.objective)}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4 text-content-secondary" />
                                <span className="text-content-secondary text-sm">
                                  {user.frequency}x/semana
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                              <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-accent-red rounded-full"></div>
                                <span className="text-content-secondary text-sm">
                                  {user.streak} dias de sequência
                                </span>
                              </div>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  getFrequencyLabel(user.frequency) === 'Alta'
                                    ? 'bg-accent-green/20 text-accent-green'
                                    : getFrequencyLabel(user.frequency) === 'Média'
                                    ? 'bg-accent-blue/20 text-accent-blue'
                                    : 'bg-accent-lime/20 text-accent-lime'
                                }`}
                              >
                                Frequência {getFrequencyLabel(user.frequency)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewProfile(user.id)}>
                            Ver Perfil
                          </Button>
                          <Button
                            size="sm"
                            variant={followedUsers.has(user.id) ? 'secondary' : 'primary'}
                            onClick={() => handleFollowUser(user.id)}
                          >
                            <UserPlus className="h-4 w-4 mr-1" />
                            {followedUsers.has(user.id) ? 'Seguindo' : 'Seguir'}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>

              {/* Ranking Section */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-content-primary mb-4">
                  🏆 Ranking Semanal
                </h2>
                <div className="space-y-3">
                  {communityUsers
                    .sort((a, b) => b.streak - a.streak)
                    .slice(0, 5)
                    .map((user, index) => (
                      <div key={user.id} className="flex items-center space-x-4 p-3 bg-background-tertiary rounded-lg">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            index === 0 ? 'bg-yellow-500 text-black' :
                            index === 1 ? 'bg-gray-400 text-black' :
                            index === 2 ? 'bg-orange-600 text-white' :
                            'bg-background-gray text-content-secondary'
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div className="w-10 h-10 bg-background-gray rounded-full flex items-center justify-center">
                          <span className="text-content-primary font-medium text-sm">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-content-primary">{user.name}</h4>
                          <p className="text-content-secondary text-sm">{user.streak} dias de sequência</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Flame className="h-4 w-4 text-accent-red" />
                          <span className="text-accent-red font-bold">{user.streak}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </Card>

              {/* Following Section */}
              {followedUsers.size > 0 && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-content-primary mb-4">
                    Pessoas que você segue ({followedUsers.size})
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {communityUsers
                      .filter((user) => followedUsers.has(user.id))
                      .map((user) => (
                        <div key={user.id} className="text-center">
                          <div className="w-12 h-12 bg-background-tertiary rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-content-primary font-medium">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <h4 className="text-content-primary font-medium text-sm">{user.name}</h4>
                          <p className="text-content-secondary text-xs">
                            {user.streak} dias
                          </p>
                        </div>
                      ))}
                  </div>
                </Card>
              )}
            </div>
          );
        };