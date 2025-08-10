import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

console.log('🚀 Vyuh App starting...');
console.log('Environment variables check:', {
  FIREBASE_API_KEY: process.env.REACT_APP_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing',
  FIREBASE_AUTH_DOMAIN: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Missing',
  FIREBASE_PROJECT_ID: process.env.REACT_APP_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing',
  NODE_ENV: process.env.NODE_ENV
});

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log('📱 Root element found:', !!document.getElementById('root'));

try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('✅ App rendered successfully');
} catch (error) {
  console.error('❌ Error rendering app:', error);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
