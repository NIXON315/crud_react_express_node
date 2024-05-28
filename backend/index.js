const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'DevOps',
  password: 'Phz3bzGa@B',
  database: 'prueba_react'
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conexión a la base de datos establecida');
});

// Rutas para el CRUD

// Obtener todos los usuarios
  app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
      if (err) {
        console.error('Error al obtener usuarios:', err);
        res.status(500).send('Error al obtener usuarios');
        return;
      }
      res.json(results);
    });
  });
  
  // Crear un nuevo usuario
  app.post('/usuarios', (req, res) => {
    const { nombre, email, telefono , rol, statususer} = req.body;
    //console.log(nombre+"-"+email+"-"+telefono+"-"+rol+"-"+statususer);
    if (!nombre || !email || !telefono || !rol || !statususer) {
      res.status(400).send('Por favor proporciona nombre, email y telefono');
      return;
    }
  
    db.query('INSERT INTO usuarios (nombre, email, telefono, user_rolid, user_statusid) VALUES (?, ?, ?, ?, ?)', [nombre, email, telefono, rol, statususer], (err, result) => {
      if (err) {
        console.error('Error al crear usuario:', err);
        res.status(500).send('Error al crear usuario');
        return;
      }
      res.status(201).send('Usuario creado exitosamente');
    });
  });
  
  // Actualizar un usuario
  app.put('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, email, telefono } = req.body;
    if (!nombre || !email || !telefono) {
      res.status(400).send('Por favor proporciona nombre, email y telefono');
      return;
    }
  
    db.query('UPDATE usuarios SET nombre = ?, email = ?, telefono = ? WHERE id = ?', [nombre, email, telefono, id], (err, result) => {
      if (err) {
        console.error('Error al actualizar usuario:', err);
        res.status(500).send('Error al actualizar usuario');
        return;
      }
      res.send('Usuario actualizado exitosamente');
    });
  });
  
  // Eliminar un usuario
  app.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;
  
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar usuario:', err);
        res.status(500).send('Error al eliminar usuario');
        return;
      }
      res.send('Usuario eliminado exitosamente');
    });
  });

app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});