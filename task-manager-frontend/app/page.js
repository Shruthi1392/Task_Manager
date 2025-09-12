"use client";
import TaskForm from './components/TaskForm.jsx';
import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";

const API_URL = "http://127.0.0.1:8000/api/tasks";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

    // Fetch tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Add new task (TaskForm calls this)
  const handleAdd = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
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
      setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
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
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Task Manager ✅</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <>
          <TaskForm onAdd={handleAdd} />
          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
}