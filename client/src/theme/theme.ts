import { createTheme } from '@mui/material'

//Crea el tema de la aplicación
//Utilisa la paleta en los componentes MUI ej: "primary.main"
const theme = createTheme({
  palette: {
    primary: {
      main: '#424769',
      light: '#7077A1',
      dark: '#2D3250',
      contrastText: 'white',
    },
    secondary: {
      main: '#F6B17A',
      contrastText: 'black',
    },
  },
})

export default theme
