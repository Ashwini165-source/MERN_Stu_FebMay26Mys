const posts = require('../data/posts');
const { v4: uuid } = require('uuid');

exports.createPost = (req, res) => {
  const post = {
    id: uuid(),
    content: req.body.content,
    author: req.user.id,
    likes: [],
    comments: []
  };

  posts.push(post);
  res.json(post);
};

exports.getFeed = (req, res) => {
  res.json(posts);
};

exports.likePost = (req, res) => {
  const post = posts.find(p => p.id === req.params.id);

  if (!post.likes.includes(req.user.id)) {
    post.likes.push(req.user.id);
  }

  res.json(post);
};