const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message, service, type } = req.body;
    const [result] = await db.query(
      `INSERT INTO messages (name, email, phone, subject, message, service, type) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone, subject, message, service, type || 'General']
    );
    res.json({ id: result.insertId, message: 'Message sent successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id/read', async (req, res) => {
  try {
    await db.query('UPDATE messages SET status = "Read" WHERE id = ?', [req.params.id]);
    res.json({ message: 'Marked as read' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id/reply', async (req, res) => {
  try {
    const { reply } = req.body;
    await db.query(
      'UPDATE messages SET reply = ?, status = "Replied", replied_at = NOW() WHERE id = ?',
      [reply, req.params.id]
    );
    res.json({ message: 'Reply saved successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM messages WHERE id = ?', [req.params.id]);
    res.json({ message: 'Message deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;