import { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  BottomNavigation,
  BottomNavigationAction,
  Button,
} from '@mui/material'

import { AgendaTypeIcon, ProceduralTypeIcon, AddIcon } from '../assets'

import { DatePicker } from '@mui/x-date-pickers'

const MovementForm = () => {
  const [value, setValue] = useState('')

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
    console.log(value)
  }

  return (
    <form>
      <Box display={'flex'} gap={2} justifyContent={'center'} pb={3}>
        <DatePicker />
        <TextField id='' label='Titulo' sx={{ width: '300px' }} />
        <Box display={'flex'} bgcolor={'none'}>
          <BottomNavigation
            sx={{ background: 'none', color: 'white' }}
            value={value}
            onChange={handleChange}
          >
            <BottomNavigationAction
              label='Agenda'
              value='agenda'
              icon={<AgendaTypeIcon />}
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
              icon={<ProceduralTypeIcon color={'white'} />}
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
          sx={{ width: '100%', height: '100%' }}
        />
      </Box>
      <Box display={'flex'} justifyContent={'center'}>
        <Button
          startIcon={<AddIcon size={'20px'} color={'white'} />}
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
  )
}

export default MovementForm
