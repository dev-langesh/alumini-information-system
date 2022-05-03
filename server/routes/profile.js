const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/verify.middleware");
const {
  getProfile,
  updateImage,
  updateProfile,
} = require("../contorller/profile.controller");
const { upload: multer } = require("../middlewares/multer.middleware");

router.get("/get-profile", verifyToken, getProfile);
router.post("/update-image", verifyToken, multer, updateImage);
router.post("/update-profile", updateProfile);

module.exports = router;
