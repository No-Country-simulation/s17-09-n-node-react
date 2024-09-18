import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'

import {
  Box,
  Alert,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import { useAuth } from '../../../hooks'
import { SpinnerIcon } from '../../../components'

type Inputs = {
  email: string
  password: string
}

const Login = () => {
  const { startLogin, errorMessage } = useAuth()

  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await startLogin({ ...data })
  }

  return (
    <Box
      p='1.5rem'
      mb='1rem'
      height='100%'
      minHeight='35rem'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      bgcolor='primary.dark'
      borderRadius='0.5rem'
      sx={{ opacity: 0.9 }}
    >
      <Box mb='1rem'>
        <Typography
          variant='h4'
          align='center'
          color='white'
          component='h6'
          gutterBottom
        >
          Bienvenido a tu espacio de trabajo
        </Typography>
        <Typography variant='body1' align='center' color='white' component='p'>
          Puedes ingresar usando el email con el que te encuentras registrado,
          seguido de tu contraseña.
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          placeholder='Ingresa aquí tu email'
          variant='outlined'
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
          slotProps={{
            input: {
              sx: {
                bgcolor: 'white',
                color: 'black',
              },
            },
          }}
        />

        <TextField
          fullWidth
          placeholder='Ingresa aquí tu contraseña'
          type={showPassword ? 'text' : 'password'}
          variant='outlined'
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
          slotProps={{
            input: {
              sx: {
                bgcolor: 'white',
                color: 'black',
              },
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        {errorMessage && (
          <Alert
            severity='error'
            style={{ marginTop: '1rem', marginBottom: '0.5rem' }}
          >
            {errorMessage}
          </Alert>
        )}

        <Button
          fullWidth
          type='submit'
          variant='contained'
          disabled={isSubmitting}
          sx={{
            mt: '1rem',
            color: 'white',
            bgcolor: '#424769',
            '&.Mui-disabled': {
              color: 'white',
            },
          }}
        >
          {isSubmitting && (
            <SpinnerIcon
              style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }}
            />
          )}
          {isSubmitting ? 'Ingresando...' : 'Ingresar'}
        </Button>
      </form>

      <Typography variant='body2' align='center' color='white' mt='1.5rem'>
        ¿Aún no tienes una cuenta?&nbsp;
        <Typography
          component={Link}
          to='/register'
          variant='body2'
          color='secondary.main'
        >
          Registrate&nbsp;
        </Typography>
        para poder disfrutar de nuestros servicios.
      </Typography>
    </Box>
  )
}

export default Login
