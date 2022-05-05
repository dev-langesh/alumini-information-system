const router = require("express").Router();
const { setMessage } = require("../contorller/notification.controller");

router.post("/set-message", setMessage);

module.exports = router;
