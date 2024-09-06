import React from 'react'

import { useThemeSwitcher } from './hooks'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { LoginPage, RegisterPage,  } from './modules/auth'
import './App.css';
import  LandingPage from "./pages/LandingPage" 


const router = createBrowserRouter([
  {
    path: '/LandingPage',
    element: <LandingPage />,
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
  const { themeMode, ThemeProvider: CustomThemeProvider } = useThemeSwitcher()

  return (
    <CustomThemeProvider  theme={themeMode}>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </CustomThemeProvider>
  )
}

export default App;
