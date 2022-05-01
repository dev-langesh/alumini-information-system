const express = require("express");
const router = express.Router();
const { uploadImage } = require("../contorller/upload.controller");
const { upload: multer } = require("../middlewares/multer.middleware");

router.post("/", multer.single("image"), uploadImage);

module.exports = router;
