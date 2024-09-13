import { useEffect, useState } from 'react'
import casesService from '../services/cases.service'
import { useAuth } from '../../../hooks'
import { Box, Typography } from '@mui/material'
import CasesFilterBar from '../components/CasesFilterBar'
import DoneIcon from '@mui/icons-material/Done'
import ErrorIcon from '@mui/icons-material/Error'
import GroupsIcon from '@mui/icons-material/Groups'
import ArchiveIcon from '@mui/icons-material/Archive'
import TodayIcon from '@mui/icons-material/Today'
import CasesList from '../components/CasesList'
import { CaseInfoType } from '../components/CaseCard'

/* const Cases = [
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
] */

const actions = [
  {
    label: 'Inicio',
    value: 'inicio',
    icon: <DoneIcon sx={{ width: 25 }} />,
  },
  { label: 'Prueba', value: 'prueba', icon: <ErrorIcon sx={{ width: 25 }} /> },
  {
    label: 'Sentencia',
    value: 'sentencia',
    icon: <GroupsIcon sx={{ width: 25 }} />,
  },
  {
    label: 'Archivado',
    value: 'archivado',
    icon: <ArchiveIcon sx={{ width: 25 }} />,
  },
  {
    label: 'Fecha de creación',
    value: 'fecha de creación',
    icon: <TodayIcon sx={{ width: 25 }} />,
  },
]

const CasesListPage: React.FC = () => {
  const [filter, setFilter] = useState()
  const [cases, setCases] = useState<CaseInfoType[]>([])

  const { token } = useAuth()

  useEffect(() => {
    if (token) {
      casesService.getCasesListByUser(token).then((res) => {
        if (Array.isArray(res.data)) {
          setCases(res.data)
        } else {
          console.log('Error al obtener los casos')
        }
      })
    }
  }, [token])


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
          Mis casos:
        </Typography>
        <CasesFilterBar actions={actions} setFilter={setFilter} />
        <CasesList items={cases} filter={filter} />
      </Box>
    </Box>
  )
}

export default CasesListPage
