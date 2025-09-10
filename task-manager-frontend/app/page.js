"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/tasks")  // ⚡ make sure to use backend port 8000, not 3000
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Task Manager ✅</h1>
      <ul className="space-y-2 w-full max-w-md">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="p-3 bg-white rounded-lg shadow flex justify-between"
          >
            <span className={task.done ? "line-through text-gray-500" : ""}>
              {task.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
