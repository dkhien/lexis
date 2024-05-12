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
import { InputAdornment, TextField } from '@mui/material';
import {
  NavigateNext, NavigateBefore, FirstPage, LastPage,
} from '@mui/icons-material';
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

function Pagination({ page, setPage, totalPages }) {
  const [inputPage, setInputPage] = useState(parseInt(page, 10));

  useEffect(() => {
    setInputPage(parseInt(page, 10));
  }, [page]);

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (inputPage === '') setInputPage(page);
      if (!Number.isInteger(inputPage)) setInputPage(page);
      if (inputPage >= 1 && inputPage <= totalPages) { setPage(inputPage); }
    }
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
      <IconButton
        onClick={() => setPage(1)}
        size="small"
        disabled={page === 1}
      >
        <FirstPage />
      </IconButton>
      <IconButton
        onClick={() => setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage))}
        size="small"
        disabled={page === 1}
      >
        <NavigateBefore />
      </IconButton>
      <TextField
        id="outlined-number"
        label="Page"
        type="text"
        value={inputPage}
        onChange={(e) => setInputPage(e.target.value)}
        onBlur={() => {
          if (inputPage === '') setInputPage(page);
          if (!Number.isInteger(inputPage)) setInputPage(page);
          if (inputPage >= 1 && inputPage <= totalPages) { setPage(inputPage); }
        }}
        onKeyDown={handleSubmit}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          endAdornment:
  <InputAdornment position="end">
    of
    {' '}
    {totalPages}
  </InputAdornment>,
          inputProps: { min: 1, max: totalPages },
        }}
        variant="outlined"
        size="small"
        sx={{ minWidth: '12ch', width: '20%' }}
      />
      <IconButton
        onClick={() => setPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage))}
        size="small"
        disabled={page === totalPages}
      >
        <NavigateNext />
      </IconButton>
      <IconButton
        onClick={() => setPage(totalPages)}
        size="small"
        disabled={page === totalPages}
      >
        <LastPage />
      </IconButton>
    </Box>
  );
}

export default function Reader() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
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
      <ReadingArea open={open} selectedDoc={selectedDoc} />
    </Box>
  );
}

function ReadingArea({ open, selectedDoc }) {
  const [pageNo, setPageNo] = useState(1);
  return (
    <Main open={open}>
      <DrawerHeader />
      <Box
        width="100%"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box width="60%" height="80vh" overflow="auto" align="justify">
          {selectedDoc ? (
            <Typography paragraph>
              {selectedDoc.content[pageNo - 1]}
            </Typography>
          ) : <Typography>No document selected</Typography>}
        </Box>
        <Pagination page={pageNo} setPage={setPageNo} totalPages={selectedDoc.content.length} />
      </Box>
    </Main>
  );
}

ReadingArea.propTypes = {
  open: PropTypes.bool.isRequired,
  selectedDoc: PropTypes.instanceOf(Object),
};

ReadingArea.defaultProps = {
  selectedDoc: null,
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};
