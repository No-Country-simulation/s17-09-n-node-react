import { Box, Button, Typography } from '@mui/material'
import CaseCard from './CaseCard'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import CasesScrollbar from './CasesScrollBar'

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
        px={3}
        pt={4}
        mt={3}
        sx={{ minHeight: { sm: 350, xs: 400 } }}
      >
        <CasesScrollbar>
          <ul
            style={{
              listStyle: 'none',
              padding: 5,
            }}
          >
            {initialCases.map((caseInfo, index) => (
              <CaseCard key={index} caseInfo={caseInfo} />
            ))}
          </ul>
        </CasesScrollbar>

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
