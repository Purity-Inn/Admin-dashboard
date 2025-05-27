import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Settings from './pages/Settings';
import LoginPage from './pages/Login';
import PrivateRoute from './components/PrivateRoutes';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <div className="main-layout">
                  <Sidebar />
                  <div className="main">
                    <Header />
                    <Dashboard />
                  </div>
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <div className="main-layout">
                  <Sidebar />
                  <div className="main">
                    <Header />
                    <Users />
                  </div>
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <div className="main-layout">
                  <Sidebar />
                  <div className="main">
                    <Header />
                    <Settings />
                  </div>
                </div>
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}
