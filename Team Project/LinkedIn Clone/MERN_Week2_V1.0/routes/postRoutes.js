const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createPost, getFeed, likePost } = require('../controllers/postController');

router.post('/', auth, createPost);
router.get('/feed', auth, getFeed);
router.post('/:id/like', auth, likePost);

module.exports = router;