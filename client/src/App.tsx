import React from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import 'dayjs/locale/es'
import { esES } from '@mui/x-date-pickers/locales'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { useThemeSwitcher } from './hooks'
import { LoginPage, RegisterPage } from './modules/auth'
import ProfilePage from './modules/auth/pages/ProfilePage'

import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <p>Aquí debería ir la landing page</p>,
    errorElement: <p>Not found</p>,
    children: [],
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
    path: '/profile',
    element: <ProfilePage />,
  },
])

const App: React.FC = () => {
  const { themeMode, ThemeProvider: CustomThemeProvider } = useThemeSwitcher()

  const calendarLocaleText =
    esES.components.MuiLocalizationProvider.defaultProps.localeText

  return (
    <CustomThemeProvider theme={themeMode}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={calendarLocaleText}
        adapterLocale="es"
      >
        <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
      </LocalizationProvider>
    </CustomThemeProvider>
  )
}

export default App
