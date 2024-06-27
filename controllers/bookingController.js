// bookingController.js

const Booking = require('../models/booking');
const Room = require('../models/room');
const { v4: uuidv4 } = require('uuid');

const bookingController = {
    createBooking: async (req, res) => {
        try {
            const { room_name, customer_name, date, start_time, end_time } = req.body;

            // Check room availability
            const existingBooking = await Booking.findOne({
                room_name,
                date,
                $or: [
                    { start_time: { $lt: end_time } },
                    { end_time: { $gt: start_time } }
                ]
            });

            if (existingBooking) {
                return res.status(400).json({ message: 'Room is already booked during this time.' });
            }

            // Create new booking instance
            const booking = new Booking({
                room_name,
                customer_name,
                date,
                start_time,
                end_time,
                booking_id: uuidv4()
            });

            // Save booking to database
            const createdBooking = await booking.save();
            res.status(201).json(createdBooking);
        } catch (error) {
            console.error('Error creating booking:', error);
            res.status(400).json({ error: error.message });
        }
    },

    listRooms: async (req, res) => {
        try {
            const rooms = await Room.find();
            const bookings = await Booking.find();

            const roomsWithBookings = rooms.map(room => {
                const roomBookings = bookings.filter(booking => booking.room_name === room.name);
                return {
                    roomName: room.name,
                    bookings: roomBookings.map(b => ({
                        customerName: b.customer_name,
                        date: b.date,
                        startTime: b.start_time,
                        endTime: b.end_time,
                        bookingStatus: b.booking_status
                    }))
                };
            });

            res.json(roomsWithBookings);
        } catch (error) {
            console.error('Error listing rooms with bookings:', error);
            res.status(400).json({ error: error.message });
        }
    },

    listCustomers: async (req, res) => {
        try {
            const bookings = await Booking.find();
            const customers = bookings.map(booking => ({
                customerName: booking.customer_name,
                roomName: booking.room_name,
                date: booking.date,
                startTime: booking.start_time,
                endTime: booking.end_time
            }));

            res.json(customers);
        } catch (error) {
            console.error('Error listing customers with bookings:', error);
            res.status(400).json({ error: error.message });
        }
    },

    countCustomerBookings: async (req, res) => {
        try {
            const bookings = await Booking.find();
            const customerBookings = bookings.reduce((acc, booking) => {
                const key = `${booking.customer_name}-${booking.room_name}`;
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push({
                    customerName: booking.customer_name,
                    roomName: booking.room_name,
                    date: booking.date,
                    startTime: booking.start_time,
                    endTime: booking.end_time,
                    bookingId: booking.booking_id,
                    bookingDate: booking.booking_date,
                    bookingStatus: booking.booking_status
                });
                return acc;
            }, {});

            const result = Object.values(customerBookings).map(bookings => ({
                customerName: bookings[0].customerName,
                roomName: bookings[0].roomName,
                bookings: bookings
            }));

            res.json(result);
        } catch (error) {
            console.error('Error counting customer bookings:', error);
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = bookingController;
