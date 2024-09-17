import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { SnackbarProvider } from 'notistack'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import { AuthProvider } from './contexts'

import App from './App.tsx'

import './index.css'

import theme from './theme/theme.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
