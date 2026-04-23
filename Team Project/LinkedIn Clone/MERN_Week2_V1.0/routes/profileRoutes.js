const express = require('express');
const router = express.Router();

console.log("Profile routes loaded");


let profile = {};


router.get('/me', (req, res) => {
    res.status(200).json({
        message: "Profile fetched",
        data: profile
    });
});


router.put('/', (req, res) => {
    console.log("PUT /profile hit");

    const { headline, skills, experience, education } = req.body;

    // Validation
    if (!headline) {
        return res.status(400).json({
            error: "Headline is required"
        });
    }

    // Update profile
    profile = {
        headline,
        skills: skills || [],
        experience: experience || [],
        education: education || []
    };

    res.status(200).json({
        message: "Profile updated successfully",
        data: profile
    });
});


router.get('/:id', (req, res) => {
    res.status(200).json({
        message: `Profile for user ${req.params.id}`,
        data: profile
    });
});

module.exports = router;