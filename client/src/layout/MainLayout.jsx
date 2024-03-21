import React from 'react';
import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        {children}
      </Container>
      <Footer />
    </>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
