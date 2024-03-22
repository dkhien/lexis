import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Reading from './pages/Reading';

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
      path: '/reading',
      element: <Reading />,
    },
  ];
  return (
    <BrowserRouter>
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
