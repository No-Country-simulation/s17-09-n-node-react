import React from 'react';
import styled from 'styled-components';
import Register from '../modules/auth/Sign-up'; 
import registrationImage from '/fondoregistro.svg'; 
import { GoogleOAuthProvider } from '@react-oauth/google';

interface RegistrationPageProps {
  toggleTheme: () => void;
}

const RegistrationPageContainer = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  height: 100vh;
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
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
`;

const RegisterContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 90%;
  background-color: ${(props) => props.theme.secondary};
  padding: 5px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-items: center;
 `;

const RegisterFormContainer = styled.div`
  width: 50%;
  padding: 2%;
  margin: 5%; 
  background-color: ${(props) => props.theme.background};

`;

const ImageContainer = styled.div`
  width: 50%;
  padding: 15%;
  text-align: center;
`;

const RegistrationPage: React.FC<RegistrationPageProps> = ({ toggleTheme }) => {
  return (
    <RegistrationPageContainer>
      <Navbar>
        <Logo>LawApp</Logo>
        <ThemeButton onClick={toggleTheme}>Cambiar Tema</ThemeButton>
      </Navbar>
      <MainContent>
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
          <RegisterContainer>
            <RegisterFormContainer>
              <Register />
            </RegisterFormContainer>
            <ImageContainer>
              <img src={registrationImage} alt="Registro" style={{ maxWidth: '100%', height: 'auto' }} />
            </ImageContainer>
          </RegisterContainer>
        </GoogleOAuthProvider>
      </MainContent>
    </RegistrationPageContainer>
  );
};

export default RegistrationPage;
