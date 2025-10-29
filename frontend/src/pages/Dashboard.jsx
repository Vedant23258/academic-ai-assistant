import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="dashboard-content">
          <h1>Welcome to Academic AI Assistant</h1>
          <div className="features-grid">
            <div className="feature-card">
              <h3>AI Chat Assistant</h3>
              <p>Get instant help with your academic questions</p>
            </div>
            <div className="feature-card">
              <h3>Math Solver</h3>
              <p>Solve complex mathematical problems with AI</p>
            </div>
            <div className="feature-card">
              <h3>Smart Notes</h3>
              <p>Organize and manage your study notes</p>
            </div>
            <div className="feature-card">
              <h3>Document Generator</h3>
              <p>Create academic documents with AI assistance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
