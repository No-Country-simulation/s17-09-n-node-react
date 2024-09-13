import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  Typography,
  Box,
} from '@mui/material'
import { CloseIcon } from '../assets'
import CheckIcon from '@mui/icons-material/Check'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

const DeleteMovementModal = ({
  movementInfo,
  openDeleteMovement,
  setOpenDeleteMovement,
}: any) => {
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
          <CloseIcon size={'20px'} color={'white'} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        Estas por eliminar el movimiento: {movementInfo.title}
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
          >
            <Typography variant='body2'>Cancelar</Typography>
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteMovementModal
