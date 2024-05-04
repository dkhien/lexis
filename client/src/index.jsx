import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import {
  EulexiaFab,
  ColorChangeAction,
  FontFamilyAction,
  FontSizeAction,
  RulerAction,
  TextToSpeechAction,
} from 'react-eulexia';
import App from './App';
import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
    <EulexiaFab backgroundColor="#bc714e" style={{ right: 20, bottom: 20 }}>
      <FontSizeAction />
      <FontFamilyAction />
      <ColorChangeAction />
      <RulerAction />
      <TextToSpeechAction />
    </EulexiaFab>
  </React.StrictMode>,
  document.getElementById('root'),
);
