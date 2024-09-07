import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import icono from './icononombre.svg';
import iconopass from './iconopass.svg';
import axios from 'axios'; 
import mail from './mail.svg';

type Inputs = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState<null | string>(null);
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<Inputs>({ mode: 'onChange' });

  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          setError(data.message || 'Algunos campos no están completos.');
          break;
        case 409:
          setError('El email ya está registrado.');
          break;
        case 500:
          setError('Error inesperado en el servidor.');
          break;
        default:
          setError('Error inesperado en el servidor.');
      }
    } else {
      setError('Error en el servidor.');
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, lastName, email, password } = data;
    //const imagen = 'https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg';

    try {
      const response = await axios.post(
        'https://s17-09-n-node-react.onrender.com/api/v1/user/register',
        { email, name, lastName, password},
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        setSuccess('Usuario registrado con éxito. Redirigiendo al inicio de sesión...');
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Espera 2 segundos antes de redirigir
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Container maxWidth='xs'>
      <Box
        display='flex'
        flexDirection='column'
    
        justifyContent='center'
        minHeight='100vh'
        marginRight='-20%'       >
        <Typography variant='h4' component='h1' align='left' gutterBottom>
          Registrate
        </Typography>
        <Typography variant='body1' align='left' paragraph>
          Crea tu cuenta y 
          unete a miles de profesionales
          que ya utilizan nuestros servicios.
        </Typography>
        <div className='ml-[-20%]'>
        <form
          onSubmit={handleSubmit(onSubmit)}
 
        >
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
                  widht: '100%'
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
                  message: 'El apellido solo puede contener letras y espacios.',
                },
              })}
              error={!!errors?.lastName}
              helperText={errors?.lastName?.message}
              InputProps={{
                sx: {
                  backgroundColor: 'white',
                  color: 'black',
                  height: '50px',
                  widht: '100%'
                
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
                  backgroundColor: 'gray',
                  color: 'black',
                  height: '50px',
                  widht: '100%'
                
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
                  value === watch('password') || 'Las contraseñas no coinciden',
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
          <Button
            type='submit'
            variant='contained'
            color='inherit'
            sx={{
              backgroundColor: '#4B527E',
              color: 'white',
              width: "40%",
              margin: '0 30%',
              boxShadow: "10px black",
              borderRadius: "15px",
              border: "2px solid white",
              transition: 'all 0.3s ease', // Para una animación suave
              '&:hover': {
                backgroundColor: '#3B416E', // Color de fondo al hacer hover
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)', // Cambia el efecto de sombra
                transform: 'scale(1.05)', // Leve aumento de tamaño
              },
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
          <Link to='/login' style={{ textDecoration: 'none', color: "#749BFF" }}>
            Inicia sesión aquí
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
