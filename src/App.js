import React, { useState, useEffect } from 'react';
import './styles/App.css'; // Main application styles

// Import components
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';

// Import utility functions for local storage
import { loadState, saveState } from './utils/localStorage';

function App() {
  // State for current logged-in user
  const [currentUser, setCurrentUser] = useState(null);
  // State for all tasks
  const [tasks, setTasks] = useState([]);
  // State for task filtering ('all', 'completed', 'pending')
  const [filter, setFilter] = useState('all');
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  // State for dark mode toggle
  const [isDarkMode, setIsDarkMode] = useState(loadState('darkMode') || false); // Load dark mode preference, default to false

  // --- useEffect for Initial Load and Persistence ---

  // Effect to load user and tasks from localStorage on component mount
  useEffect(() => {
    const storedUsername = loadState('username');
    if (storedUsername) {
      setCurrentUser(storedUsername);
      const storedTasks = loadState('tasks');
      setTasks(storedTasks || []); // Load tasks or initialize as empty array
    }
  }, []); // Empty dependency array means this runs once on mount

  // Effect to save tasks to localStorage whenever the 'tasks' state changes
  useEffect(() => {
    if (currentUser) { // Only save tasks if a user is logged in
      saveState('tasks', tasks);
    }
  }, [tasks, currentUser]); // Rerun when tasks or currentUser changes

  // Effect to apply dark mode class to body and save preference
  useEffect(() => {
    saveState('darkMode', isDarkMode);
    // Toggle 'dark-mode' class on the body element
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  // --- Login/Logout Handlers ---

  // Handles user login
  const handleLogin = (username) => {
    setCurrentUser(username);
    // Load tasks specific to this user if you implement user-specific storage
    // For now, it loads general tasks, or you could clear them for a new user.
    const storedTasks = loadState('tasks');
    setTasks(storedTasks || []);
  };

  // Handles user logout
  const handleLogout = () => {
    localStorage.removeItem('username'); // Clear username from localStorage
    localStorage.removeItem('tasks'); // Clear tasks on logout for simplicity
    setCurrentUser(null); // Reset current user
    setTasks([]); // Clear tasks in state
    setSearchTerm(''); // Clear search term
    setFilter('all'); // Reset filter
  };

  // --- Task Management Functions ---

  /**
   * Adds a new task to the list.
   * @param {string} title - The title of the task.
   * @param {string} description - The description of the task.
   * @param {string} priority - The priority level ('low', 'medium', 'high').
   * @param {string|null} dueDate - The due date in ISO format (YYYY-MM-DD) or null.
   * @param {string[]} categories - An array of categories/tags for the task.
   */
  const addTask = (title, description, priority, dueDate, categories) => {
    const newTask = {
      id: Date.now(), // Unique ID based on timestamp
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(), // Timestamp for creation
      priority: priority || 'low', // Default priority
      dueDate: dueDate || null,   // Due date
      categories: categories || [] // Categories array
    };
    setTasks((prevTasks) => [...prevTasks, newTask]); // Add new task to state
  };

  /**
   * Deletes a task by its ID.
   * @param {number} id - The ID of the task to delete.
   */
  const deleteTask = (id) => {
    // Confirmation prompt before deletion
    // IMPORTANT: In a real app, use a custom modal instead of window.confirm()
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }
  };

  /**
   * Toggles the completion status of a task.
   * @param {number} id - The ID of the task to toggle.
   */
  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  /**
   * Edits an existing task's details.
   * @param {number} id - The ID of the task to edit.
   * @param {string} newTitle - The new title.
   * @param {string} newDescription - The new description.
   * @param {string} newPriority - The new priority.
   * @param {string|null} newDueDate - The new due date.
   * @param {string[]} newCategories - The new categories.
   */
  const editTask = (id, newTitle, newDescription, newPriority, newDueDate, newCategories) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title: newTitle,
              description: newDescription,
              priority: newPriority,
              dueDate: newDueDate,
              categories: newCategories,
            }
          : task
      )
    );
  };

  // --- Filtering and Searching Logic ---

  /**
   * Filters and searches tasks based on current filter and search term.
   * @returns {Array} The filtered and searched tasks.
   */
  const getFilteredTasks = () => {
    let filtered = tasks;

    // Apply primary filter (All, Completed, Pending)
    switch (filter) {
      case 'completed':
        filtered = filtered.filter((task) => task.completed);
        break;
      case 'pending':
        filtered = filtered.filter((task) => !task.completed);
        break;
      case 'all':
      default:
        // 'all' doesn't change the list initially
        break;
    }

    // Apply search term if present
    if (searchTerm.trim() !== '') {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          (task.description && task.description.toLowerCase().includes(lowerCaseSearchTerm)) ||
          task.categories.some(cat => cat.toLowerCase().includes(lowerCaseSearchTerm)) // Search by category
      );
    }
    return filtered;
  };

  const filteredTasks = getFilteredTasks(); // Get the tasks to display
  // Calculate counts for filter tabs
  const allTaskCount = tasks.length;
  const completedTaskCount = tasks.filter(task => task.completed).length;
  const pendingTaskCount = tasks.filter(task => !task.completed).length;

  // --- Dark Mode Toggle Handler ---
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    // Apply 'dark-mode' class to the App container based on state
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      {currentUser ? (
        // Render main task dashboard if user is logged in
        <>
          <header className="app-header">
            <h1>Personal Task Tracker</h1>
            <div className="header-controls">
              <div className="dark-mode-toggle">
                <button onClick={toggleDarkMode}>
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
              <div className="user-info">
                <span>Welcome, {currentUser}!</span>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </div>
            </div>
          </header>
          <div className="task-dashboard">
            {/* Task Form for adding new tasks */}
            <TaskForm addTask={addTask} />

            {/* Search Bar */}
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search tasks by title, description, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Task Filter tabs */}
            <TaskFilter
              filter={filter}
              setFilter={setFilter}
              allCount={allTaskCount}
              completedCount={completedTaskCount}
              pendingCount={pendingTaskCount}
            />

            {/* List of tasks */}
            <TaskList
              tasks={filteredTasks}
              deleteTask={deleteTask}
              toggleComplete={toggleComplete}
              editTask={editTask}
            />
          </div>
        </>
      ) : (
        // Render Login component if no user is logged in
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
