import { React, useState } from 'react';
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

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    background: theme.palette.background.paper,
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
  const [open, setOpen] = useState(false);
  const documents = useDocumentStore((state) => state.documents);
  const [selectedDoc, setSelectedDoc] = useState(documents[0] || null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: theme.palette.background.paper, boxShadow: 'none',
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
      <ReadingArea open={open} />
    </Box>
  );
}

function ReadingArea({ open }) {
  return (
    <Main open={open}>
      <DrawerHeader />
      <Box width="100%" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box width="60%" align="justify">
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
            enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
            imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
            Convallis convallis tellus id interdum velit laoreet id donec ultrices.
            Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
            nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
            leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
            feugiat vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
            sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
            eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
            neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
            tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
            sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
            tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
            et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
            tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
            eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
            posuere sollicitudin aliquam ultrices sagittis orci a.
          </Typography>
        </Box>

      </Box>

    </Main>
  );
}

ReadingArea.propTypes = {
  open: PropTypes.bool.isRequired,
};
