const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authModel = require('../Models/authSchema.js');
require('dotenv').config();
const jwt_psswd = process.env.jwt_psswd;
router.post('/manualSignup', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Checkingif the username is already taken
        const existingUser = await authModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating a new user
        const newUser = new authModel({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during signup', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Signin route
router.post('/manualSignin', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user exists
        const user = await authModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare the entered password with the stored password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Create and sign a JWT token
        const token = jwt.sign({ userId: user._id }, jwt_psswd);

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during signin', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = router

