import React from 'react'

import { useThemeSwitcher } from './hooks'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { LoginPage, RegisterPage } from './modules/auth'

import ProfilePage from './modules/auth/pages/ProfilePage'


import './App.css'

import Layout from './pages/Layout'
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
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '*',
        element: <Navigate to="/"/>
      },
      {
        path: 'home',
        element: <div className='bg-black min-h-screen flex justify-center items-center'>Acá deberían ir el home</div>
      },
      {
        path: 'profile',
        element: <ProfilePage />
      },
      {
        path: 'cases',
        element: <div className='bg-black min-h-screen flex justify-center items-center'>Acá deberían ir los casos</div>
      },
      {
        path: 'cases/[caseId]',
        element: <div className='bg-black min-h-screen flex justify-center items-center'>Acá debería ir el caso específico</div>
      },
    ],
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
