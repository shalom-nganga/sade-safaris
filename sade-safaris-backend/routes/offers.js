const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM special_offers ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { title, discount, tag, original_price, offer_price, valid_until, description, includes } = req.body;
    const [result] = await db.query(
      `INSERT INTO special_offers (title, discount, tag, original_price, offer_price, valid_until, description, includes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, discount, tag, original_price, offer_price, valid_until, description, JSON.stringify(includes)]
    );
    res.json({ id: result.insertId, message: 'Offer created successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, discount, tag, original_price, offer_price, valid_until, description, includes, status } = req.body;
    await db.query(
      `UPDATE special_offers SET title=?, discount=?, tag=?, original_price=?, offer_price=?, valid_until=?, description=?, includes=?, status=? WHERE id=?`,
      [title, discount, tag, original_price, offer_price, valid_until, description, JSON.stringify(includes), status, req.params.id]
    );
    res.json({ message: 'Offer updated successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM special_offers WHERE id = ?', [req.params.id]);
    res.json({ message: 'Offer deleted successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;