import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  RocketLaunchIcon, 
  ClockIcon, 
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  UserGroupIcon,
  CubeIcon
} from '@heroicons/react/24/outline';
import './DashboardLayout.css';

export default function DashboardLayout({ children }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(location.pathname);

  // Update active tab when location changes
  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  // Add dashboard-active class to body for full-screen styling
  useEffect(() => {
    document.body.classList.add('dashboard-active');
    document.documentElement.classList.add('dashboard-active');
    
    return () => {
      document.body.classList.remove('dashboard-active');
      document.documentElement.classList.remove('dashboard-active');
    };
  }, []);

  const navigation = [
    { name: 'Home', href: '/dashboard', tabId: 'home', icon: HomeIcon },
    { name: 'Create Crew', href: '/dashboard/create', tabId: 'create-crew', icon: RocketLaunchIcon },
    { name: 'Pre-built Crews', href: '/dashboard/prebuilt', tabId: 'prebuilt-crews', icon: CubeIcon },
    { name: 'My Crews', href: '/dashboard/my-crews', tabId: 'my-crews', icon: UserGroupIcon },
    { name: 'History', href: '/dashboard/history', tabId: 'history', icon: ClockIcon },
    { name: 'Settings', href: '/dashboard/settings', tabId: 'settings', icon: Cog6ToothIcon },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleNavigation = (href, tabId) => {
    navigate(href);
    setActiveTab(href); // Or use tabId if you prefer
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
                  onClick={() => handleNavigation(item.href, item.tabId)}
                  className={`nav-item ${activeTab === item.href ? 'active' : ''}`}
                >
                  <Icon className="nav-icon" />
                  <span>{item.name}</span>
                  {activeTab === item.href && (
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
            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
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
              {navigation.find(item => activeTab === item.href)?.name || 'Dashboard'}
            </div>

            {/* Header actions */}
            <div className="header-actions">
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
