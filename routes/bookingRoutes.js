// bookingRoutes.js

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// POST /bookings - Create a new booking
router.post('/', bookingController.createBooking);

module.exports = router;
