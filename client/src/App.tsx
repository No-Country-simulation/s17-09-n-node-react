import React from 'react';
import useThemeSwitcher from './hooks/useThemeSwitcher';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './modules/auth/Sign-in';
import LandingLogin from './pages/Login';
import Register from './pages/Register';

const App: React.FC = () => {
  const { themeMode, toggleTheme, ThemeProvider: CustomThemeProvider } = useThemeSwitcher();

  return (
    <CustomThemeProvider theme={themeMode}>
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <Router>
          <Routes>
            <Route path="/" element={<LandingLogin toggleTheme={toggleTheme} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register toggleTheme={toggleTheme} />} />
            {/* otras rutas */}
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </CustomThemeProvider>
  );
};

export default App;
