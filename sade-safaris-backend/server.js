const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Routes
app.use('/api/tours', require('./routes/tours'));
app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/safari-bookings', require('./routes/safariBookings'));
app.use('/api/car-bookings', require('./routes/carBookings'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/offers', require('./routes/offers'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => res.json({ message: 'Sade Safaris API is running 🦁' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));