import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User, UserProfile, PersonalProfile } from '../types';
import { api } from '../api/client';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

function mapUser(serverUser: any): User {
  return {
    ...serverUser,
    type: serverUser.type?.toLowerCase(),
  } as User;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await api.login(email, password) as any;
      const mapped = mapUser(data.user);
      setUser(mapped);
      localStorage.setItem('user', JSON.stringify(mapped));
      localStorage.setItem('token', data.token);
      return true;
    } catch (error) {
      return false;
    }
  };

  const register = async (
    email: string,
    password: string,
    type: 'personal' | 'user'
  ): Promise<boolean> => {
    try {
      const { data } = await api.register(email, password, type) as any;
      const mapped = mapUser(data.user);
      setUser(mapped);
      localStorage.setItem('user', JSON.stringify(mapped));
      localStorage.setItem('token', data.token);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const updateProfile = (profile: Partial<UserProfile | PersonalProfile>) => {
    if (user) {
      const updatedUser = {
        ...user,
        profile: { ...user.profile, ...profile },
      } as User;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
