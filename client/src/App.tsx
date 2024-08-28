// src/App.tsx
import React from 'react';
import useThemeSwitcher from './hooks/useThemeSwitcher';
import styled  from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';

const Container = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
  width: 100%;
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
        <Container>
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/login" element={<Login />} />
            {/* otras rutas  */}
          </Routes>
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </Container>
      </Router>
    </CustomThemeProvider>
  );
};

export default App;
