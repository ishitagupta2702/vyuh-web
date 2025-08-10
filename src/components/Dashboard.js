import React from "react";
import { useAuth } from "../hooks/useAuth";
import CrewBuilder from "./CrewBuilder";
import "./Dashboard.css";

export default function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Vyuh Dashboard</h1>
            <p>Welcome back, {currentUser?.displayName || currentUser?.email || "User"}!</p>
          </div>
          <div className="header-right">
            <div className="user-avatar">
              {currentUser?.displayName?.charAt(0) || currentUser?.email?.charAt(0) || "U"}
            </div>
          </div>
        </div>
      </header>
      
      <main className="dashboard-main">
        <CrewBuilder />
      </main>
    </div>
  );
}
