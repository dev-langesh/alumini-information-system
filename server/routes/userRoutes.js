const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth.middleware");
const {
  registerUser,
  getUser,
  loginUser,
  verifyEmail,
} = require("../contorller/user.controller.js");

router.post("/register", registerUser);
router.get("/getUser", protect, getUser);
router.post("/login", loginUser);
router.get("/verify-email/:id", verifyEmail);

module.exports = router;
