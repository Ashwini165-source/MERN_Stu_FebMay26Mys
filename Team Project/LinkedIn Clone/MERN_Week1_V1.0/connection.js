const eventBus = require("./events");

let requests = [];
let connections = [];

function sendRequest(sender, receiverId, users) {
  return new Promise((resolve, reject) => {

    if (!sender) return reject("Login required");

    if (sender.id === receiverId)
      return reject("Cannot connect to yourself");

    const receiver = users.find(u => u.id === receiverId);
    if (!receiver) return reject("User not found");

    const alreadyConnected = connections.find(
      c => (c.a === sender.id && c.b === receiverId) ||
           (c.a === receiverId && c.b === sender.id)
    );

    if (alreadyConnected) return reject("Already connected");

    const existingReq = requests.find(
      r => r.senderId === sender.id && r.receiverId === receiverId
    );

    if (existingReq) return reject("Request already sent");

    const req = {
      senderId: sender.id,
      receiverId,
      status: "pending",
      timestamp: new Date()
    };

    requests.push(req);
    eventBus.emit("connectionRequested", req);

    resolve(req);
  });
}

function viewRequests(user) {
  return requests.filter(r => r.receiverId === user.id && r.status === "pending");
}

async function respondRequest(user, senderId, action) {
  try {
    const req = requests.find(
      r => r.senderId === senderId && r.receiverId === user.id
    );

    if (!req) throw "Request not found";

    if (action === "accept") {
      req.status = "accepted";
      connections.push({ a: senderId, b: user.id });
      eventBus.emit("connectionAccepted");
    } else {
      req.status = "rejected";
      eventBus.emit("connectionRejected");
    }

  } catch (err) {
    eventBus.emit("operationFailed", err);
  }
}

function getConnections(user) {
  return connections
    .filter(c => c.a === user.id || c.b === user.id)
    .map(c => (c.a === user.id ? c.b : c.a));
}

module.exports = {
  sendRequest,
  viewRequests,
  respondRequest,
  getConnections
};