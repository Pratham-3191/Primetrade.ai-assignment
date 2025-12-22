const Resume = require("../models/Resume.js");
const fs = require("fs");

const uploadResume = async (req, res) => {
  const resume = await Resume.create({
    user: req.user.id,
    fileName: req.file.originalname,
    filePath: req.file.path,
  });

  res.status(201).json(resume);
};

const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch resumes" });
  }
};

const getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });
    res.json(resume);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch resume" });
  }
};

const updateResume = async (req, res) => {
  const resume = await Resume.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(resume);
};

const deleteResume = async (req, res) => {
  const resume = await Resume.findById(req.params.id);
  fs.unlinkSync(resume.filePath);
  await resume.deleteOne();
  res.json({ message: "Resume deleted" });
};

const downloadResume = async (req, res) => {
  const resume = await Resume.findById(req.params.id);
  res.download(resume.filePath);
};

module.exports = {
  uploadResume,
  getResumes,
  getResume,
  updateResume,
  deleteResume,
  downloadResume,
};
