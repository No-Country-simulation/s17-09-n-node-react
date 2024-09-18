import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'

import { useAuth } from '../../../hooks'
import { showStatusSnackbar } from '../../../helpers'
import {
  LockIcon,
  MailIcon,
  PersonIcon,
  SpinnerIcon,
} from '../../../components'

type Inputs = {
  name: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const Register = () => {
  const navigate = useNavigate()
  const { startRegister } = useAuth()

  const [showPassword, setShowPassword] = useState(false)

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = data
    const res = await startRegister(rest)

    if (!res.ok) {
      showStatusSnackbar(res)
      return
    }

    showStatusSnackbar(res, { vertical: 'bottom', horizontal: 'right' }, 7000)
    navigate('/login')
  }

  return (
    <Box
      height='100%'
      display='flex'
      flexDirection='column'
      justifyContent='center'
    >
      <Box mb='1.5rem'>
        <Typography
          variant='h4'
          color='white'
          component='h1'
          gutterBottom
          textAlign={{ xs: 'center', md: 'left' }}
        >
          Regístrate
        </Typography>
        <Typography
          variant='body1'
          color='white'
          component='p'
          textAlign={{ xs: 'center', md: 'left' }}
        >
          Crea tu cuenta y únete a miles de profesionales que ya utilizan
          nuestros servicios.
        </Typography>
      </Box>

      <Box
        component='form'
        display='flex'
        flexDirection='column'
        gap={{ xs: '1rem', md: '1.5rem' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box display='flex' alignItems='start' gap='1rem'>
          <Box
            component='label'
            htmlFor='name'
            display={{ xs: 'none', md: 'block' }}
          >
            <PersonIcon style={{ width: 'auto', height: '3.5rem' }} />
          </Box>
          <TextField
            id='name'
            fullWidth
            placeholder='Nombre'
            variant='outlined'
            {...register('name', {
              required: {
                value: true,
                message: 'El nombre es obligatorio.',
              },
              minLength: {
                value: 2,
                message: 'El nombre debe tener al menos 2 caracteres.',
              },
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: 'El nombre solo puede contener letras y espacios.',
              },
            })}
            error={!!errors?.name}
            helperText={errors?.name?.message}
            slotProps={{
              input: {
                sx: {
                  bgcolor: 'white',
                  color: 'black',
                },
              },
            }}
          />
        </Box>

        <Box display='flex' alignItems='start' gap='1rem'>
          <Box
            component='label'
            htmlFor='lastName'
            display={{ xs: 'none', md: 'block' }}
          >
            <PersonIcon style={{ width: 'auto', height: '3.5rem' }} />
          </Box>
          <TextField
            id='lastName'
            fullWidth
            placeholder='Apellido'
            variant='outlined'
            {...register('lastName', {
              required: {
                value: true,
                message: 'El apellido es obligatorio.',
              },
              minLength: {
                value: 2,
                message: 'El apellido debe tener al menos 2 caracteres.',
              },
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: 'El apellido solo puede contener letras y espacios.',
              },
            })}
            error={!!errors?.lastName}
            helperText={errors?.lastName?.message}
            slotProps={{
              input: {
                sx: {
                  bgcolor: 'white',
                  color: 'black',
                },
              },
            }}
          />
        </Box>

        <Box display='flex' alignItems='start' gap='1rem'>
          <Box
            component='label'
            htmlFor='email'
            display={{ xs: 'none', md: 'block' }}
          >
            <MailIcon style={{ width: 'auto', height: '3.5rem' }} />
          </Box>
          <TextField
            id='email'
            fullWidth
            type='email'
            placeholder='Email'
            variant='outlined'
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
            slotProps={{
              input: {
                sx: {
                  bgcolor: 'white',
                  color: 'black',
                },
              },
            }}
          />
        </Box>

        <Box display='flex' alignItems='start' gap='1rem'>
          <Box
            component='label'
            htmlFor='password'
            display={{ xs: 'none', md: 'block' }}
          >
            <LockIcon style={{ width: 'auto', height: '3.5rem' }} />
          </Box>
          <TextField
            id='password'
            fullWidth
            type={showPassword ? 'text' : 'password'}
            placeholder='Contraseña'
            variant='outlined'
            {...register('password', {
              required: {
                value: true,
                message: 'Por favor, completa este campo.',
              },
              minLength: {
                value: 8,
                message: 'La contraseña debe tener al menos 8 caracteres.',
              },
              pattern: {
                value: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                message:
                  'La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial.',
              },
            })}
            error={!!errors?.password}
            helperText={errors?.password?.message}
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
        </Box>

        <Box display='flex' alignItems='start' gap='1rem'>
          <Box
            component='label'
            htmlFor='confirmPassword'
            display={{ xs: 'none', md: 'block' }}
          >
            <LockIcon style={{ width: 'auto', height: '3.5rem' }} />
          </Box>
          <TextField
            id='confirmPassword'
            fullWidth
            type='password'
            placeholder='Confirmar Contraseña'
            variant='outlined'
            {...register('confirmPassword', {
              required: 'Por favor repite la contraseña',
              validate: (value) =>
                value === watch('password') || 'Las contraseñas no coinciden',
            })}
            error={!!errors?.confirmPassword}
            helperText={errors?.confirmPassword?.message}
            slotProps={{
              input: {
                sx: {
                  bgcolor: 'white',
                  color: 'black',
                },
              },
            }}
          />
        </Box>

        <Button
          fullWidth
          type='submit'
          variant='contained'
          disabled={isSubmitting}
          sx={{
            color: 'white',
            bgcolor: '#4B527E',
            border: '2px solid white',
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
          {isSubmitting ? 'Registrando...' : 'Registrarme'}
        </Button>
      </Box>

      <Typography variant='body2' align='center' color='white' mt='1.5rem'>
        ¿Ya tienes una cuenta?&nbsp;
        <Typography
          component={Link}
          to='/login'
          variant='body2'
          color='secondary.main'
        >
          Inicia sesión aquí.
        </Typography>
      </Typography>
    </Box>
  )
}

export default Register
