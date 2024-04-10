import React, { useRef } from 'react';
import {
  Card, Box, Button, Fab,
} from '@mui/material';
import PropTypes from 'prop-types';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import File from './File';

function Upload({ files, setFiles }) {
  const inputRef = useRef(null);
  const addFile = (event) => {
    const inputFiles = event.target.files;

    if (!inputFiles) {
      return;
    }

    const filesWithId = Array.from(inputFiles).map((file) => ({
      id: uuidv4(),
      file,
    }));
    setFiles([...files, ...filesWithId]);
  };

  const removeFile = (fileToRemove) => {
    setFiles(files.filter((file) => file.id !== fileToRemove));
  };

  const removeAllFiles = () => {
    setFiles([]);
  };

  const handleUpload = () => {
    inputRef.current.click();
  };

  const handleConvert = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file.file);
    });
    const uploadApi = `${process.env.REACT_APP_SERVER_URL}/upload`;
    const response = await axios.post(uploadApi, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // TODO: Remove console.log
    console.log(response.data);
  };

  const updatedFiles = files.map((file) => ({ ...file, state: 'READY' }));
  return (
    <Card sx={{ padding: '2rem', marginX: '5vw' }}>
      {updatedFiles.map((file) => (
        <File key={file.id} file={file} handleRemoveFile={removeFile} />
      ))}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '1rem',
          alignItems: 'center',
        }}
      >
        <Fab color="secondary" aria-label="upload" onClick={handleUpload}>
          <AddIcon />
          <input
            style={{ display: 'none' }}
            ref={inputRef}
            type="file"
            multiple
            accept="image/*, application/pdf"
            onChange={(event) => {
              addFile(event);
            }}
          />
        </Fab>
        <Box>
          <Button
            variant="outlined"
            size="large"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{ marginRight: '1rem' }}
            aria-label="clear-all-file"
            onClick={removeAllFiles}
          >
            Clear all
          </Button>
          <Button variant="contained" size="large" onClick={handleConvert} aria-label="convert">
            Convert
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

Upload.propTypes = {
  files: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  setFiles: PropTypes.func.isRequired,
};

export default Upload;
