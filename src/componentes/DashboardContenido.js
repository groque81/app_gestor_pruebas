import React from 'react';
import {Widget} from './widget';

function DashboardContent() {
  return (
    <div style={styles.content}>
      <h2>Gestor de Pruebas.</h2>
      <div style={styles.widgets}>
        <Widget title="Proyectos Activos" count={3} />
        <Widget title="Pruebas Fallidas" count={10} />
        <Widget title="Metricas" count={'10% Pruebas ejecutadas'} />
        <Widget title="Reportes" count={0} />
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
