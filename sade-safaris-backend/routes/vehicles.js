const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM vehicles ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM vehicles WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Vehicle not found' });
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { name, type, seats, transmission, fuel, price_per_day, img, images, badge, badge_color, available, features, description, specs } = req.body;
    const [result] = await db.query(
      `INSERT INTO vehicles (name, type, seats, transmission, fuel, price_per_day, img, images, badge, badge_color, available, features, description, specs)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, type, seats, transmission, fuel, price_per_day, img,
       JSON.stringify(images), badge, badge_color, available,
       JSON.stringify(features), description, JSON.stringify(specs)]
    );
    res.json({ id: result.insertId, message: 'Vehicle created successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, type, seats, transmission, fuel, price_per_day, img, images, badge, badge_color, available, features, description, specs } = req.body;
    await db.query(
      `UPDATE vehicles SET name=?, type=?, seats=?, transmission=?, fuel=?, price_per_day=?, img=?, images=?, badge=?, badge_color=?, available=?, features=?, description=?, specs=? WHERE id=?`,
      [name, type, seats, transmission, fuel, price_per_day, img,
       JSON.stringify(images), badge, badge_color, available,
       JSON.stringify(features), description, JSON.stringify(specs), req.params.id]
    );
    res.json({ message: 'Vehicle updated successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM vehicles WHERE id = ?', [req.params.id]);
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;