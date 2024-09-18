import { useEffect, useState } from 'react'
import { MovementInfoType } from '../components/MovementCard'
import { Box, Typography } from '@mui/material'
import MovementFilterBar from '../components/MovementFilterBar'
import TodayIcon from '@mui/icons-material/Today'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import MovementList from '../components/MovementList'
import CaseProfileCard from '../components/CaseProfileCard'
import { useParams } from 'react-router-dom'
import ListIcon from '@mui/icons-material/List'
import { useAuth } from '../../../hooks'
import { typeTipo, typeStatus } from '../services/cases.service'
import movementsService from '../services/movements.service'

const actions = [
  {
    label: 'Agenda',
    value: 'APPOINTMENT',
    icon: <TodayIcon sx={{ width: 25 }} />,
  },
  {
    label: 'Procesal',
    value: 'PROCEDURAL_ACTION',
    icon: <BookmarkIcon sx={{ width: 25 }} />,
  },
  {
    label: 'Todos',
    value: 'all',
    icon: <ListIcon sx={{ width: 25 }} />,
  },
]

interface CaseType {
  id: string
  createdAt: string
  updatedAt: string
  caseName: string
  jury: string
  caseNumber: string
  applicant: string
  respondent: string
  type: typeTipo
  status: typeStatus
  userId: string
  movements: [
    {
      id: string
      createdAt: string
      updatedAt: string
      date: string
      title: string
      type: string
      done: boolean
      content: string
      caseId: string
    },
  ]
}

const CaseMovementDetails: React.FC = () => {
  const [filter, setFilter] = useState('all')
  const [searchFilter, setSearchFilter] = useState('')

  const [caseData, setCaseData] = useState<CaseType | null>(null)
  const [caseStatus, setCaseStatus] = useState<typeStatus | null>(null)
  const [movements, setMovements] = useState<MovementInfoType[]>([])

  const { token, user } = useAuth()
  console.log(user)
  const params = useParams()
  const caseId = params.id

  useEffect(() => {
    if (token && typeof caseId === 'string') {
      movementsService.getMovementsByCaseId(caseId).then((res) => {
        if (res?.data) {
          setCaseData(res.data)
          setMovements(res.data.movements)
          setCaseStatus(res.data.status)
        } else {
          console.log('Error al obtener los datos del movimiento')
        }
      })
    }
  }, [token, caseId])

  return (
    <Box
      sx={{
        bgcolor: 'primary.dark',
        minHeight: '100vh',
        px: 1,
        pt: { sm: '25vh', xs: '25vh', md: '25vh', lg: '15vh' },
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
        <Typography
          variant='h5'
          color='primary.contrastText'
          sx={{ paddingX: { xs: '20px' } }}
        >
          Mis Movimientos:
        </Typography>
        {caseData ? (
          <CaseProfileCard
            caseId={caseId}
            caseStatus={caseStatus}
            setCaseStatus={setCaseStatus}
            caseName={caseData.caseName}
            jury={caseData.jury}
            caseNumber={caseData.caseNumber}
            applicant={caseData.applicant}
            respondent={caseData.respondent}
            caseType={caseData.type}
          />
        ) : (
          'Cargando caso...'
        )}

        <MovementFilterBar
          actions={actions}
          setFilter={setFilter}
          searchFilter={setSearchFilter} // Asegúrate de pasar `setSearchFilter`
        />
        <MovementList
          items={movements}
          filter={filter}
          searchFilter={searchFilter} // Asegúrate de pasar `searchFilter`
          caseId={caseId}
          setMovements={setMovements}
        />
      </Box>
    </Box>
  )
}

export default CaseMovementDetails
