const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM car_bookings ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, vehicle_id, vehicle_name, pickup_date, return_date, days, with_driver, pickup_location, amount, notes } = req.body;
    const ref = 'CB' + Date.now().toString().slice(-6);
    const [result] = await db.query(
      `INSERT INTO car_bookings (booking_ref, name, email, phone, vehicle_id, vehicle_name, pickup_date, return_date, days, with_driver, pickup_location, amount, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [ref, name, email, phone, vehicle_id, vehicle_name, pickup_date, return_date, days, with_driver, pickup_location, amount, notes]
    );
    res.json({ id: result.insertId, booking_ref: ref, message: 'Booking created successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    await db.query('UPDATE car_bookings SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ message: 'Status updated successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM car_bookings WHERE id = ?', [req.params.id]);
    res.json({ message: 'Booking deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;