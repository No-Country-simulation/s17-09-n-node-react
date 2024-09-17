import { Box, Stack } from '@mui/material'

import Layout from '../layout/AuthLayout'
import RegisterForm from '../components/Sign-up'

export default function RegistrationPage() {
  return (
    <Layout>
      <Box
        width='100%'
        height='100%'
        overflow='auto'
        bgcolor='primary.dark'
        pb={{ xs: '1rem', md: '2rem' }}
        pt={{ xs: '5rem', sm: '6rem', md: '8rem' }}
        px={{ xs: '1rem', md: '5rem', lg: '7rem', xl: '10rem' }}
      >
        <Stack
          width='100%'
          height='100%'
          maxWidth='95rem'
          margin='0 auto'
          minHeight='48rem'
          p={{ xs: '1.5rem', md: '2.5rem' }}
          direction='row'
          spacing={{ xs: '2rem', md: '2.5rem' }}
          bgcolor='#4B527E'
          borderRadius='0.5rem'
        >
          <Box width={{ xs: '100%', md: '50%' }}>
            <RegisterForm />
          </Box>
          <Box width='50%' display={{ xs: 'none', md: 'block' }}>
            <Box
              width='100%'
              height='100%'
              component='img'
              borderRadius='0.5rem'
              src='fondoregistro.svg'
              sx={{ objectFit: 'cover' }}
            />
          </Box>
        </Stack>
      </Box>
    </Layout>
  )
}
