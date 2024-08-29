import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const navigate = useNavigate();

  // Credenciales fake para acceso temporal
  const fakeCredentials = {
    email: 'user@fake.com',
    password: 'password123',
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Por favor, ingresa un email válido.');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres.');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email === '' || password === '') {
      setError('Por favor, completa todos los campos.');
    } else if (emailError || passwordError) {
      setError('Por favor, corrige los errores antes de continuar.');
    } else {
      setError('');

      // Verificación de credenciales fake
      if (email === fakeCredentials.email && password === fakeCredentials.password) {
        localStorage.setItem('token', 'fake-token'); // Simula el almacenamiento de un token
        navigate('/dashboard'); // Redirige al dashboard
      } else {
        try {
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const { message } = await response.json();
            setError(message || 'Credenciales incorrectas.');
          } else {
            const { accessToken } = await response.json();
            localStorage.setItem('token', accessToken);
            navigate('/dashboard');
          }
        } catch (error) {
          setError('Error en el servidor.');
          console.log(error);
        }
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Bienvenido a tu espacio de trabajo
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Puedes ingresar usando el email con el que te encuentras registrado, seguido de tu
          contraseña.
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem', color: 'white' }}>
          <TextField
            label="Ingresa aquí tu email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            error={!!emailError}
            helperText={emailError}
            required
            InputProps={{
              sx: {
                backgroundColor: 'white', // Fondo blanco para el input
                color: 'black', // Color del texto
              },
            }}
          />
          <TextField
            label="Ingresa aquí tu contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            error={!!passwordError}
            helperText={passwordError}
            required
            InputProps={{
              sx: {
                backgroundColor: 'white', // Fondo blanco para el input
                color: 'black', // Color del texto
              },
            }}
          />
          {error && (
            <Alert severity="error" style={{ marginBottom: '1rem' }}>
              {error}
            </Alert>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Ingresar
          </Button>
        </form>
        <Typography variant="body2" align="center" style={{ marginTop: '1rem' }}>
          ¿Aun no tienes una cuenta?{' '}
          <Link to="/register" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Registrate
          </Link>{' '}
          para poder disfrutar de nuestros servicios
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
