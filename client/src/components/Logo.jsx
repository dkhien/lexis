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

// Logo.propTypes = {
//   type: PropTypes.string.isRequired,
// };

export default Logo;
