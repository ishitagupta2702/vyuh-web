import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Layout.css";

export default function Layout({ children }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Don't show navigation on landing page since it has its own
  const isLandingPage = location.pathname === "/";

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <div className="layout">
      {!isLandingPage && (
        <nav className="main-nav">
          <div className="nav-container">
            <div className="nav-brand">
              <Link to="/" className="brand-link">
                <h1>Vyuh</h1>
              </Link>
            </div>
            
            <div className="nav-menu">
              {currentUser ? (
                <>
                  <Link to="/dashboard" className="nav-link">Dashboard</Link>
                  <Link to="/profile" className="nav-link">Profile</Link>
                  <Link to="/demo" className="nav-link">Demo</Link>
                  <Link to="/notifications" className="nav-link">Notifications</Link>
                  <Link to="/test-notifications" className="nav-link">Test</Link>
                  <button onClick={handleLogout} className="nav-btn logout">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">Sign In</Link>
                  <Link to="/register" className="nav-btn">Get Started</Link>
                  <Link to="/demo" className="nav-link">Demo</Link>
                  <Link to="/notifications" className="nav-link">Notifications</Link>
                  <Link to="/test-notifications" className="nav-link">Test</Link>
                </>
              )}
            </div>
          </div>
        </nav>
      )}
      
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
