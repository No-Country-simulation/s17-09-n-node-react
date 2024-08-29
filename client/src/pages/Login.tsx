
import React from 'react';
import styled from 'styled-components';
import Login from '../modules/auth/Sign-in';

interface LandingPageProps {
    toggleTheme: () => void;
  }
  

const LandingPageContainer = styled.div`
position: relative; 
  background-image: url('/fondologin.svg');
  background-size: cover;
  background-position: center;
  color: ${(props) => props.theme.text};
  height: 120vh;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
`;

const Navbar = styled.nav`
 position: sticky;
 top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
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

const MainContent = styled.div`
  display: flex;
  justify-content: flex-end; 
  align-items: center;
  padding: 20px;
  height: calc(100vh - 60px); 
margin-top: 5%;
`;

const LoginContainer = styled.div`
  width: 100%;
  max-width: 450px;
  background-color: ${(props) => props.theme.background};
  padding: px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 5%;

`;

const LandingPage: React.FC<LandingPageProps> = ({ toggleTheme }) => {
  

  return (
    <LandingPageContainer>
      <Navbar>
        <Logo>LawApp</Logo>
        <ThemeButton onClick={toggleTheme}>Cambiar Tema</ThemeButton>
      </Navbar>
      <MainContent>
        <LoginContainer>
          <Login />
        </LoginContainer>
      </MainContent>
    </LandingPageContainer>
  );
};

export default LandingPage;
