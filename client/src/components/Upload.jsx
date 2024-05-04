import React, { useRef, useState } from 'react';
import {
  Card, Box, Button, Fab,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import File from './File';
import State from '../constants';
import useFileStore from '../store/fileStore';

function Upload() {
  const [files, setFiles, removeFile, removeAllFiles] = useFileStore((state) => [
    state.files, state.setFiles, state.removeFile, state.removeAllFiles]);
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConverted, setIsConverted] = useState(false);

  console.log(files);

  const addFile = (event) => {
    const inputFiles = event.target.files;

    if (!inputFiles) {
      return;
    }

    const filesWithId = Array.from(inputFiles).map((file) => ({
      id: uuidv4(),
      state: State.READY,
      file,
    }));

    setFiles((prevFiles) => [...prevFiles, ...filesWithId]);
    setIsConverted(false);

    // eslint-disable-next-line no-param-reassign
    event.target.value = null;
  };

  const handleUpload = () => {
    inputRef.current.click();
  };

  const handleConvert = async () => {
    setIsLoading(true);
    setIsConverted(false);

    let filesToConvert = files.filter((file) => file.state !== State.DONE);

    setFiles(files.map((file) => ({
      ...file,
      state: filesToConvert.includes(file) ? State.PROCESSING : file.state,
    })));

    const formData = new FormData();
    filesToConvert.forEach((file) => {
      formData.append('files', file.file);
    });
    const uploadApi = `${process.env.REACT_APP_SERVER_URL}/api/upload`;
    const response = await axios.post(uploadApi, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    filesToConvert = filesToConvert.map((file, index) => ({
      ...file,
      resultFile: response.data[index].resultFile,
      state: State.DONE,
    }));

    setIsLoading(false);
    setIsConverted(true);

    setFiles(files.map((file) => (
      filesToConvert.find((convertedFile) => convertedFile.id === file.id) || file
    )));
  };

  const navigate = useNavigate();
  const handleRead = () => {
    navigate('/reader');
  };

  return (
    <Card sx={{ padding: '2rem', marginX: '5vw' }}>
      {files.map((file) => (
        <File key={file.id} file={file} handleRemoveFile={removeFile} />
      ))}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '2rem',
          alignItems: 'center',
        }}
      >
        <Fab color="secondary" aria-label="upload" onClick={handleUpload} disabled={isLoading}>
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
            disabled={isLoading}
          >
            Clear all
          </Button>
          {
            !isConverted ? (
              <Button
                variant="contained"
                size="large"
                onClick={handleConvert}
                aria-label="convert"
                disabled={isLoading || files.length === 0}
                color="primary"
              >
                {isLoading ? 'Converting...' : 'Convert'}
              </Button>
            ) : (
              <Button
                variant="contained"
                size="large"
                onClick={handleRead}
                aria-label="read"
                disabled={isLoading || files.length === 0}
                color="success"
              >
                Read
              </Button>
            )
          }
        </Box>
      </Box>
    </Card>
  );
}

export default Upload;
