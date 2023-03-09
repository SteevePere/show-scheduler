import React from 'react';

const Logo = () => {
  return (
    <img
      src={process.env.PUBLIC_URL + '/logo192.png'}
      alt='Logo'
      style={{
        width: '100%',
        objectFit: 'cover',
        padding: 20,
      }}
    />
  );
};

export default Logo;