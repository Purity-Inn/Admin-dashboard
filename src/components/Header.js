export default function Header({ user, onLogout }) {
  // Get user from props or localStorage as a fallback
  const currentUser = user || JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="header">
      <h1>Admin Dashboard</h1>
      <div className="user-info">
        <span>{currentUser?.name ? currentUser.name : 'No user'}</span>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            if (onLogout) onLogout();
            window.location.href = '/login';
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
