import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Reader from './pages/Reader';
import NotFound from './pages/NotFound';
import MainLayout from './layout/MainLayout';

function App() {
  const routes = [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/upload',
      element: <Upload />,
    },
    {
      path: '/reader',
      element: <Reader />,
    },
    {
      path: '*',
      element: <NotFound />,
      allowedRoles: [],
    },
  ];
  return (
    <BrowserRouter>
      <MainLayout />
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
