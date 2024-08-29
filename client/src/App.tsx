import React from 'react';
import useThemeSwitcher from './hooks/useThemeSwitcher';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './modules/auth/Sign-in';
import LandingPage from './pages/LandingLogin'; // Asegúrate de que este componente esté correctamente importado

const Container = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.text};
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.accent};
  }
`;

const App: React.FC = () => {
  const { themeMode, toggleTheme, ThemeProvider: CustomThemeProvider } = useThemeSwitcher();

  return (
    <CustomThemeProvider theme={themeMode}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage toggleTheme={toggleTheme} />} /> 
          <Route path="/login" element={<Login />} />
          {/* otras rutas */}
        </Routes>
      
      </Router>
    </CustomThemeProvider>
  );
};

export default App;
