import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Login from './components/Login';
import TaskForm from './components/TaskForm'; // Will create this soon
import TaskList from './components/TaskList'; // Will create this soon
import TaskFilter from './components/TaskFilter'; // Will create this soon
import { loadState, saveState } from './utils/localStorage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]); // State to hold all tasks
  const [filter, setFilter] = useState('all'); // State for task filtering: 'all', 'completed', 'pending'

  useEffect(() => {
    const storedUsername = loadState('username');
    if (storedUsername) {
      setCurrentUser(storedUsername);
      // Load tasks associated with the user. For simplicity, we'll just load all tasks.
      // In a real app, you might namespace tasks by user: `loadState(\`tasks_${storedUsername}\`)`
      const storedTasks = loadState('tasks');
      if (storedTasks) {
        setTasks(storedTasks);
      } else {
        // Optional: Load sample data if no tasks found for a fresh start
        // setTasks([
        //   { id: 1, title: "Complete React assignment", description: "Build a task tracker application", completed: false, createdAt: "2024-01-15T10:00:00Z" },
        //   { id: 2, title: "Review JavaScript concepts", description: "Go through ES6+ features", completed: true, createdAt: "2024-01-14T15:30:00Z" }
        // ]);
      }
    }
  }, []);

  // Effect to save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    if (currentUser) { // Only save tasks if a user is logged in
      saveState('tasks', tasks);
    }
  }, [tasks, currentUser]); // Rerun when tasks or currentUser changes

  const handleLogin = (username) => {
    setCurrentUser(username);
    const storedTasks = loadState('tasks'); // Load existing tasks
    setTasks(storedTasks || []);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    // You might want to keep tasks for the user if they log back in
    // For this assignment, we'll clear them for simplicity when logging out
    localStorage.removeItem('tasks');
    setCurrentUser(null);
    setTasks([]);
  };

  // --- Task Management Functions ---

  const addTask = (title, description) => {
    const newTask = {
      id: Date.now(), // Unique ID for the task
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(), // ISO string for consistent date format
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) { // Confirmation prompt 
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }
  };

  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, newTitle, newDescription) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title: newTitle, description: newDescription } : task
      )
    );
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'pending':
        return tasks.filter((task) => !task.completed);
      case 'all':
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();
  const allTaskCount = tasks.length;
  const completedTaskCount = tasks.filter(task => task.completed).length;
  const pendingTaskCount = tasks.filter(task => !task.completed).length;


  return (
    <div className="App">
      {currentUser ? (
        <>
          <header className="app-header">
            <h1>Personal Task Tracker</h1>
            <div className="user-info">
              <span>Welcome, {currentUser}!</span>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
          </header>
          <div className="task-dashboard">
            <TaskForm addTask={addTask} /> {/* Pass addTask function */}
            <TaskFilter
              filter={filter}
              setFilter={setFilter}
              allCount={allTaskCount}
              completedCount={completedTaskCount}
              pendingCount={pendingTaskCount}
            />
            <TaskList
              tasks={filteredTasks} // Pass filtered tasks
              deleteTask={deleteTask}
              toggleComplete={toggleComplete}
              editTask={editTask}
            />
          </div>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;