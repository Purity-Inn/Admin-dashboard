// src/components/UserTable.js
import React, { useState, useEffect } from 'react';
import './UserTable.css';

export default function UserTable() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Jane Doe', email: 'jane@example.com' },
    { id: 2, name: 'John Smith', email: 'john@example.com' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  // Simulate role from localStorage (normally set at login)
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const role = currentUser?.role || 'editor'; // default to 'editor' if not set

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const addUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { ...newUser, id: Date.now() }]);
      setNewUser({ name: '', email: '' });
    }
  };

  const deleteUser = (id) => {
    if (role === 'admin') {
      setUsers(users.filter((user) => user.id !== id));
    } else {
      alert('You do not have permission to delete users.');
    }
  };

  return (
    <div className="user-table">
      <h2>Users</h2>

      <div className="user-form">
        <input
          type="text"
          name="name"
          value={newUser.name}
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <button onClick={addUser}>Add User</button>
      </div>

      <input
        type="text"
        placeholder="Search users..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>#</th><th>Name</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, i) => (
            <tr key={user.id}>
              <td>{i + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {role === 'admin' ? (
                  <button className="delete-btn" onClick={() => deleteUser(user.id)}>
                    Delete
                  </button>
                ) : (
                  <span className="readonly-text">No Access</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

