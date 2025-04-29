const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserBy, addUser } = require('../utils/fileUtils');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        let user = findUserBy('email', email);
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = {
            id: uuidv4(), // Generate unique ID
            name,
            email,
            password: hashedPassword,
            workouts: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        addUser(user);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = findUserBy('email', email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
