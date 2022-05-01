const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add your name"],
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please add your password"],
    },
  },
  { collection: "Users", timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = { User };
