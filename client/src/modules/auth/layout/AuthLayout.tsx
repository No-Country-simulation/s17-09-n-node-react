import React from 'react'
import styled from 'styled-components'
import { useLocation, Link } from 'react-router-dom'
import { useThemeSwitcher } from '../../../hooks'

const Navbar = styled.nav`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.background};
  opacity: 0.9;
  z-index: 1;
  font-family: 'Inter', sans-serif;
`

const Logo = styled.div`
  background-image: url('/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  width: 250px;
  height: 90px;
  margin-left: 5%;
`

// const ThemeButton = styled.button`
//   background-color: ${(props) => props.theme.accent};
//   color: ${(props) => props.theme.text};
//   border: none;
//   padding: 8px 16px;
//   cursor: pointer;
//   font-size: 14px;
//   border-radius: 5px;
//   transition: all 0.3s ease-in-out;

//   &:hover {
//     background-color: ${(props) => props.theme.background};
//   }
// `

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
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: left;
  margin-right: 8%
  
`

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin-right: "10%";
`

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation()
  const { themeMode, ThemeProvider } = useThemeSwitcher()

  return (
    <ThemeProvider theme={themeMode}>
      <LayoutContainer>
        <Navbar>
          <Logo/>
          <ButtonContainer>
            {location.pathname === '/login' && (
              <>
                <NavButton to='/help'>Ayuda</NavButton>
                <NavButton to='/register'>Registrate</NavButton>
              </>
            )}
            {location.pathname === '/register' && (
              <>
                <NavButton to='/help'>Ayuda</NavButton>
                <NavButton to='/login'>Ingresar</NavButton>
              </>
            )}
            {/* <ThemeButton onClick={toggleTheme} style={{ marginLeft: '20px' }}> */}
              {/* {themeMode === lightTheme ? '🌙' : '☀️'} */}
            {/* </ThemeButton> */}
          </ButtonContainer>
        </Navbar>
        <main>{children}</main>
      </LayoutContainer>
    </ThemeProvider>
  )
}

export default AuthLayout
