const express = require('express');
const app = express();

app.use(express.json());

/* =========================
   MEMORY STORAGE
========================= */
let users = [];
let posts = [];
let requests = [];
let connections = [];

/* =========================
   USER ID COUNTER
========================= */
let userIdCounter = 1;
let postIdCounter = 1;

/* =========================
   REGISTER
========================= */
app.post('/auth/register', (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
    }

    const newUser = {
        id: userIdCounter++,
        name,
        email,
        password,
        profile: {}
    };

    users.push(newUser);

    res.json({
        message: "User registered successfully",
        user: newUser
    });
});

/* =========================
   LOGIN
========================= */
app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({
        message: "Login successful",
        userId: user.id
    });
});

/* =========================
   PROFILE UPDATE
========================= */
app.put('/profile', (req, res) => {
    const { userId, headline, skills } = req.body;

    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    user.profile = { headline, skills };

    res.json({
        message: "Profile updated",
        profile: user.profile
    });
});

/* =========================
   SEND CONNECTION REQUEST
========================= */
app.post('/connections/request/:id', (req, res) => {
    const senderId = req.body.userId;
    const receiverId = parseInt(req.params.id);

    if (senderId === receiverId) {
        return res.status(400).json({ error: "Cannot connect to yourself" });
    }

    const existing = requests.find(
        r => r.senderId === senderId && r.receiverId === receiverId
    );

    if (existing) {
        return res.status(400).json({ error: "Request already sent" });
    }

    requests.push({
        senderId,
        receiverId,
        status: "pending"
    });

    res.json({
        message: "Connection request sent"
    });
});

/* =========================
   VIEW REQUESTS
========================= */
app.get('/connections/requests/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);

    const pending = requests.filter(
        r => r.receiverId === userId && r.status === "pending"
    );

    res.json({
        requests: pending
    });
});

/* =========================
   ACCEPT REQUEST
========================= */
app.put('/connections/accept', (req, res) => {
    const { senderId, receiverId } = req.body;

    const request = requests.find(
        r => r.senderId === senderId && r.receiverId === receiverId
    );

    if (!request) {
        return res.status(404).json({ error: "Request not found" });
    }

    request.status = "accepted";

    connections.push({ senderId, receiverId });

    res.json({ message: "Connection accepted" });
});

/* =========================
   REJECT REQUEST
========================= */
app.put('/connections/reject', (req, res) => {
    const { senderId, receiverId } = req.body;

    const request = requests.find(
        r => r.senderId === senderId && r.receiverId === receiverId
    );

    if (!request) {
        return res.status(404).json({ error: "Request not found" });
    }

    request.status = "rejected";

    res.json({ message: "Connection rejected" });
});

/* =========================
   CREATE POST
========================= */
app.post('/posts', (req, res) => {
    const { userId, content } = req.body;

    const post = {
        id: postIdCounter++,
        userId,
        content,
        likes: [],
        comments: []
    };

    posts.push(post);

    res.json({
        message: "Post created",
        post
    });
});

/* =========================
   FEED
========================= */
app.get('/posts/feed', (req, res) => {
    res.json({ posts });
});

/* =========================
   LIKE POST
========================= */
app.post('/posts/:id/like', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);

    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }

    if (!post.likes.includes(req.body.userId)) {
        post.likes.push(req.body.userId);
    }

    res.json(post);
});

/* =========================
   COMMENT POST
========================= */
app.post('/posts/:id/comment', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);

    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }

    post.comments.push({
        userId: req.body.userId,
        text: req.body.text
    });

    res.json(post);
});

/* =========================
   START SERVER
========================= */
app.listen(3000, () => {
    console.log("Server running on port 3000");
});