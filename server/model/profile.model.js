const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    degree: { type: String, required: true },
    batch: { type: String, required: true },
    company: { type: String, required: true },
    job: { type: String, required: true },
    location: { type: String, required: true },
    img: { type: String, unique: true, required: true },
    description: String,
  },
  { collection: "profile" }
);

const Profile = mongoose.model("profile", schema);

module.exports = { Profile };
