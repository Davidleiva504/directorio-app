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
// Ruta POST contacto
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

// Ruta POST dirección
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

// Ruta POST correo
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

// Ruta POST teléfono
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

// Ruta POST control
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

// PUT
 
//ruta PUT contactos
app.put('/contactos/:id', (req, res) => {
  const id = req.params.id;
  const { nombre: nombres, apellido, telefono } = req.body;

  
  db.query('UPDATE contactos SET nombre = ?, apellido = ?, telefono = ? WHERE id = ?',
    [nombres, apellido, telefono, id],
    (error, result) => {
      if (error) {
        console.error('Error al actualizar el contacto:', error);
        res.status(500).send('Error al actualizar el contacto');
      } else {
        res.send('Contacto actualizado correctamente');
      }
    }
  );
});

//ruta PUT correos
app.put('/correos/:id', (req, res) => {
  const id = req.params.id;
  const { correo } = req.body;

  db.query('UPDATE correos SET correo = ? WHERE id = ?',
    [correo, id],
    (error, result) => {
      if (error) {
        console.error('Error al actualizar el correo:', error);
        res.status(500).send('Error al actualizar el correo');
      } else {
        res.send('Correo actualizado correctamente');
      }
    }
  );
});

//ruta PUT para Telefonos
app.put('/telefonos/:id', (req, res) => {
  const id = req.params.id;
  const { telefono, tipo: tipo_telefono } = req.body;

  db.query('UPDATE telefonos SET telefono = ?, tipo = ? WHERE id = ?',
    [telefono, tipo_telefono, id],
    (error, result) => {
      if (error) {
        console.error('Error al actualizar el teléfono:', error);
        res.status(500).send('Error al actualizar el teléfono');
      } else {
        res.send('Teléfono actualizado correctamente');
      }
    }
  );
});

//ruta PUT para direcciones
app.put('/direcciones/:id', (req, res) => {
  const id = req.params.id;
  const { tipo: tipo_direccion, direccion } = req.body;

  db.query('UPDATE direcciones SET tipo = ?, direccion = ? WHERE id = ?',
    [tipo_direccion, direccion, id],
    (error, result) => {
      if (error) {
        console.error('Error al actualizar la dirección:', error);
        res.status(500).send('Error al actualizar la dirección');
      } else {
        res.send('Dirección actualizada correctamente');
      }
    }
  );
});

//ruta PUT control
app.put('/control/:id', (req, res) => {
  const id = req.params.id;
  const { fecha, asunto } = req.body;

  db.query('UPDATE control SET fecha = ?, asunto = ? WHERE id = ?',
    [fecha, asunto, id],
    (error, result) => {
      if (error) {
        console.error('Error al actualizar el control:', error);
        res.status(500).send('Error al actualizar el control');
      } else {
        res.send('Control actualizado correctamente');
      }
    }
  );
});


// DELETE

//Ruta Delete Contactos
app.delete('/contactos/:id', (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM contactos WHERE id = ?', [id], (error, result) => {
    if (error) {
      console.error('Error al eliminar el contacto:', error);
      res.status(500).send('Error al eliminar el contacto');
    } else {
      res.send('Contacto eliminado correctamente');
    }
  });
});

//Ruta Delete Correo
app.delete('/correos/:id', (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM correos WHERE id = ?', [id], (error, result) => {
    if (error) {
      console.error('Error al eliminar el correo:', error);
      res.status(500).send('Error al eliminar el correo');
    } else {
      res.send('Correo eliminado correctamente');
    }
  });
});

//Ruta Delete Telefonos
app.delete('/direcciones/:id', (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM direcciones WHERE id = ?', [id], (error, result) => {
    if (error) {
      console.error('Error al eliminar la dirección:', error);
      res.status(500).send('Error al eliminar la dirección');
    } else {
      res.send('Dirección eliminada correctamente');
    }
  });
});

//Ruta Delete Control
app.delete('/control/:id', (req, res) => {
  const id = req.params.id;
  
  db.query('DELETE FROM control WHERE id = ?', [id], (error, result) => {
    if (error) {
      console.error('Error al eliminar el control:', error);
      res.status(500).send('Error al eliminar el control');
    } else {
      res.send('Control eliminado correctamente');
    }
  });
});




// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
