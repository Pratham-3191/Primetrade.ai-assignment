import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResumeDetails from "./pages/ResumeDetails";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import AutoRedirect from "./auth/AutoRedirect";

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/resumes/:id" element={
          <ProtectedRoute>
            <ResumeDetails />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
