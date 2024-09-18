import { Box } from '@mui/material'

import { SpinnerIcon } from '../icons'

export const Loading = () => {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      height='100vh'
      width='100vw'
      bgcolor='#424769'
    >
      <SpinnerIcon style={{ width: '3rem', height: '3rem' }} />
    </Box>
  )
}
