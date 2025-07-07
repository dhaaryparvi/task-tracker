import React, { useState } from 'react';
import '../styles/TaskItem.css'; // Component-specific styles

function TaskItem({ task, deleteTask, toggleComplete, editTask }) {
  // State to manage if the task is in editing mode
  const [isEditing, setIsEditing] = useState(false);
  // States to hold edited values, initialized with current task values
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedPriority, setEditedPriority] = useState(task.priority || 'low');
  // For date input, format to 'YYYY-MM-DD'
  const [editedDueDate, setEditedDueDate] = useState(
    task.dueDate ? new Date(task.dueDate).toISOString().substring(0, 10) : ''
  );
  // For categories, join array into a comma-separated string for input field
  const [editedCategories, setEditedCategories] = useState(
    task.categories ? task.categories.join(', ') : ''
  );

  // Handles switching to edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Handles saving edited task details
  const handleSaveEdit = () => {
    if (!editedTitle.trim()) {
      // IMPORTANT: Use a custom modal/toast notification instead of alert()
      alert('Task title cannot be empty!');
      return;
    }

    // Process edited categories input: split, trim, filter empty
    const categoriesArray = editedCategories
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');

    // Call the editTask function passed from App.js
    editTask(
      task.id,
      editedTitle.trim(),
      editedDescription.trim(),
      editedPriority,
      editedDueDate || null, // Pass null if due date is empty
      categoriesArray
    );
    setIsEditing(false); // Exit edit mode
  };

  // Handles canceling edit mode, reverting changes
  const handleCancelEdit = () => {
    setEditedTitle(task.title); // Revert to original title
    setEditedDescription(task.description); // Revert to original description
    setEditedPriority(task.priority || 'low'); // Revert priority
    setEditedDueDate(task.dueDate ? new Date(task.dueDate).toISOString().substring(0, 10) : ''); // Revert due date
    setEditedCategories(task.categories ? task.categories.join(', ') : ''); // Revert categories
    setIsEditing(false); // Exit edit mode
  };

  // Format creation date for display
  const formattedCreationDate = new Date(task.createdAt).toLocaleString();
  // Format due date for display, or show 'No due date'
  const formattedDueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'No due date';

  // Determine if task is overdue
  const isOverdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date();

  return (
    // Dynamic class names for styling based on completion and priority
    <div className={`task-item ${task.completed ? 'completed' : 'pending'} priority-${task.priority} ${isOverdue ? 'overdue' : ''}`}>
      {isEditing ? (
        // --- Edit Mode UI ---
        <div className="edit-mode">
          <div className="form-group">
            <label htmlFor={`edit-title-${task.id}`}>Title:</label>
            <input
              type="text"
              id={`edit-title-${task.id}`}
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor={`edit-description-${task.id}`}>Description:</label>
            <textarea
              id={`edit-description-${task.id}`}
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              rows="2"
              className="form-textarea"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor={`edit-priority-${task.id}`}>Priority:</label>
            <select
              id={`edit-priority-${task.id}`}
              value={editedPriority}
              onChange={(e) => setEditedPriority(e.target.value)}
              className="form-select"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor={`edit-due-date-${task.id}`}>Due Date:</label>
            <input
              type="date"
              id={`edit-due-date-${task.id}`}
              value={editedDueDate}
              onChange={(e) => setEditedDueDate(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor={`edit-categories-${task.id}`}>Categories (comma-separated):</label>
            <input
              type="text"
              id={`edit-categories-${task.id}`}
              placeholder="e.g., Work, Personal"
              value={editedCategories}
              onChange={(e) => setEditedCategories(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="edit-actions">
            <button onClick={handleSaveEdit} className="save-button">Save</button>
            <button onClick={handleCancelEdit} className="cancel-button">Cancel</button>
          </div>
        </div>
      ) : (
        // --- View Mode UI ---
        <>
          <div className="task-info">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)} // Toggle completion status
              className="task-checkbox"
            />
            <div className="task-details">
              <h3 className="task-title">{task.title}</h3>
              {task.description && <p className="task-description">{task.description}</p>}
              <p className="task-meta">
                <span className="task-priority">Priority: <strong>{task.priority.toUpperCase()}</strong></span>
                <span className={`task-due-date ${isOverdue ? 'overdue-text' : ''}`}>Due: {formattedDueDate}</span>
              </p>
              {task.categories && task.categories.length > 0 && (
                <div className="task-categories">
                  {task.categories.map((cat, index) => (
                    <span key={index} className="category-tag">{cat}</span>
                  ))}
                </div>
              )}
              <small className="task-date">Created: {formattedCreationDate}</small>
            </div>
          </div>
          <div className="task-actions">
            <button onClick={handleEdit} className="edit-button">Edit</button>
            <button onClick={() => deleteTask(task.id)} className="delete-button">Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;
