const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fileName: String,
    filePath: String,
    extractedData: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
