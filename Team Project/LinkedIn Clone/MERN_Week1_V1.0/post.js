const eventBus = require("./events");

let posts = [];
let postId = 1;

async function createPost(user, content) {
  try {
    if (!user) throw "Login required";

    const post = {
      id: postId++,
      authorId: user.id,
      content,
      timestamp: new Date(),
      likes: [],
      comments: []
    };

    posts.push(post);
    eventBus.emit("postCreated");
    return post;

  } catch (err) {
    eventBus.emit("operationFailed", err);
  }
}

function getFeed(user, connections) {
  const feed = posts.filter(p => connections.includes(p.authorId));
  eventBus.emit("feedViewed");
  return feed;
}

function likePost(user, postId) {
  const post = posts.find(p => p.id === postId);
  if (!post) return eventBus.emit("operationFailed", "Post not found");

  if (post.likes.includes(user.id))
    return eventBus.emit("operationFailed", "Already liked");

  post.likes.push(user.id);
  eventBus.emit("postLiked");
}

function commentPost(user, postId, text) {
  const post = posts.find(p => p.id === postId);
  if (!post) return eventBus.emit("operationFailed", "Post not found");

  post.comments.push({
    userId: user.id,
    text
  });

  eventBus.emit("commentAdded");
}

module.exports = {
  createPost,
  getFeed,
  likePost,
  commentPost
};