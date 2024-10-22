import React from 'react';
import {Navbar} from '../componentes/Navbar';
import {Sidebar} from '../componentes/sidebar';
import {DashboardContent} from '../componentes/DashboardContenido';

function Dashboard() {
  return (
    <div style={styles.dashboard}>
      <Navbar />
      <div style={styles.mainContent}>
        <Sidebar />
        <DashboardContent />
      </div>
    </div>
  );
}

const styles = {
  dashboard: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  mainContent: {
    display: 'flex',
    flex: 1,
  },
};

export {Dashboard};
