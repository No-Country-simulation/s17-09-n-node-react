import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import ErrorIcon from '@mui/icons-material/Error'
import GroupsIcon from '@mui/icons-material/Groups'
import ArchiveIcon from '@mui/icons-material/Archive'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

const CaseTypes: { [key: string]: string } = {
  SUCCESSION: 'Sucesión',
  EXECUTION: 'Ejecución',
  TERMINATION: 'Despido',
  DAMAGES_AND_LOSSES: 'Daños y perjuicios',
  CONTRACT_DISPUTE: 'Disputa contractual',
  FAMILY_LAW: 'Derecho de familia',
  CRIMINAL: 'Penal',
  PROPERTY_DISPUTE: 'Disputa de propiedad',
  PERSONAL_INJURY: 'Lesiones personales',
  INTELLECTUAL_PROPERTY: 'Propiedad intelectual',
}

const CasesStatus: { [key: string]: string } = {
  INITIATED: 'Inicio',
  EVIDENCE: 'Prueba',
  JUDGMENT: 'Sentencia',
  CLOSED: 'Archivado',
}

// Type de Caso
export interface CaseInfoType {
  id: string
  createdAt: string
  caseName: string
  jury: string
  caseNumber: string
  applicant: string
  respondent: string
  type: string
  status: string
  userId: string
}

interface CaseCardProp {
  caseInfo: CaseInfoType
}

const CaseCard: React.FC<CaseCardProp> = ({ caseInfo }) => {
  const navigate = useNavigate()
  // Menu states
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOpenCase = () => {
    navigate(`/cases/details/${caseInfo.id}`)
  }

  return (
    <>
      <li>
        <Paper
          sx={{
            marginBottom: '10px',
            backgroundColor: 'primary.light',
            borderRadius: '15px',
            transition: 'transform 0.1s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.03)', // Efecto de escala al pasar el mouse
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', // Sombra más intensa
            },
          }}
          elevation={5}
        >
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            p={{ xs: 2, md: 0 }}
            gap={1}
            flexDirection={{ xs: 'column', sm: 'row', lg: 'row' }}
          >
            {/* Estado del caso - Tipo de caso */}
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={1}
              px={0}
              color={'white'}
            >
              {caseInfo.status == 'INITIATED' && (
                <DoneIcon sx={{ width: 50 }} />
              )}
              {caseInfo.status == 'EVIDENCE' && (
                <ErrorIcon sx={{ width: 50 }} />
              )}
              {caseInfo.status == 'JUDGMENT' && (
                <GroupsIcon sx={{ width: 50 }} />
              )}
              {caseInfo.status == 'CLOSED' && (
                <ArchiveIcon sx={{ width: 50 }} />
              )}
              <Typography variant='caption'>
                {`${CasesStatus[caseInfo.status]} - ${CaseTypes[caseInfo.type]}`}
              </Typography>
            </Box>

            {/* Nombre del caso */}
            <Box display={'flex'} justifyContent={'center'}>
              <Button onClick={handleOpenCase}>
                <Typography
                  variant='body1'
                  color={'white'}
                  sx={{ textTransform: 'none' }}
                >
                  {caseInfo.caseName}
                </Typography>
              </Button>
            </Box>

            {/* Menu */}
            <Box>
              <Button
                id='basic-button'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <Typography variant='body1' color={'white'}>
                  <MoreHorizIcon />
                </Typography>
              </Button>
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
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <EditIcon sx={{ color: 'white', fontSize: 'medium' }} />
                  </ListItemIcon>
                  <ListItemText>Editar</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <DeleteIcon sx={{ color: 'white', fontSize: 'medium' }} />
                  </ListItemIcon>
                  <ListItemText>Eliminar</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Paper>
      </li>
    </>
  )
}

export default CaseCard
