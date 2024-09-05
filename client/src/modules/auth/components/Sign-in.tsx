import { useState } from 'react'
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

import { AxiosError } from 'axios'
import { lawCaseApi } from '../../../apis'
import { useSession } from '../../../hooks'

type Inputs = {
  email: string
  password: string
}

const Login = () => {
  const navigate = useNavigate()
  const { createSession } = useSession()
  const [error, setError] = useState<null | string>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data

    try {
      const res = await lawCaseApi.post('/user/login', { email, password })

      if (res.status !== 201) {
        setError('Ocurrió un error. Por favor intente más tarde.')
        return
      }

      // TODO Obtener el perfil del usuario
      // para que cuando se inicie sesión, el usuario ya tega cargado su perfil.

      // const { data: profile } = await lawCaseApi.get('user/profile') // ejemplo (no existe este endpoint)
      // createSession({ ...profile })

      createSession({
        id: '123',
        name: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'USER',
      })

      localStorage.setItem('token', res.data.accessToken)

      navigate('/profile')
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 404)
        ) {
          setError('Credenciales Inválidas')
        } else {
          setError('Error en el servidor.')
        }
      } else if (error instanceof Error) {
        setError('Error: ' + error.message)
      } else {
        setError('Error desconocido:' + error)
      }
    }
  }

  return (
    <Container maxWidth='xs'>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        minHeight='100vh'
      >
        <Typography variant='h4' component='h1' gutterBottom>
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
            error={!!errors?.email}
            helperText={errors?.email?.message}
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
            error={!!errors?.password}
            helperText={errors?.password?.message}
            required
            InputProps={{
              sx: {
                backgroundColor: 'white',
                color: 'black',
              },
            }}
          />
          {error && (
            <Alert severity='error' style={{ marginBottom: '1rem' }}>
              {error}
            </Alert>
          )}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            sx={{
              backgroundColor: '#424769',
              color: 'black',
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
