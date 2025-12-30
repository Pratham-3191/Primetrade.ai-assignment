import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import { House, Search } from "lucide-react";
import { apiFetch } from "../utils/apiFetch"; // Assuming you have this helper

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | completed | pending

  // Fetch tasks from backend when component mounts
  const fetchTasks = async () => {
    try {
      const res = await apiFetch(`${import.meta.env.VITE_API_URL}/tasks`);
      if (!res.ok) return;
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  // 🔹 Search + filter (frontend-only)
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <h1
          className="text-xl font-bold cursor-pointer hover:text-indigo-600 transition"
          onClick={() => navigate("/")}
        >
          Task Manager
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 
              bg-blue-500 text-white font-medium 
              rounded-lg shadow 
              hover:bg-blue-600 hover:shadow-md 
              transition-all duration-200"
          >
            <House size={18} />
            <span>Home</span>
          </button>

          <div
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <img
              src="/user-profile.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto mt-6 space-y-6">
        {/* Add Task */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Add Task</h2>
          <AddTask onTaskAdded={handleTaskAdded} />
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded shadow">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border pl-10 pr-3 py-2 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="bg-white p-4 rounded shadow flex gap-2">
          {["all", "completed", "pending"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition
                ${
                  filter === item
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">My Tasks</h2>

          <TaskList tasks={filteredTasks} setTasks={setTasks} />

          {tasks.length > 0 && filteredTasks.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-6">
              🔍 No tasks found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
