import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

import { Box, Button, Container, TextField, Typography } from '@mui/material'

import { useAuth } from '../../../hooks'
import { showStatusSnackbar } from '../../../helpers'

import mail from './mail.svg'
import icono from './icononombre.svg'
import iconopass from './iconopass.svg'

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

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ mode: 'onChange' })

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
    <Container maxWidth='xs'>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        minHeight='100vh'
      >
        <Typography variant='h4' component='h1' align='left' gutterBottom>
          Registrate
        </Typography>
        <Typography variant='body1' align='left' paragraph>
          Crea tu cuenta y unete a miles de profesionales que ya utilizan
          nuestros servicios.
        </Typography>
        <div className='ml-[-20%]'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}
            >
              <img
                src={icono}
                alt='log'
                style={{
                  width: '15%',
                  height: '15%',
                  alignSelf: 'center',
                  padding: '2%',
                }}
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
                InputProps={{
                  sx: {
                    backgroundColor: 'white',
                    color: 'black',
                    height: '50px',
                    widht: '100%',
                  },
                }}
              />
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}
            >
              <img
                src={icono}
                alt='log'
                style={{
                  width: '15%',
                  height: '15%',
                  alignSelf: 'center',
                  padding: '2%',
                }}
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
                  minLength: {
                    value: 2,
                    message: 'El apellido debe tener al menos 2 caracteres.',
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message:
                      'El apellido solo puede contener letras y espacios.',
                  },
                })}
                error={!!errors?.lastName}
                helperText={errors?.lastName?.message}
                InputProps={{
                  sx: {
                    backgroundColor: 'white',
                    color: 'black',
                    height: '50px',
                    widht: '100%',
                  },
                }}
              />
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}
            >
              <img
                src={mail}
                alt='log'
                style={{
                  width: '15%',
                  height: '15%',
                  alignSelf: 'center',
                  padding: '2%',
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
                InputProps={{
                  sx: {
                    backgroundColor: 'white',
                    color: 'black',
                    height: '50px',
                    widht: '100%',
                  },
                }}
              />
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}
            >
              <img
                src={iconopass}
                alt='log'
                style={{
                  width: '15%',
                  height: '15%',
                  alignSelf: 'center',
                  padding: '2%',
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
                  pattern: {
                    value: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                    message:
                      'La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial.',
                  },
                })}
                error={!!errors?.password}
                helperText={errors?.password?.message}
                InputProps={{
                  sx: {
                    height: '50px',
                    widht: '100%',
                    backgroundColor: 'white',
                    color: 'black',
                  },
                }}
              />
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}
            >
              <img
                src={iconopass}
                alt='log'
                style={{
                  width: '15%',
                  height: '15%',
                  alignSelf: 'center',
                  padding: '2%',
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
                    value === watch('password') ||
                    'Las contraseñas no coinciden',
                })}
                error={!!errors?.confirmPassword}
                helperText={errors?.confirmPassword?.message}
                InputProps={{
                  sx: {
                    backgroundColor: 'white',
                    color: 'black',
                    height: '50px',
                    widht: '100%',
                  },
                }}
              />
            </div>

            <Button
              type='submit'
              variant='contained'
              color='inherit'
              sx={{
                backgroundColor: '#4B527E',
                color: 'white',
                margin: '0 10%',
                boxShadow: '10px black',
                borderRadius: '15px',
                border: '2px solid white',
              }}
              disabled={isSubmitting}
              fullWidth
            >
              Registrarme
            </Button>
          </form>
        </div>
        <Typography
          variant='body2'
          color='textSecondary'
          align='center'
          style={{ marginTop: '1rem' }}
        >
          ¿Ya tienes una cuenta?{' '}
          <Link
            to='/login'
            style={{ textDecoration: 'none', color: '#749BFF' }}
          >
            Inicia sesión aquí
          </Link>
        </Typography>
      </Box>
    </Container>
  )
}

export default Register
