import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './Components/Layouts/Layout/Layout';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Dialog } from '@mui/material';
import Login from './Components/Settings/Login/Login';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);




root.render(
  <React.StrictMode>
    <BrowserRouter>
    

    <Routes>
                
      <Route path="/login" element={<Login /> } />
                
      <Route path="/*" element={<Layout /> } />
      
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
