const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/verify.middleware");
const { getProfile } = require("../contorller/profile.controller");

router.get("/get-profile", verifyToken, getProfile);

module.exports = router;
