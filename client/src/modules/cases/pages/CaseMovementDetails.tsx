import { useEffect, useState } from 'react'
import movementsService from '../services/movements.service'
import { Box, Typography } from '@mui/material'
import MovementFilterBar from '../components/MovementFilterBar'
import TodayIcon from '@mui/icons-material/Today'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import MovementList from '../components/MovementList'
// import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import ListIcon from '@mui/icons-material/List'

const Movements = [
  {
    id: '1',
    createdAt: 'string',
    date: '10/09/2024',
    title: 'demanda',
    type: 'agenda',
    done: false,
    content: 'hacer demanda',
    caseId: '1',
  },
  {
    id: '2',
    createdAt: 'string',
    date: '10/09/2024',
    title: 'demanda',
    type: 'procedural',
    done: true,
    content: 'hacer demanda',
    caseId: '1',
  },
  {
    id: '3',
    createdAt: 'string',
    date: '10/09/2024',
    title: 'demanda',
    type: 'agenda',
    done: true,
    content: 'hacer demanda',
    caseId: '1',
  },
  {
    id: '4',
    createdAt: 'string',
    date: '10/09/2024',
    title: 'demanda',
    type: 'agenda',
    done: false,
    content: 'hacer demanda',
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
  const [movements, setMovements] = useState([])

  useEffect(() => {
    movementsService.getMovementsList().then((res) => setMovements(res.data))
    console.log(movements)
  })

  return (
    <Box
      sx={{
        bgcolor: 'primary.dark',
        minHeight: '100vh',
        px: 1,
        pt: '15vh',
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
        <MovementFilterBar actions={actions} setFilter={setFilter} />
        <MovementList items={Movements} filter={filter} />
      </Box>
    </Box>
  )
}

export default CaseMovementDetails
