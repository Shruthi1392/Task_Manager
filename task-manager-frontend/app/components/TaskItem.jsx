"use client";
import { useState } from "react";

export default function TaskItem({task, onToggle, onDelete}) {
    const[loading, setLoading]=useState(false);

    const handleToggle=async()=>{
        setLoading(true);
        await onToggle(task.id, !task.done);
        setLoading(false);
    };

    const handleDelete=async()=>{
        setLoading(true);
        await onDelete(task.id);
        setLoading(false);
    };

    return (
        <li className="flex items-center justify-between p-2 border-b">
        <label className="flex items-center gap-2">
            <input
                type="checkbox"
                checked={task.done}
                onChange={handleToggle}
                disabled={loading}
            />
            <span className={task.done ? "line-through text-gray-500":""}>
                {task.title}
            </span>
        </label>
        <button
            onClick={handleDelete}
            disabled={loading}
            className="text-red-500 hover:text-red-700"
        >
            Delete
        </button>
        </li>
    );
}