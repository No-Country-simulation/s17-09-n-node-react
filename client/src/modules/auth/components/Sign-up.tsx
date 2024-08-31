import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';

const Register = () => {
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [lastNameError, setLastNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const navigate = useNavigate();

  // Validaciones
  const validateName = (name: string) => {
    if (name.trim().length === 0) {
      setNameError('El nombre es obligatorio.');
    } else {
      setNameError('');
    }
  };

  const validateLastName = (lastName: string) => {
    if (lastName.trim().length === 0) {
      setLastNameError('El apellido es obligatorio.');
    } else {
      setLastNameError('');
    }
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

  const validateConfirmPassword = (confirmPassword: string) => {
    if (confirmPassword !== password) {
      setConfirmPasswordError('Las contraseñas no coinciden.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Verificar si hay errores
    if (nameError || lastNameError || emailError || passwordError || confirmPasswordError) {
      setError('Por favor, corrige los errores antes de continuar.');
    } else {
      setError('');

      // Envío de datos de registro a la API
      try {
        const response = await fetch('https://s17-09-n-node-react.onrender.com/api/v1/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, lastName, email, password }),
        });

        if (response.status === 200) {
          navigate('/login'); // Redirigir al login después del registro exitoso
        } else if (response.status === 400) {
          setError('Algunos campos no están completos.');
        } else if (response.status === 409) {
          setError('El email ya está registrado.');
        } else {
          setError('Error inesperado en el servidor.');
        }
      } catch (error) {
        setError('Error en el servidor.');
        console.log(error);
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
          Crear una cuenta
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Completa el formulario para registrarte y comenzar a usar nuestros servicios.
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem', color: 'white' }}>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validateName(e.target.value);
            }}
            error={!!nameError}
            helperText={nameError}
            required
            InputProps={{
              sx: {
                backgroundColor: 'white',
                color: 'black',
              },
            }}
          />
          <TextField
            label="Apellido"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              validateLastName(e.target.value);
            }}
            error={!!lastNameError}
            helperText={lastNameError}
            required
            InputProps={{
              sx: {
                backgroundColor: 'white',
                color: 'black',
              },
            }}
          />
          <TextField
            label="Email"
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
                backgroundColor: 'white',
                color: 'black',
              },
            }}
          />
          <TextField
            label="Contraseña"
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
                backgroundColor: 'white',
                color: 'black',
              },
            }}
          />
          <TextField
            label="Confirmar Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validateConfirmPassword(e.target.value);
            }}
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
            required
            InputProps={{
              sx: {
                backgroundColor: 'white',
                color: 'black',
              },
            }}
          />
          {error && (
            <Alert severity="error" style={{ marginBottom: '1rem' }}>
              {error}
            </Alert>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Registrarse
          </Button>
        </form>
        <Typography variant="body2" align="center" style={{ marginTop: '1rem' }}>
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Inicia sesión
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
