const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


let users = [];


// POST /auth/register
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        return res.status(400).json({
            error: "All fields are required"
        });
    }

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        return res.status(400).json({
            error: "User already exists"
        });
    }

    // Create user
    const newUser = {
        id: users.length + 1,
        name,
        email,
        password
    };

    users.push(newUser);

    res.status(201).json({
        message: "User registered successfully"
    });
});


// POST /auth/login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return res.status(400).json({
            error: "Email and password required"
        });
    }

    // Check user
    const user = users.find(
        user => user.email === email && user.password === password
    );

    if (!user) {
        return res.status(401).json({
            error: "Invalid credentials"
        });
    }

    // Generate JWT Token
    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email
        },
        "secretkey", 
        { expiresIn: "1h" }
    );

    //  Send response with token
    res.status(200).json({
        message: "Login successful",
        token: token
    });
});

module.exports = router;