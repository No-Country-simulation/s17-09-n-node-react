import React from 'react'

import { useThemeSwitcher } from './hooks'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { LoginPage, RegisterPage } from './modules/auth'

import ProfilePage from './modules/auth/pages/ProfilePage'

import './App.css'
import HelpPage from './modules/auth/pages/Help'

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
    path: '/profile',
    element: <ProfilePage />,
  },
])

const App: React.FC = () => {
  const { themeMode, ThemeProvider: CustomThemeProvider } = useThemeSwitcher()

  return (
    <CustomThemeProvider theme={themeMode}>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </CustomThemeProvider>
  )
}

export default App
