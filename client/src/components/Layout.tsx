// Layout.tsx
import React from 'react';
import styled from 'styled-components';
import { useLocation, Link } from 'react-router-dom';
import useThemeSwitcher from '../hooks/useThemeSwitcher'; // Ajusta la ruta si es necesario
import { lightTheme } from '../themes';
const Navbar = styled.nav`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;  /* Aumenta el padding para hacer la Navbar más alta */
  background-color: ${(props) => props.theme.background};
  opacity: 0.9;
  z-index: 1;
`;

const Logo = styled.div`
  color: ${(props) => props.theme.accent};
  font-size: 20px;
  font-weight: 600;
`;

const ThemeButton = styled.button`
  background-color: ${(props) => props.theme.accent};
  color: ${(props) => props.theme.text};
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.background};
  }
`;

const NavButton = styled(Link)`
  background-color: ${(props) => props.theme.accent};
  color: ${(props) => props.theme.text};
  border: none;
  padding: 8px 16px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.background};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { themeMode, toggleTheme, ThemeProvider } = useThemeSwitcher();

  return (
    <ThemeProvider theme={themeMode}>
      <LayoutContainer>
        <Navbar>
          <Logo>LawApp</Logo>
          <ButtonContainer>
            {location.pathname === '/' && (
              <>
                <NavButton to="/help">Ayuda</NavButton>
                <NavButton to="/register">Registro</NavButton>
              </>
            )}
            {location.pathname === '/register' && (
              <>
                <NavButton to="/help">Ayuda</NavButton>
                <NavButton to="/">Login</NavButton>
              </>
            )}
            <ThemeButton onClick={toggleTheme} style={{ marginLeft: '20px' }}>
              {themeMode === lightTheme ? '🌙' : '☀️'}
            </ThemeButton>
          </ButtonContainer>
        </Navbar>
        <main>{children}</main>
      </LayoutContainer>
    </ThemeProvider>
  );
};

export default Layout;
