import React from 'react';
import Home from './pages/Home';
import Reader from './pages/Reader';
import Library from './pages/Library';
import NotFound from './pages/NotFound';
import Games from './pages/Games';
import ScrambledGame from './pages/ScrambledGame';
import FillInTheBlankGame from './pages/FillInTheBlankGame';

const routes = [
  {
    name: 'Home',
    path: '/',
    element: <Home />,
    wrapInMainLayout: true,
    showInNavbar: true,
  },
  {
    name: 'Reader',
    path: '/reader',
    element: <Reader />,
    wrapInMainLayout: false,
    showInNavbar: false,
  },
  {
    name: 'Library',
    path: '/library',
    element: <Library />,
    wrapInMainLayout: true,
    showInNavbar: true,
  },
  {
    name: 'Games',
    path: '/games',
    element: <Games />,
    wrapInMainLayout: true,
    showInNavbar: true,
  },
  {
    path: '/games/scrambled',
    element: <ScrambledGame />,
    wrapInMainLayout: true,
    showInNavbar: false,
  },
  {
    path: '/games/fillintheblank',
    element: <FillInTheBlankGame />,
    wrapInMainLayout: true,
    showInNavbar: false,
  },
  {
    name: 'Not Found',
    path: '*',
    element: <NotFound />,
    wrapInMainLayout: true,
    showInNavbar: false,
  },
];

export default routes;
