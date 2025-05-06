import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProviderWrapper } from './context/ThemeContext';
import { CurrencyProvider } from './context/CurrencyContext';

// Create root and render App within Theme and Currency Providers
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProviderWrapper>
    <CurrencyProvider>
      <App />
    </CurrencyProvider>
  </ThemeProviderWrapper>
);