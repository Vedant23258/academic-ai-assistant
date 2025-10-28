import React, { useState, useEffect } from 'react';
import './Topbar.css';

const Topbar = () => {
  const [userData, setUserData] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <h2>Academic AI Assistant</h2>
      </div>
      <div className="topbar-right">
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <button>🔍</button>
        </div>
        <div className="user-profile" onClick={() => setShowProfile(!showProfile)}>
          <div className="user-avatar">
            {userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}
          </div>
          {showProfile && (
            <div className="profile-dropdown">
              <div className="profile-info">
                <p><strong>{userData?.name || 'User'}</strong></p>
                <p>{userData?.email || 'user@example.com'}</p>
              </div>
              <div className="profile-actions">
                <button>Settings</button>
                <button>Help</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
