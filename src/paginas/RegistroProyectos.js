import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistroProyectos() {
  const [nombreProyecto, setNombre] = useState('');
  const [analistaAsignado, setAnalista] = useState('');
  const [presupuesto, setPresupuesto] = useState('');
  const [fechaInicioProyecto, setFechaInicio] = useState('');
  const [fechaCierreProyecto, setFechaCierre] = useState('');
  const [estatus, setEstatus] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate=useNavigate();

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const proyecto = {
      nombreProyecto,
      analistaAsignado: Number(analistaAsignado),
      presupuesto: parseFloat(presupuesto),
      fechaInicioProyecto,
      fechaCierreProyecto,
      estatus,
    };

    try {
      const response = await fetch('https://gestorbackend-dvdjczcaf5h5c5ax.westus-01.azurewebsites.net/proyectos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proyecto), // Enviar datos al backend
      });

      if (response.ok) {
        setMensaje('Proyecto registrado con éxito');
        setNombre('');
        setAnalista('');
        setPresupuesto('');
        setFechaInicio('');
        setFechaCierre('');
        setEstatus('');
      } else {
        setMensaje('Error al registrar el proyecto');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Error en el servidor');
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
      <h2>Registrar Proyecto</h2>
        <div style={styles.formGroup}>
          <label>Nombre del proyecto:</label>
          <input
            type="text"
            value={nombreProyecto}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label>Analista:</label>
          <input
            type="number"
            value={analistaAsignado}
            onChange={(e) => setAnalista(e.target.value)}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label>Presupuesto:</label>
          <input
            type="number"
            value={presupuesto}
            onChange={(e) => setPresupuesto(e.target.value)}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label>Fecha de inicio:</label>
          <input
            type="date"
            value={fechaInicioProyecto}
            onChange={(e) => setFechaInicio(e.target.value)}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label>Fecha de fin:</label>
          <input
            type="date"
            value={fechaCierreProyecto}
            onChange={(e) => setFechaCierre(e.target.value)}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label>Estatus:</label>
          <input
            type="text"
            value={estatus}
            onChange={(e) => setEstatus(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Registrar Proyecto</button>
        <nav>
       <button onClick={handleDashboardClick}>Ir a Dashboard</button>
        </nav>        
        {mensaje && <p>{mensaje}</p>}
      </form>
    </div>
  );
}

//css styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  form: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
  },
  formGroup: {
    marginBottom: '15px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export {RegistroProyectos};

