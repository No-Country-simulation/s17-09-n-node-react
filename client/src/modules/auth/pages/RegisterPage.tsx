import React from 'react'
import styled from 'styled-components'
import Register from '../components/Sign-up'
import registrationImage from '/fondoregistro.svg'
import Layout from '../layout/AuthLayout'

const RegistrationPageContainer = styled.div`
  position: relative;
  color: ${(props) => props.theme.text};
  background-color: 'red';
  font-family: 'Inter', sans-serif;
  width: 80%;
  margin: 10% 10% 10% 10%;
  background-color: #4b527e;
`

const MainContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  position: static;
`

const RegisterContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 100%;
  background-color: #4b527e;
  padding: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-items: center;
  padding: 2%;
  border-radius: 1%;
`

const RegisterFormContainer = styled.div`
  width: 90%;
  padding: 2%;
  margin: 5%;
`

const ImageContainer = styled.div`
  width: 90%;
  margin: 5%;
  text-align: center;
`

const RegistrationPage: React.FC = () => {
  return (
    <Layout>
      <RegistrationPageContainer>
        <MainContent>
          <RegisterContainer>
            <RegisterFormContainer>
              <Register />
            </RegisterFormContainer>
            <ImageContainer>
              <img src={registrationImage} alt='Registro' />
            </ImageContainer>
          </RegisterContainer>
        </MainContent>
      </RegistrationPageContainer>
    </Layout>
  )
}

export default RegistrationPage
