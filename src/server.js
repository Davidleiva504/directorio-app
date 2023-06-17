const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = 3009;

const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Leiva',
  password: 'Hola1212',
  database: 'directorioc',
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    return;
  }
  console.log('Conexión establecida correctamente a la base de datos');
});

app.use(bodyParser.json());
//GETS

// Ruta get contactos
app.get('/contactos', (req, res) => {
  connection.query('SELECT * FROM contactos', (error, results) => {
    if (error) {
      console.error('Error al obtener los datos de la tabla contactos:', error);
      res.status(500).json({ error: 'Error al obtener los datos de la tabla contactos' });
    } else {
      res.json(results);
    }
  });
});

// Ruta get correo
app.get('/correos', (req, res) => {
  connection.query('SELECT * FROM correos', (error, results) => {
    if (error) {
      console.error('Error al obtener los datos de la tabla correos:', error);
      res.status(500).json({ error: 'Error al obtener los datos de la tabla correos' });
    } else {
      res.json(results);
    }
  });
});

//ruta get telefono
app.get('/telefonos', (req, res) => {
  connection.query('SELECT * FROM telefonos', (error, results) => {
    if (error) {
      console.error('Error al obtener los datos de la tabla telefonos:', error);
      res.status(500).json({ error: 'Error al obtener los datos de la tabla telefonos' });
    } else {
      res.json(results);
    }
  });
});

//ruta get direcciones
app.get('/direcciones', (req, res) => {
  connection.query('SELECT * FROM direcciones', (error, results) => {
    if (error) {
      console.error('Error al obtener los datos de la tabla direcciones:', error);
      res.status(500).json({ error: 'Error al obtener los datos de la tabla direcciones' });
    } else {
      res.json(results);
    }
  });
});

// Ruta get control
app.get('/control', (req, res) => {
  connection.query('SELECT * FROM control', (error, results) => {
    if (error) {
      console.error('Error al obtener los datos de la tabla control:', error);
      res.status(500).json({ error: 'Error al obtener los datos de la tabla control' });
    } else {
      res.json(results);
    }
  });
});

// POST
// Ruta para guardar un nuevo contacto
app.post('/contactos', (req, res) => {
  const { nombres, apellido, fechaNacimiento } = req.body;
  const query = `INSERT INTO Contactos (nombres, apellido, fecha_nacimiento) VALUES (?, ?, ?)`;
  connection.query(query, [nombres, apellido, fechaNacimiento], (err, results) => {
    if (err) {
      console.error('Error al guardar el contacto: ', err);
      res.status(500).json({ message: 'Error al guardar el contacto' });
      return;
    }
    res.status(200).json({ message: 'Contacto guardado correctamente' });
  });
});

// Ruta para guardar una nueva dirección
app.post('/direcciones', (req, res) => {
  const { id_contacto: id_contacto, tipo_direccion: tipo_direccion, direccion } = req.body;
  const query = `INSERT INTO Direcciones (id_contacto, tipo_direccion, direccion) VALUES (?, ?, ?)`;
  connection.query(query, [id_contacto, tipo_direccion, direccion], (err, results) => {
    if (err) {
      console.error('Error al guardar la dirección: ', err);
      res.status(500).json({ message: 'Error al guardar la dirección' });
      return;
    }
    res.status(200).json({ message: 'Dirección guardada correctamente' });
  });
});

// Ruta para guardar un nuevo correo
app.post('/correos', (req, res) => {
  const { id_contacto: id_contacto, correo } = req.body;
  const query = `INSERT INTO Correos (id_contacto, correo) VALUES (?, ?)`;
  connection.query(query, [id_contacto, correo], (err, results) => {
    if (err) {
      console.error('Error al guardar el correo: ', err);
      res.status(500).json({ message: 'Error al guardar el correo' });
      return;
    }
    res.status(200).json({ message: 'Correo guardado correctamente' });
  });
});

// Ruta para guardar un nuevo teléfono
app.post('/telefonos', (req, res) => {
  const { id_contacto, tipo_telefono: tipo_telefono, telefono } = req.body;
  const query = `INSERT INTO Telefonos (id_contacto, tipo_telefono, telefono) VALUES (?, ?, ?)`;
  connection.query(query, [id_contacto, tipo_telefono, telefono], (err, results) => {
    if (err) {
      console.error('Error al guardar el teléfono: ', err);
      res.status(500).json({ message: 'Error al guardar el teléfono' });
      return;
    }
    res.status(200).json({ message: 'Teléfono guardado correctamente' });
  });
});

// Ruta para guardar un nuevo control
app.post('/control', (req, res) => {
  const { id_contacto: id_contacto, fecha, asunto } = req.body;
  const query = `INSERT INTO Control (id_contacto, fecha, asunto) VALUES (?, ?, ?)`;
  connection.query(query, [id_contacto, fecha, asunto], (err, results) => {
    if (err) {
      console.error('Error al guardar el control: ', err);
      res.status(500).json({ message: 'Error al guardar el control' });
      return;
    }
    res.status(200).json({ message: 'Control guardado correctamente' });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
