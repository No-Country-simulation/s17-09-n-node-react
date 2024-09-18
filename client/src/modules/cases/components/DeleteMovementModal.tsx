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
          backgroundColor: '#2D3250',
          color: 'white',
        },
      }}
    >
      <DialogTitle>
        Eliminar Movimiento
        <IconButton
          sx={{ float: 'right' }}
          onClick={() => setOpenDeleteMovement(false)}
        >
          <HighlightOffIcon sx={{ width: 25, color: 'white' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          display='flex'
          flexDirection={'column'}
          justifyContent='center'
          alignItems='center'
          gap={2}
        >
          <Typography variant='subtitle1' color='white'>
            Estas por a punto de eliminar el movimiento:{' '}
          </Typography>
          <Typography variant='body1' color='white'>
            "{movementInfo?.title}"
          </Typography>
        </Box>
      </DialogContent>
      <DialogContent>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          gap={10}
        >
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
