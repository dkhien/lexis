import React, { useState } from 'react';
import {
  TextField, Button, Box, Snackbar,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import useDocumentStore from '../../store/documentStore';
import { Languages, LexisDocumentType, State } from '../../constants';

function UrlUpload({ closeModal }) {
  const documents = useDocumentStore((state) => state.documents);
  const addDocument = useDocumentStore((state) => state.addDocument);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleUpload = () => {
    if (content.trim() === '') {
      setShowToast(true);
      return;
    }

    const existingWebpageDocs = documents.filter((doc) => doc.type === LexisDocumentType.WEBPAGE && doc.name.startsWith('Webpage'));
    const index = existingWebpageDocs.length + 1;
    const docName = title || `Webpage ${index}`;
    addDocument({
      id: uuidv4(),
      state: State.READY,
      type: LexisDocumentType.WEBPAGE,
      file: null,
      name: docName,
      language: Languages.English,
      content: [content],
    });
    closeModal();
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <Box display="flex" flexDirection="column">
      <TextField
        label="Title (optional)"
        variant="filled"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="URL"
        variant="filled"
        fullWidth
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ marginTop: '1rem' }}
      />
      <Button
        variant="contained"
        size="large"
        color="primary"
        style={{ alignSelf: 'flex-end', marginTop: '1rem' }}
        onClick={handleUpload}
      >
        Upload
      </Button>
      <Snackbar
        open={showToast}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        message="URL cannot be empty"
      />
    </Box>
  );
}

UrlUpload.propTypes = {
  closeModal: PropTypes.func,
};

UrlUpload.defaultProps = {
  closeModal: () => {},
};

export default UrlUpload;
