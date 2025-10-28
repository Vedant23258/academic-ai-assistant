import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import './Dashboard.css';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchUserData(token);
  }, [navigate]);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="dashboard-content">
          <h1>Welcome to Academic AI Assistant</h1>
          {userData && (
            <div className="user-info">
              <h2>Hello, {userData.name}!</h2>
              <p>Email: {userData.email}</p>
            </div>
          )}
          <div className="features-grid">
            <div className="feature-card" onClick={() => navigate('/ai-chat')}>
              <h3>AI Chat Assistant</h3>
              <p>Get instant help with your academic questions</p>
            </div>
            <div className="feature-card" onClick={() => navigate('/math-solver')}>
              <h3>Math Solver</h3>
              <p>Solve complex mathematical problems with AI</p>
            </div>
            <div className="feature-card" onClick={() => navigate('/notes')}>
              <h3>Smart Notes</h3>
              <p>Organize and manage your study notes</p>
            </div>
            <div className="feature-card" onClick={() => navigate('/document-generator')}>
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
