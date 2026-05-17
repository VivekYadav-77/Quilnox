import { useContext } from 'react';
import { AuthContext } from '../context/authContextBase';
import type { AuthContextType } from '../context/authContextBase';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
