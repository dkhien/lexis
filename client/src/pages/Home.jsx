import React from 'react';
import Box from '@mui/material/Box';
import UploadDialog from '../components/UploadDialog';
import DocumentList from '../components/DocumentList/DocumentList';
import useDocumentStore from '../store/documentStore';

function Home() {
  const documents = useDocumentStore((state) => state.documents);

  return (
    <Box>
      {documents.length === 0 ? (
        <Box
          textAlign="center"
          sx={{
            margin: '0 auto', marginTop: '5vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Box width="100%">
            <UploadDialog />
          </Box>
        </Box>
      ) : (
        <DocumentList />
      )}
    </Box>
  );
}

export default Home;
