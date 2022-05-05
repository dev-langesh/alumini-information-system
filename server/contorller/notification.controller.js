const {
  notificationModel: Notification,
} = require("../model/notification.model");

// POST /api/set-message
async function setMessage(req, res) {
  const { name, message } = req.body;
  console.log(req.body);

  try {
    await Notification.create({ user: name, message });
    const data = await Notification.find({});

    res.json(data);
  } catch (err) {
    if (err) console.log(err);
  }
}

// GET /api/get-messages
async function getMessages(req, res) {
  try {
    const response = await Notification.find({});
    res.json(response);
  } catch (err) {
    if (err) console.log(err);
  }
}

module.exports = { setMessage, getMessages };
