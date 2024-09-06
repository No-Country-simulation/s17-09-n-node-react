import { Box, Typography } from '@mui/material'
import FilterBar from '../components/FilterBar'
import DoneIcon from '@mui/icons-material/Done'
import ErrorIcon from '@mui/icons-material/Error'
import GroupsIcon from '@mui/icons-material/Groups'
import ArchiveIcon from '@mui/icons-material/Archive'
import TodayIcon from '@mui/icons-material/Today'
import CasesList from '../components/CasesList'

const actions = [
  { label: 'Inicio', value: 'inicio', icon: <DoneIcon sx={{ width: 25 }} /> },
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
  return (
    <Box
      sx={{
        bgcolor: 'primary.dark',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          pt: 5,
          px: 5,
          minHeight: '100vh',
        }}
      >
        <Typography
          variant='h5'
          color='primary.contrastText'
          sx={{ ml: 5, mb: 2 }}
        >
          Mis casos:
        </Typography>
        <FilterBar actions={actions} />
        <CasesList />
      </Box>
    </Box>
  )
}

export default CasesListPage
