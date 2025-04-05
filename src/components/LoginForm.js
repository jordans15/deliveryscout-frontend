import React, { useState } from 'react';
import axios from 'axios';

function LoginForm({ setToken, setShowLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('https://deliveryscout-backend.onrender.com/login', {
        email,
        password
      });

      const { access_token } = response.data;

      localStorage.setItem('token', access_token);
      setToken(access_token);

      setMessage('Login successful!');

      // Redirect to home (close login form)
      setTimeout(() => setShowLogin(false), 1000);
    } catch (err) {
      console.error(err);
      setMessage('Login failed. Check your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <h2>Login</h2>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit">Login</button>

      {message && <p>{message}</p>}
    </form>
  );
}

export default LoginForm;
