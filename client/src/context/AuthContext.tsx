import {
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './authContextBase';
import type { AuthContextType } from './authContextBase';
import type { User } from '../types';

interface AuthProviderProps {
  children: ReactNode;
}

const parseStoredUser = (storedUser: string | null): User | null => {
  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as User;
  } catch {
    localStorage.removeItem('user');
    return null;
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    return parseStoredUser(localStorage.getItem('user'));
  });
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = parseStoredUser(localStorage.getItem('user'));

    if (!storedUser) {
      localStorage.removeItem('token');
      return null;
    }

    return storedToken;
  });

  const login = (userData: User, userToken: string): void => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = (): void => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      token,
      login,
      logout,
      isAuthenticated: !!token,
      isAdmin: user?.role === 'admin',
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
