import { useState } from 'react'
// import movementsService from '../services/movements.service'
import { Box, Typography } from '@mui/material'
import MovementFilterBar from '../components/MovementFilterBar'
import TodayIcon from '@mui/icons-material/Today'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import MovementList from '../components/MovementList'
import CaseProfileCard from '../components/CaseProfileCard'

import ListIcon from '@mui/icons-material/List'

const Movements = [
  {
    id: '1',
    createdAt: 'string',
    date: '2023-09-12',
    title: 'Hacer demanda',
    type: 'agenda',
    done: false,
    content: 'Redactar escrito de demanda',
    caseId: '1',
  },
  {
    id: '2',
    createdAt: 'string',
    date: '2023-09-11',
    title: 'Escrito solicitando se resuelva lo planteado en la demanda',
    type: 'procedural',
    done: true,
    content: 'Escrito para pedir que se resuelva lo solicitado',
    caseId: '1',
  },
  {
    id: '3',
    createdAt: 'string',
    date: '2023-09-14',
    title: 'Ver resolucion',
    type: 'agenda',
    done: true,
    content: 'Ver resolución del juzgado al escrito pidiendo resolucion',
    caseId: '1',
  },
  {
    id: '4',
    createdAt: 'string',
    date: '2023-09-13',
    title: 'Declaracion testimonial',
    type: 'agenda',
    done: false,
    content: 'Asistir a la declaracion',
    caseId: '1',
  },
]

const actions = [
  {
    label: 'Agenda',
    value: 'agenda',
    icon: <TodayIcon sx={{ width: 25 }} />,
  },
  {
    label: 'procesal',
    value: 'procedural',
    icon: <BookmarkIcon sx={{ width: 25 }} />,
  },
  {
    label: 'Todos',
    value: 'all',
    icon: <ListIcon sx={{ width: 25 }} />,
  },
]

const CaseMovementDetails: React.FC = () => {
  const [filter, setFilter] = useState('all')
  const [caseState, setCaseState] = useState('initial')
  return (
    <Box
      sx={{
        bgcolor: 'primary.dark',
        minHeight: '100vh',
        px: 1,
        pt: '20vh',
      }}
    >
      <Box
        sx={{
          minHeight: '100vh',
          maxWidth: 1000,
          mx: 'auto',
          my: 'auto',
        }}
      >
        <Typography variant='h5' color='primary.contrastText'>
          Mis Movimientos:
        </Typography>

        <CaseProfileCard
          caseState={caseState}
          setCaseState={setCaseState}
          caseName={''}
          jury={''}
          caseNumber={''}
          applicant={''}
          respondent={''}
          caseType={''}
        />

        <MovementFilterBar actions={actions} setFilter={setFilter} />
        <MovementList items={Movements} filter={filter} />
      </Box>
    </Box>
  )
}

export default CaseMovementDetails
