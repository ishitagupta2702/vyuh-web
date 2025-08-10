import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  RocketLaunchIcon, 
  ClockIcon, 
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import './DashboardLayout.css';

export default function DashboardLayout({ children }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon, current: location.pathname === '/dashboard' },
    { name: 'Launch Crew', href: '/dashboard/launch', icon: RocketLaunchIcon, current: location.pathname === '/dashboard/launch' },
    { name: 'History', href: '/dashboard/history', icon: ClockIcon, current: location.pathname === '/dashboard/history' },
    { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon, current: location.pathname === '/dashboard/settings' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleNavigation = (href) => {
    navigate(href);
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-layout">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="sidebar-overlay" />
        </div>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          {/* Sidebar header */}
          <div className="sidebar-header">
            <div className="sidebar-brand">
              <div className="brand-logo">
                V
              </div>
              <h1 className="brand-text">
                Vyuh
              </h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="sidebar-close"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="sidebar-nav">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`nav-item ${item.current ? 'active' : ''}`}
                >
                  <Icon className="nav-icon" />
                  <span>{item.name}</span>
                  {item.current && (
                    <div className="nav-indicator" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* User profile section */}
          <div className="sidebar-profile">
            <div className="profile-info">
              <div className="profile-avatar">
                <UserCircleIcon className="h-6 w-6 text-white" />
              </div>
              <div className="profile-details">
                <p className="profile-name">
                  {currentUser?.displayName || 'User'}
                </p>
                <p className="profile-email">
                  {currentUser?.email || 'user@example.com'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Top header */}
        <div className="main-header">
          <div className="header-content">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="mobile-menu-btn"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>

            {/* Page title */}
            <div className="page-title">
              {navigation.find(item => item.current)?.name || 'Dashboard'}
            </div>

            {/* Header actions */}
            <div className="header-actions">
              <button
                onClick={handleLogout}
                className="logout-btn"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="page-content">
          <div className="content-container">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
