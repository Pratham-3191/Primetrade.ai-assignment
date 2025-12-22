const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(pdf|docx)$/i)) {
      return cb(new Error("Only PDF or DOCX files are allowed"));
    }
    cb(null, true);
  },
});

module.exports = { upload };
