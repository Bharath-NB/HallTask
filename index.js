// index.js

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { MONGODB_URI, PORT } = require('./utils/config');
const app = require('./app');

console.log('Connecting to MongoDB...');

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}: http://localhost:${PORT}/`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err.message);
    });
