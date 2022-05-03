const jwt = require("jsonwebtoken");
const { User } = require("../model/users.model");

async function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const { id } = jwt.decode(token, process.env.JWT_SECRET);

    const profile = await User.findById(id);
    req.id = id;

    if (!profile) {
      res.json({ error: "Invalid Credentials" });
      return;
    }
  } catch (err) {
    console.log(err);
    if (err) res.json({ error: "Server Error" });
    return;
  }
  next();
}

module.exports = { verifyToken };
