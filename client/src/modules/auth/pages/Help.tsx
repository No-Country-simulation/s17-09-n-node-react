import React, { useState } from 'react'
import {
  Container,
  Typography,
  Button,
  Collapse,
  Paper,
  Box,
} from '@mui/material'
import { ExpandMore, ExpandLess } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const helpContent = [
  {
    question: '¿Cómo iniciar sesión?',
    answer:
      'Para iniciar sesión, debes ingresar tu correo electrónico y contraseña en la página de inicio. Si aún no tienes una cuenta, puedes registrarte en la página de registro.',
  },
  {
    question: '¿Cómo gestionar los abogados?',
    answer:
      'Como administrador, puedes gestionar los perfiles de los abogados desde el panel de administración. Ahí podrás agregar, modificar o eliminar abogados según sea necesario.',
  },
  {
    question: '¿Cómo crear y gestionar casos?',
    answer:
      'Para crear y gestionar casos, navega a la sección de casos. Desde allí podrás agregar nuevos casos, adjuntar documentos y actualizar el estado del caso según corresponda.',
  },
  {
    question: '¿Cómo organizar la documentación?',
    answer:
      'Puedes subir, descargar y organizar documentos en la sección de documentación asociada a cada caso. Asegúrate de clasificar los documentos adecuadamente para un acceso más eficiente.',
  },
  {
    question: '¿Cómo agendar citas y audiencias?',
    answer:
      'Utiliza el calendario integrado para agendar citas y audiencias. También puedes configurar notificaciones para recordatorios de eventos importantes.',
  },
  {
    question: '¿Cómo gestionar la información de los clientes?',
    answer:
      'La información de los clientes se puede gestionar desde el panel de clientes, donde podrás actualizar datos de contacto y historial de casos.',
  },
  {
    question: '¿Cómo configurar mi cuenta?',
    answer:
      'Puedes personalizar la configuración de tu cuenta desde el menú de configuración, donde puedes cambiar tu contraseña y ajustar las preferencias de notificación.',
  },
]

const HelpPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Container 
      maxWidth={false} 
      disableGutters 
      sx={{ backgroundColor: '#2D3250', width: '100%', minHeight: '100vh', padding: 4 }}
    >
      <Typography variant='h4' gutterBottom align='center' sx={{ color: '#FFFFFF' }}>
        Página de Ayuda
      </Typography>
      <Box my={4}>
        {helpContent.map((item, index) => (
          <Paper 
            key={index} 
            elevation={3} 
            sx={{ 
              marginBottom: '1rem', 
              borderRadius: '8px', 
              backgroundColor: '#424769' 
            }}
          >
            <Button
              fullWidth
              variant='contained'
              onClick={() => handleToggle(index)}
              endIcon={openIndex === index ? <ExpandLess /> : <ExpandMore />}
              sx={{ 
                backgroundColor: '#F6B17A', 
                color: '#2D3250', 
                textAlign: 'left', 
                fontWeight: 'bold',
                justifyContent: 'space-between',
                padding: 2
              }}
            >
              {item.question}
            </Button>
            <Collapse in={openIndex === index}>
              <Box p={2} sx={{ backgroundColor: '#7077A1' }}>
                <Typography variant='body1' sx={{ color: '#FFFFFF' }}>
                  {item.answer}
                </Typography>
              </Box>
            </Collapse>
          </Paper>
        ))}
      </Box>
      <Box textAlign='center' mt={4}>
        <Button 
          component={Link} // Utiliza el componente Link de react-router-dom para navegar
          to="/login" 
          variant='contained' 
     
          sx={{ 
            backgroundColor: '#F6B17A', 
            color: '#2D3250', 
            fontWeight: 'bold'
          }}
        >
          Volver al Inicio
        </Button>
      </Box>

    </Container>
  )
}

export default HelpPage
