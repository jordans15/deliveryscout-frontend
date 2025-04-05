import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm({ setShowLogin }) { // ✅ Accept this prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://deliveryscout-backend.onrender.com/register', {
        email,
        password
      });
      setMessage('Registration successful! Redirecting to login...');
      
      // ✅ Switch to login form after short delay
      setTimeout(() => {
        setShowLogin(true);
      }, 1500);
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
      <p>{message}</p>
    </form>
  );
}

export default RegisterForm;
