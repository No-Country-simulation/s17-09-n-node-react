import React, { useEffect } from 'react'

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import 'dayjs/locale/es'
import { esES } from '@mui/x-date-pickers/locales'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { useSession, useThemeSwitcher } from './hooks'
import { LoginPage, RegisterPage } from './modules/auth'
import { CasesListPage } from './modules/cases'

import Layout from './pages/Layout'
import HelpPage from './modules/auth/pages/Help'
import ProfilePage from './modules/auth/pages/ProfilePage'
import CaseDetailsPage from './modules/cases/pages/CaseDetailsPage'
import Home from './pages/Home'

import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '*',
        element: <Navigate to='/' />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'cases',
        element: <CasesListPage />,
      },
      {
        path: 'cases/:caseId',
        element: <CaseDetailsPage />,
      },
    ],
  },
  {
    path: '/help',
    element: <HelpPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
])

const App: React.FC = () => {
  const { loading } = useSession()
  const { themeMode, ThemeProvider: CustomThemeProvider } = useThemeSwitcher()

  const calendarLocaleText =
    esES.components.MuiLocalizationProvider.defaultProps.localeText

  useEffect(() => {
    // Cada vez que se recarga navegador
    // Verificar si el token existe, es válido y no ha expirado (llamar endpoint refresh)
    // Si todo sale bien, crear la sesión y obtener el perfil del usuario
    // Si algo sale mal, eliminar la sesión y sacar al usuario
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <CustomThemeProvider theme={themeMode}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={calendarLocaleText}
        adapterLocale='es'
      >
        <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
      </LocalizationProvider>
    </CustomThemeProvider>
  )
}

export default App
