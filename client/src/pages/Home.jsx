import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-10 text-center transform hover:scale-105 transition-transform duration-300">
        {/* Hero Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Welcome to <span className="text-indigo-600">Task Manager</span>
        </h1>
        <p className="text-gray-600 mb-8">
          Organize your tasks efficiently and stay productive. Built with <span className="font-semibold">React</span> & <span className="font-semibold">Node.js</span>.
        </p>

        {/* Buttons */}
        {user ? (
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 hover:shadow-xl transition duration-300"
          >
            Go to Dashboard
          </button>
        ) : (
          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate("/login")}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-600 hover:shadow-xl transition duration-300"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="w-full py-4 bg-linear-to-r from-green-400 to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:from-green-500 hover:to-teal-600 hover:shadow-xl transition duration-300"
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Optional Footer */}
        <p className="mt-6 text-gray-500 text-sm">
          Frontend Developer Intern Assignment Primetrade.ai
        </p>
      </div>
    </div>
  );
};

export default Home;
