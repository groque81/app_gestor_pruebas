import React from 'react';
import {Widget} from './widget';

function DashboardContent() {
  return (
    <div style={styles.content}>
      <h2>Bienvenido al Dashboard</h2>
      <div style={styles.widgets}>
        <Widget title="Usuarios Activos" count={150} />
        <Widget title="Ventas del Mes" count={3000} />
        <Widget title="Nuevos Clientes" count={25} />
        <Widget title="Reportes" count={12} />
      </div>
    </div>
  );
}

const styles = {
  content: {
    padding: '20px',
    flexGrow: 1,
  },
  widgets: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

export {DashboardContent};
