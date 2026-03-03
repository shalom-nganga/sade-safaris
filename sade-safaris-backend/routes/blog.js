const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM blog_posts WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Post not found' });
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { title, category, excerpt, content, img, author, read_time, tags, status } = req.body;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const published_at = status === 'Published' ? new Date() : null;
    const [result] = await db.query(
      `INSERT INTO blog_posts (title, slug, category, excerpt, content, img, author, read_time, tags, status, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, slug, category, excerpt, content, img, author, read_time, JSON.stringify(tags), status, published_at]
    );
    res.json({ id: result.insertId, message: 'Post created successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, category, excerpt, content, img, author, read_time, tags, status } = req.body;
    const published_at = status === 'Published' ? new Date() : null;
    await db.query(
      `UPDATE blog_posts SET title=?, category=?, excerpt=?, content=?, img=?, author=?, read_time=?, tags=?, status=?, published_at=? WHERE id=?`,
      [title, category, excerpt, content, img, author, read_time, JSON.stringify(tags), status, published_at, req.params.id]
    );
    res.json({ message: 'Post updated successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM blog_posts WHERE id = ?', [req.params.id]);
    res.json({ message: 'Post deleted successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;