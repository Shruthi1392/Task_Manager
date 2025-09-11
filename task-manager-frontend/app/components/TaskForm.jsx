'use client';
import { useState } from 'react';

export default function TaskForm({onAdd}) {
    const [title, setTitle] = useState('');
    return (
        <form>
    <input
        type="text"
        value = {title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
        />
        <button type= "submit">Add Task</button>
    </form>
        
    );
}