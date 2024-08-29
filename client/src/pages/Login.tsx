import React from 'react'
import styled from 'styled-components'
import Login from '../modules/auth/Sign-in'
import Layout from '../components/Layout'

const LandingPageContainer = styled.div`
  position: relative;
  position: relative;
  background-image: url('/fondologin.svg');
  background-size: cover;
  background-position: relative;
  color: ${(props) => props.theme.text};
  height: 120vh;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
`

const MainContent = styled.div`
  display: flex;
  justify-content: flex-end;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  height: calc(100vh - 60px);
  margin-top: 5%;
`

const LoginContainer = styled.div`
  width: 80%;
  max-width: 420px;
  background-color: ${(props) => props.theme.background};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 5%;
  opacity: 0.9;
`

const LoginPage: React.FC = () => {
  return (
    <Layout>
      <LandingPageContainer>
        <MainContent>
          <LoginContainer>
            <Login />
          </LoginContainer>
        </MainContent>
      </LandingPageContainer>
    </Layout>
  )
}

export default LoginPage
