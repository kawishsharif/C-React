import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Create root using the new React 19 createRoot API
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
