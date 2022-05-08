const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/verify.middleware");
const { upload: multer } = require("../middlewares/multer.middleware");
const {
  getProfile,
  updateImage,
  updateProfile,
  getAllProfile,
  getAlumini,
  likeProfile,
} = require("../contorller/profile.controller");

router.get("/get-profile", verifyToken, getProfile);
router.get("/get-all-profile", getAllProfile);
router.get("/alumini/:id", getAlumini);
router.post("/update-image", verifyToken, multer, updateImage);
router.post("/update-profile", updateProfile);
router.post("/like-profile", likeProfile);

module.exports = router;
