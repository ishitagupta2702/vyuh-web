import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useLocation } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import { HomeTab, CreateCrewTab, PrebuiltCrewsTab, MyCrewsTab } from "./tabs";
import "./Dashboard.css";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const location = useLocation();

  const renderContent = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/dashboard':
        return <HomeTab />;
      case '/dashboard/create':
        return <CreateCrewTab />;
      case '/dashboard/prebuilt':
        return <PrebuiltCrewsTab />;
      case '/dashboard/my-crews':
        return <MyCrewsTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <DashboardLayout>
      <div className="dashboard-content">
        <div className="welcome-section">
          <h1>Welcome back!</h1>
          <p>
            Ready to build your next AI crew, {currentUser?.displayName || currentUser?.email || "User"}?
          </p>
        </div>
        
        {/* Content based on route */}
        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </DashboardLayout>
  );
}
