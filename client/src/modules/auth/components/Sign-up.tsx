import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
} from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  name: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const Register = () => {
  const [error, setError] = useState<null | string>(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data)

    const { name, lastName, email, password } = data
    // Verificar si hay errores
    if (Object.keys(errors).length !== 0) {
      setError('Por favor, corrige los errores antes de continuar.')
    } else {
      setError('')

      // Envío de datos de registro a la API
      try {
        const response = await fetch(
          'https://s17-09-n-node-react.onrender.com/api/v1/user/register',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, lastName, email, password }),
          },
        )

        if (response.status === 200) {
          navigate('/login') // Redirigir al login después del registro exitoso
        } else if (response.status === 400) {
          setError('Algunos campos no están completos.')
        } else if (response.status === 409) {
          setError('El email ya está registrado.')
        } else {
          setError('Error inesperado en el servidor.')
        }
      } catch (error) {
        setError('Error en el servidor.')
        console.log(error)
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
          Crear una cuenta
        </Typography>
        <Typography variant='body1' align='center' paragraph>
          Completa el formulario para registrarte y comenzar a usar nuestros
          servicios.
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: '100%', marginTop: '1rem', color: 'white' }}
        >
          <TextField
            label='Nombre'
            variant='outlined'
            fullWidth
            margin='normal'
            {...register('name', {
              required: {
                value: true,
                message: 'El nombre es obligatorio.',
              },
            })}
            error={!!errors?.name}
            helperText={errors?.name?.message}
            required
            InputProps={{
              sx: {
                backgroundColor: 'white',
                color: 'black',
              },
            }}
          />
          <img src="inombre" alt="icono" />
          <TextField
            label='Apellido'
            variant='outlined'
            fullWidth
            margin='normal'
            {...register('lastName', {
              required: {
                value: true,
                message: 'El apellido es obligatorio.',
              },
            })}
            error={!!errors?.lastName}
            helperText={errors?.lastName?.message}
            required
            InputProps={{
              sx: {
                backgroundColor: 'white',
                color: 'black',
              },
            }}
          />
          <TextField
            label='Email'
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
            label='Contraseña'
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
          <TextField
            label='Confirmar Contraseña'
            type='password'
            variant='outlined'
            fullWidth
            margin='normal'
            {...register('confirmPassword', {
              required: 'Por favor repite la contraseña',
              validate: (value) =>
                value === watch('password') || 'Las contraseñas no coinciden',
            })}
            error={!!errors?.confirmPassword}
            helperText={errors?.confirmPassword?.message}
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
          <Button type='submit' variant='contained' color='primary' fullWidth>
            Registrarse
          </Button>
        </form>
        <Typography
          variant='body2'
          align='center'
          style={{ marginTop: '1rem' }}
        >
          ¿Ya tienes una cuenta?{' '}
          <Link
            to='/login'
            style={{ color: '#1976d2', textDecoration: 'none' }}
          >
            Inicia sesión
          </Link>
        </Typography>
      </Box>
    </Container>
  )
}

export default Register
