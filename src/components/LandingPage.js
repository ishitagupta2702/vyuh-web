import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Login from "./Login";
import Register from "./Register";
import "./LandingPage.css";

export default function LandingPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [animatedStats, setAnimatedStats] = useState({
    agents: 0,
    companies: 0,
    tasks: 0,
    satisfaction: 0
  });

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Animate stats on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats();
        }
      });
    });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);



  const animateStats = () => {
    const targetStats = {
      agents: 15000,
      companies: 2500,
      tasks: 500000,
      satisfaction: 98
    };

    Object.keys(targetStats).forEach((key) => {
      const target = targetStats[key];
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimatedStats(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }));
      }, 16);
    });
  };

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
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <div className="brand-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1>Vyuh</h1>
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/features" className="nav-link">Features</Link>
          <Link to="/pricing" className="nav-link">Pricing</Link>
        </div>
        <div className="nav-actions">
          {currentUser ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <button onClick={handleLogout} className="nav-btn primary">Logout</button>
            </>
          ) : (
            <>
              <button onClick={handleSignIn} className="nav-btn secondary">Sign In</button>
              <button onClick={handleGetStarted} className="nav-btn primary">Start Free Trial</button>
            </>
          )}
        </div>
      </nav>
      
      {/* Hero Section - Full Screen Immersive Experience */}
      <main className="hero-main">
        <section className="hero-section">
          {/* Floating particles for immersive effect */}
          <div className="floating-particle"></div>
          <div className="floating-particle"></div>
          <div className="floating-particle"></div>
          
          <div className="hero-content">
            <h1 className="hero-title">
              Your Agent-as-a-Service <span className="highlight">Command Center</span>
            </h1>
            <p className="hero-subtitle">
              Deploy intelligent AI agents instantly. Scale your automation. Launch custom crews that work while you sleep.
            </p>
            <p className="hero-description">
              Transform your business operations with Vyuh's powerful agent-as-a-service platform. From customer support to data analysis, our AI agents handle complex tasks autonomously.
            </p>
            
            <div className="hero-actions">
              <button onClick={handleGetStarted} className="cta-btn primary">
                Launch Your First Crew →
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Main Content for other sections */}
      <main className="landing-main">


        {/* Crew Showcase Section */}
        <section className="crew-showcase-section">
          <div className="section-header">
            <h2>See Your Crews in Action</h2>
            <p>Monitor your AI workforce in real-time. Every agent operates with complete transparency, giving you full visibility into their performance.</p>
          </div>
          <div className="crew-grid">
            <div className="crew-card">
              <div className="crew-status active">
                <div className="status-dot green"></div>
                <span className="status-badge">Active</span>
              </div>
              <h3>Customer Support Crew</h3>
              <div className="crew-metrics">
                <div className="metric">
                  <span className="metric-label">Current Task:</span>
                  <span className="metric-value">Resolving billing inquiries</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Conversations:</span>
                  <span className="metric-value">47</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Satisfaction:</span>
                  <span className="metric-value">98%</span>
                </div>
              </div>
              <div className="crew-actions">
                <button className="crew-btn primary">View Details</button>
                <button className="crew-btn secondary">Configure</button>
              </div>
            </div>
            <div className="crew-card">
              <div className="crew-status processing">
                <div className="status-dot blue"></div>
                <span className="status-badge">Processing</span>
              </div>
              <h3>Data Analysis Crew</h3>
              <div className="crew-metrics">
                <div className="metric">
                  <span className="metric-label">Current Task:</span>
                  <span className="metric-value">Market trend analysis</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Reports Today:</span>
                  <span className="metric-value">15</span>
                </div>
              </div>
              <div className="crew-actions">
                <button className="crew-btn primary">View Details</button>
                <button className="crew-btn secondary">Configure</button>
              </div>
            </div>
            <div className="crew-card">
              <div className="crew-status active">
                <div className="status-dot purple"></div>
                <span className="status-badge">Active</span>
              </div>
              <h3>Content Creation Crew</h3>
              <div className="crew-metrics">
                <div className="metric">
                  <span className="metric-label">Current Task:</span>
                  <span className="metric-value">SEO optimization</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Articles/Week:</span>
                  <span className="metric-value">12</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Crew Builder Section */}
        <section className="crew-builder-section">
          <div className="section-content">
            <div className="content-right">
              <div className="dashboard-preview">
                <div className="dashboard-header">
                  <div className="metric-cards">
                    <div className="metric-card">
                      <span className="metric-number">2100</span>
                      <span className="metric-label">TOTAL SESSIONS</span>
                      <span className="metric-change positive">+14%</span>
                    </div>
                    <div className="metric-card">
                      <span className="metric-number">1228</span>
                      <span className="metric-label">TOTAL USERS</span>
                      <span className="metric-change negative">-3%</span>
                    </div>
                    <div className="metric-card">
                      <span className="metric-number">6.92</span>
                      <span className="metric-label">AVG. SESSION DURATION</span>
                      <span className="metric-change positive">+1%</span>
                    </div>
                    <div className="metric-card">
                      <span className="metric-number">2.3</span>
                      <span className="metric-label">AVG. REQUESTS RECEIVED</span>
                      <span className="metric-change positive">+21%</span>
                    </div>
                  </div>
                </div>
                <div className="dashboard-charts">
                  <div className="chart-section">
                    <h4>Sessions Overview</h4>
                    <div className="chart-placeholder">
                      <div className="chart-line"></div>
                      <div className="chart-points">
                        <div className="chart-point"></div>
                        <div className="chart-point"></div>
                        <div className="chart-point"></div>
                        <div className="chart-point"></div>
                        <div className="chart-point"></div>
                      </div>
                    </div>
                  </div>
                  <div className="chart-section">
                    <h4>Views by Browser</h4>
                    <div className="chart-placeholder">
                      <div className="radar-chart">
                        <div className="radar-line"></div>
                        <div className="radar-line"></div>
                        <div className="radar-line"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-left">
              <h2>Launch Your Custom Agent Crew</h2>
              <p>Build specialized teams of AI agents designed for your specific business needs. Our intuitive crew builder lets you combine different agent types, set custom workflows, and deploy them in minutes.</p>
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="feature-text">
                    <h4>Drag & Drop Interface</h4>
                    <p>Create complex agent workflows with our visual builder. No coding required.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="feature-text">
                    <h4>Pre-built Templates</h4>
                    <p>Choose from dozens of proven crew templates for common business scenarios.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="feature-text">
                    <h4>Real-time Collaboration</h4>
                    <p>Watch your agents work together seamlessly with automated handoffs and approvals.</p>
                  </div>
                </div>
              </div>
              <button onClick={handleGetStarted} className="cta-btn primary">
                Build Your Crew →
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="section-header">
            <h2>Why Choose Vyuh?</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Enterprise-Grade Security</h3>
              <p>Bank-level encryption, SOC 2 compliance, and granular access controls protect your data.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Scalable Infrastructure</h3>
              <p>From startup to enterprise, handle thousands of concurrent agents without breaking a sweat.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>24/7 Monitoring</h3>
              <p>Real-time dashboards, alerts, and performance analytics keep you in complete control.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14h9l-1 8 9-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Seamless Integration</h3>
              <p>Connect to your existing tools in minutes with 500+ pre-built connectors.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Cost Optimization</h3>
              <p>Pay only for what you use with intelligent resource allocation for maximum efficiency.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Expert Support</h3>
              <p>Get help from our AI specialists with onboarding, optimization, and ongoing support.</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <div className="section-header">
            <h2>Trusted by Forward-Thinking Companies</h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <p>"Vyuh transformed our customer support operations. Our agents handle 80% of inquiries automatically, and customer satisfaction has never been higher."</p>
              <div className="testimonial-author">
                <strong>Sarah Chen</strong>
                <span>CTO at TechFlow</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <p>"The visibility into our agent workforce is incredible. We can see exactly what's happening, optimize performance, and scale our operations with confidence."</p>
              <div className="testimonial-author">
                <strong>Marcus Rodriguez</strong>
                <span>Operations Director at ScaleUp Inc</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <p>"Our custom agent crew processes complex financial reports in hours instead of days. The ROI was immediate and substantial."</p>
              <div className="testimonial-author">
                <strong>Dr. Emily Watson</strong>
                <span>Head of Analytics at DataCorp</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="pricing-section">
          <div className="section-header">
            <h2>Simple, Transparent Pricing</h2>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>Starter</h3>
              <div className="pricing-amount">
                <span className="amount">$99</span>
                <span className="period">/month</span>
              </div>
              <ul className="pricing-features">
                <li>✓ Up to 5 active agents</li>
                <li>✓ Basic monitoring dashboard</li>
                <li>✓ Email support</li>
                <li>✓ 50 integrations included</li>
              </ul>
              <button className="pricing-btn">Get Started</button>
            </div>
            <div className="pricing-card featured">
              <div className="featured-badge">Most Popular</div>
              <h3>Professional</h3>
              <div className="pricing-amount">
                <span className="amount">$299</span>
                <span className="period">/month</span>
              </div>
              <ul className="pricing-features">
                <li>✓ Up to 25 active agents</li>
                <li>✓ Advanced analytics</li>
                <li>✓ Priority support</li>
                <li>✓ Unlimited integrations</li>
                <li>✓ Custom crew templates</li>
              </ul>
              <button className="pricing-btn featured">Get Started</button>
            </div>
            <div className="pricing-card">
              <h3>Enterprise</h3>
              <div className="pricing-amount">
                <span className="amount">Custom</span>
              </div>
              <ul className="pricing-features">
                <li>✓ Unlimited agents</li>
                <li>✓ Dedicated success manager</li>
                <li>✓ Custom integrations</li>
                <li>✓ SLA guarantees</li>
                <li>✓ White-label options</li>
              </ul>
              <button className="pricing-btn">Contact Sales</button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Build Your Agent Workforce?</h2>
            <p>Join thousands of businesses already using Vyuh to automate their operations, scale their teams, and accelerate their growth.</p>
            <div className="cta-actions">
              <button onClick={handleGetStarted} className="cta-btn primary">Start Free Trial →</button>
              <button className="cta-btn secondary">Learn More</button>
            </div>
            <div className="cta-guarantees">
              <span>✓ No credit card required</span>
              <span>✓ 14-day free trial</span>
              <span>✓ Cancel anytime</span>
              <span>✓ 99.9% uptime guarantee</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="brand-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Vyuh</h3>
            <p>The future of business automation is here. Deploy intelligent agents and scale your operations effortlessly.</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li><Link to="/features">Features</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/integrations">Integrations</Link></li>
                <li><Link to="/api">API</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Support</h4>
              <ul>
                <li><Link to="/docs">Documentation</Link></li>
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/community">Community</Link></li>
                <li><Link to="/status">Status</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Vyuh. All rights reserved.</p>
        </div>
      </footer>

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