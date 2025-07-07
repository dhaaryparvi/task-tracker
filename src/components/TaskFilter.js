import React from 'react';
import '../styles/TaskFilter.css'; // Create this CSS file

function TaskFilter({ filter, setFilter, allCount, completedCount, pendingCount }) {
  return (
    <div className="task-filter">
      <button
        className={filter === 'all' ? 'active' : ''}
        onClick={() => setFilter('all')}
      >
        All ({allCount}) {/* Show task count  */}
      </button>
      <button
        className={filter === 'completed' ? 'active' : ''}
        onClick={() => setFilter('completed')}
      >
        Completed ({completedCount})
      </button>
      <button
        className={filter === 'pending' ? 'active' : ''}
        onClick={() => setFilter('pending')}
      >
        Pending ({pendingCount})
      </button>
    </div>
  );
}

export default TaskFilter;