import { React, useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import DrawerHeader from '../components/ReaderSidebar/DrawerHeader';
import useDocumentStore from '../store/documentStore';
import ReaderSidebar from '../components/ReaderSidebar';

const drawerWidth = 300;

const Main = styled('body', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, bgcolor, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    background: bgcolor,
    height: '100vh',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Reader() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const documents = useDocumentStore((state) => state.documents);
  const [selectedDoc, setSelectedDoc] = useState(documents[0] || null);
  const [bgColor, setBgColor] = useState(localStorage.getItem('newBackgroundColor') || theme.palette.background.paper);

  useEffect(() => {
    console.log('Background color changed to: ', bgColor);
    const handleStorageChange = () => {
      setBgColor(localStorage.getItem('newBackgroundColor'));
      console.log('Background color changed to: ', bgColor);
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup function
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [localStorage.getItem('newBackgroundColor')]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: bgColor, boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon color="primary" />
            </IconButton>
          </Box>
          <Box>
            <Button color="primary" variant="outlined">Summarize</Button>
            <Button color="primary" variant="outlined" sx={{ ml: 2 }}>Download</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <ReaderSidebar
        selectedDoc={selectedDoc}
        setSelectedDoc={setSelectedDoc}
        drawerWidth={drawerWidth}
        open={open}
        setOpen={setOpen}
      />
      <ReadingArea open={open} selectedDoc={selectedDoc} bgColor={bgColor} />
    </Box>
  );
}

function ReadingArea({ open, selectedDoc, bgColor }) {
  return (
    <Main open={open} bgcolor={bgColor}>
      <DrawerHeader />
      <Box width="100%" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box width="60%" align="justify">
          {/* TODO: Display the pages with proper pagination */}
          {selectedDoc ? selectedDoc.content.map((page, index) => (
            <Typography key={`${selectedDoc.id}page${index + 1}`} paragraph>
              {page}
            </Typography>
          )) : <Typography>No document selected</Typography>}
        </Box>
      </Box>
    </Main>
  );
}

ReadingArea.propTypes = {
  open: PropTypes.bool.isRequired,
  selectedDoc: PropTypes.instanceOf(Object),
  bgColor: PropTypes.string.isRequired,
};

ReadingArea.defaultProps = {
  selectedDoc: null,
};
