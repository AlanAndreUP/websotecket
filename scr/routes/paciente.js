const express = require('express');
const router = express.Router();
const Pacientes = require('../models/pacienteSchema');
const jwt = require('jsonwebtoken');
const jwtSecretKey = 'XDEJUEMPLO';
const Citas = require('../models/citaSchema');
function createToken(user) {
  const payload = {
    userId: user._id,
    email: user.correo,
  };


  const expiration = '1h';

  return jwt.sign(payload, jwtSecretKey, { expiresIn: expiration });
}
router.post('/', async (req, res) => {
  const newItemData = req.body;

  try {
    const newItem = new Pacientes(newItemData);
    const result = await newItem.save();

    if (result) {
      const token = createToken(result);
      res.status(201).json({ token, result });
    } else {
      res.status(500).json({ error: 'Error en la inserción de datos' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, jwtSecretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token is not valid' });
    }
    req.user = user;
    next();
  });
}
router.post('/login', async (req, res) => {
  const { correo, telefono, password } = req.body;

  try {
    const user = await Pacientes.findOne({
      $or: [{ correo: correo }, { telefono: telefono }],
    });

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    
    const token = createToken(user);
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
router.get('/:_id', authenticateToken, async (req, res) => {
  const itemId = req.params._id; 

  try {
    const item = await Pacientes.findOne({ _id: itemId });

    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Objeto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const items = await Pacientes.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/order', async (req, res) => {
  try {
      const items = await Pacientes.aggregate([
          {
              $match: { 'citas.1': { $exists: true } } // Filtra solo pacientes con más de una cita
          },
          {
              $sort: { 'nombre': 1 } // Ordena alfabéticamente por nombre
          }
      ]);

      res.json(items);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});


router.post('/agregarCita', async (req, res) => {
  const { idPaciente, datosCita } = req.body;

  try {
      const nuevaCita = new Citas(datosCita);
      const citaGuardada = await nuevaCita.save();

      await Pacientes.findByIdAndUpdate(
          idPaciente,
          { $push: { citas: citaGuardada._id } },
          { new: true }
      );

      res.status(201).json(citaGuardada);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
  }
});

router.put('/:_id', async (req, res) => {
  const itemId = req.params.email;
  const updatedItemData = req.body;

  try {
    const result = await Pacientes.findOneAndUpdate({ email: itemId }, updatedItemData, { new: true });

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: 'Objeto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/RegistroUser', async (req, res) => {
  const newItemData = req.body;

  const existingItem = await Pacientes.findOne({
    $or: [{ correo: newItemData.correo }, { telefono: newItemData.telefono }],
  });

  if (existingItem) {
    return res.status(400).json({ error: 'Correo o número de teléfono ya existen' });
  }

  try {
    const newItem = new Pacientes(newItemData);
    const result = await newItem.save();

    if (result) {
        const token = createToken(result);
      res.status(201).json({ token, result });
    } else {
      res.status(500).json({ error: 'Error en la inserción de datos' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
router.delete('/:_id', async (req, res) => {
  const itemId = req.params.email;

  try {
    const result = await Pacientes.findOneAndRemove({ email: itemId });

    if (result) {
      res.json({ message: 'El objeto fue eliminado' });
    } else {
      res.status(404).json({ error: 'Objeto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
