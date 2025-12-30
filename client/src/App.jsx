import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import AutoRedirect from "./auth/AutoRedirect";
import Home from './pages/Home';
import { useRef, useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import Profile from "./pages/Profile";

function App() {

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const initAuth = async () => {
      const { refreshToken, setAuth, logout, user } =
        useAuthStore.getState();

      if (!refreshToken) return;

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
          }
        );

        if (!res.ok) throw new Error("Session expired");

        const data = await res.json();
        setAuth(user, data.accessToken, refreshToken);
      } catch {
        logout();
      }
    };

    initAuth();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={
          <AutoRedirect>
            <Login />
          </AutoRedirect>
        } />
        <Route path="/signup" element={
          <AutoRedirect>
            <Signup />
          </AutoRedirect>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
