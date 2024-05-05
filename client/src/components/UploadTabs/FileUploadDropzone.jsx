/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box, Typography, Card, CardContent, Button, Snackbar,
} from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { State, LexisDocumentType } from '../../constants';
import useDocumentStore from '../../store/documentStore';
import { isImageFile, isPDFFile } from '../../utils/fileUtils';

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

function FileUploadDropzone({ closeModal }) {
  const addDocuments = useDocumentStore((state) => state.addDocuments);
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
          (file) => isPDFFile(file.type) || isImageFile(file.type),
        );
        const newDocuments = filteredFiles.map((file) => ({
          id: uuidv4(),
          name: file.name,
          state: State.READY,
          type: LexisDocumentType.FILE,
          content: [], // content will be populated after OCR
          file,
        }));
        addDocuments(newDocuments);
        closeModal();
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
    <>
      <Card sx={{ maxWidth: 900, margin: '0 auto', boxShadow: 'none' }}>
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
    </>
  );
}

FileUploadDropzone.propTypes = {
  closeModal: PropTypes.func,
};

FileUploadDropzone.defaultProps = {
  closeModal: () => {},
};

export default FileUploadDropzone;
