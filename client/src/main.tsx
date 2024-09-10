import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'

import { store } from './store/store'

import App from './App.tsx'

import './reset.css'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId='YOUR_GOOGLE_CLIENT_ID'>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>,
)
