import {
  AppBar, Container, Box, Toolbar, Button,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/common/Logo';
import routes from '../routes';

function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Container disableGutters>
        <Toolbar>
          <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '1rem',
          }}
          >
            <Link to="/">
              <Logo />
            </Link>
          </Box>
          <Box sx={{ marginLeft: 'auto' }}>
            {routes.map((route) => (
              route.showInNavbar && (
                <Link to={route.path} key={route.path}>
                  <Button color="primary">{route.name}</Button>
                </Link>
              )
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
