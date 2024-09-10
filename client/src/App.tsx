/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import 'dayjs/locale/es'
import { esES } from '@mui/x-date-pickers/locales'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { useAuth, useThemeSwitcher } from './hooks'
import { LoginPage, RegisterPage } from './modules/auth'

import Layout from './pages/Layout'
import HelpPage from './modules/auth/pages/Help'
import ProfilePage from './modules/auth/pages/ProfilePage'
import CaseDetailsPage from './modules/cases/pages/CaseDetailsPage'

import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <p>Aquí debería ir la landing page</p>,
    errorElement: <p>Not found</p>,
    children: [],
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
        element: (
          <div className='bg-black min-h-screen flex justify-center items-center'>
            Acá deberían ir el home
          </div>
        ),
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'cases',
        element: (
          <div className='bg-black min-h-screen flex justify-center items-center'>
            Acá deberían ir los casos
          </div>
        ),
      },
      {
        path: 'cases/[caseId]',
        element: <CaseDetailsPage />,
      },
    ],
  },
])

const App: React.FC = () => {
  const { startRefreshToken } = useAuth()
  const { themeMode, ThemeProvider: CustomThemeProvider } = useThemeSwitcher()

  const calendarLocaleText =
    esES.components.MuiLocalizationProvider.defaultProps.localeText

  useEffect(() => {
    startRefreshToken()
  }, [])

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
