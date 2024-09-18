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
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useState, useEffect } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import TodayIcon from '@mui/icons-material/Today'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { useForm } from 'react-hook-form'
import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import movementsService from '../services/movements.service'
import { useAuth } from '../../../hooks'
dayjs.extend(utc)

const CreateMovementModal = ({
  openCreateMovement,
  setOpenCreateMovement,
  caseId,
  setMovements,
}: any) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs())
  const [navValue, setNavValue] = useState('PROCEDURAL_ACTION')
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: '',
      date: dayjs().toISOString(),
      type: 'PROCEDURAL_ACTION',
      content: '',
      caseId: caseId,
    },
  })

  ;('2024-09-13T20:44:13.683Z')

  const { token } = useAuth()

  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setSelectedDate(newDate)
      setValue('date', newDate.toISOString())
    }
  }

  const handleNavigationChange = (
    _event: React.SyntheticEvent,
    newValue: string,
  ) => {
    setNavValue(newValue)
    setValue('type', newValue)
  }

  const onSubmit = (data: any) => {
    if (token) {
      movementsService.createMovement(data).then((res) => {
        if (res?.data) {
          console.log('Movimiento creado')
          setOpenCreateMovement(false)
        } else {
          console.log('Error al crear el Movimiento', Error)
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
    console.log(data)
  }

  useEffect(() => {
    setValue('date', dayjs().toISOString())
    setValue('type', 'PROCEDURAL_ACTION')
  }, [setValue])

  return (
    <Dialog
      open={openCreateMovement}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: '#2D3250',
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
          <HighlightOffIcon sx={{ width: 25, color: 'white' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box p={3}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              display={'flex'}
              gap={2}
              justifyContent={'center'}
              pb={3}
              flexDirection={'column'}
            >
              <Box>
                <TextField
                  id='title'
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
                        color: 'white',
                      },
                    },
                  }}
                  {...register('title', { required: true })}
                />
              </Box>

              <Box display={'flex'} justifyContent={'space-between'} gap={4}>
                {/* DatePicker sin renderInput */}
                <DatePicker
                  label='Fecha'
                  value={selectedDate}
                  onChange={handleDateChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      sx: {
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
                        },
                        '& .MuiSvgIcon-root': {
                          color: 'white',
                        },
                      },
                    },
                  }}
                />

                <Box display={'flex'} bgcolor={'none'}>
                  <BottomNavigation
                    sx={{ background: 'none', color: 'white' }}
                    value={navValue}
                    onChange={handleNavigationChange}
                  >
                    <BottomNavigationAction
                      label='Agenda'
                      value='APPOINTMENT'
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
                      value='PROCEDURAL_ACTION'
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
              <TextField
                id='content'
                label='Observación'
                multiline
                minRows={6}
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
                      color: 'white',
                    },
                  },
                }}
                {...register('content', { required: true })}
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
                type='submit'
              >
                <Typography variant='body2'>Agregar Movimiento</Typography>
              </Button>
            </Box>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default CreateMovementModal
