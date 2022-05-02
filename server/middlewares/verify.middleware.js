const jwt = require("jsonwebtoken");
const { User } = require("../model/users.model");

async function verifyToken(req, res, next) {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];

    console.log(token);

    const { id } = jwt.decode(token, process.env.JWT_SECRET);

    console.log("decoded", id);
    const profile = await User.findById(id);
    req.id = id;

    console.log(profile);

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
