import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ModuloPruebas() {
  const [proyectos, setProyectos] = useState([]);
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [paquetePruebas, setPaquetePruebas] = useState([]);
  //Funcion para registrar datos del la prueba de proyectos
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null); // Para almacenar el proyecto seleccionado
  const [mostrarLista, setMostrarLista] = useState(false); // Para controlar si se muestra la lista o no
 

  // Función para obtener todos los proyectos
  const obtenerProyectos = async () => {
    try {
      const response = await fetch('https://gestorbackend-dvdjczcaf5h5c5ax.westus-01.azurewebsites.net/moduloPruebas');
      const data = await response.json();
      setProyectos(data);
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
    }
  };

  // Función para obtener proyectos filtrados por nombre
  const buscarProyectoPorNombre = async (e) => {
    if (e.key === 'Enter') {
      try {
        const response = await fetch(
          `https://gestorbackend-dvdjczcaf5h5c5ax.westus-01.azurewebsites.net/moduloPruebas/${nombreProyecto}`
        );
        const data = await response.json();
        setProyectos(data);
      } catch (error) {
        console.error('Error al buscar proyectos:', error);
      }
    }
  };

  const obtenerPaquetePruebas = async () => {
    try {
      const response = await fetch('https://gestorbackend-dvdjczcaf5h5c5ax.westus-01.azurewebsites.net/paquetePruebas');
      const data = await response.json();
      console.log('Datos recibidos:', data); // Agregar esto para verificar
      setPaquetePruebas(data);
    } catch (error) {
      console.error('Error al obtener el paquete de pruebas:', error);
    }
  };
  //////////////Funcion para registrar prueba de proyectos///////////////////
 const [ambientePruebas, setAmbientePruebas] = useState({
    resultadoPrueba: '',
    registroDefecto: '',
    clasificacionDefecto: ''
  });

  // Obtener proyectos desde el backend
  const obtenerProyectos_1 = async () => {
    try {
      const response = await fetch('https://gestorbackend-dvdjczcaf5h5c5ax.westus-01.azurewebsites.net/moduloPruebas');
      const data = await response.json();
      setProyectos(data);
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
    }
  };
// Manejar la selección de un proyecto
const seleccionarProyecto = (proyecto) => {
  setProyectoSeleccionado(proyecto);
  setNombreProyecto(proyecto.nombreProyecto);
  setMostrarLista(false); // Cerrar la lista después de seleccionar el proyecto
};

