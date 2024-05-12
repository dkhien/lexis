import React from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import Home from './pages/Home';
import Reader from './pages/Reader';
import NotFound from './pages/NotFound';
import MainLayout from './layout/MainLayout';
import ScrambledGame from './pages/ScrambledGame';

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
      path: '/games/scrambled',
      element: <ScrambledGame />,
      wrapInMainLayout: true,
    },
    {
      path: '*',
      element: <NotFound />,
      wrapInMainLayout: true,
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
