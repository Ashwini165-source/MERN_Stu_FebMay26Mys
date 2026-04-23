const connections = require('../data/connections');
const { v4: uuid } = require('uuid');

exports.sendRequest = (req, res) => {
  const { userId } = req.params;

  if (userId === req.user.id)
    return res.status(400).json({ error: "Self request not allowed" });

  const request = {
    id: uuid(),
    from: req.user.id,
    to: userId,
    status: "pending"
  };

  connections.push(request);
  res.json(request);
};

exports.acceptRequest = (req, res) => {
  const reqId = req.params.requestId;
  const request = connections.find(r => r.id === reqId);

  request.status = "accepted";
  res.json(request);
};

exports.getConnections = (req, res) => {
  const userConnections = connections.filter(
    c => c.from === req.user.id || c.to === req.user.id
  );
  res.json(userConnections);
};