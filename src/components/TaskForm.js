import React, { useState } from 'react';
import '../styles/TaskForm.css'; // Create this CSS file

function TaskForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Task title is required!'); // Basic validation 
      return;
    }
    addTask(title.trim(), description.trim());
    setTitle(''); // Clear form after submission
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task title (required)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="3"
      ></textarea>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;