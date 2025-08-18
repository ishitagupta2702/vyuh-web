import React, { useEffect } from "react";
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
  console.log('🎯 App component rendering...');

  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://ai-chat-agent-98aeb.web.app/widget.js';
    script.dataset.companyName ='kalco';
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-position', 'bottom-right');
    script.setAttribute('data-greeting', "Hello! I'm your AI assistant. How can I help you today?");
    script.async = true;
    // Append to document head or body
    document.head.appendChild(script);
    // Cleanup function to remove script when component unmounts
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      // Also clean up the widget if it has a cleanup method
      const widgetRoot = document.getElementById('ai-widget-root');
      if (widgetRoot) {
        widgetRoot.remove();
      }
    };
  }, []);
  
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
              <Route
                path="/dashboard/create"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/prebuilt"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/my-crews"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/history"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/settings"
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