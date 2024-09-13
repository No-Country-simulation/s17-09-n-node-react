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

const CreateMovementModal = ({
  openCreateMovement,
  setOpenCreateMovement,
}: any) => {
  const [value, setValue] = useState('')

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
    console.log(value)
  }
  return (
    <Dialog
      open={openCreateMovement}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: '#7077A1',
          color: 'white',
        },
      }}
    >
      <DialogTitle>
        Crear Movimiento
        <IconButton
          sx={{ float: 'right' }}
          onClick={() => setOpenCreateMovement(false)}
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
                  sx={{
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
            </Box>
            <Box display={'flex'} justifyContent={'center'} pb={3}>
              {' '}
              <TextField
                id=''
                label='Observación'
                multiline
                minRows={10} // Define un mínimo de 10 filas
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
                <Typography variant='body2'>Agregar Tarea</Typography>
              </Button>
            </Box>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default CreateMovementModal
