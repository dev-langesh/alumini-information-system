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

  const data = await Profile.create({
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

  res.send("file uploaded");
}

module.exports = { uploadImage };
