import { useState } from 'react';
import axios from 'axios';
import './AuthForm.css';

const API_URL = 'http://localhost:5000';

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function AuthForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  };

  const handleSignup = async () => {
    if (!username.trim() || !password.trim()) {
      showMessage('Please fill in all fields', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/signup`, {
        username: username.trim(),
        password,
      });
      showMessage(res.data.message, 'success');
      setUsername('');
      setPassword('');
    } catch (err) {
      const msg = err.response?.data?.error || 'Signup failed. Please try again.';
      showMessage(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      showMessage('Please fill in all fields', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/login`, {
        username: username.trim(),
        password,
      });
      showMessage(`Welcome back, ${res.data.user.username}!`, 'success');
    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed. Please try again.';
      showMessage(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Allow Enter key to trigger login
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) handleLogin();
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <LockIcon />
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to your account or create a new one</p>
        </div>

        {message && (
          <div className={`message ${messageType}`}>
            {messageType === 'success' ? <CheckIcon /> : <AlertIcon />}
            {message}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            autoComplete="username"
            autoFocus
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            autoComplete="current-password"
          />
        </div>

        <div className="button-group">
          <button
            className="btn btn-primary"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Please wait...' : 'Login'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? 'Please wait...' : 'Sign Up'}
          </button>
        </div>

        <p className="auth-footer">
          Minimum 6 characters for password &bull; 3 characters for username
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
