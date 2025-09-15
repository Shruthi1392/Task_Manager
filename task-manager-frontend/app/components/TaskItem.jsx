"use client";
import { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete }) {
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    await onToggle(task.id, !task.done);
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    await onDelete(task.id);
    setLoading(false);
  };

  return (
    <li className="flex items-center justify-between p-3 bg-white rounded shadow">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.done}
          onChange={handleToggle}
          disabled={loading}
          className="h-5 w-5"
        />
        <span className={task.done ? "line-through text-gray-500" : ""}>
          {task.title}
        </span>
      </label>

      <button
        onClick={handleDelete}
        disabled={loading}
        className={`px-3 py-1 rounded text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600"
        }`}
      >
        {loading ? "..." : "Delete"}
      </button>
    </li>
  );
}
