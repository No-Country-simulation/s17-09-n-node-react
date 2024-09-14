import React from 'react'
import DoneIcon from '@mui/icons-material/Done'
import ErrorIcon from '@mui/icons-material/Error'
import GroupsIcon from '@mui/icons-material/Groups'
import ArchiveIcon from '@mui/icons-material/Archive'
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

interface CaseProfileProps {
  caseState: string
  setCaseState: React.Dispatch<React.SetStateAction<string>>
  caseName: string
  jury: string
  caseNumber: string
  applicant: string
  respondent: string
  caseType: string
}

const CaseProfileCard: React.FC<CaseProfileProps> = ({
  caseState,
  setCaseState,
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
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleMenuItemClick = (newState: string) => {
    setCaseState(newState)
    handleClose()
  }

  const renderIconForState = () => {
    switch (caseState) {
      case 'initial':
        return <DoneIcon sx={{ width: 50, color: 'white' }} />
      case 'proof':
        return <ErrorIcon sx={{ width: 50, color: 'white' }} />
      case 'veredict':
        return <GroupsIcon sx={{ width: 50, color: 'white' }} />
      case 'archive':
        return <ArchiveIcon sx={{ width: 50, color: 'white' }} />
      default:
        return <DoneIcon sx={{ width: 50, color: 'white' }} />
    }
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
                NOMBRE DEL CASO: {caseName}
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
                <MenuItem onClick={() => handleMenuItemClick('initial')}>
                  <ListItemIcon>
                    <DoneIcon sx={{ width: 25, color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText>Inicio</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => handleMenuItemClick('proof')}>
                  <ListItemIcon>
                    <ErrorIcon sx={{ width: 25, color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText>Prueba</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => handleMenuItemClick('veredict')}>
                  <ListItemIcon>
                    <GroupsIcon sx={{ width: 25, color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText>Sentencia</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => handleMenuItemClick('archive')}>
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
              Tipo de caso: {caseType}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default CaseProfileCard
