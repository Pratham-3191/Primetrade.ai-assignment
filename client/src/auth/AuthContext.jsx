import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- LOGIN ---------------- */
  const login = async (data) => {
    const res = await api.post("/api/auth/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // save token
    localStorage.setItem("accessToken", res.data.accessToken);

    // set user immediately
    setUser(res.data.user);

    return res.data.user;
  };

  /* ---------------- SIGNUP ---------------- */
  const signup = async (data) => {
    await api.post("/api/auth/signup", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  /* ---------------- LOGOUT ---------------- */
  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch {}
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  /* ---------------- GET CURRENT USER ---------------- */
  const fetchMe = async () => {
    const token = localStorage.getItem("accessToken");

    // ⛔ no token → no API call
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ FIX
        },
      });

      setUser(res.data);
    } catch (err) {
      localStorage.removeItem("accessToken");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
