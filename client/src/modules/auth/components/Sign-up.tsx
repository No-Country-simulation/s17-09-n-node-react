import { useState } from 'react' // Importamos useState de React para manejar el estado local
import { Link, useNavigate } from 'react-router-dom' // Importamos Link para la navegación interna y useNavigate para redirigir al usuario después del registro
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
} from '@mui/material' // Importamos componentes de MUI para la interfaz de usuario
import { useForm, SubmitHandler } from 'react-hook-form'; // Importamos useForm y SubmitHandler de react-hook-form para manejar formularios de manera sencilla
import icono from "./icononombre.svg" // Importamos un ícono para mostrar en el formulario

// Definimos los tipos de entrada que el formulario va a manejar
type Inputs = {
  name: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const Register = () => {
  // Manejamos el estado del error usando useState, inicialmente es null
  const [error, setError] = useState<null | string>(null)
  // Obtenemos la función navigate de useNavigate para redirigir al usuario
  const navigate = useNavigate()

  // Desestructuramos las funciones y objetos necesarios de useForm
  const {
    register, // Función para registrar campos del formulario
    handleSubmit, // Función para manejar el envío del formulario
    watch, // Función para observar valores de campos específicos en el formulario
    formState: { errors }, // Obtenemos los errores del formulario
  } = useForm<Inputs>()

  // Definimos la función que se ejecuta al enviar el formulario
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data) // Imprimimos los datos del formulario en la consola para depuración

    const { name, lastName, email, password } = data // Desestructuramos los valores de los datos del formulario
    // Verificamos si hay errores en el formulario
    if (Object.keys(errors).length !== 0) {
      setError('Por favor, corrige los errores antes de continuar.')
    } else {
      setError('') // Reseteamos el estado de error

      // Intentamos enviar los datos de registro a la API
      try {
        const response = await fetch(
          'https://s17-09-n-node-react.onrender.com/api/v1/user/register',
          {
            method: 'POST', // Método HTTP
            headers: {
              'Content-Type': 'application/json', // Indicamos que el contenido es JSON
            },
            body: JSON.stringify({ name, lastName, email, password }), // Convertimos los datos en un string JSON y los incluimos en el cuerpo de la petición
          },
        )

        // Manejo de respuestas según el código de estado
        if (response.status === 200) {
          navigate('/login') // Redirigimos al usuario a la página de login después de un registro exitoso
        } else if (response.status === 400) {
          setError('Algunos campos no están completos.') // Error 400, campos incompletos
        } else if (response.status === 409) {
          setError('El email ya está registrado.') // Error 409, email duplicado
        } else {
          setError('Error inesperado en el servidor.') // Otros errores
        }
      } catch (error) {
        setError('Error en el servidor.') // Error al conectar con el servidor
        console.log(error) // Imprimimos el error en la consola para depuración
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
        {/* Formulario para registro */}
        <form
          onSubmit={handleSubmit(onSubmit)} // handleSubmit envuelve la función onSubmit para manejar el envío
          style={{ width: '100%', marginTop: '1rem', color: 'white' }}
        >
          <div style={{display: "flex", flexDirection: "row", margin: "10px"}}>
          <img src={icono} alt="log" 
          style={{width: "60%", 
            height: "60%"
          }}/>
          <TextField
            label='Nombre'
            variant='outlined'
            fullWidth
            margin='normal'
            {...register('name', {
              required: {
                value: true,
                message: 'El nombre es obligatorio.', // Mensaje de error personalizado
              },
            })}
            error={!!errors?.name} // Muestra el error si existe
            helperText={errors?.name?.message} // Muestra el mensaje de error si existe
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
            label='Apellido'
            variant='outlined'
            fullWidth
            margin='normal'
            {...register('lastName', {
              required: {
                value: true,
                message: 'El apellido es obligatorio.', // Mensaje de error personalizado
              },
            })}
            error={!!errors?.lastName} // Muestra el error si existe
            helperText={errors?.lastName?.message} // Muestra el mensaje de error si existe
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
                message: 'Por favor, completa este campo.', // Mensaje de error personalizado
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Por favor, ingresa un email válido.', // Mensaje de error si el formato de email no es correcto
              },
            })}
            error={!!errors?.email} // Muestra el error si existe
            helperText={errors?.email?.message} // Muestra el mensaje de error si existe
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
                message: 'Por favor, completa este campo.', // Mensaje de error personalizado
              },
              minLength: {
                value: 8,
                message: 'La contraseña debe tener al menos 8 caracteres.', // Mensaje de error si la contraseña es demasiado corta
              },
            })}
            error={!!errors?.password} // Muestra el error si existe
            helperText={errors?.password?.message} // Muestra el mensaje de error si existe
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
              required: 'Por favor repite la contraseña', // Mensaje de error si no se repite la contraseña
              validate: (value) =>
                value === watch('password') || 'Las contraseñas no coinciden', // Verificamos que ambas contraseñas coincidan
            })}
            error={!!errors?.confirmPassword} // Muestra el error si existe
            helperText={errors?.confirmPassword?.message} // Muestra el mensaje de error si existe
            required
            InputProps={{
              sx: {
                backgroundColor: 'white',
                color: 'black',
              },
            }}
          />
          {/* Muestra un mensaje de alerta si hay un error en el registro */}
          {error && (
            <Alert severity='error' style={{ marginBottom: '1rem' }}>
              {error}
            </Alert>
          )}
          {/* Botón para enviar el formulario */}
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
          {/* Enlace para redirigir al usuario a la página de inicio de sesión */}
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

export default Register // Exportamos el componente Register como predeterminado
