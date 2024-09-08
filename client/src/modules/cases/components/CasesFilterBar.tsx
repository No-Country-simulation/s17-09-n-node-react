import React, { useState } from 'react'
import { Box, IconButton, InputBase, Paper } from '@mui/material'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import SearchIcon from '../assets/SearchIcon'

interface BottomNavigationActionType {
  label: string
  value: string
  icon: JSX.Element
}

interface BottomNavComponentProp {
  actions: BottomNavigationActionType[]
}

const CasesFilterBar: React.FC<BottomNavComponentProp> = ({ actions }) => {
  const [value, setValue] = useState('all')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
    event.preventDefault()
  }

  return (
    <Box
      display={'flex'}
      gap={1}
      flexDirection={{ xs: 'column', md: 'row' }}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Paper
        component='form'
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: { sm: '50vw', xs: '100%' },
          height: '35px',
          borderRadius: '10px',
        }}
      >
        <IconButton type='button' sx={{ p: '5px' }} aria-label='search'>
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          inputProps={{ 'aria-label': 'Search' }}
        />
      </Paper>

      <Box
        display={'flex'}
        justifyContent={'center'}
        sx={{ width: { sm: '50vw', xs: '100%' } }}
        bgcolor={'none'}
      >
        <BottomNavigation
          showLabels
          sx={{ background: 'none', color: 'white' }}
          value={value}
          onChange={handleChange}
        >
          {actions.map((action, index) => {
            return (
              <BottomNavigationAction
                key={index}
                label={action.label}
                value={action.value}
                icon={action.icon}
                sx={{
                  color: 'white',
                  '.MuiBottomNavigationAction-root': {
                    position: 'relative',
                  },
                  '.Mui-selected': {
                    color: 'gray',
                  },
                  '.MuiBottomNavigationAction-label': {
                    position: 'absolute',
                    top: '36px',
                  },
                  '.MuiBottomNavigationAction-iconOnly': {
                    pt: '18px',
                  },
                }}
                disableRipple
              />
            )
          })}
        </BottomNavigation>
      </Box>
    </Box>
  )
}

export default CasesFilterBar
