import React from 'react';
import Box from '@mui/material/Box';
import UploadDialogAdmin from './UploadDialogAdmin';

function Home() {
  return (
    <Box>
      <Box
        textAlign="center"
        sx={{
          margin: '0 auto', marginTop: '5vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Box width="80%">
          <UploadDialogAdmin />
        </Box>
      </Box>

    </Box>
  );
}

export default Home;
