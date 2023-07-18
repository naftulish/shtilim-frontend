import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './Components/Layouts/Layout/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Settings/Login/Login';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function RTL(props:any) {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}

root.render(
  <React.StrictMode>
    <RTL>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login /> } /> 
          <Route path="/*" element={<Layout /> } />
        </Routes>
      </BrowserRouter>
    </RTL>
  </React.StrictMode>
);
