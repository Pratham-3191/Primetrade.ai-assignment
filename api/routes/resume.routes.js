const express = require("express");
const protect = require("../middleware/auth.middleware");
const { upload } = require("../middleware/upload.middleware");
const {
  uploadResume,
  getResumes,
  getResume,
  updateResume,
  deleteResume,
  downloadResume,
} = require("../controllers/resume.controller");

const router = express.Router();

router.post("/upload", protect, upload.single("resume"), uploadResume);
router.get("/", protect, getResumes);
router.get("/:id", protect, getResume);
router.put("/:id", protect, updateResume);
router.delete("/:id", protect, deleteResume);
router.get("/:id/download", protect, downloadResume);

module.exports = router;
