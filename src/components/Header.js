// in Header.js
export default function Header({ user, onLogout }) {
  return (
    <div className="header">
      <h1>Admin Dashboard</h1>
      <div className="user-info">
        <span>{user.name}</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}
// src/components/Header.js
<button onClick={() => {
  localStorage.removeItem('token');
  window.location.href = '/login';
}}>
  Logout
</button>
