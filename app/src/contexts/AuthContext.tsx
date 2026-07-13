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
  // O backend retorna userProfile ou personalProfile — normaliza para profile
  const profile = serverUser.userProfile ?? serverUser.personalProfile ?? undefined;
  return {
    ...serverUser,
    type: serverUser.type?.toLowerCase(),
    profile,
  } as User;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined' && storedUser !== 'null') {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Erro ao parsear user no localStorage:', e);
        localStorage.removeItem('user');
      }
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
    } catch {
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
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const updateProfile = async (profile: Partial<UserProfile | PersonalProfile>): Promise<boolean> => {
    if (!user) {
      console.error('[updateProfile] user é null, abortando');
      return false;
    }

    try {
      const isPersonal = user.type === 'personal';
      console.log('[updateProfile] dados recebidos:', profile);

      // name vai para a tabela users (PUT /users/profile), não para user_profiles
      const { name, ...profileData } = profile as any;

      if (name) {
        await api.updateUser({ name });
      }

      // Backend agora aceita qualquer case e normaliza internamente
      const enumFields = new Set(['gender', 'objective', 'workoutType', 'schedule', 'dietType', 'intermittentFasting']);

      const payload: Record<string, unknown> = Object.fromEntries(
        Object.entries(profileData).map(([k, v]) => [
          k,
          enumFields.has(k) && typeof v === 'string' ? v.toUpperCase() : v,
        ])
      );

      // workoutDays precisa ser serializado como JSON string
      if (!isPersonal && Array.isArray(payload.workoutDays)) {
        payload.workoutDays = JSON.stringify(payload.workoutDays);
      }

      console.log('[updateProfile] payload para o backend:', payload);

      const { data } = (isPersonal
        ? await api.updatePersonalProfile(payload as Record<string, unknown>)
        : await api.updateUserProfile(payload as Record<string, unknown>)) as any;

      console.log('[updateProfile] resposta do backend:', data);

      const updatedUser: User = {
        ...user,
        ...(name ? { name } : {}),
        profile: data,
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('[updateProfile] erro:', error);
      return false;
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
