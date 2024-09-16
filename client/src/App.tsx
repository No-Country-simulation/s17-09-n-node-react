import { useEffect } from 'react'

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import 'dayjs/locale/es'
import { esES } from '@mui/x-date-pickers/locales'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { Layout, HelpPage } from './pages'
import { Loading, PublicRoute, PrivateRoute } from './components'

import { CasesListPage } from './modules/cases'
import { LoginPage, RegisterPage } from './modules/auth'
import ProfilePage from './modules/auth/pages/ProfilePage'

import CaseMovementDetails from './modules/cases/pages/CaseMovementDetails'

import Home from './pages/Home'

import { useAuth } from './hooks'

import './App.css'



const router = createBrowserRouter([
  {
    path: '/landing',
    element: <p>Landing</p>,
  },
  {
    path: '/*',
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '*',
        element: <Navigate to='home' replace />,
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
        path: 'cases/details/:id',
        element: <CaseMovementDetails />,
      },
    ],
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: '/help',
    element: <HelpPage />,
  },
])

function App() {
  const { startRefreshToken, status } = useAuth()

  const calendarLocaleText =
    esES.components.MuiLocalizationProvider.defaultProps.localeText

  useEffect(() => {
    startRefreshToken()
  }, [startRefreshToken])

  if (status === 'loading') return <Loading />

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={calendarLocaleText}
      adapterLocale='es'
    >
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </LocalizationProvider>
  )
}

export default App
