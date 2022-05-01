const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    degree: String,
    batch: String,
    company: String,
    job: String,
    location: String,
    img: String,
  },
  { collection: "profile" }
);

const Profile = mongoose.model("profile", schema);

module.exports = { Profile };
