import React from 'react';
import { Box } from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: '3rem',
        textAlign: 'center',
      }}
    >
      &copy; 2024 Group 20 - INT2041 20
    </Box>
  );
}

export default Footer;
