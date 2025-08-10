import React from "react";
import { useAuth } from "../hooks/useAuth";
import CrewBuilder from "./CrewBuilder";
import DashboardLayout from "./DashboardLayout";
import "./Dashboard.css";

export default function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <DashboardLayout>
      <div className="dashboard-content">
        <div className="welcome-section">
          <h1>Welcome back!</h1>
          <p>
            Ready to build your next AI crew, {currentUser?.displayName || currentUser?.email || "User"}?
          </p>
        </div>
        
        <CrewBuilder />
      </div>
    </DashboardLayout>
  );
}
