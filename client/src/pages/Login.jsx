import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import { House } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // Regex patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{6,}$/; // minimum 6 characters

  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!passwordRegex.test(form.password)) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const submit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/sign-in`,
        form
      );
      const { user, accessToken, refreshToken } = res.data;
      setAuth(user, accessToken, refreshToken);
      navigate("/dashboard");
    } catch (err) {
      setServerError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 p-4">
      <form
        onSubmit={submit}
        className=" relative bg-white w-full max-w-sm p-8 rounded-2xl shadow-lg"
      >
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
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Login to your account
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 block mb-1">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.email ? "border-red-500" : ""
              }`}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 block mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.password ? "border-red-500" : ""
              }`}
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Server Error */}
        {serverError && (
          <div className="bg-red-50 text-red-600 text-sm p-2 rounded mb-4">
            {serverError}
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${loading
              ? "bg-gray-300 cursor-not-allowed text-gray-600"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow"
            }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup Redirect */}
        <p className="text-sm text-gray-500 text-center mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 hover:underline cursor-pointer font-medium"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
