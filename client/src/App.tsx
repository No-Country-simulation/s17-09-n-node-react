import React from "react";

import { useThemeSwitcher } from "./hooks";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LoginPage, RegisterPage } from "./modules/auth";
import { CaseDetails } from "./modules/cases";

const router = createBrowserRouter([
  {
    path: "/",
    element: <p>Aquí debería ir la landing page</p>,
    errorElement: <p>Not found</p>,
    children: [],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/cases/details/:id",
    element: <CaseDetails />,
  },
]);

const App: React.FC = () => {
  const { themeMode, ThemeProvider: CustomThemeProvider } = useThemeSwitcher();

  return (
    <CustomThemeProvider theme={themeMode}>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </CustomThemeProvider>
  );
};

export default App;
