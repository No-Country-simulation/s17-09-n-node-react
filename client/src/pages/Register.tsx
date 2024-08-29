import React from 'react';
import styled from 'styled-components';
import Register from '../modules/auth/Sign-up'; 
import registrationImage from '/fondoregistro.svg'; 
import Layout from '../components/Layout';
import { GoogleOAuthProvider } from '@react-oauth/google';

const RegistrationPageContainer = styled.div`
  position: relative;
  color: ${(props) => props.theme.text};
  background-color: "red";
 font-family: 'Inter', sans-serif;
 width: 100%;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: static;
  margin-top: 0%;
`;

const RegisterContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 100%;
  background-color: ${(props) => props.theme.secondary};
  padding: 5px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-items: center;
  padding: 1%;

`;

const RegisterFormContainer = styled.div`
  width: 100%;
  padding: 2%;
  margin: 5%;
  background-color: ${(props) => props.theme.background};
`;

const ImageContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const RegistrationPage: React.FC= () => {
  return (
    <Layout >
      <RegistrationPageContainer>
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
    </Layout>
  );
};

export default RegistrationPage;
