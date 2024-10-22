import React from 'react';

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>Mi Dashboard</h1>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#4CAF50',
    padding: '1rem',
    color: 'white',
    textAlign: 'center',
  },
  title: {
    margin: 0,
  },
};

export {Navbar};
