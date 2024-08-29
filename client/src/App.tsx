import React from 'react';
import useThemeSwitcher from './hooks/useThemeSwitcher';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './modules/auth/Sign-in';
import LandingLogin from './pages/LandingLogin'; // Asegúrate de que este componente esté correctamente importado
import RegistrationPage from  './pages/LandingRegister'


const App: React.FC = () => {
  const { themeMode, toggleTheme, ThemeProvider: CustomThemeProvider } = useThemeSwitcher();

  return (
    <CustomThemeProvider theme={themeMode}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingLogin toggleTheme={toggleTheme} />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationPage toggleTheme={toggleTheme} />} />
          {/* otras rutas */}
        </Routes>
      
      </Router>
    </CustomThemeProvider>
  );
};

export default App;
