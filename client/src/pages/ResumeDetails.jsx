import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const ResumeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH RESUME ---------------- */
  useEffect(() => {
    // MongoDB ObjectId validation
    if (!/^[a-f\d]{24}$/i.test(id)) {
      alert("Invalid resume ID");
      navigate("/");
      return;
    }

    api
      .get(`/api/resumes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => setResume(res.data))
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || "Failed to load resume");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  /* ---------------- DELETE ---------------- */
  const deleteResume = async () => {
    if (!confirm("Are you sure you want to delete this resume?")) return;

    try {
      await api.delete(`/api/resumes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete resume");
    }
  };

  /* ---------------- DOWNLOAD ---------------- */
  const downloadResume = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/resumes/${id}/download`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = resume?.fileName || "resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(err.message || "Download failed");
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!resume) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow rounded p-6 space-y-4">
        <div>
          <h2 className="text-2xl font-bold">{resume.fileName}</h2>
          <p className="text-gray-500 text-sm">
            Uploaded on {new Date(resume.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-500 text-sm">
            Last updated {new Date(resume.updatedAt).toLocaleDateString()}
          </p>
        </div>

        {/* <div>
          <h3 className="font-semibold mb-1">Extracted Information</h3>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
            {JSON.stringify(resume.extractedData || {}, null, 2)}
          </pre>
        </div> */}

        <div className="flex gap-3">
          <button
            onClick={downloadResume}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Download
          </button>

          <button
            onClick={deleteResume}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeDetails;
