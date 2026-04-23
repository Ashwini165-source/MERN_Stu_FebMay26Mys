const express = require('express');
const router = express.Router();

// Dummy storage
let connectionRequests = [];
let connections = [];

// ✅ SEND CONNECTION REQUEST
// POST /connections/request/:userId
router.post('/request/:userId', (req, res) => {
    const senderId = 1; // dummy logged-in user
    const receiverId = parseInt(req.params.userId);

    // ❌ Prevent self request
    if (senderId === receiverId) {
        return res.status(400).json({
            error: "You cannot connect with yourself"
        });
    }

    // ❌ Check duplicate request
    const existingRequest = connectionRequests.find(
        req =>
            req.senderId === senderId &&
            req.receiverId === receiverId &&
            req.status === "pending"
    );

    if (existingRequest) {
        return res.status(400).json({
            error: "Connection request already sent"
        });
    }

    // ❌ Check already connected
    const alreadyConnected = connections.find(
        conn =>
            (conn.user1 === senderId && conn.user2 === receiverId) ||
            (conn.user1 === receiverId && conn.user2 === senderId)
    );

    if (alreadyConnected) {
        return res.status(400).json({
            error: "Already connected"
        });
    }

    // ✅ Create request
    const newRequest = {
        id: connectionRequests.length + 1,
        senderId,
        receiverId,
        status: "pending"
    };

    connectionRequests.push(newRequest);

    res.status(200).json({
        message: "Connection request sent",
        data: newRequest
    });
});


// ✅ VIEW PENDING REQUESTS
// GET /connections/requests
router.get('/requests', (req, res) => {
    const userId = 2; // dummy logged-in user

    const pendingRequests = connectionRequests.filter(
        req => req.receiverId === userId && req.status === "pending"
    );

    res.status(200).json({
        message: "Pending requests",
        data: pendingRequests
    });
});


// ✅ ACCEPT REQUEST
// PUT /connections/accept/:requestId
router.put('/accept/:requestId', (req, res) => {
    const requestId = parseInt(req.params.requestId);

    const request = connectionRequests.find(r => r.id === requestId);

    if (!request) {
        return res.status(404).json({
            error: "Request not found"
        });
    }

    request.status = "accepted";

    // Add to connections
    connections.push({
        user1: request.senderId,
        user2: request.receiverId
    });

    res.status(200).json({
        message: "Connection accepted",
        data: request
    });
});


// ✅ REJECT REQUEST
// PUT /connections/reject/:requestId
router.put('/reject/:requestId', (req, res) => {
    const requestId = parseInt(req.params.requestId);

    const request = connectionRequests.find(r => r.id === requestId);

    if (!request) {
        return res.status(404).json({
            error: "Request not found"
        });
    }

    request.status = "rejected";

    res.status(200).json({
        message: "Connection rejected",
        data: request
    });
});


// ✅ GET CONNECTIONS
// GET /connections
router.get('/', (req, res) => {
    const userId = 1; // dummy logged-in user

    const userConnections = connections.filter(
        conn => conn.user1 === userId || conn.user2 === userId
    );

    res.status(200).json({
        message: "Your connections",
        data: userConnections
    });
});

module.exports = router;