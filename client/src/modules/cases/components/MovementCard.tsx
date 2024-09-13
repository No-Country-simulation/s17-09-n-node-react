import React, { useState } from 'react'

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

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import TodayIcon from '@mui/icons-material/Today'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import RemoveDoneIcon from '@mui/icons-material/RemoveDone'
import _default from '@emotion/styled'
import DeleteMovementModal from './DeleteMovementModal'
import EditMovementModal from './EditMovementModal'

// Type de Caso
export interface MovementInfoType {
  id: string
  createdAt: string
  date: string
  title: string
  type: string
  done: boolean
  content: string
  caseId: string
}

interface MovementCardProp {
  movementInfo: MovementInfoType
}

const MovementCard: React.FC<MovementCardProp> = ({ movementInfo }) => {
  // Menu states
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const paperColor = (() => {
    if (movementInfo.done === true && movementInfo.type === 'agenda') {
      return '#424769'
    } else if (movementInfo.type === 'procedural') {
      return '#7077A1'
    } else if (movementInfo.done === false && movementInfo.type === 'agenda') {
      return '#F6B17A'
    }
    return 'primary.light'
  })()

  const [openEditMovement, setOpenEditMovement] = useState(false)
  const OpenEditModal = () => {
    setOpenEditMovement(true)
  }
  const [openDeleteMovement, setOpenDeleteMovement] = useState(false)
  const OpenDeleteModal = () => {
    setOpenDeleteMovement(true)
  }
  return (
    <>
      <li>
        <Paper
          sx={{
            marginBottom: '10px',
            backgroundColor: paperColor,
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
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={1}
              px={0}
              color={'white'}
            >
              {movementInfo.type === 'agenda' &&
                movementInfo.done === false && <TodayIcon sx={{ width: 50 }} />}
              {movementInfo.type === 'agenda' && movementInfo.done === true && (
                <EventAvailableIcon sx={{ width: 50 }} />
              )}
              {movementInfo.type === 'procedural' && (
                <BookmarkIcon sx={{ width: 50 }} />
              )}

              <Typography variant='caption'>{movementInfo.date}</Typography>
            </Box>

            {/* Nombre del caso */}
            <Box display={'flex'} justifyContent={'center'}>
              <Button onClick={_default}>
                <Typography
                  variant='body1'
                  color={'white'}
                  sx={{ textTransform: 'none' }}
                >
                  {movementInfo.title}
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
                {movementInfo.type === 'agenda' &&
                  movementInfo.done === false && (
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <DoneAllIcon
                          sx={{ color: 'white', fontSize: 'medium' }}
                        />
                      </ListItemIcon>
                      <ListItemText>Marcar como hecho</ListItemText>
                    </MenuItem>
                  )}
                {movementInfo.type === 'agenda' &&
                  movementInfo.done === true && (
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <RemoveDoneIcon
                          sx={{ color: 'white', fontSize: 'medium' }}
                        />
                      </ListItemIcon>
                      <ListItemText>Marcar como pendiente</ListItemText>
                    </MenuItem>
                  )}
                <MenuItem
                  onClick={() => {
                    handleClose()
                    OpenEditModal()
                  }}
                >
                  <ListItemIcon>
                    <EditIcon sx={{ color: 'white', fontSize: 'medium' }} />
                  </ListItemIcon>
                  <ListItemText>Editar</ListItemText>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose()
                    OpenDeleteModal()
                  }}
                >
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
      <DeleteMovementModal
        openDeleteMovement={openDeleteMovement}
        setOpenDeleteMovement={setOpenDeleteMovement}
        movementInfo={movementInfo}
      />
      <EditMovementModal
        openEditMovement={openEditMovement}
        setOpenEditMovement={setOpenEditMovement}
        movementInfo={movementInfo}
      />
    </>
  )
}

export default MovementCard
