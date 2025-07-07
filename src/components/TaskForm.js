import React, { useState } from 'react';
import '../styles/TaskForm.css'; // Component-specific styles

function TaskForm({ addTask }) {
  // State for task title input
  const [title, setTitle] = useState('');
  // State for task description input
  const [description, setDescription] = useState('');
  // State for task priority, defaults to 'low'
  const [priority, setPriority] = useState('low');
  // State for task due date, initialized as empty string
  const [dueDate, setDueDate] = useState('');
  // State for categories input (comma-separated string)
  const [categoriesInput, setCategoriesInput] = useState('');

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Basic validation: ensure title is not empty
    if (!title.trim()) {
      // IMPORTANT: Use a custom modal/toast notification instead of alert() in a real app
      alert('Task title is required!');
      return;
    }

    // Process categories input: split by comma, trim whitespace, filter out empty strings
    const categoriesArray = categoriesInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');

    // Call the addTask function passed from App.js with all task details
    addTask(
      title.trim(),
      description.trim(),
      priority,
      dueDate || null, // Pass null if dueDate is empty
      categoriesArray
    );

    // Reset form fields after submission
    setTitle('');
    setDescription('');
    setPriority('low');
    setDueDate('');
    setCategoriesInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {/* Task Title Input */}
      <div className="form-group">
        <label htmlFor="taskTitle">Task Title:</label>
        <input
          type="text"
          id="taskTitle"
          placeholder="e.g., Complete React assignment"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required // HTML5 required attribute for basic client-side validation
          className="form-input"
        />
      </div>

      {/* Task Description Textarea */}
      <div className="form-group">
        <label htmlFor="taskDescription">Description (Optional):</label>
        <textarea
          id="taskDescription"
          placeholder="e.g., Build a task tracker application"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="form-textarea"
        ></textarea>
      </div>

      {/* Priority Selector */}
      <div className="form-group">
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="form-select"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Due Date Input */}
      <div className="form-group">
        <label htmlFor="dueDate">Due Date (Optional):</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="form-input"
        />
      </div>

      {/* Categories Input */}
      <div className="form-group">
        <label htmlFor="categories">Categories (comma-separated):</label>
        <input
          type="text"
          id="categories"
          placeholder="e.g., Work, Personal, Study"
          value={categoriesInput}
          onChange={(e) => setCategoriesInput(e.target.value)}
          className="form-input"
        />
      </div>

      {/* Add Task Button */}
      <button type="submit" className="add-task-button">Add Task</button>
    </form>
  );
}

export default TaskForm;
