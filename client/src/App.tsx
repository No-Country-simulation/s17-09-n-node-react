import React from 'react'

import { ThemeProvider as CustomThemeProvider } from 'styled-components'

import useThemeSwitcher from './hooks/useThemeSwitcher'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { LoginPage, RegisterPage } from './modules/auth'

const router = createBrowserRouter([
  {
    path: '/',
    element: <p>Aquí debría ir la landing page</p>,
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
])

const App: React.FC = () => {
  const { themeMode } = useThemeSwitcher()

  return (
    <CustomThemeProvider theme={themeMode}>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </CustomThemeProvider>
  )
}

export default App
