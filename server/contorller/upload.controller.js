const { profileValidator } = require("../config/profileValidator");
const { validateEmail } = require("../config/validateEmail");
const { Profile } = require("../model/profile.model");

// POST api / upload
async function uploadImage(req, res) {
  const {
    name,
    batch,
    company,
    description,
    degree,
    job,
    email,
    phone,
    location,
    records,
    linkedin,
  } = req.body;

  if (
    !name ||
    !batch ||
    !company ||
    !description ||
    !degree ||
    !job ||
    !email ||
    !phone ||
    !location ||
    !records
  ) {
    res.json({ error: "Fill all the credentials" });
    return;
  }

  try {
    if (!profileValidator(req.body)) {
      res.json({ error: "Invalid Credentials" });
      return;
    }

    const imgPath = req.file ? req.file.path : "uploads/default.jpg";

    await Profile.create({
      user: req.id,
      name,
      batch,
      email,
      company,
      job,
      description: description[1],
      location,
      degree,
      phone,
      records: records[1],
      img: `http://localhost:${process.env.PORT}/${imgPath}`,
      linkedin,
    });
  } catch (err) {
    res.json({ error: "Duplicate Value", stack: err.stack });
    console.log(err);
    return;
  }

  res.json({ status: "ok" });
}

module.exports = { uploadImage };
