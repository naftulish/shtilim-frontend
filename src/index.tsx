import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './Components/Layouts/Layout/Layout';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </React.StrictMode>
);
