import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/AuthPages.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Check if user already exists
      const userResponse = await axios.get('/user_login');
      const userExists = userResponse.data.userDetails.some(
        (user) => user.email === email
      );

      if (userExists) {
        setError('User already exists');
        setIsLoading(false);
        return;
      }

      // Create new user
      await axios.post('/signUp', {
        Username: username,
        email,
        password,
      });

      alert('Sign up successful! Please log in.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            <h3>Sign Up</h3>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
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

            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>

            {error && <p className="error-message">{error}</p>}

            <div className="auth-footer">
              <h5>
                Already have an account <Link to="/login">login</Link>
              </h5>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
