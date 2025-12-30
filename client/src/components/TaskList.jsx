import { useEffect, useState } from "react";
import { apiFetch } from "../utils/apiFetch";
import { useAuthStore } from "../store/authStore";
import { Trash2, CheckCircle, Circle, Edit2, Save } from "lucide-react";

const TaskList = ({ tasks, setTasks }) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

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
    if (!accessToken) return; 
    fetchTasks();
  }, [accessToken]);

  const toggleTask = async (id, completed) => {
    await apiFetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    setTasks(prev => prev.map(t => t._id === id ? { ...t, completed: !completed } : t));
  };

  const deleteTask = async (id) => {
    await apiFetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(prev => prev.filter(t => t._id !== id));
  };

  const startEditing = (id, title) => {
    setEditingTaskId(id);
    setEditingTitle(title);
  };

  const saveTask = async (id) => {
    if (!editingTitle.trim()) return;
    await apiFetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editingTitle }),
    });
    setTasks(prev =>
      prev.map(t => t._id === id ? { ...t, title: editingTitle } : t)
    );
    setEditingTaskId(null);
    setEditingTitle("");
  };

  return (
    <ul className="space-y-3 mt-4">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="flex justify-between items-center p-3 rounded-lg bg-white shadow hover:shadow-md transition"
        >
          <div className="flex items-center space-x-3">
            <div
              className="flex items-center cursor-pointer space-x-2"
              onClick={() => toggleTask(task._id, task.completed)}
            >
              {task.completed ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <Circle className="text-gray-400" />
              )}
            </div>

            {editingTaskId === task._id ? (
              <input
                className="border-b border-gray-300 focus:outline-none text-gray-800"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
              />
            ) : (
              <span
                className={`text-gray-800 font-medium ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.title}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {editingTaskId === task._id ? (
              <button
                onClick={() => saveTask(task._id)}
                className="text-green-500 hover:text-green-600 transition"
              >
                <Save size={18} />
              </button>
            ) : (
              <button
                onClick={() => startEditing(task._id, task.title)}
                className="text-blue-500 hover:text-blue-600 transition"
              >
                <Edit2 size={18} />
              </button>
            )}

            <button
              onClick={() => deleteTask(task._id)}
              className="text-red-500 hover:text-red-600 transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
