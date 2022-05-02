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
    !location
  ) {
    res.json({ error: "Fill all the fields" });
    return;
  }

  try {
    const data = await Profile.create({
      user: req.id,
      name,
      batch,
      email,
      company,
      job,
      description,
      location,
      degree,
      phone,
      img: `http://localhost:${process.env.PORT}/${req.file.path}`,
    });
    console.log(data);
  } catch (err) {
    res.json({ error: "Profile Details Already Exists", stack: err.stack });
    console.log(err);
    return;
  }

  res.json({ status: "ok" });
}

module.exports = { uploadImage };
