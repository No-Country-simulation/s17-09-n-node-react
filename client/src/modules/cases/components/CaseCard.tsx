import React from 'react'

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

interface CaseInfoType {
  title: string
  type: string
  state: string
}

interface CaseCardProp {
  caseInfo: CaseInfoType
}

const CaseCard: React.FC<CaseCardProp> = ({ caseInfo }) => {
  // Menu states
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
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
              {caseInfo.state == 'Inicio' && <DoneIcon sx={{ width: 50 }} />}
              {caseInfo.state == 'Prueba' && <ErrorIcon sx={{ width: 50 }} />}
              {caseInfo.state == 'Sentencia' && (
                <GroupsIcon sx={{ width: 50 }} />
              )}
              {caseInfo.state == 'Archivado' && (
                <ArchiveIcon sx={{ width: 50 }} />
              )}
              <Typography variant='caption'>
                {`${caseInfo.state} - ${caseInfo.type}`}
              </Typography>
            </Box>

            {/* Titulo del caso */}
            <Box display={'flex'} justifyContent={'center'}>
              <Button>
                <Typography
                  variant='body1'
                  color={'white'}
                  sx={{ textTransform: 'none' }}
                >
                  {caseInfo.title}
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
