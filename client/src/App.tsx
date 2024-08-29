import React from 'react';
import useThemeSwitcher from './hooks/useThemeSwitcher';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from './pages/Login';
import  RegistrationPage from './pages/Register';

const App: React.FC = () => {
  const { themeMode, ThemeProvider: CustomThemeProvider } = useThemeSwitcher();

  return (
    <CustomThemeProvider theme={themeMode}>
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
    
            <Route path="/register" element={<RegistrationPage />} />
            {/* otras rutas */}
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </CustomThemeProvider>
  );
};

export default App;
