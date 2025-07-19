import React from 'react';
import { LogOut, User, Search, Bell, Home, Users, Calendar, Dumbbell, Heart, UserPlus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import Logo from '../../assets/images/Logo.svg';

interface HeaderProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { user, logout } = useAuth();

  const personalNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'students', label: 'Alunos', icon: Users },
    { id: 'search', label: 'Buscar', icon: Search },
    { id: 'sessions', label: 'Sessões', icon: Calendar },
  ];

  const userNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'workout', label: 'Treino', icon: Dumbbell },
    { id: 'diet', label: 'Dieta', icon: Heart },
    { id: 'community', label: 'Comunidade', icon: UserPlus },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  const navItems = user?.type === 'personal' ? personalNavItems : userNavItems;

  return (
    <>
      <header className="bg-background-secondary border-b border-background-tertiary px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            
            {user?.profile && (
              <div className="hidden md:flex items-center space-x-2">
                <img className=' w-20 ' src={Logo} alt="" />

              </div>
            )}
          </div>

          <div className="flex items-center space-x-3">
                <span className="text-content-secondary text-sm">Bem vindo de volta,</span>
                <span className="text-content-primary font-medium">{user.name || user.email}</span>
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 hover:text-accent-red" />
            </Button>
          </div>
        </div>
      </header>


      {user?.profile && (
        <nav className="bg-background-secondary border-b border-background-tertiary">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex space-x-8 overflow-x-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate?.(item.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                    currentPage === item.id
                      ? 'border-content-brand text-content-brand'
                      : 'border-transparent text-content-secondary hover:text-content-primary'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}
    </>
  );
};