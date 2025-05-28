import React from 'react';

export default function Header({ user, onLogout }) {
  // Get user from props or localStorage as a fallback
  const currentUser = user || JSON.parse(localStorage.getItem('user') || '{}');
  const userEmail = currentUser.email || localStorage.getItem('email') || '';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    if (onLogout) onLogout();
    window.location.href = '/login';
  };

  return (
    <div className="header">
      <h1>Admin Dashboard</h1>
      <div className="user-info">
        <span>
          {currentUser?.name ? currentUser.name : 'No user'}
          {userEmail && (
            <span style={{ color: '#94a3b8', marginLeft: 8, fontSize: '0.95em' }}>
              ({userEmail})
            </span>
          )}
        </span>
        <button
          onClick={handleLogout}
          style={{
            marginLeft: 16,
            padding: '6px 16px',
            borderRadius: 6,
            border: 'none',
            background: '#ef4444',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}