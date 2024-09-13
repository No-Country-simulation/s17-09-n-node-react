import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  TextField,
  BottomNavigation,
  BottomNavigationAction,
  Button,
} from '@mui/material'
import { CloseIcon } from '../assets'
import { DatePicker } from '@mui/x-date-pickers'
import { useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import TodayIcon from '@mui/icons-material/Today'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import dayjs from 'dayjs'

const EditMovementModal = ({
  openEditMovement,
  setOpenEditMovement,
  movementInfo,
}: any) => {
  const [value, setValue] = useState(movementInfo.type)

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
    console.log(value)
  }
  return (
    <Dialog
      open={openEditMovement}
      fullWidth
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: '#7077A1',
          color: 'white',
        },
      }}
    >
      <DialogTitle>
        Editar Movimiento
        <IconButton
          sx={{ float: 'right' }}
          onClick={() => setOpenEditMovement(false)}
        >
          <CloseIcon size={'20px'} color={'white'} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box p={3}>
          <form>
            <Box
              display={'flex'}
              gap={2}
              justifyContent={'center'}
              pb={3}
              flexDirection={'column'}
            >
              <Box>
                <TextField
                  id=''
                  label='Titulo'
                  focused
                  value={movementInfo.title}
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'white',
                      },
                      '&:hover fieldset': {
                        borderColor: 'white',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#F6B17A',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                    },
                    '& .MuiInputLabel-root': {
                      color: 'white',
                      '&.Mui-focused': {
                        color: '#F6B17A',
                      },
                      '&.MuiFormLabel-root:not(.MuiInputLabel-shrink)': {
                        color: '#7077A1',
                      },
                    },
                  }}
                />
              </Box>
              <Box display={'flex'} justifyContent={'space-between'} gap={4}>
                <DatePicker
                  label={'Fecha'}
                  value={dayjs(movementInfo.date)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#F6B17A', // Color de borde enfocado
                        borderWidth: '2px',
                      },
                      '&:hover fieldset': {
                        borderColor: '#F6B17A', // Color de borde al pasar el ratón
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#F6B17A', // Color de borde enfocado
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                    },
                    '& .MuiInputLabel-root': {
                      color: '#F6B17A', // Color de etiqueta
                      '&.Mui-focused': {
                        color: '#F6B17A', // Color de etiqueta enfocada
                      },
                    },
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                    },
                  }}
                />

                <Box display={'flex'} bgcolor={'none'}>
                  <BottomNavigation
                    sx={{ background: 'none', color: 'white' }}
                    value={value}
                    onChange={handleChange}
                  >
                    <BottomNavigationAction
                      label='Agenda'
                      value='agenda'
                      icon={<TodayIcon sx={{ width: 25 }} />}
                      sx={{
                        color: 'white',
                        '&.Mui-selected': {
                          color: 'white',
                        },
                      }}
                      disableRipple
                    />
                    <BottomNavigationAction
                      label='Procesal'
                      value='procedural'
                      icon={<BookmarkIcon sx={{ width: 25 }} />}
                      sx={{
                        color: 'white',
                        '&.Mui-selected': {
                          color: 'white',
                        },
                      }}
                      disableRipple
                    />
                  </BottomNavigation>
                </Box>
              </Box>
              <Box display={'flex'} justifyContent={'center'} pb={3}>
                {' '}
                <TextField
                  id=''
                  label='Observación'
                  multiline
                  focused
                  minRows={10}
                  value={movementInfo.content}
                  sx={{
                    width: '100%',
                    height: '100%',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'white',
                      },
                      '&:hover fieldset': {
                        borderColor: 'white',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#F6B17A',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                    },
                    '& .MuiInputLabel-root': {
                      color: 'white',
                      '&.Mui-focused': {
                        color: '#F6B17A',
                      },
                      '&.MuiFormLabel-root:not(.MuiInputLabel-shrink)': {
                        color: '#7077A1',
                      },
                    },
                  }}
                />
              </Box>
            </Box>
            <Box display={'flex'} justifyContent={'center'}>
              <Button
                startIcon={<AddCircleOutlineIcon sx={{ color: 'white' }} />}
                sx={{
                  color: 'white',
                  '&.Mui-selected': {
                    color: 'white',
                  },
                }}
              >
                <Typography variant='body2'>Confirmar Edicion</Typography>
              </Button>
            </Box>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default EditMovementModal
