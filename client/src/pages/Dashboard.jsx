import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import UploadResume from "./UploadResume";
import ResumeList from "./ResumeList";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Resume Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">{user?.email}</span>
          <button onClick={logout} className="btn">Logout</button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto mt-6 grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Upload Resume</h2>
          <UploadResume />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">My Resumes</h2>
          <ResumeList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
