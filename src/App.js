import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import ExchangeRates from './pages/ExchangeRates';
import { CssBaseline, Container } from '@mui/material';
import { useThemeContext } from './context/ThemeContext';

function AppContent() {
  const { mode } = useThemeContext();
  const location = useLocation();

  // Define the paths where Navbar should be hidden
  const hideNavbarRoutes = ['/error_page'];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className={mode === 'dark' ? 'dark-theme' : 'light-theme'}>
      {showNavbar && <Navbar />}
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exchange_rates_live" element={<ExchangeRates />} />
          <Route path="/error_page" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Container>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <CssBaseline />
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
