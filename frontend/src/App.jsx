import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import GroupDetails from './pages/GroupDetails';
import BalancesView from './pages/BalancesView';
import ImportPage from './pages/ImportPage';
import JoinGroup from './pages/JoinGroup';
import './App.css';

// Protected Route Guard
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/group/:id" element={
            <ProtectedRoute>
              <GroupDetails />
            </ProtectedRoute>
          } />
          
          <Route path="/group/:id/balances" element={
            <ProtectedRoute>
              <BalancesView />
            </ProtectedRoute>
          } />
          
          <Route path="/import/:id" element={
            <ProtectedRoute>
              <ImportPage />
            </ProtectedRoute>
          } />

          <Route path="/join/:uuid" element={
            <>
              <Navbar />
              <JoinGroup />
            </>
          } />

          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
