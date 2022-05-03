const multer = require("multer");

const whiteList = ["image/jpeg", "image/jpg", "image/png"];

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (whiteList.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb("File type not allowed", false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
}).single("image");

module.exports = { upload };
