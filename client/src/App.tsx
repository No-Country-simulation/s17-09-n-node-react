// src/App.tsx
import React from 'react';
import useThemeSwitcher from './hooks/useThemeSwitcher';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  height: 100vh;
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
  const { themeMode, toggleTheme, ThemeProvider } = useThemeSwitcher();

  return (
    <ThemeProvider theme={themeMode}>
      <Container>
        <h1>LAW APP</h1>
        <Button onClick={toggleTheme}>Toggle Theme</Button>
      </Container>
    </ThemeProvider>
  );
};

export default App;
