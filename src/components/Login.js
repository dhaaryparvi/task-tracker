import React, { useState } from 'react';
import { saveState } from '../utils/localStorage'; // Import your utility

function Login({ onLogin }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      saveState('username', username.trim()); // Save username to localStorage
      onLogin(username.trim()); // Call parent function to indicate login
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome to Task Tracker</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;