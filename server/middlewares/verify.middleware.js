const jwt = require("jsonwebtoken");
const { User } = require("../model/users.model");

async function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  console.log(req.headers);
  console.log("token", token);
  const { id } = jwt.decode(token, process.env.JWT_SECRET);
  console.log(id);
  const profile = await User.findById(id);
  req.id = id;

  console.log(profile);

  if (!profile) {
    res.status(400).json({ error: "Invalid Credentials" });
    return;
  }
  next();
}

module.exports = { verifyToken };
