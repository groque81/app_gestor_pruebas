// Importamos las dependencias
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const conexion = require('./conexionDB');
const selenium =require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');

// Creamos el servidor
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Conectar con la base de datos MySQL
/*const db = mysql.createConnection({  
  host: 'localhost',
  user: 'root', // Tu usuario de MySQL
  password: 'R0que81#', // Tu contraseña de MySQL
  database: 'gestionproyectos' // Nombre de tu base de datos
});*/

conexion.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

// Ruta de autenticación (Login)
app.post('/login', (req, res) => {
  console.log("Datos recibidos en el servidor:", req.body);  // Verifica lo que recibes
  const { Nombre, Clave } = req.body;

  // Verificar si el usuario existe en la base de datos
  const query = 'SELECT * FROM rs_usuario WHERE Nombre = ?';
  conexion.query(query, [Nombre], (err, results) => {
    if (err) {
      console.error('Error en la consulta a la base de datos:', err);
      return res.status(500).send('Error en el servidor 1');
    }

    if (results.length === 0) {
      return res.status(401).send('Usuario no encontrado');
    }

    const user = results[0];
    console.log("Contraseña recibida:", Clave);              // Verifica la contraseña ingresada
    console.log("Contraseña en la base de datos:", user.Clave);  // Verifica la contraseña almacenada

    // Comparar las contraseñas
   /* if (Clave === user.Clave) {
      res.status(200).send('Inicio de sesión exitoso');
      console.log("Inicio de sesión exitoso");
    } else {
      res.status(401).send('Contraseña incorrecta');
      console.log("Contraseña incorrecta");
    }*/
    bcrypt.compare(Clave, user.Clave, (err, isMatch) => {
      if (err) {
        console.error('Error al comparar las contraseñas:', err);
        return res.status(500).send('Error en el servidor 2');
      }

      if (isMatch) {
        // Si la contraseña es correcta
        res.status(200).send('Inicio de sesión exitoso');
        console.log("Inicio de sesión exitoso");
      } else {
        // Si la contraseña es incorrecta
        res.status(401).send('Contraseña incorrecta');
        console.log("Contraseña incorrecta");
      }
    });
  });
});

// Ruta para registrar proyectos
app.post('/proyectos', (req, res) => {
  const {nombreProyecto, analistaAsignado, presupuesto, fechaInicioProyecto, fechaCierreProyecto, estatus } = req.body;

  const query = `
    INSERT INTO registroproyectos (nombreProyecto, analistaAsignado, presupuesto, fechaInicioProyecto, fechaCierreProyecto, estatus)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  conexion.query(query, [nombreProyecto, analistaAsignado, presupuesto, fechaInicioProyecto, fechaCierreProyecto, estatus], (err, result) => {
    if (err) {
      console.error('Error al insertar proyecto:', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.status(200).send('Proyecto registrado con éxito');
  });
});
// Endpoint para obtener registros
app.get('/moduloPruebas', (req, res) => {
  const sql = 'SELECT * FROM registroProyectos';
  conexion.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Ruta para obtener registros filtrados por nombre de proyecto
app.get('/moduloPruebas/:nombreProyecto', (req, res) => {
  const { nombreProyecto } = req.params;
  const sql = 'SELECT * FROM registroProyectos WHERE nombreProyecto LIKE ?';
  conexion.query(sql, [`%${nombreProyecto}%`], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});
// Ruta para obtener el paquete de pruebas
app.get('/paquetePruebas', (req, res) => {
  const sql = 'SELECT tipoPrueba, escenario, criterioAceptacion FROM paquetepruebas';
  conexion.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener los datos de paquetepruebas:', err);
      return res.status(500).json({ error: 'Error al obtener los datos' });
    }
      res.json(results);// Envia los resultados al frontend
  });
});

//////////////////////////////////////////////////////
// Ruta para ejecutar pruebas
app.post('/moduloPruebas', async (req, res) => {
  const { tipoPrueba } = req.body; // Obtenemos el tipo de prueba desde el cuerpo de la petición

  try {
    let resultadoPrueba = '';
    switch (tipoPrueba) {
      case 'Funcionalidad':
        resultadoPrueba = await ejecutarPruebaFuncionalidad();
        break;
      case 'Usabilidad':
        resultadoPrueba = await ejecutarPruebaUsabilidad();
        break;
      case 'Carga':
        resultadoPrueba = await ejecutarPruebaCarga();
        break;
      default:
        return res.status(400).json({ message: 'Tipo de prueba no válido' });
    }

    res.json({ message: `Prueba de ${tipoPrueba} ejecutada correctamente. Resultado: ${resultadoPrueba}` });
  } catch (error) {
    console.error('Error al ejecutar la prueba:', error);
    res.status(500).json({ message: 'Error al ejecutar la prueba' });
  }
});

// Función para ejecutar prueba de funcionalidad
async function ejecutarPruebaFuncionalidad() {
  //const driver = new selenium.Builder().forBrowser('chrome').build();
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Navega a la página de Intelaf
    await driver.get('https://www.intelaf.com');
    let searchBox = await driver.wait(until.elementLocated(By.css('div[class*="MuiInputBase-input"]')), 15000);

    // Escribir algo en el campo de búsqueda (por ejemplo, "laptop") y presionar Enter
    await searchBox.sendKeys('CELULAR SAMSUNG S24 FE 5G 8GB 256GB 6.7" 50MP DUALSIM GRIS', Key.RETURN);

    // Esperar hasta que los resultados de búsqueda sean visibles
    let resultados = await driver.wait(until.elementsLocated(By.className('product')), 15000);

    // Verificar si se obtuvieron resultados y mostrar un mensaje
    if (resultados.length > 0) {
      console.log(`Se encontraron ${resultados.length} resultados para "CELULAR SAMSUNG S24 FE 5G 8GB 256GB 6.7" 50MP DUALSIM GRIS".`);
      return `Prueba de funcionalidad completada. Se encontraron ${resultados.length} resultados.`;  
    } else {
      console.log('No se encontraron resultados para la búsqueda de "CELULAR SAMSUNG S24 FE 5G 8GB 256GB 6.7" 50MP DUALSIM GRIS".');
      return 'Prueba de funcionalidad completada. No se encontraron resultados.';
    }

  } catch (error) {
    console.error('Error durante la prueba de funcionalidad:', error);
      return `Error durante la prueba de funcionalidad: ${error.message}`;
  } finally {
    await driver.quit();
  }
}