// Manejar el envío de los datos del ambiente de pruebas
const agregarAmbientePruebas = async (e) => {
  e.preventDefault();
  console.log('Proyecto Seleccionado:', proyectoSeleccionado); // Verifica si tiene valor
  if (!proyectoSeleccionado) {
    alert('Selecciona un proyecto antes de agregar los datos.');
    return;
  }

  try {
    const response = await fetch('https://gestorbackend-dvdjczcaf5h5c5ax.westus-01.azurewebsites.net/ambientePruebas_1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resultadoPrueba: ambientePruebas.resultadoPrueba,
        registroDefecto: ambientePruebas.registroDefecto,
        clasificacionDefecto: ambientePruebas.clasificacionDefecto,
        proyectoId: proyectoSeleccionado.IdRegistro,
      }),
    });

    if (response.ok) {
      alert('Datos de ambiente de pruebas agregados exitosamente.');
    } else {
      throw new Error('Error en la respuesta del servidor');
    }
  } catch (error) {
    console.error('Error al agregar datos de ambiente de pruebas:', error);
    alert('Error al agregar los datos. Revisa la consola para más detalles.');
  }
};
/////////////////////FIN DE FUNCION DE REGISTRO DE PRUEBAS////////////////
  // Llama a la función para obtener los proyectos al cargar el componente
  useEffect(() => {
    obtenerProyectos();
    obtenerPaquetePruebas();
    obtenerProyectos_1();
  }, []);
  console.log(paquetePruebas); // Verifica el estado de paquetePruebas aquí
  // Funciones para ejecutar las pruebas de funcionalidad, usabilidad y carga
  const ejecutarPrueba = async (tipoPrueba) => {
    try {
      const response = await fetch(`https://gestorbackend-dvdjczcaf5h5c5ax.westus-01.azurewebsites.net/moduloPruebas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tipoPrueba }),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
     
      const result = await response.json();
      alert(`Resultado de la prueba ${tipoPrueba}: ${result.message}`);
    } catch (error) {
      console.error('Error al ejecutar la prueba:', error);
      alert('Error al ejecutar la prueba. Revisa la consola para más detalles.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Parte superior: campo de búsqueda y tabla */}
      <div style={{ flex: '0 0 50%', padding: '20px', backgroundColor: '#f4f4f4' }}>
        <h2>Registro de Proyectos</h2>

        {/* Campo de búsqueda */}
        <input
          type="text"
          placeholder="Buscar por nombre de proyecto"
          value={nombreProyecto}
          onChange={(e) => setNombreProyecto(e.target.value)}
          onKeyDown={buscarProyectoPorNombre}
          style={{ padding: '10px', width: '300px', marginBottom: '20px' }}
        />

        {/* Tabla de proyectos */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Nombre del Proyecto</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Analista Asignado</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Presupuesto</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Fecha Inicio</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Fecha Cierre</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Estatus</th>
            </tr>
          </thead>
          <tbody>
            {proyectos.map((proyecto) => (
              <tr key={proyecto.IdRegistros}>
                <td style={{ border: '1px solid black', padding: '8px' }}>{proyecto.IdRegistros}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{proyecto.nombreProyecto}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{proyecto.analistaAsignado}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{proyecto.presupuesto}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{proyecto.fechaInicioProyecto}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{proyecto.fechaCierreProyecto}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{proyecto.estatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Parte inferior (puedes modificar como necesites) */}
      <div style={{ flex: 1, display: 'flex' }}>
        {/* Parte inferior izquierda: tabla de paquetePruebas */}
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#86898a', color: 'black' }}>
          <h3>Paquete de Pruebas</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', color: '#000' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>Tipo de Prueba</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Escenario</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Criterio de Aceptación</th>
              </tr>
            </thead>
            <tbody>
              {paquetePruebas.map((prueba) => (
                <tr key={prueba.id}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{prueba.tipoPrueba}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{prueba.escenario}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{prueba.criterioAceptacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Botones para ejecutar las pruebas */}
<div style={{ marginTop: '20px' }}>
            <button
              onClick={() => ejecutarPrueba('Funcionalidad')}
              style={{ padding: '10px', margin: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}
            >
              Prueba de Funcionalidad
            </button>
            <button
              onClick={() => ejecutarPrueba('Usabilidad')}
              style={{ padding: '10px', margin: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}
            >
              Prueba de Usabilidad
            </button>
            <button
              onClick={() => ejecutarPrueba('Carga')}
              style={{ padding: '10px', margin: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}
            >
              Prueba de Carga
            </button>
            <button
              style={{ padding: '10px', margin: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}
            >
              <Link to="/dashboard">Ir a Dashboard</Link>
            </button>
            </div>
        </div>

        <div style={{ flex: 1, backgroundColor: '#86898a', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/*Parte Inferior Derecha*/}
          <div style={{ padding: '20px' }}>
      <h2>Selecciona un Proyecto</h2>

      {/* Input para seleccionar el proyecto */}
      <input
        type="text"
        placeholder="Selecciona un proyecto"
        value={nombreProyecto}
        onClick={() => setMostrarLista(true)} // Mostrar la lista al hacer clic en el input
        readOnly
        style={{ padding: '10px', width: '300px', marginBottom: '10px' }}
      />

      {/* Mostrar lista de proyectos */}
      {mostrarLista && (
        <ul style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid black', width: '300px' }}>
          {proyectos.map((proyecto) => (
            <li
              key={proyecto.IdRegistros}
              onClick={() => seleccionarProyecto(proyecto)}
              style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc' }}
            >
              {proyecto.nombreProyecto}
            </li>
          ))}
        </ul>
      )}

      {/* Formulario para agregar datos al ambiente de pruebas */}
      <h3>Agregar datos al Ambiente de Pruebas</h3>
      <form onSubmit={agregarAmbientePruebas}>
        <label>
          Resultado de Prueba:
          <input
            type="text"
            value={ambientePruebas.resultadoPrueba}
            onChange={(e) => setAmbientePruebas({ ...ambientePruebas, resultadoPrueba: e.target.value })}
            required
            style={{ padding: '10px', marginBottom: '10px' }}
          />
        </label>
        <br />
        <label>
          Registro de Defecto:
          <input
            type="text"
            value={ambientePruebas.registroDefecto}
            onChange={(e) => setAmbientePruebas({ ...ambientePruebas, registroDefecto: e.target.value })}
            required
            style={{ padding: '10px', marginBottom: '10px' }}
          />
        </label>
        <br />
        <label>
          Clasificación del Defecto:
          <input
            type="text"
            value={ambientePruebas.clasificacionDefecto}
            onChange={(e) => setAmbientePruebas({ ...ambientePruebas, clasificacionDefecto: e.target.value })}
            required
            style={{ padding: '10px', marginBottom: '10px' }}
          />
        </label>
        <br />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}>
          Agregar Datos
        </button>
      </form>
    </div>



        </div>
      </div>
    </div>
  );
}
  
export {ModuloPruebas};
