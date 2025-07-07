import React, { useState } from 'react';
import '../styles/TaskItem.css'; // Create this CSS file

function TaskItem({ task, deleteTask, toggleComplete, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (!editedTitle.trim()) {
      alert('Task title cannot be empty!');
      return;
    }
    editTask(task.id, editedTitle.trim(), editedDescription.trim());
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedTitle(task.title); // Revert to original title
    setEditedDescription(task.description); // Revert to original description
    setIsEditing(false);
  };

  const formattedDate = new Date(task.createdAt).toLocaleString(); // Display creation date

  return (
    <div className={`task-item ${task.completed ? 'completed' : 'pending'}`}>
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            required
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            rows="2"
          ></textarea>
          <div className="edit-actions">
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={handleCancelEdit} className="cancel-button">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-info">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <div>
              <h3 className="task-title">{task.title}</h3>
              {task.description && <p className="task-description">{task.description}</p>}
              <small className="task-date">Created: {formattedDate}</small>
            </div>
          </div>
          <div className="task-actions">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => deleteTask(task.id)} className="delete-button">Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;
