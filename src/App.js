import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";
import ComponentDemo from "./components/ui/ComponentDemo";
import NotificationDemo from "./components/NotificationDemo";
import NotificationTest from "./components/NotificationTest";
import { ToastContainer } from "./components/ui";

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/demo" element={<ComponentDemo />} />
            <Route path="/notifications" element={<NotificationDemo />} />
            <Route path="/test-notifications" element={<NotificationTest />} />
              
              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              
              {/* Redirect unknown routes to landing */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Layout>
          <ToastContainer />
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
