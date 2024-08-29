// useThemeSwitcher.ts
import { useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../themes';

const useThemeSwitcher = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark'); // Configura el tema oscuro por defecto

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return { themeMode, toggleTheme, ThemeProvider: StyledThemeProvider };
};

export default useThemeSwitcher;
