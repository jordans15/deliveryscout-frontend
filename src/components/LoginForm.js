import React, { useState } from 'react'; 
import axios from 'axios';

function LoginForm({ setToken, setShowLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true); // Set loading to true when submitting

    try {
      const response = await axios.post('https://deliveryscout-backend.onrender.com/login', {
        email,
        password,
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
    } finally {
      setLoading(false); // Reset loading state after the request completes
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <h2>Login</h2>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Disable the submit button if the form is not valid or if the login is in progress */}
      <button type="submit" disabled={loading}>Login</button>

      {message && <p>{message}</p>}
    </form>
  );
}

export default LoginForm;
