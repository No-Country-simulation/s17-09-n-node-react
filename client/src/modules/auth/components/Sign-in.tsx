import { Link, useNavigate } from 'react-router-dom'

import {
  Box,
  Alert,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material'

import { useForm, SubmitHandler } from 'react-hook-form'

import { useAuth } from '../../../hooks'

type Inputs = {
  email: string
  password: string
}

const Login = () => {
  const navigate = useNavigate()
  const { startLogin, errorMessage } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ mode: 'onChange' })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    await startLogin({ ...data })
    navigate('/profile')
  }

  return (
    <Container maxWidth='sm'>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        minHeight='100vh'
      >
        <Typography variant='h4' component='h6' width='80%' gutterBottom>
          Bienvenido a tu espacio de trabajo
        </Typography>
        <Typography variant='body1' align='center' paragraph>
          Puedes ingresar usando el email con el que te encuentras registrado,
          seguido de tu contraseña.
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: '100%', marginTop: '1rem', color: 'white' }}
        >
          <TextField
            label='Ingresa aquí tu email'
            variant='outlined'
            fullWidth
            margin='normal'
            {...register('email', {
              required: {
                value: true,
                message: 'Por favor, completa este campo.',
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Por favor, ingresa un email válido.',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            required
            InputProps={{
              sx: {
                backgroundColor: 'white',
                color: 'black',
              },
            }}
          />

          <TextField
            label='Ingresa aquí tu contraseña'
            type='password'
            variant='outlined'
            fullWidth
            margin='normal'
            {...register('password', {
              required: {
                value: true,
                message: 'Por favor, completa este campo.',
              },
              minLength: {
                value: 8,
                message: 'La contraseña debe tener al menos 8 caracteres.',
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            required
            InputProps={{
              sx: {
                backgroundColor: 'white',
                color: 'black',
              },
            }}
          />
          {errorMessage && (
            <Alert severity='error' style={{ marginBottom: '1rem' }}>
              {errorMessage}
            </Alert>
          )}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={isSubmitting}
            sx={{
              backgroundColor: '#424769',
              color: 'white',
              width: '80%',
              margin: '0 10%',
            }}
            fullWidth
          >
            Ingresar
          </Button>
        </form>
        <Typography
          variant='body2'
          align='center'
          style={{ marginTop: '1rem' }}
        >
          ¿Aun no tienes una cuenta?{' '}
          <Link
            to='/register'
            style={{ color: '#1976d2', textDecoration: 'none' }}
          >
            Registrate
          </Link>{' '}
          para poder disfrutar de nuestros servicios
        </Typography>
      </Box>
    </Container>
  )
}

export default Login
