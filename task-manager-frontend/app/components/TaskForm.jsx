'use client';
import { useState } from 'react';

export default function TaskForm({onAdd}) {
    const [title, setTitle] = useState('');
    

    // To prevent the default form submission behavior (which would refresh the page)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return; // Don't add empty tasks

        const res = await fetch('http://127.0.0.1:8000/api/tasks', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title}),
        });

        const newTask = await res.json();
        console.log('Task added:', newTask);
        onAdd(newTask); // Notify parent component of the new task
        setTitle(''); // Clear the input field
    };
    return (
        <form
            onSubmit={handleSubmit} className="flex gap-2 mb-4 w-full max-w-md"
        >
    {/* When the input changes, React passes an event object `e`.
          e.target -> the DOM element that fired the event (our <input>).
          e.target.value -> the current text inside that input field. */}

    <input
        type="text"
        value = {title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
        />
        <button type= "submit" className="bg-purple-500 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded">Add Task</button>
    </form>
    );
}