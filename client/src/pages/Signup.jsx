import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { House } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/sign-up`,
        form
      );

      setSuccess("Account created successfully! Redirecting to login...");
      setForm({ name: "", email: "", password: "" });

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 p-4">
      <form className="relative bg-white w-full max-w-md p-8 rounded-xl shadow-lg">

        <div
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 cursor-pointer p-2 rounded-full 
             bg-blue-50 text-blue-600 
             hover:bg-blue-600 hover:text-white 
             transition-all duration-200 shadow-sm"
          title="Go to Home"
        >
          <House size={20} />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Create Account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Sign up to get started
        </p>

        {/* Full Name */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 block mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Pratham Chaudhari"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 block mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 block mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-2 rounded mb-4">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="bg-green-50 text-green-600 text-sm p-2 rounded mb-4">
            {success}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold transition
            ${loading
              ? "bg-gray-300 cursor-not-allowed text-gray-600"
              : "bg-blue-600 hover:bg-blue-700 text-white"
            }
          `}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        {/* Login Redirect */}
        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline cursor-pointer font-medium"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
