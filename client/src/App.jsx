import React from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
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
      path: '/reader',
      element: <Reader />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ];

  // Disable ruler by default
  window.localStorage.setItem('rulerEnabled', 0);

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
