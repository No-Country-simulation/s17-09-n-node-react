import { useEffect, useState } from 'react'
import movementsService from '../services/movements.service'
import { Box, Typography } from '@mui/material'
import MovementFilterBar from '../components/MovementFilterBar'
import TodayIcon from '@mui/icons-material/Today'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import MovementList from '../components/MovementList'
import CaseProfileCard from '../components/CaseProfileCard'
import { useParams } from 'react-router-dom'
import ListIcon from '@mui/icons-material/List'

const Cases = [
  {
    id: '1',
    createdAt: '2024-09-08T05:42:20.568Z',
    caseName: 'Carlos Montiel',
    jury: '',
    caseNumber: '1234',
    applicant: '',
    respondent: '',
    type: 'SUCCESSION',
    status: 'EVIDENCE',
    userId: '1',
  },
  {
    id: '2',
    createdAt: '2024-09-08T05:42:20.568Z',
    caseName: 'Nicolás Ferreyra c/Julia Solen',
    jury: '',
    caseNumber: '1235',
    applicant: '',
    respondent: '',
    type: 'EXECUTION',
    status: 'INITIATED',
    userId: '1',
  },
  {
    id: '3',
    createdAt: '2024-09-08T05:42:20.568Z',
    caseName: 'Claudia Marquez c/Esteban López',
    jury: '',
    caseNumber: '1236',
    applicant: '',
    respondent: '',
    type: 'TERMINATION',
    status: 'JUDGMENT',
    userId: '1',
  },
  {
    id: '4',
    createdAt: '2024-09-08T05:42:20.568Z',
    caseName: 'Maira Alvarez c/ Nestor Astorgas',
    jury: '',
    caseNumber: '1237',
    applicant: '',
    respondent: '',
    type: 'DAMAGES_AND_LOSSES',
    status: 'CLOSED',
    userId: '1',
  },
  {
    id: '5',
    createdAt: '2024-09-08T05:42:20.568Z',
    caseName: 'Juan Perez c/Marcos Gonzalez',
    jury: '',
    caseNumber: '1237',
    applicant: '',
    respondent: '',
    type: 'DAMAGES_AND_LOSSES',
    status: 'INITIATED',
    userId: '1',
  },
]

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
  const [movements, setMovements] = useState([])
  //-----------------------------------
  const [caseData, setCaseData] = useState<any>(null)
  const { caseId } = useParams()

  useEffect(() => {
    // Verificar el tipo de caseId
    console.log('caseId de useParams:', caseId, typeof caseId)

    // Asegurarnos de comparar el id como string
    const selectedCase = Cases.find((c) => String(c.id) === String(caseId))

    if (selectedCase) {
      setCaseData(selectedCase)
    } else {
      console.error('Caso no encontrado:', caseId)
    }

    // Obtener movimientos (puedes adaptar este servicio según sea necesario)
    movementsService.getMovementsList().then((res) => setMovements(res.data))
  }, [caseId])
  //-------------------------------------
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
        {/* Solo renderiza si caseData no es null */}
        {caseData ? (
          <CaseProfileCard
            caseState={caseData.status}
            caseName={caseData.caseName}
            jury={caseData.jury}
            caseNumber={caseData.caseNumber}
            applicant={caseData.applicant}
            respondent={caseData.respondent}
            caseType={caseData.type}
          />
        ) : (
          <Typography variant='h6' color='primary.contrastText'>
            Cargando caso...
          </Typography>
        )}
        <MovementFilterBar actions={actions} setFilter={setFilter} />
        <MovementList items={Movements} filter={filter} />
      </Box>
    </Box>
  )
}

export default CaseMovementDetails
