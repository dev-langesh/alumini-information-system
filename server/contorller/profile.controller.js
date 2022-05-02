const { Profile } = require("../model/profile.model");

// PRIVATE
// GET /api/get-profile
async function getProfile(req, res) {
  try {
    const data = await Profile.findOne({ user: req.id });

    if (!data) {
      res.json({ error: "Profile Not Found" });
      return;
    }

    res.json(data);
  } catch (err) {
    if (err) {
      res.json({ error: "Invalid Credentials" });
      return;
    }
  }
}

module.exports = { getProfile };
