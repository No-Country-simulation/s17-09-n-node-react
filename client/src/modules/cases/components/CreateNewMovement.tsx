import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'

import { CloseIcon } from '../assets'

const CreateNewMovement = ({ children, title, isOpen, setOpen }: any) => {
  const closeDialog = () => {
    setOpen(false)
  }
  // const navigate = useNavigate()

  return (
    <Dialog
      open={isOpen}
      fullWidth
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: '#7077A1',
          color: 'white',
        },
      }}
    >
      <DialogTitle>
        {title}
        <IconButton sx={{ float: 'right' }} onClick={closeDialog}>
          <CloseIcon size={'20px'} color={'white'} />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

export default CreateNewMovement
