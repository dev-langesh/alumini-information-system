const express = require("express");
const router = express.Router();
const { uploadImage } = require("../contorller/upload.controller");
const { upload: multer } = require("../middlewares/multer.middleware");
const { verifyToken } = require("../middlewares/verify.middleware");

router.post("/", verifyToken, multer, uploadImage);

module.exports = router;
