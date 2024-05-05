import React, { useState, useEffect } from 'react';
import {
  Card, Box, Button, Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DocumentListItem from './DocumentListItem';
import State from '../../constants';
import useDocumentStore from '../../store/documentStore';
import UploadModal from '../UploadModal';

function DocumentList() {
  const [documents, setDocuments, removeAllDocuments] = useDocumentStore(
    (state) => [
      state.documents, state.setDocuments, state.removeAllDocuments],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isConverted, setIsConverted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const allDone = documents.every((doc) => doc.state === State.DONE);
    if (allDone) {
      setIsConverted(true);
    } else {
      setIsConverted(false);
    }
  }, [documents]);

  const handleConvert = async () => {
    setIsLoading(true);
    setIsConverted(false);

    let docsToConvert = documents.filter((doc) => doc.state !== State.DONE);

    if (docsToConvert.length === 0) {
      setIsLoading(false);
      return;
    }

    setDocuments(documents.map((doc) => ({
      ...doc,
      state: docsToConvert.includes(doc) ? State.PROCESSING : doc.state,
    })));

    const formData = new FormData();
    docsToConvert.forEach((doc) => {
      formData.append('files', doc.file);
    });
    const uploadApi = `${process.env.REACT_APP_SERVER_URL}/api/upload`;
    const response = await axios.post(uploadApi, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    docsToConvert = docsToConvert.map((doc, index) => ({
      ...doc,
      resultFile: response.data[index].resultFile,
      state: State.DONE,
    }));

    setIsLoading(false);
    setIsConverted(true);

    setDocuments(documents.map((doc) => (
      docsToConvert.find((convertedDoc) => convertedDoc.id === doc.id) || doc
    )));
  };

  const navigate = useNavigate();
  const handleRead = () => {
    navigate('/reader');
  };

  return (
    <Card sx={{ padding: '2rem', marginX: '5vw' }}>
      <Box sx={{ height: '550px', overflowY: 'auto' }}>
        {documents.map((doc) => (
          <DocumentListItem key={doc.id} document={doc} />
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '2rem',
          alignItems: 'center',
        }}
      >
        <Fab
          color="secondary"
          aria-label="upload"
          onClick={() => {
            setIsModalOpen(true);
          }}
          disabled={isLoading}
        >
          <AddIcon />
        </Fab>
        <Box>
          <Button
            variant="outlined"
            size="large"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{ marginRight: '1rem' }}
            aria-label="clear-all-documents"
            onClick={removeAllDocuments}
            disabled={isLoading}
          >
            Clear all
          </Button>
          {!isConverted ? (
            <Button
              variant="contained"
              size="large"
              onClick={handleConvert}
              aria-label="convert"
              disabled={isLoading || documents.length === 0}
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
              disabled={isLoading || documents.length === 0}
              color="success"
            >
              Read
            </Button>
          )}
        </Box>
      </Box>
      <UploadModal open={isModalOpen} setOpen={setIsModalOpen} />
    </Card>
  );
}

export default DocumentList;
