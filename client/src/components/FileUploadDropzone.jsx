/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box, Typography, Card, CardContent, Button, Snackbar,
} from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import State from '../constants';

const baseStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10% 0',
  borderWidth: '2px',
  borderStyle: 'dashed',
  borderColor: '#AFBEC4',
  borderRadius: '4px',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#bc714e',
};

const acceptStyle = {
  borderColor: '#689f38',
};

const rejectStyle = {
  borderColor: '#F44336',
};

function FileUploadDropzone({ setFiles }) {
  const [error, setError] = useState('');

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      'image/*': [],
      'application/pdf': [],
    },
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        setError('Invalid file type. Please upload a PDF or an image file.');
      } else {
        const filteredFiles = acceptedFiles.filter(
          (file) => file.type === 'application/pdf' || file.type.startsWith('image/'),
        );
        const filesWithId = filteredFiles.map((file) => ({
          id: uuidv4(),
          state: State.READY,
          file,
        }));
        setFiles((prevFiles) => [...prevFiles, ...filesWithId]);
      }
    },
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {}),
  }), [isFocused, isDragAccept, isDragReject]);

  const handleCloseError = () => {
    setError('');
  };

  return (
    <Box textAlign="center" sx={{ margin: '0 auto', marginTop: '10vh' }}>
      <Typography variant="h4" fontWeight="bold">Dyslexia-friendly Document Reader</Typography>
      <Card sx={{ maxWidth: 900, margin: '0 auto', marginTop: '2rem' }}>
        <CardContent>
          <Box {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <Box display="flex" flexDirection="column" alignItems="center">
              <FileUploadOutlinedIcon fontSize="large" color="primary" sx={{ fontSize: '5rem', marginBottom: '1rem' }} />
              <Button variant="contained" color="secondary" size="large" sx={{ marginBottom: '1rem', width: '100%' }}>
                Browse files
              </Button>
              <Typography variant="body2">or drop files here</Typography>
              <Typography variant="body2" sx={{ marginTop: '1rem' }}>Supported file types: PDFs and images</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        message={error}
      />
    </Box>
  );
}

FileUploadDropzone.propTypes = {
  setFiles: PropTypes.func.isRequired,
};

export default FileUploadDropzone;
