import React, { useState } from 'react';
import {
  TextField, Button, Box,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import useDocumentStore from '../../store/documentStore';
import State from '../../constants';

function TextUpload({ closeModal }) {
  const documents = useDocumentStore((state) => state.documents);
  const addDocument = useDocumentStore((state) => state.addDocument);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleUpload = () => {
    const existingTextDocs = documents.filter((doc) => doc.file.type === 'text/plain' && doc.file.name.startsWith('Text'));
    const index = existingTextDocs.length + 1;
    const fileName = title || `Text ${index}`;
    addDocument({
      id: uuidv4(),
      state: State.DONE,
      file: {
        name: fileName,
        size: -1, // text input does not have a size
        type: 'text/plain',
      },
      content,
    });
    closeModal();
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
