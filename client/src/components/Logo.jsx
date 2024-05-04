import React from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/images/logo.png';

function Logo({ logoSize = '4rem' }) {
  return (
    <img
      src={logo}
      alt="Lexis Logo"
      style={{
        width: 'auto',
        height: logoSize,
      }}
    />
  );
}

Logo.propTypes = {
  logoSize: PropTypes.string,
};

Logo.defaultProps = {
  logoSize: '4rem',
};
export default Logo;
