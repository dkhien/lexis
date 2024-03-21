import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#115C7D',
    },
    secondary: {
      main: '#bc714e',
    },
    background: {
      default: '#f0dc82',
      paper: '#fafac8',
    },
  },
  direction: 'rtl',
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: '#689f38',
        color: '#fff',
      },
    },
  },
});

export default theme;
