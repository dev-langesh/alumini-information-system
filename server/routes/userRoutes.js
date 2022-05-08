const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth.middleware");
const {
  registerUser,
  getUser,
  loginUser,
  verifyEmail,
  changePassword,
  sendMailToChangeForgotPassword,
  changeForgetPassword,
} = require("../contorller/user.controller.js");

router.get("/getUser", protect, getUser);
router.get("/verify-email/:id", verifyEmail);
router.post(
  "/send-mail-to-change-forgot-password",
  sendMailToChangeForgotPassword
);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/change-password", changePassword);
router.put("/change-forgot-password", changeForgetPassword);

module.exports = router;
