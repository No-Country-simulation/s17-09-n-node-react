import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Si usas react-router-dom para el enrutamiento
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Aquí puedes agregar la lógica para autenticar al usuario
    console.log('Email:', email);
    console.log('Password:', password);

    // Simulación de validación
    if (email === '' || password === '') {
      setError('Por favor, completa todos los campos.');
    } else {
      setError('');
      // Redirigir o mostrar un mensaje de éxito
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
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
          <TextField
            label="Ingresa aquí tu email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Ingresa aquí tu contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
          <Link to="/registro" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Registrate
          </Link>{' '}
          para poder disfrutar de nuestros servicios
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
