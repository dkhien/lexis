import React, { useState } from 'react';
import {
  TextField, Button, Box, Snackbar,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import useDocumentStore from '../../store/documentStore';
import { Languages, LexisDocumentType, State } from '../../constants';

function TextUpload({ closeModal }) {
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

    const existingTextDocs = documents.filter((doc) => doc.type === LexisDocumentType.TEXT && doc.name.startsWith('Text'));
    const index = existingTextDocs.length + 1;
    const docName = title || `Text ${index}`;
    addDocument({
      id: uuidv4(),
      state: State.READY,
      type: LexisDocumentType.TEXT,
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
        label="Content"
        variant="filled"
        fullWidth
        margin="normal"
        multiline
        rows={11}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        variant="contained"
        size="large"
        color="primary"
        style={{ alignSelf: 'flex-end', marginTop: '10px' }}
        onClick={handleUpload}
      >
        Upload
      </Button>
      <Snackbar
        open={showToast}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        message="Content cannot be empty"
      />
    </Box>
  );
}

TextUpload.propTypes = {
  closeModal: PropTypes.func,
};

TextUpload.defaultProps = {
  closeModal: () => {},
};

export default TextUpload;
