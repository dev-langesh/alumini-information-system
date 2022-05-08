const { Profile } = require("../model/profile.model");
const jwt = require("jsonwebtoken");
const { validateEmail } = require("../config/validateEmail");
const { profileValidator } = require("../config/profileValidator");

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

// PRIVATE
// post /api/update-image
async function updateImage(req, res) {
  try {
    const data = await Profile.findOne({ user: req.id });

    if (data) {
      await Profile.findByIdAndUpdate(data._id, {
        $set: { img: "http://localhost:8000/" + req.file.path },
      });

      res.json({ url: "http://localhost:8000/" + req.file.path });
      return;
    }
  } catch (err) {
    if (err) {
      res.json({ error: "Invalid Credentials" });
      return;
    }
  }
}

// PRIVATE
// POST /api/update-profile
async function updateProfile(req, res) {
  const token = req.body.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  try {
    console.log(profileValidator(req.body));

    if (!profileValidator(req.body)) {
      res.json({ error: "Invalid Credentials" });
      return;
    }

    const data = await Profile.findOne({ user: decoded.id });

    if (data) {
      await Profile.findByIdAndUpdate(data._id, {
        $set: req.body,
      });

      res.json({ status: "ok" });
      return;
    }
  } catch (err) {
    if (err) {
      console.log(err);
      res.json({ error: "Invalid Entry" });
      return;
    }
  }
}

// GET api/get-all-profile
async function getAllProfile(req, res) {
  const data = await Profile.find({});
  res.json(data);
}

// GET api/alumini/:id
async function getAlumini(req, res) {
  const id = req.params.id;

  const data = await Profile.findById(id);

  if (!data) {
    res.json({ error: "Profile Not Found" });
    return;
  }
  res.json(data);
}

module.exports = {
  getProfile,
  updateImage,
  updateProfile,
  getAllProfile,
  getAlumini,
};
