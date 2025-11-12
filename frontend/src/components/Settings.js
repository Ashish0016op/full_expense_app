import React, { useState } from 'react';
import '../styles/Settings.css';

const Settings = () => {
  // Demo state for each section
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [currency, setCurrency] = useState('INR');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [password, setPassword] = useState({ current: '', new: '' });

  // Demo handlers
  const handleProfileChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const handleCurrencyChange = e => setCurrency(e.target.value);
  const handleThemeChange = e => setTheme(e.target.value);
  const handleNotificationsChange = e => setNotifications(e.target.checked);
  const handlePasswordChange = e => setPassword({ ...password, [e.target.name]: e.target.value });

  const handleSaveProfile = e => {
    e.preventDefault();
    alert('Profile updated!');
  };
  const handleSaveSettings = e => {
    e.preventDefault();
    alert('Settings saved!');
  };
  const handleChangePassword = e => {
    e.preventDefault();
    alert('Password changed!');
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <form className="settings-section" onSubmit={handleSaveProfile}>
        <label>Name</label>
        <input name="name" value={profile.name} onChange={handleProfileChange} placeholder="Your Name" />
        <label>Email</label>
        <input name="email" value={profile.email} onChange={handleProfileChange} placeholder="Your Email" type="email" />
        <div className="settings-actions">
          <button type="submit">Save Profile</button>
        </div>
      </form>
      <form className="settings-section" onSubmit={handleSaveSettings}>
        <label>Currency</label>
        <select value={currency} onChange={handleCurrencyChange}>
          <option value="INR">INR (₹)</option>
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
        </select>
        <label>Theme</label>
        <select value={theme} onChange={handleThemeChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <label>
          <input type="checkbox" checked={notifications} onChange={handleNotificationsChange} /> Enable Notifications
        </label>
        <div className="settings-actions">
          <button type="submit">Save Settings</button>
        </div>
      </form>
      <form className="settings-section" onSubmit={handleChangePassword}>
        <label>Current Password</label>
        <input name="current" value={password.current} onChange={handlePasswordChange} type="password" placeholder="Current Password" />
        <label>New Password</label>
        <input name="new" value={password.new} onChange={handlePasswordChange} type="password" placeholder="New Password" />
        <div className="settings-actions">
          <button type="submit">Change Password</button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
