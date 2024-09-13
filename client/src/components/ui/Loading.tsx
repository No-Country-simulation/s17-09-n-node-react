import { Box } from '@mui/material'

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
      <Box
        sx={{
          backgroundImage: { xs: `url(loader.svg)` },
          backgroundRepeat: 'no-repeat',
          backgroundSize: 48,
          width: 48,
          height: 48,
        }}
      ></Box>
    </Box>
  )
}
