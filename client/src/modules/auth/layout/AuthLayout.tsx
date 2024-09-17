import { useLocation, Link } from 'react-router-dom'

import { Box, Button, styled } from '@mui/material'

interface IAuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: IAuthLayoutProps) {
  const location = useLocation()

  const isOnLogin = location.pathname === '/login'

  const NavButton = styled(Button)(() => ({
    color: 'white',
    backgroundColor: '#424769',
    padding: '0.5rem 1rem',
    lineHeight: 'normal',
    border: '1px solid transparent',
    textTransform: 'capitalize',
    ':hover': {
      border: '1px solid white',
      backgroundColor: 'transparent',
    },
  }))

  return (
    <>
      <Box
        component='header'
        position='fixed'
        top={0}
        right={0}
        left={0}
        height={{ xs: '4rem', sm: '5rem', md: '6rem' }}
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        bgcolor='primary.dark'
        p={{
          xs: '0rem 0.5rem',
          md: '0.5rem 5rem',
          lg: '0.5rem 7rem',
          xl: '0.5rem 10rem',
        }}
        zIndex={1}
        sx={{ opacity: 0.9 }}
      >
        <Box component='img' src='logo.png' height='100%' alt='Law Case Logo' />
        <Box component='nav' display='flex' gap={1} mr={{ xs: 1, md: 0 }}>
          <Link to='/help'>
            <NavButton>Adyua</NavButton>
          </Link>
          <Link to={isOnLogin ? '/register' : '/login'}>
            <NavButton>{isOnLogin ? 'Regístrate' : 'Ingresar'}</NavButton>
          </Link>
        </Box>
      </Box>
      <Box component='main' height='100vh'>
        {children}
      </Box>
    </>
  )
}
