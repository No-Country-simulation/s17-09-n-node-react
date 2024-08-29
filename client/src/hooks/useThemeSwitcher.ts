// import { useState } from 'react';
// import { ThemeProvider } from 'styled-components';
// import { lightTheme, darkTheme } from '../themes';

// const useThemeSwitcher = () => {
//   const [theme, setTheme] = useState<'light' | 'dark'>('light');

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
//   };

//   const themeMode = theme === 'light' ? lightTheme : darkTheme;

//   return { themeMode, toggleTheme, ThemeProvider };
// };

// export default useThemeSwitcher;

import { toggleTheme as toggleThemeStore } from '../store/theme/themeSlice'
import { useAppDispatch, useAppSelector } from './reduxTypedHooks'

const useThemeSwitcher = () => {
  const dispatch = useAppDispatch()

  const { themeMode } = useAppSelector((state) => state.theme)

  const toggleTheme = () => {
    dispatch(toggleThemeStore())
  }

  return {
    // * Properties
    themeMode,

    // * Functions
    toggleTheme,
  }
}

export default useThemeSwitcher
