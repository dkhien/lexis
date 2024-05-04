import { React, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { PictureAsPdfOutlined, ImageOutlined } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useFileStore from '../store/fileStore';
import Logo from '../components/Logo';

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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  padding: theme.spacing(2),
  '&.Mui-selected, &.Mui-selected:hover': {
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,
    '& .MuiListItemIcon-root': {
      color: '#fff',
    },
  },
}));

export default function Reader() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const files = useFileStore((state) => state.files);
  const [selectedFile, setSelectedFile] = useState(files[0] || null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.background.default,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexGrow: 1,
          }}
          >
            <Link to="/">
              <Logo logoSize="2.2rem" />
            </Link>
            <IconButton onClick={handleDrawerClose} sx={{ position: 'absolute', right: 10 }}>
              {theme.direction === 'ltr' ? <ChevronRightIcon color="primary" /> : <ChevronLeftIcon color="primary" />}
            </IconButton>
          </Box>
        </DrawerHeader>
        <Divider />
        {files.length === 0 ? (
          <Typography variant="body1" align="center" marginTop="1rem">
            No files available
          </Typography>
        ) : (
          <List>
            {files.map((file) => (
              <ListItem key={file.id} disablePadding>
                <CustomListItemButton
                  onClick={() => setSelectedFile(file)}
                  selected={selectedFile && selectedFile.id === file.id}
                  sx={{ padding: '1rem' }}
                >
                  <ListItemIcon>
                    {file.file.type === 'application/pdf' ? (
                      <PictureAsPdfOutlined />
                    ) : (
                      <ImageOutlined />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={file.file.name}
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    title={file.file.name}
                    disableTypography
                  />
                </CustomListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Drawer>
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
