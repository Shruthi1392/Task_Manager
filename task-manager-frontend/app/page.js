"use client";
import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList";

const API_URL = "http://127.0.0.1:8000/api/tasks";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // helper: keep undone tasks on top
  const sortTasks = (arr) =>
    [...arr].sort((a, b) => Number(a.done) - Number(b.done));

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000);
  };

  // Fetch tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        setTasks(sortTasks(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Add new task
  const handleAdd = (newTask) => {
    setTasks((prev) => sortTasks([...prev, newTask]));
    showMessage("Task added!");
  };

  // Toggle task (PATCH)
  const handleToggle = async (id, done) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      const updatedTask = await res.json();
      setTasks((prev) => sortTasks(prev.map((t) => (t.id === id ? updatedTask : t))));
      showMessage("Task updated!");
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete task (DELETE)
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete task");
      setTasks((prev) => prev.filter((t) => t.id !== id));
      showMessage("Task deleted!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-purple-700 drop-shadow">
        Task Manager ✅
      </h1>

      {error && (
        <p className="text-red-600 mb-4 bg-red-50 px-4 py-2 rounded shadow">
          {error}
        </p>
      )}
      {message && (
        <p className="text-green-700 mb-4 bg-green-50 px-4 py-2 rounded shadow">
          {message}
        </p>
      )}

      {loading ? (
        <p className="text-gray-600 animate-pulse">Loading tasks...</p>
      ) : (
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-6">
          <TaskForm onAdd={handleAdd} />
          <hr className="my-4" />
          <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
}
