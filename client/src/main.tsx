import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { SessionProvider } from './contexts'

import App from './App.tsx'

import './reset.css'

import './index.css'

import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/theme.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </SessionProvider>
  </StrictMode>,
)
