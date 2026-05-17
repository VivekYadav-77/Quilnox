import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ThemeContext } from './themeContextBase';
import type { Theme, ThemeContextType } from './themeContextBase';

interface ThemeProviderProps {
  children: ReactNode;
}

const getStoredTheme = (): Theme => {
  const storedTheme = localStorage.getItem('theme');

  return storedTheme === 'dark' ? 'dark' : 'light';
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const value = useMemo<ThemeContextType>(
    () => ({
      theme,
      toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
