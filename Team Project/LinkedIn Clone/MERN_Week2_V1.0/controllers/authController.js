const jwt = require('jsonwebtoken');

const user = {
  id: "1",
  email: "ashu@gmail.com",
  password: "123"
};

exports.login = (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: "Email & password required" });
  }

  if (email !== user.email || password !== user.password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, "secretkey");

  res.json({ token });
};