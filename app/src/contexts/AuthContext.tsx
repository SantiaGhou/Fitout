import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User, UserProfile, PersonalProfile } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock data for demonstration
const mockUsers = [
  {
    id: '1',
    email: 'joao@email.com',
    type: 'user' as const,
    name: 'João Silva',
    profile: {
      age: 28,
      gender: 'M' as const,
      bloodType: 'O+',
      height: 175,
      weight: 80,
      hasTrainer: false,
      objective: 'mass' as const,
      workoutType: 'gym' as const,
      frequency: 4,
      schedule: 'evening' as const,
      allergies: '',
      avoidFoods: '',
      dietType: 'many_meals' as const,
      intermittentFasting: 'no' as const,
      streak: 5,
      workoutDays: ['2024-01-10', '2024-01-11', '2024-01-12']
    },
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    email: 'maria@email.com',
    type: 'user' as const,
    name: 'Maria Santos',
    profile: {
      age: 25,
      gender: 'F' as const,
      bloodType: 'A+',
      height: 165,
      weight: 60,
      hasTrainer: false,
      objective: 'fat_loss' as const,
      workoutType: 'cardio' as const,
      frequency: 5,
      schedule: 'morning' as const,
      allergies: 'Lactose',
      avoidFoods: 'Doces',
      dietType: 'few_meals' as const,
      intermittentFasting: 'yes' as const,
      streak: 12,
      workoutDays: ['2024-01-08', '2024-01-09', '2024-01-10', '2024-01-11', '2024-01-12']
    },
    createdAt: '2024-01-01'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize mock data
    const existingUsers = localStorage.getItem('users');
    if (!existingUsers) {
      localStorage.setItem('users', JSON.stringify(mockUsers));
    }
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: User) => u.email === email);
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const register = async (email: string, password: string, type: 'personal' | 'user'): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find((u: User) => u.email === email);
      
      if (existingUser) {
        return false;
      }

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        type,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = (profile: Partial<UserProfile | PersonalProfile>) => {
    if (user) {
      const updatedUser = {
        ...user,
        profile: { ...user.profile, ...profile }
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update in users array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u: User) => u.id === user.id);
      if (userIndex >= 0) {
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};