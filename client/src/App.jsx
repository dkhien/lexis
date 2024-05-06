import React from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import Home from './pages/Home';
import Reader from './pages/Reader';
import NotFound from './pages/NotFound';
import Summary from './pages/Summary';
import MainLayout from './layout/MainLayout';

function App() {
  const routes = [
    {
      path: '/',
      element: <Home />,
      wrapInMainLayout: true,
    },
    {
      path: '/reader',
      element: <Reader />,
      wrapInMainLayout: false,
    },
    {
      path: '*',
      element: <NotFound />,
      wrapInMainLayout: true,
    },
    {
      path: '/summary',
      element: <Summary />,
      wrapInMainLayout: false,
    },
  ];

  // Disable ruler by default
  window.localStorage.setItem('rulerEnabled', 0);

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.wrapInMainLayout
              ? <MainLayout>{route.element}</MainLayout> : route.element}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
