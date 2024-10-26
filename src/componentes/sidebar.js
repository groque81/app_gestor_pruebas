import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <ul style={styles.menu}>
        <li>
        <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/proyectos">Registro de Proyectos</Link>
          </li>
        <li>
          <Link to="/moduloPruebas">Modulo de Pruebas</Link>
        </li>
        <li>
        <Link to="/login">Modulo de Pruebas</Link>
        </li>
      </ul>
    </div>
  );
}

const styles = {
  sidebar: {
    width: '200px',
    backgroundColor: '#9e9fa3',
    color: 'white',
    padding: '15px',
    height: '100vh',
  },
  menu: {
    listStyleType: 'none',
    padding: 0,
  },
  menuItem: {
    margin: '10px 0',
  },
};

export {Sidebar};
