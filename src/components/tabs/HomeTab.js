import React from 'react';
import { 
    PlusCircleIcon, 
    CubeTransparentIcon, 
    UsersIcon, 
    RocketLaunchIcon, 
    CheckCircleIcon,
    BellIcon,
    ChartBarIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

export default function HomeTab() {
  return (
    <div className="dashboard-grid">
      <section className="quick-actions-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          <div className="quick-action-card" data-action="create-crew">
            <div className="action-icon"><PlusCircleIcon className="h-8 w-8" /></div>
            <h3>Create New Crew</h3>
            <p>Build a custom AI agent team</p>
          </div>
          <div className="quick-action-card" data-action="prebuilt-crews">
            <div className="action-icon"><CubeTransparentIcon className="h-8 w-8" /></div>
            <h3>Browse Pre-built</h3>
            <p>Explore ready-made crews</p>
          </div>
          <div className="quick-action-card" data-action="my-crews">
            <div className="action-icon"><UsersIcon className="h-8 w-8" /></div>
            <h3>My Crews</h3>
            <p>Manage your teams</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <h2 className="section-title">Overview</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon"><UsersIcon className="h-6 w-6" /></div>
            <div className="stat-content">
              <h3>12</h3>
              <p>Total Crews</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><RocketLaunchIcon className="h-6 w-6" /></div>
            <div className="stat-content">
              <h3>47</h3>
              <p>Launches</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><CheckCircleIcon className="h-6 w-6" /></div>
            <div className="stat-content">
              <h3>89%</h3>
              <p>Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      <section className="recent-activity-section">
        <h2 className="section-title">Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon success"><CheckCircleIcon className="h-5 w-5" /></div>
            <div className="activity-content">
              <h4>Research Crew Completed</h4>
              <p>Market analysis for Product X finished successfully</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon info"><RocketLaunchIcon className="h-5 w-5" /></div>
            <div className="activity-content">
              <h4>Content Creation Crew Launched</h4>
              <p>Blog post generation crew is now active</p>
              <span className="activity-time">5 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon warning"><BellIcon className="h-5 w-5" /></div>
            <div className="activity-content">
              <h4>Analysis Crew Needs Attention</h4>
              <p>Data analysis crew requires additional input</p>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
