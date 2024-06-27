// booking.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    room_name: { type: String, required: true },
    customer_name: { type: String, required: true },
    date: { type: Date, required: true },
    start_time: { type: Number, required: true },
    end_time: { type: Number, required: true },
    booking_id: { type: String, required: true },
    booking_date: { type: Date, default: Date.now },
    booking_status: { type: String, default: 'confirmed' }
});

module.exports = mongoose.model('Booking', bookingSchema);
