import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User, UserProfile, PersonalProfile } from '../types';
import { apiService } from '../services/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await apiService.getProfile();
          setUser(userData);
        } catch (error) {
          console.error('Failed to get user profile:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { user: userData } = await apiService.login(email, password);
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, type: 'personal' | 'user'): Promise<boolean> => {
    try {
      const apiType = type === 'personal' ? 'PERSONAL' : 'USER';
      const { user: userData } = await apiService.register(email, password, apiType);
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    apiService.logout();
    setUser(null);
  };

  const updateProfile = async (profile: Partial<UserProfile | PersonalProfile>) => {
    if (!user) return;

    try {
      let updatedProfile;
      
      if (user.type === 'PERSONAL') {
        updatedProfile = await apiService.updatePersonalProfile(profile as PersonalProfile);
      } else {
        updatedProfile = await apiService.updateUserProfile(profile as UserProfile);
      }

      // Update user state with new profile
      setUser(prev => prev ? {
        ...prev,
        profile: user.type === 'PERSONAL' ? updatedProfile : updatedProfile,
        userProfile: user.type === 'USER' ? updatedProfile : prev.userProfile,
        personalProfile: user.type === 'PERSONAL' ? updatedProfile : prev.personalProfile
      } : null);
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
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