import React from 'react'
import DoneIcon from '@mui/icons-material/Done'
import ErrorIcon from '@mui/icons-material/Error'
import GroupsIcon from '@mui/icons-material/Groups'
import ArchiveIcon from '@mui/icons-material/Archive'
import casesService from '../services/cases.service'
import { typeTipo, typeStatus } from '../services/cases.service'
import Case from '../utils/case.status'
import {
  Typography,
  Paper,
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material'
import { useAuth } from '../../../hooks'

interface CaseProfileProps {
  caseId: string | undefined
  caseStatus: typeStatus | null
  setCaseStatus: React.Dispatch<React.SetStateAction<typeStatus | null>>
  caseName: string
  jury: string
  caseNumber: string
  applicant: string
  respondent: string
  caseType: typeTipo
}

const CaseProfileCard: React.FC<CaseProfileProps> = ({
  caseId,
  caseStatus,
  setCaseStatus,
  caseName,
  jury,
  caseNumber,
  applicant,
  respondent,
  caseType,
}) => {
  // Menu states
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { token } = useAuth()
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (newState: typeStatus) => {
    setCaseStatus(newState)
    const updatedCase = {
      caseName: caseName,
      jury: jury,
      caseNumber: caseNumber,
      applicant: applicant,
      respondent: respondent,
      type: caseType,
      status: newState,
    }
    setCaseStatus(newState)
    handleClose()
    if (token && typeof caseId === 'string') {
      casesService
        .updateCase(caseId, updatedCase)
        .then((res) => {
          if (res?.data) {
            console.log('Estado actualizado con éxito')
          } else {
            console.log('Error al actualizar el Estado')
          }
        })
        .catch((error) => {
          console.error('Error en la actualización del caso:', error)
        })
    }
  }

  const renderIconForState = () => {
    console.log('Rendering icon for state:', caseStatus)
    if (caseStatus) {
      switch (caseStatus) {
        case 'INITIATED':
          return <DoneIcon sx={{ width: 50, color: 'white' }} />
        case 'EVIDENCE':
          return <ErrorIcon sx={{ width: 50, color: 'white' }} />
        case 'JUDGMENT':
          return <GroupsIcon sx={{ width: 50, color: 'white' }} />
        case 'CLOSED':
          return <ArchiveIcon sx={{ width: 50, color: 'white' }} />
        default:
          return <DoneIcon sx={{ width: 50, color: 'white' }} />
      }
    }
    return <DoneIcon sx={{ width: 50, color: 'white' }} /> // Default icon if caseStatus is null
  }

  return (
    <Box display={'flex'} justifyContent={'center'} py={3}>
      <Paper
        sx={{
          width: '400px',
          padding: '10px',
          backgroundColor: '#424769',
        }}
        elevation={5}
      >
        <Box display={'flex'} flexDirection={'column'}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            p={2}
          >
            <Box>
              <Typography variant='body1' color='white'>
                Caso: {caseName}
              </Typography>
            </Box>

            <Box>
              <Box>
                <Button
                  id='basic-button'
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  {renderIconForState()}
                </Button>
              </Box>
              <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                sx={{
                  '& .MuiPaper-root': {
                    backgroundColor: 'primary.dark',
                    border: '1px solid white',
                    color: 'white',
                    padding: '10px',
                  },
                  '.MuiMenu-list': {
                    color: 'white',
                  },
                }}
              >
                <MenuItem onClick={() => handleMenuItemClick('INITIATED')}>
                  <ListItemIcon>
                    <DoneIcon sx={{ width: 25, color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText>Inicio</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => handleMenuItemClick('EVIDENCE')}>
                  <ListItemIcon>
                    <ErrorIcon sx={{ width: 25, color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText>Prueba</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => handleMenuItemClick('JUDGMENT')}>
                  <ListItemIcon>
                    <GroupsIcon sx={{ width: 25, color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText>Sentencia</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => handleMenuItemClick('CLOSED')}>
                  <ListItemIcon>
                    <ArchiveIcon sx={{ width: 25, color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText>Archivo</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          <Divider
            sx={{
              backgroundColor: 'white',
            }}
          />
          <Box display={'flex'} flexDirection={'column'} p={2}>
            <Typography variant='body2' color='white'>
              Juzgado: {jury}
            </Typography>
            <Typography variant='body2' color='white'>
              Numero de expediente: {caseNumber}
            </Typography>
            <Typography variant='body2' color='white'>
              Demandante: {applicant}
            </Typography>
            <Typography variant='body2' color='white'>
              Demandado: {respondent}
            </Typography>
            <Typography variant='body2' color='white'>
              Tipo de caso: {Case.CaseTypes[caseType]}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default CaseProfileCard
