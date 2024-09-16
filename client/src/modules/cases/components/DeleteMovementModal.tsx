import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  Typography,
  Box,
} from '@mui/material'

import CheckIcon from '@mui/icons-material/Check'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import movementsService from '../services/movements.service'
import { useAuth } from '../../../hooks'

const DeleteMovementModal = ({
  movementInfo,
  openDeleteMovement,
  setOpenDeleteMovement,
  setMovements,
  caseId,
}: any) => {
  const { token } = useAuth()

  const handleDeleteMovement = (movementInfo: any) => {
    if (token && movementInfo) {
      movementsService.deleteMovement(movementInfo.id).then((res) => {
        if (res?.data) {
          console.log('Movimiento eliminado')
          setOpenDeleteMovement(false)
        } else {
          console.log('Error al eliminar el movimiento', Error)
        }
        if (token && typeof caseId === 'string') {
          movementsService.getMovementsByCaseId(caseId).then((res) => {
            if (res?.data) {
              setMovements(res.data.movements)
            } else {
              console.log('Error al obtener los datos del movimiento')
            }
          })
        }
      })
    }
  }

  return (
    <Dialog
      open={openDeleteMovement}
      fullWidth
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: '#7077A1',
          color: 'white',
        },
      }}
    >
      <DialogTitle>
        Eliminar movimiento
        <IconButton
          sx={{ float: 'right' }}
          onClick={() => setOpenDeleteMovement(false)}
        >
          <HighlightOffIcon sx={{ width: 25, color: 'white' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        Estas por eliminar el movimiento: {movementInfo?.id}
      </DialogContent>
      <DialogContent>
        <Box>
          <Button
            startIcon={<CheckIcon sx={{ color: 'white' }} />}
            sx={{
              color: 'white',
              '&.Mui-selected': {
                color: 'white',
              },
            }}
            onClick={() => handleDeleteMovement(movementInfo)} // Pasa `movementInfo` aquí
          >
            <Typography variant='body2'>Confirmar</Typography>
          </Button>
          <Button
            startIcon={<HighlightOffIcon sx={{ color: 'white' }} />}
            sx={{
              color: 'white',
              '&.Mui-selected': {
                color: 'white',
              },
            }}
            onClick={() => setOpenDeleteMovement(false)}
          >
            <Typography variant='body2'>Cancelar</Typography>
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteMovementModal
