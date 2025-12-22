import { useEffect, useState } from "react";
import api from "../api/axios";

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    api.get("/api/resumes")
      .then(res => setResumes(res.data))
      .catch(err => {
        console.error(err);
        alert("Failed to load resumes");
      });
  }, []);

  const downloadResume = async (id, fileName) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return alert("Not authorized. Please login.");

      setLoadingId(id);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/resumes/${id}/download`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Download failed");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName || "resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert(err.message || "Download failed");
    } finally {
      setLoadingId(null);
    }
  };

  const deleteResume = async (id) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return alert("Not authorized. Please login.");

      setLoadingId(id);

      await api.delete(`/api/resumes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResumes(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Failed to delete resume"
      );
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {resumes.length === 0 && (
        <p className="text-gray-500 text-center">No resumes uploaded</p>
      )}

      {resumes.map(resume => (
        <div
          key={resume._id}
          className="border p-4 mb-3 rounded flex justify-between items-center"
        >
          <div className="max-w-60">
            <h3
              className="font-semibold truncate overflow-hidden whitespace-nowrap"
              title={resume.fileName}
            >
              {resume.fileName}
            </h3>
            <p className="text-sm text-gray-500">
              Uploaded on {new Date(resume.createdAt).toLocaleDateString()}
            </p>
          </div>


          <div className="flex gap-3">
            <button
              type="button"
              disabled={loadingId === resume._id}
              onClick={() =>
                downloadResume(resume._id, resume.fileName)
              }
              className="text-blue-600 hover:underline disabled:opacity-50"
            >
              Download
            </button>

            <button
              type="button"
              disabled={loadingId === resume._id}
              onClick={() => deleteResume(resume._id)}
              className="text-red-600 hover:underline disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResumeList;
