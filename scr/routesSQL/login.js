const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../app'); // Importa la conexión a la base de datos
const app = express();
const port = 3000;
const router = express.Router();
// Middleware para analizar datos JSON
app.use(bodyParser.json());
app.get('/usuarios', (req, res) => {
    // Consultar todos los usuarios
    connection.query('SELECT * FROM Usuario', (error, results) => {
      if (error) {
        console.error('Error al consultar usuarios:', error);
        res.status(500).json({ error: 'Error al consultar usuarios' });
        return;
      }
      res.status(200).json(results);
    });
  });
  
  app.get('/usuarios/:id', (req, res) => {
    const usuarioId = req.params.id;
    // Consultar un usuario por ID
    connection.query('SELECT * FROM Usuario WHERE ID = ?', [usuarioId], (error, results) => {
      if (error) {
        console.error('Error al consultar el usuario:', error);
        res.status(500).json({ error: 'Error al consultar el usuario' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Usuario no encontrado' });
      } else {
        res.status(200).json(results[0]);
      }
    });
  });
  
  app.post('/usuarios', (req, res) => {
    const nuevoUsuario = req.body;
    // Insertar un nuevo usuario
    connection.query('INSERT INTO Usuario SET ?', nuevoUsuario, (error, result) => {
      if (error) {
        console.error('Error al insertar un nuevo usuario:', error);
        res.status(500).json({ error: 'Error al insertar un nuevo usuario' });
        return;
      }
      res.status(201).json({ message: 'Usuario creado exitosamente' });
    });
  });
  
  app.put('/usuarios/:id', (req, res) => {
    const usuarioId = req.params.id;
    const usuarioActualizado = req.body;
    // Actualizar un usuario por ID
    connection.query('UPDATE Usuario SET ? WHERE ID = ?', [usuarioActualizado, usuarioId], (error, result) => {
      if (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
        return;
      }
      res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    });
  });
  
  app.delete('/usuarios/:id', (req, res) => {
    const usuarioId = req.params.id;
    // Eliminar un usuario por ID
    connection.query('DELETE FROM Usuario WHERE ID = ?', [usuarioId], (error, result) => {
      if (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
        return;
      }
      res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    });
  });
  module.exports = router;