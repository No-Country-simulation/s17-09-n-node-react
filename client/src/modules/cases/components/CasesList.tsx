import { Box, Button, Typography } from '@mui/material'
import CaseCard from './CaseCard'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

const initialCases = [
  {
    title: 'Carlos Montiel',
    type: 'Suceción',
    state: 'Prueba',
  },
  {
    title: 'Nicolás Ferreyra c/Julia Solen',
    type: 'Ejecución',
    state: 'Inicio',
  },
  {
    title: 'Claudia Marquez c/Esteban López',
    type: 'Despido',
    state: 'Sentencia',
  },
  {
    title: 'Maira Alvarez c/ Nestor Astorgas',
    type: 'Daños y perjuicios',
    state: 'Archivado',
  },
  {
    title: 'Juan Perez c/Marcos Gonzalez',
    type: 'Daños y perjuicios',
    state: 'Inicio',
  },
]

const CasesList = () => {
  return (
    <>
      <Box
        borderRadius={2}
        bgcolor='primary.main'
        px={5}
        pt={5}
        pb={2}
        mx={{ sm: 5, xs: 0, lg: 5 }}
        mt={3}
        //sx={{ maxHeight: 500}}
      >
        <ul style={{ listStyle: 'none', padding: 5 }}>
          {initialCases.map((caseInfo, index) => (
            <CaseCard key={index} caseInfo={caseInfo} />
          ))}
        </ul>

        <Box display={'flex'} justifyContent={'center'}>
          <Button
            startIcon={<AddCircleOutlineIcon sx={{ color: 'white' }} />}
            sx={{
              color: 'white',
              '&.Mui-selected': {
                color: 'white',
              },
            }}
          >
            <Typography variant='body2'>Nuevo Caso</Typography>
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default CasesList
