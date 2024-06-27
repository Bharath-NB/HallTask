// roomController.js

const Room = require('../models/room');

const roomController = {
    createRoom: async (req, res) => {
        try {
            const { name, seats, amenities, price } = req.body;

            // Create new room instance
            const room = new Room({ name, seats, amenities, price });

            // Save room to database
            const createdRoom = await room.save();
            
            res.status(201).json(createdRoom);
        } catch (error) {
            console.error('Error creating room:', error);
            res.status(400).json({ error: error.message });
        }
    },

    listRooms: async (req, res) => {
        try {
            const rooms = await Room.find();
            res.json(rooms);
        } catch (error) {
            console.error('Error listing rooms:', error);
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = roomController;
