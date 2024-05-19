import React from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import routes from './routes';
import MainLayout from './layout/MainLayout';

function App() {
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
