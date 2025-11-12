import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navigation.css';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isPremium, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const regularMenuItems = [
    { path: '/dashboard', label: '📊 Dashboard', icon: '📊' },
    { path: '/expense', label: '💰 My Expenses', icon: '💰' },
  ];

  const premiumMenuItems = [
    { path: '/premium-dashboard', label: '⭐ Premium', icon: '⭐' },
    { path: '/expense-details', label: '📋 Details', icon: '📋' },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <div className="mobile-nav-toggle">
        <button
          className="hamburger"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className={`navigation-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="nav-header">
          <h2>💳 ExpenseHub</h2>
          <button
            className="close-btn"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="user-section">
          <div className="user-avatar">
            {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="user-info">
            <p className="user-email">{user?.email || 'User'}</p>
            {isPremium && <span className="premium-badge">⭐ Premium</span>}
          </div>
        </div>

        <div className="nav-menu">
          <div className="menu-section">
            <h3>Main</h3>
            {regularMenuItems.map((item) => (
              <button
                key={item.path}
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => handleNavigation(item.path)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            ))}
          </div>

          {isPremium && (
            <div className="menu-section">
              <h3>Premium Features</h3>
              {premiumMenuItems.map((item) => (
                <button
                  key={item.path}
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              ))}
            </div>
          )}

          <div className="menu-section">
            <h3>Account</h3>
            <button className="nav-item" onClick={() => handleNavigation('/settings')}>
              <span className="nav-icon">⚙️</span>
              <span className="nav-label">Settings</span>
            </button>
            <button className="nav-item logout" onClick={handleLogout}>
              <span className="nav-icon">🚪</span>
              <span className="nav-label">Logout</span>
            </button>
          </div>
        </div>

        <div className="nav-footer">
          <p>ExpenseHub © 2024</p>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="nav-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navigation;
