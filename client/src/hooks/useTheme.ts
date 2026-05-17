import { useContext } from 'react';
import { ThemeContext } from '../context/themeContextBase';
import type { ThemeContextType } from '../context/themeContextBase';

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
};
