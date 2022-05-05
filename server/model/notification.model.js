const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    message: String,
    user: String,
  },
  {
    collection: "Notifications",
  }
);

const notificationModel = mongoose.model("notification", schema);
module.exports = { notificationModel };
