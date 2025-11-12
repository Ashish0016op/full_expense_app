import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isPremium, setIsPremium] = useState(localStorage.getItem('isPremium') === 'true');
  const [user, setUser] = useState(null);

  const login = (newToken, premiumStatus) => {
    setToken(newToken);
    setIsPremium(premiumStatus);
    localStorage.setItem('token', newToken);
    localStorage.setItem('isPremium', premiumStatus);
  };

  const logout = () => {
    setToken(null);
    setIsPremium(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('isPremium');
  };

  return (
    <AuthContext.Provider value={{ token, isPremium, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
