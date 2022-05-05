const {
  notificationModel: Notification,
} = require("../model/notification.model");

// POST /api/set-message
async function setMessage(req, res) {
  const { name, message } = req.body;
  console.log(req.body);

  try {
    const obj = await Notification.create({ user: name, message });

    console.log(obj);
    res.send("Set message");
  } catch (err) {
    if (err) console.log(err);
  }
}

module.exports = { setMessage };
