const User = require('../models/User');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register User
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required',
            });
        }

        // Check if user already exists (optional)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'User already exists',
            });
        }

        const newUser = await User.create({
            name,
            email,
            password
        });

        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};




// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Login body:', req.body);

        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).send({
                success: false,
                message: 'Invalid email or password',
            });
        }

        const token = JWT.sign(
            { userId: user._id },
            'rnw4',
            { expiresIn: '1h' }
        );

        return res.status(200).send({
            success: true,
            message: 'Login successful',
            token
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: 'Server error'
        });
    }
};


module.exports = {
    register,
    loginUser
};
