import api from "../api/axios";
import { useState } from "react";

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      await api.post("/api/resumes/upload", formData);
      alert("Resume uploaded successfully");

      // Reload the page to refresh ResumeList
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* File Input */}
      <label className="block">
        <span className="text-sm text-gray-600 mb-1 block">
          Select Resume (PDF/DOC)
        </span>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-gray-700
                     file:mr-4 file:py-2 file:px-4
                     file:rounded file:border-0
                     file:bg-blue-50 file:text-blue-600
                     hover:file:bg-blue-100"
        />
      </label>

      {/* Upload Button */}
      <button
        onClick={upload}
        disabled={!file || loading}
        className={`w-full py-2 rounded transition
          ${!file || loading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
      >
        {loading ? "Uploading..." : "Upload Resume"}
      </button>
    </div>
  );
};

export default UploadResume;
