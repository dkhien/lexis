import { AppBar, Container, Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Container disableGutters>
        <Box sx={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '1rem',
        }}
        >
          <Link to="/">
            <Logo />
          </Link>
        </Box>
      </Container>
    </AppBar>
  );
}

export default Header;
