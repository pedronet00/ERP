// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PermissoesProvider } from './routes/PermissionsContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense>
    <PermissoesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PermissoesProvider>
  </Suspense>,
)
