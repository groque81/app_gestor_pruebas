const mysql = require('mysql2');

const conexion = mysql.createConnection({
  host: 'dbgestor.mysql.database.azure.com', 
  user: 'roque', // 
  password: 'R0que81#', 
  database: 'gestionproyectos'
});

// Conectarse a la base de datos
conexion.connect((err) => {
if (err) {
  console.error('Error no hay conexion a la BD', err);
  return;
}
console.log('Conexion exitosa a la base de datos MySQL');
});

// Exportar la conexión para usarla en otros archivos
module.exports = conexion;

/*const conexion = mysql.createConnection({
    host: 'localhost', 
    user: 'root', // 
    password: 'R0que81#', 
    database: 'gestionproyectos'
});

// Conectarse a la base de datos
conexion.connect((err) => {
  if (err) {
    console.error('Error no hay conexion a la BD', err);
    return;
  }
  console.log('Conexion exitosa a la base de datos MySQL');
});

// Exportar la conexión para usarla en otros archivos
module.exports = conexion;*/