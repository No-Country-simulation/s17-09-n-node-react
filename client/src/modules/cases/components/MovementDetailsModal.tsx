import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Box,
} from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

import TodayIcon from '@mui/icons-material/Today'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

const MovementDetailsModal = ({
  movementInfo,
  openMovementDetail,
  setOpenMovementDetail,
}: any) => {
  return (
    <Dialog
      open={openMovementDetail}
      fullWidth
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: '#7077A1',
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
          <Typography variant='subtitle1' color='white' align='center'>
            Nombre del caso
          </Typography>

          <Typography variant='subtitle1' color='white' align='center'>
            {movementInfo.title}
          </Typography>
        </Box>

        <Box display={'flex'} justifyContent={'space-around'}>
          <Typography variant='subtitle1' color='white'>
            {movementInfo.date}
          </Typography>

          <Box>
            {movementInfo.type === 'APPOINTMENT' && (
              <TodayIcon sx={{ width: 25 }} />
            )}

            {movementInfo.type === 'PROCEDURAL_ACTION' && (
              <BookmarkIcon sx={{ width: 25 }} />
            )}
          </Box>

          <FileDownloadIcon sx={{ width: 25 }} />
        </Box>
      </DialogContent>
      <DialogContent>
        <Typography variant='body1' color='white' align='center'>
          {movementInfo.content}
        </Typography>
      </DialogContent>
    </Dialog>
  )
}
export default MovementDetailsModal
