import React, { useState } from 'react';

function RegistroProyectos() {
  const [nombreProyecto, setNombre] = useState('');
  const [analistaAsignado, setAnalista] = useState('');
  const [presupuesto, setPresupuesto] = useState('');
  const [fechaInicioProyecto, setFechaInicio] = useState('');
  const [fechaCierreProyecto, setFechaCierre] = useState('');
  const [estatus, setEstatus] = useState('');
  const [mensaje, setMensaje] = useState('');

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
      const response = await fetch('http://localhost:5000/proyectos', {
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
    <div>
      <h2>Registrar Proyecto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del proyecto:</label>
          <input
            type="text"
            value={nombreProyecto}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Analista:</label>
          <input
            type="number"
            value={analistaAsignado}
            onChange={(e) => setAnalista(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Presupuesto:</label>
          <input
            type="number"
            value={presupuesto}
            onChange={(e) => setPresupuesto(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha de inicio:</label>
          <input
            type="date"
            value={fechaInicioProyecto}
            onChange={(e) => setFechaInicio(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha de fin:</label>
          <input
            type="date"
            value={fechaCierreProyecto}
            onChange={(e) => setFechaCierre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Estatus:</label>
          <input
            type="text"
            value={estatus}
            onChange={(e) => setEstatus(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar Proyecto</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export {RegistroProyectos};

