import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Checkbox, FormControlLabel, Button, Typography, Container, Grid, FormHelperText } from '@mui/material';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    if (!formData.name) newErrors.push('Nombre es requerido.');
    if (!formData.email) newErrors.push('Email es requerido.');
    if (!formData.password) newErrors.push('Contraseña es requerida.');
    if (formData.password !== formData.confirmPassword) newErrors.push('Las contraseñas no coinciden.');
    if (!formData.termsAccepted) newErrors.push('Debe aceptar los términos y condiciones.');
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Aquí se podría manejar el envío del formulario, como hacer una llamada a la API
      console.log('Form data submitted:', formData);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" gutterBottom>
        Regístrate
      </Typography>
      <Typography variant="body1" paragraph>
        Crea tu cuenta y únete a miles de profesionales que ya utilizan nuestros servicios.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ingresa aquí tu nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingresa aquí tu nombre"
              error={errors.includes('Nombre es requerido.')}
              helperText={errors.includes('Nombre es requerido.') ? 'Nombre es requerido.' : ''}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ingresa aquí tu email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingresa aquí tu email"
              type="email"
              error={errors.includes('Email es requerido.')}
              helperText={errors.includes('Email es requerido.') ? 'Email es requerido.' : ''}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Crea tu contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Crea tu contraseña"
              type="password"
              error={errors.includes('Contraseña es requerida.')}
              helperText={errors.includes('Contraseña es requerida.') ? 'Contraseña es requerida.' : ''}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirma tu contraseña"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirma tu contraseña"
              type="password"
              error={errors.includes('Las contraseñas no coinciden.')}
              helperText={errors.includes('Las contraseñas no coinciden.') ? 'Las contraseñas no coinciden.' : ''}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                />
              }
              label="Estoy de acuerdo con los Términos y Condiciones de uso."
            />
            {errors.includes('Debe aceptar los términos y condiciones.') && (
              <FormHelperText error>
                Debe aceptar los términos y condiciones.
              </FormHelperText>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Registrar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Register;
