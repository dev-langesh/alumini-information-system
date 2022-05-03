const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/verify.middleware");
const {
  getProfile,
  updateImage,
  updateProfile,
  getAllProfile,
  getAlumini,
  getAluminiByName,
} = require("../contorller/profile.controller");
const { upload: multer } = require("../middlewares/multer.middleware");

router.get("/get-profile", verifyToken, getProfile);
router.get("/get-all-profile", getAllProfile),
  router.get("/alumini/:id", getAlumini);
router.get("/get-alumini-by-name/:name", getAluminiByName);
router.post("/update-image", verifyToken, multer, updateImage);
router.post("/update-profile", updateProfile);

module.exports = router;