// Función para ejecutar prueba de usabilidad
async function ejecutarPruebaUsabilidad() {
  //const driver = new selenium.Builder().forBrowser('chrome').build();
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://www.google.com.gt');
    // Aquí puedes escribir el código para la prueba de usabilidad

// Esperar a que el campo de búsqueda sea visible
let searchBox = await driver.wait(until.elementLocated(By.name('q')), 20000);
    
// Escribir en el campo de búsqueda
await searchBox.sendKeys('Prueba de usabilidad en Google');

// Esperar un poco para que el botón se habilite
await driver.sleep(2000);

// Esperar a que el botón "Voy a tener suerte" sea visible
let luckyButton = await driver.wait(until.elementLocated(By.name('btnI')), 20000);

// Verificar si el botón "Voy a tener suerte" es visible y habilitado
if (await luckyButton.isDisplayed() && await luckyButton.isEnabled()) {
  console.log('El botón "Voy a tener suerte" es interactuable.');

  // Hacer clic en el botón "Voy a tener suerte"
  await luckyButton.click();

  // Esperar a que la nueva página se cargue
  await driver.wait(until.titleIs('Prueba de usabilidad en Google - Google Search'), 20000);
  console.log('La prueba de usabilidad en el botón "Voy a tener suerte" se ejecutó correctamente.');
} else {
  console.error('El botón "Voy a tener suerte" no es interactuable.');
}
} catch (error) {
console.error('Error durante la prueba de usabilidad:', error);
  } finally {
    await driver.quit();
  }
}

// Función para ejecutar prueba de carga
async function ejecutarPruebaCarga() {
  //const driver = new selenium.Builder().forBrowser('chrome').build();
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://www.tigo.com.gt');
    console.log('Página cargada correctamente');
  }catch (error) {
    console.error('Error durante la prueba de carga:', error);
  } finally {
    await driver.quit();
    async function ejecutarSecuenciaDePruebas() {
      const retrasoSegundos = 3; // Retraso de 3 segundos entre cada prueba
    
      // Ejecutar cada prueba con un retraso
      await ejecutarPruebaCarga();
      await new Promise(resolve => setTimeout(resolve, retrasoSegundos * 10000));
    
      await ejecutarPruebaCarga();
      await new Promise(resolve => setTimeout(resolve, retrasoSegundos * 10000));
    
      await ejecutarPruebaCarga();
      await new Promise(resolve => setTimeout(resolve, retrasoSegundos * 10000));
    
      await ejecutarPruebaCarga();
      await new Promise(resolve => setTimeout(resolve, retrasoSegundos * 10000));
    
      await ejecutarPruebaCarga();
    }
  }
 
  ejecutarSecuenciaDePruebas(2);
}


/////////////////////////////////////////////////
///////Funcion para agregar datos a la tabla ambiente de pruebas//////
// Ruta para obtener todos los proyectos
app.get('/moduloPruebas', (req, res) => {
  const sql = 'SELECT * FROM registroproyectos';
  conexion.query(sql, (err, result) => {
    if (err) {
      console.error('Error al obtener proyectos:', err);
      res.status(500).json({ message: 'Error al obtener proyectos' });
      return;
    }
    res.json(result);
  });
});

// Nueva ruta para agregar datos a la tabla ambitedepruebas
app.post('/ambientePruebas_1', (req, res) => {
  const { resultadoPrueba, registroDefecto, clasificacionDefecto, proyectoId } = req.body;

  // Validar que los datos sean correctos
  if (!resultadoPrueba || !registroDefecto || !clasificacionDefecto ||!proyectoId) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  // Insertar los datos en la tabla ambitedepruebas
  const sql = `INSERT INTO ambientedepruebas (resultadoPrueba, registroDefecto, clasificacionDefecto, registroproyectos_IdRegistro)
               VALUES (?, ?, ?, ?)`;
  const values = [resultadoPrueba, registroDefecto, clasificacionDefecto, proyectoId];

  conexion.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al agregar datos al ambiente de pruebas:', err);
      res.status(500).json({ message: 'Error al agregar los datos al ambiente de pruebas' });
      return;
    }
    res.json({ message: 'Datos agregados exitosamente' });
  });
});

//////fin Funcion para agregar datos a la tabla ambiente de pruebas////
// Iniciar el servidor en el puerto 5000
app.listen(5000, () => {
  console.log('Servidor corriendo en el puerto 5000');
});