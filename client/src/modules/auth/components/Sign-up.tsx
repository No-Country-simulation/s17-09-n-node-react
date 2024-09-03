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
import { useForm, SubmitHandler } from 'react-hook-form'
import icono from "./icononombre.svg"

type Inputs = {
  name: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const Register = () => {
  const [error, setError] = useState<null | string>(null)
  const [success, setSuccess] = useState<null | string>(null)
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, lastName, email, password } = data
  
    try {
      const response = await fetch(
        'https://s17-09-n-node-react.onrender.com/api/v1/user/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, name, lastName, password }), // Omitimos confirmPassword
        },
      )
  
      if (response.ok) {
        setSuccess('Usuario registrado con éxito. Redirigiendo al inicio de sesión...')
        setTimeout(() => {
          navigate('/login')
        }, 2000) // Espera 2 segundos antes de redirigir
      } else {
        const errorData = await response.json()
        switch (response.status) {
          case 400:
            setError(errorData.message || 'Algunos campos no están completos.')
            break
          case 409:
            setError('El email ya está registrado.')
            break
          case 500:
            setError('Error inesperado en el servidor.')
            break
          default:
            setError('Error inesperado en el servidor.')
        }
      }
    } catch (error) {
      setError('Error en el servidor.')
      console.error(error)
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
          <div style={{display: "flex", flexDirection: "row", margin: "10px"}}>
            <img src={icono} alt="log" 
              style={{width: "18%", height:"18%", alignSelf: "center", padding: "2%"}}
            />
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
          </div>
          <div style={{display: "flex", flexDirection: "row", margin: "10px"}}>
            <img src={icono} alt="log" 
              style={{width: "18%", height:"18%", alignSelf: "center", padding: "2%"}}
            />
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
          </div>
          <div style={{display: "flex", flexDirection: "row", margin: "10px"}}>
            <img src={icono} alt="log" 
              style={{width: "18%", height:"18%", alignSelf: "center", padding: "2%"}}
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
          </div>
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
          {success && (
            <Alert severity='success' style={{ marginBottom: '1rem' }}>
              {success}
            </Alert>
          )}
          <Button type='submit' variant='contained' color='inherit' sx={{backgroundColor: "#424769", color: "black"}} fullWidth>
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
            style={{ color: '#424769', textDecoration: 'none' }}
          >
            Inicia sesión
          </Link>
        </Typography>
      </Box>
    </Container>
  )
}

export default Register
