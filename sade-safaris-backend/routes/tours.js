const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all tours
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tours WHERE active = 1 ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET single tour
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tours WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Tour not found' });
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST create tour
router.post('/', async (req, res) => {
  try {
    const { title, days, price, location, category, rating, img, badge, difficulty, group_size, description, highlights, includes, excludes, itinerary, images } = req.body;
    const [result] = await db.query(
      `INSERT INTO tours (title, days, price, location, category, rating, img, badge, difficulty, group_size, description, highlights, includes, excludes, itinerary, images)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, days, price, location, category, rating, img, badge, difficulty, group_size, description,
       JSON.stringify(highlights), JSON.stringify(includes), JSON.stringify(excludes),
       JSON.stringify(itinerary), JSON.stringify(images)]
    );
    res.json({ id: result.insertId, message: 'Tour created successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PUT update tour
router.put('/:id', async (req, res) => {
  try {
    const { title, days, price, location, category, rating, img, badge, difficulty, group_size, description, highlights, includes, excludes, itinerary, images, active } = req.body;
    await db.query(
      `UPDATE tours SET title=?, days=?, price=?, location=?, category=?, rating=?, img=?, badge=?, difficulty=?, group_size=?, description=?, highlights=?, includes=?, excludes=?, itinerary=?, images=?, active=? WHERE id=?`,
      [title, days, price, location, category, rating, img, badge, difficulty, group_size, description,
       JSON.stringify(highlights), JSON.stringify(includes), JSON.stringify(excludes),
       JSON.stringify(itinerary), JSON.stringify(images), active, req.params.id]
    );
    res.json({ message: 'Tour updated successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE tour (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    await db.query('UPDATE tours SET active = 0 WHERE id = ?', [req.params.id]);
    res.json({ message: 'Tour deleted successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;