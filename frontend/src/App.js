import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import ExpenseWithFilters from './components/ExpenseWithFilters';
import PremiumDashboard from './components/PremiumDashboard';
import ExpenseDetails from './components/ExpenseDetails';
import './styles/App.css';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

const LayoutWithNav = ({ children }) => {
  const { token } = useAuth();
  return token ? (
    <div className="app-layout">
      <Navigation />
      <div className="app-content">
        {children}
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

const AppContent = () => {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      {token && (
        <>
          <Route
            path="/dashboard"
            element={
              <LayoutWithNav>
                <Dashboard />
              </LayoutWithNav>
            }
          />
          <Route
            path="/expense"
            element={
              <LayoutWithNav>
                <ExpenseWithFilters />
              </LayoutWithNav>
            }
          />
          <Route
            path="/premium-dashboard"
            element={
              <LayoutWithNav>
                <PremiumDashboard />
              </LayoutWithNav>
            }
          />
          <Route
            path="/expense-details"
            element={
              <LayoutWithNav>
                <ExpenseDetails />
              </LayoutWithNav>
            }
          />
          <Route
            path="/settings"
            element={
              <LayoutWithNav>
                {/* Settings page route */}
                {React.createElement(require('./components/Settings').default)}
              </LayoutWithNav>
            }
          />
        </>
      )}
      <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
