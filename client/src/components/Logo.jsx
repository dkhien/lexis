import React from 'react';
import logo from '../assets/images/logo.png';

function Logo() {
  const logoSize = '4rem';
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

export default Logo;
