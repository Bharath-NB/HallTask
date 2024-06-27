// roomRoutes.js

const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// POST /rooms - Create a new room
router.post('/', roomController.createRoom);

// GET /rooms - List all rooms
router.get('/', roomController.listRooms);

module.exports = router;
