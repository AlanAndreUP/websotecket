const express = require('express');
const router = express.Router();
const Citas = require('../models/citaSchema');

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Citas.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single item by idUser
router.get('/:idUser', async (req, res) => {
  const itemId = req.params.idUser;
  
  try {
    const item = await Citas.findOne({ idUser: itemId });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Objeto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/all/:idUser', async (req, res) => {
  const idUser = req.params.idUser;

  try {
    const items = await Citas.find({ idUser: idUser });
    if (items && items.length > 0) {
      res.json(items);
    } else {
      res.status(404).json({ message: 'No se encontraron citas para este usuario' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Create a new item
router.post('/', async (req, res) => {
  const newItemData = req.body;

  try {
    const newItem = new Citas(newItemData);
    const result = await newItem.save();

    if (result) {
      res.status(201).json(result);
    } else {
      res.status(500).json({ error: 'Error en la inserción de datos' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Update an item by idUser
router.put('/:_id', async (req, res) => {
  const itemId = req.params._id;
  const updatedItemData = req.body;

  try {
    const result = await Citas.findOneAndUpdate({ _id: itemId }, updatedItemData, { new: true });

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: 'Objeto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an item by idUser
router.delete('/:_id', async (req, res) => {
  const itemId = req.params._id;

  try {
    const result = await Citas.findOneAndRemove({ _id: itemId });

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
