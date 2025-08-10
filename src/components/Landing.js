import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="nav-brand">
          <h1>Vyuh</h1>
        </div>
        <div className="nav-actions">
          <Link to="/login" className="nav-link">Sign In</Link>
          <Link to="/register" className="nav-btn">Get Started</Link>
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
            <Link to="/register" className="cta-btn primary">Start Building</Link>
            <Link to="/login" className="cta-btn secondary">Learn More</Link>
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
    </div>
  );
}
