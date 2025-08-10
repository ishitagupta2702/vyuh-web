import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Login from "./Login";
import Register from "./Register";
import "./LandingPage.css";

export default function LandingPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = () => {
    if (currentUser) {
      navigate("/dashboard");
    } else {
      setShowLoginModal(true);
    }
  };

  const handleGetStarted = () => {
    if (currentUser) {
      navigate("/dashboard");
    } else {
      setShowRegisterModal(true);
    }
  };

  const closeModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <h1>Vyuh</h1>
          </Link>
        </div>
        <div className="nav-actions">
          {currentUser ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <button onClick={handleLogout} className="nav-btn primary">Logout</button>
            </>
          ) : (
            <>
              <button onClick={handleSignIn} className="nav-link">Sign In</button>
              <button onClick={handleGetStarted} className="nav-btn primary">Get Started</button>
            </>
          )}
        </div>
      </nav>
      
      <main className="landing-main">
        <div className="hero-section">
          <h1 className="hero-title">
            Build and Launch AI Agent Crews
          </h1>
          <p className="hero-subtitle">
            Solve complex problems with collaborative AI agents. Input your idea, select your crew, and watch them work together.
          </p>
          <div className="hero-actions">
            <button onClick={handleGetStarted} className="cta-btn primary">
              {currentUser ? "Go to Dashboard" : "Start Building"}
            </button>
            <button onClick={handleSignIn} className="cta-btn secondary">
              {currentUser ? "View Profile" : "Learn More"}
            </button>
          </div>
        </div>
        
        <div className="features-section">
          <h2>Why Choose Vyuh?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI Agent Selection</h3>
              <p>Choose from a curated collection of specialized AI agents</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Instant Execution</h3>
              <p>Launch your crew and get results in real-time</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Problem Solving</h3>
              <p>Input any problem and let AI agents collaborate to solve it</p>
            </div>
          </div>
        </div>
      </main>

      {/* Authentication Modals */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModals}>×</button>
            <Login />
          </div>
        </div>
      )}

      {showRegisterModal && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModals}>×</button>
            <Register />
          </div>
        </div>
      )}
    </div>
  );
}
