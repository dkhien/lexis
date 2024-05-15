import React from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled, useTheme } from '@mui/material/styles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Drawer from '@mui/material/Drawer';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../common/Logo';
import FileTypeIcon from '../common/FileTypeIcon';
import DrawerHeader from './DrawerHeader';
import useDocumentStore from '../../store/documentStore';
import { MimeType, LexisDocumentType } from '../../constants';

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  padding: theme.spacing(2),
  '&.Mui-selected, &.Mui-selected:hover': {
    color: '#fff',
    backgroundColor: `${theme.palette.secondary.main} !important`,
    '& .MuiListItemIcon-root': {
      color: '#fff',
    },
  },
}));

function ReaderSidebar({
  selectedDoc, setSelectedDoc, drawerWidth, open, setOpen,
}) {
  const theme = useTheme();
  const documents = useDocumentStore((state) => state.documents);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
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
      {documents.length === 0 ? (
        <Typography variant="body1" align="center" marginTop="1rem">
          No document available
        </Typography>
      ) : (
        <List>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <ArrowBackIcon />
            </ListItemIcon>
            <ListItemText primary="Back to Document List" />
          </ListItemButton>
          {documents.map((doc) => (
            <ListItem key={doc.id} disablePadding>
              <CustomListItemButton
                onClick={() => setSelectedDoc(doc)}
                selected={selectedDoc && selectedDoc.id === doc.id}
                sx={{ padding: '1rem', wordWrap: 'break-word' }}
              >
                <ListItemIcon>
                  <FileTypeIcon
                    fileType={
                      doc.type === LexisDocumentType.FILE ? doc.file.type : MimeType.TEXT
                    }
                  />
                </ListItemIcon>

                <ListItemText
                  primary={doc.name}
                  title={doc.type === MimeType.TEXT ? doc.content[0] : doc.name}
                />
              </CustomListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Drawer>
  );
}

ReaderSidebar.propTypes = {
  selectedDoc: PropTypes.instanceOf(Object),
  setSelectedDoc: PropTypes.func.isRequired,
  drawerWidth: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

ReaderSidebar.defaultProps = {
  selectedDoc: null,
};

export default ReaderSidebar;
