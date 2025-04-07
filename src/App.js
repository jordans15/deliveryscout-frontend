import React, { useState, useEffect } from 'react';
import ParcelForm from './components/ParcelForm';
import ResultsList from './components/ResultsList';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [results, setResults] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Toggle <body> class for full-screen dark mode
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <header className="header" aria-label="DeliveryScout header">
        <div className="logo" aria-label="DeliveryScout logo">📦 DeliveryScout</div>
        <div>
          <button className="login-btn" onClick={() => setDarkMode(prev => !prev)}>
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>

          {!token ? (
            <>
              <button className="login-btn" onClick={() => {
                setShowLogin(!showLogin);
                setShowRegister(false);
              }}>
                {showLogin ? 'Close' : 'Login'}
              </button>
              <button className="login-btn" onClick={() => {
                setShowRegister(!showRegister);
                setShowLogin(false);
              }}>
                {showRegister ? 'Close' : 'Register'}
              </button>
            </>
          ) : (
            <button
              className="login-btn"
              onClick={() => {
                localStorage.removeItem('token');
                setToken('');
              }}
            >
              Logout
            </button>
          )}
        </div>
      </header>

      <main>
        {showLogin && (
          <LoginForm
            setToken={setToken}
            setShowLogin={setShowLogin}
          />
        )}

        {showRegister && (
          <RegisterForm setShowLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }} />
        )}

        {!showLogin && !showRegister && (
          <>
            {token && <p className="welcome-msg">Welcome back! 🎉</p>}
            <ParcelForm setResults={setResults} />
            <ResultsList results={results} />
          </>
        )}
      </main>

      <ScrollToTop />
      <Footer aria-label="DeliveryScout footer" />
    </div>
  );
}

export default App;
