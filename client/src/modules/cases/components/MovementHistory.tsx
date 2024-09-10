import { Box, Button, Typography } from '@mui/material'
import MovementCard from './MovementCard'
import AddIcon from '../assets/AddIcon'
import { useState } from 'react'
import FilterBar from './FilterBar'
import CaseProfileCard from './CaseProfileCard'

const InitialCase = {
  caseName: 'Perez Carlos c/ Almada Gladis',
  jury: 'Juzgado Nº2 en lo Civil y Comercial',
  caseNumber: '26478/2024',
  applicant: 'Perez Carlos',
  respondent: 'Almada Gladis',
  caseType: 'Daños y Perjuicios',
  caseState: 'veredict',
}

const initialMovements = [
  {
    content: 'Inicio de proceso',
    type: 'procedural',
    date: '04/09/2024',
  },
  {
    content: 'Ver primera resolución',
    type: 'agenda',
    date: '07/09/2024',
  },
  {
    content: 'Primera resolución',
    type: 'procedural',
    date: '12/09/2024',
  },
  {
    content: 'Ver contestación de demandada',
    type: 'agenda',
    date: '15/09/2024',
  },
]

const MovementHistory = () => {
  const [value, setValue] = useState('all')
  const [movements, setMovements] = useState(initialMovements)
  const [searchText, setSearchText] = useState('')
  const [caseState, setCaseState] = useState(InitialCase.caseState)

  return (
    <>
      {/* PROFILE CASE-STATE MENU */}
      <CaseProfileCard
        caseState={caseState}
        setCaseState={setCaseState}
        caseName={InitialCase.caseName}
        jury={InitialCase.jury}
        caseNumber={InitialCase.caseNumber}
        applicant={InitialCase.applicant}
        respondent={InitialCase.respondent}
        caseType={InitialCase.caseType}
      />

      {/* FILTER */}
      <FilterBar
        value={value}
        setValue={setValue}
        searchText={searchText}
        initialMovements={initialMovements}
        setMovements={setMovements}
        setSearchText={setSearchText}
      />

      {/* MOVEMENTS LIST */}
      <Box
        borderRadius={2}
        bgcolor={'#424769'}
        px={5}
        py={1}
        mx={{ sm: 5, xs: 0, lg: 5 }}
      >
        <ul style={{ listStyle: 'none', padding: '0px' }}>
          {movements.map((movement) => (
            <MovementCard movement={movement} />
          ))}
        </ul>

        <Box display={'flex'} justifyContent={'center'}>
          <Button
            startIcon={<AddIcon size={'20px'} color={'white'} />}
            sx={{
              color: 'white',
              '&.Mui-selected': {
                color: 'white',
              },
            }}
          >
            <Typography variant='body2'>Agregar Tarea</Typography>
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default MovementHistory
