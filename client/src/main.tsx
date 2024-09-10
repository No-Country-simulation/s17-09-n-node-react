import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { AuthProvider } from './contexts'

import App from './App.tsx'

import './reset.css'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
