import { createContext, useContext, useState, useCallback } from 'react';
import type { UserProfile } from '@/shared/types';

interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (phone: string, password: string) => Promise<void>;
  register: (data: { name: string; phone: string; email: string; password: string; role: 'client' | 'agent' }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export const AuthProvider = AuthContext.Provider;

export function useAuthState(): AuthState {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem('lg_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback(async (_phone: string, _password: string) => {
    // TODO: POST /api/auth/login
    const mockUser: UserProfile = {
      id: '1',
      name: 'Пользователь',
      phone: _phone,
      email: 'user@livegrid.ru',
      role: 'client',
    };
    setUser(mockUser);
    localStorage.setItem('lg_user', JSON.stringify(mockUser));
  }, []);

  const register = useCallback(async (data: { name: string; phone: string; email: string; password: string; role: 'client' | 'agent' }) => {
    // TODO: POST /api/auth/register
    const mockUser: UserProfile = {
      id: '2',
      name: data.name,
      phone: data.phone,
      email: data.email,
      role: data.role,
    };
    setUser(mockUser);
    localStorage.setItem('lg_user', JSON.stringify(mockUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('lg_user');
  }, []);

  return {
    isAuthenticated: !!user,
    user,
    login,
    register,
    logout,
  };
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
