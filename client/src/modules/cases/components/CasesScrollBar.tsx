import { Box } from '@mui/material'
import { PropsWithChildren } from 'react'

const CasesScrollbar = ({ children }: PropsWithChildren) => {
  return (
    <Box
      sx={{
        px: 3,
        pb: 10,
        my: 1,
        maxHeight: { sm: 250, xs: 450 },
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: 12,
        },
        '&::-webkit-scrollbar-track': {
          background: '#2D3250',
          borderRadius: 10,
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'white',
          borderRadius: 10,
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#7077A1',
        },
      }}
    >
      {children}
    </Box>
  )
}

export default CasesScrollbar
