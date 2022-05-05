const router = require("express").Router();
const {
  setMessage,
  getMessages,
} = require("../contorller/notification.controller");

router.post("/set-message", setMessage);
router.get("/get-messages", getMessages);

module.exports = router;
