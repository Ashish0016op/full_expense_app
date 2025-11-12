import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/AuthPages.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('/login', {
        email,
        password,
      });

      if (response.status === 200 && response.data.message === 'Login successful') {
        login(response.data.token, response.data.isPremium1);
        setUser({ email });

        if (response.data.isPremium1) {
          alert('Login successful as Premium user');
          navigate('/premium-dashboard');
        } else {
          alert('Login successful');
          navigate('/dashboard');
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Incorrect email or password');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate('/forgot-password');
  };

  const imageStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/img/tamanna-rumee-7OCUyev2M9E-unsplash.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-container">
          <div className="auth-image" style={imageStyle}>
            <h2>Expense Tracker</h2>
          </div>
          <div className="auth-content">
            <h3>Login</h3>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                required
              />
            </div>

            <button type="submit" id="login-btn" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            <button
              type="button"
              id="forgot-btn"
              className="btn btn-secondary"
              onClick={handleForgotPassword}
            >
              Forgot password
            </button>

            {error && <p className="error-message">{error}</p>}

            <div className="auth-footer">
              <h5>
                Don't have an account <Link to="/signup">Sign up</Link>
              </h5>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
