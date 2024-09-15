import { Box } from '@mui/material'

import Layout from '../layout/AuthLayout'
import LoginForm from '../components/Sign-in'

export default function LoginPage() {
  return (
    <Layout>
      <Box
        height='100%'
        overflow='auto'
        pt={{ xs: '5rem', sm: '6rem', md: '8rem' }}
        pr={{ xs: '1rem', md: '2rem' }}
        pb={{ xs: '1rem', md: '2rem' }}
        pl={{
          xs: '1rem',
          sm: 'calc(100% - 25rem)',
          md: 'calc(100% - 31rem)',
          lg: 'calc(100% - 33rem)',
          xl: 'calc(100% - 36rem)',
        }}
        sx={{
          backgroundImage: `url(fondologin.svg)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top center',
        }}
      >
        <Box height='100%' width={{ xs: '100%', sm: '24rem', md: '26rem' }}>
          <LoginForm />
        </Box>
      </Box>
    </Layout>
  )
}
