const express = require('express');
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Import and mount room routes
const roomRoutes = require('./routes/roomRoutes');
app.use('/rooms', roomRoutes);

// Import and mount booking routes
const bookingRoutes = require('./routes/bookingRoutes');
app.use('/bookings', bookingRoutes);

// Other middleware and route setups can be added here if needed

module.exports = app;
