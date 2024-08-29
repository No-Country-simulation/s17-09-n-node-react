import React from 'react';
import styled from 'styled-components';
import Register from '../modules/auth/Sign-up'; 
import registrationImage from '/fondoregistro.svg'; // Asegúrate de usar el camino correcto
import Layout from '../components/Layout';
import { GoogleOAuthProvider } from '@react-oauth/google';

const RegistrationPageContainer = styled.div`
  position: relative;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.background}; /* Asegúrate de usar un color de fondo adecuado */
  height: 100vh; /* Ocupa toda la pantalla */
  display: flex;
  font-family: 'Inter', sans-serif;
`;

const RegisterContainer = styled.div`
  display: flex;
  flex: 1; /* Ocupa la mitad de la pantalla */
  background-color: ${(props) => props.theme.secondary};
  align-items: center;
  justify-content: center;
  padding: 2%;
`;

const RegisterFormContainer = styled.div`
  width: 80%;
  padding: 2%;
  background-color: ${(props) => props.theme.background};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
  flex: 1; /* Ocupa la mitad de la pantalla */
  background-image: url(${registrationImage});
  background-size: cover;
  background-position: center;
`;

const RegistrationPage: React.FC = () => {
  return (
    <Layout>
      <RegistrationPageContainer>
        <RegisterContainer>
          <RegisterFormContainer>
            <Register />
          </RegisterFormContainer>
        </RegisterContainer>
        <ImageContainer />
      </RegistrationPageContainer>
    </Layout>
  );
};

export default RegistrationPage;
