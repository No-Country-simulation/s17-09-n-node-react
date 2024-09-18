import { formatDate } from '../utils/utils'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Box,
  Divider,
} from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

import TodayIcon from '@mui/icons-material/Today'
import BookmarkIcon from '@mui/icons-material/Bookmark'
// import FileDownloadIcon from '@mui/icons-material/FileDownload'

const MovementDetailsModal = ({
  movementInfo,
  openMovementDetail,
  setOpenMovementDetail,
  caseName,
}: any) => {
  return (
    <Dialog
      open={openMovementDetail}
      fullWidth
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: '#2D3250',
          color: 'white',
        },
      }}
    >
      <DialogTitle>
        Detalles del Movimiento
        <IconButton
          sx={{ float: 'right' }}
          onClick={() => setOpenMovementDetail(false)}
        >
          <HighlightOffIcon sx={{ width: 25, color: 'white' }} />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          gap={1}
          pb={2}
        >
          <Typography variant='h6' color='white' align='center'>
            Nombre del caso: {caseName}
          </Typography>

          <Typography variant='subtitle1' color='white' align='center'>
            Movimiento: {movementInfo.title}
          </Typography>
        </Box>

        <Box display={'flex'} justifyContent={'space-between'} px={6}>
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography variant='subtitle1' color='white'>
              Fecha:
            </Typography>
            <Typography variant='body2' color='white'>
              {formatDate(movementInfo.date)}
            </Typography>
          </Box>

          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={1}
          >
            {movementInfo.type === 'APPOINTMENT' && (
              <TodayIcon sx={{ width: 25 }} />
            )}

            {movementInfo.type === 'PROCEDURAL_ACTION' && (
              <BookmarkIcon sx={{ width: 25 }} />
            )}
            {movementInfo.type === 'APPOINTMENT' && (
              <Typography variant='body2' color='white'>
                Agenda
              </Typography>
            )}
            {movementInfo.type === 'PROCEDURAL_ACTION' && (
              <Typography variant='body2' color='white'>
                Procesal
              </Typography>
            )}
          </Box>
          {/* <FileDownloadIcon sx={{ width: 25 }} /> */}
        </Box>
      </DialogContent>
      <Divider
        sx={{
          borderColor: 'white',
          width: '90%',
          marginX: 'auto',
        }}
      />
      <DialogContent>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={1}
          pb={4}
        >
          <Typography variant='subtitle1' color='white'>
            Observación:
          </Typography>

          <Typography
            variant='body1'
            color='white'
            align='center'
            sx={{
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              whiteSpace: 'normal',
              width: '100%',
              padding: '6px',
            }}
          >
            {movementInfo.content}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
export default MovementDetailsModal
