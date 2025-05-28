import React, { useEffect, useState } from 'react';
import api from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State for creating a user
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [creating, setCreating] = useState(false);

  // State for editing a user
  const [editingUserId, setEditingUserId] = useState(null);
  const [editUser, setEditUser] = useState({ name: '', email: '' });
  const [savingEdit, setSavingEdit] = useState(false);

  // State for search/filter
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination
  const [page, setPage] = useState(1);
  const usersPerPage = 10;

  // Role-based UI
  const currentUserRole = localStorage.getItem('role') || 'admin'; // fallback for demo

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const res = await api.get('/users');
        setUsers(res.data);
      } catch (err) {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  // Handle input changes for the create user form
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Handle create user form submission
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await api.post('/users', newUser);
      setUsers([...users, res.data]);
      setNewUser({ name: '', email: '', password: '' });
      toast.success('User created!');
    } catch (err) {
      toast.error('Failed to create user');
    } finally {
      setCreating(false);
    }
  };

  // Handle delete user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter(user => (user._id || user.id) !== userId));
      toast.success('User deleted!');
    } catch (err) {
      toast.error('Failed to delete user');
    }
  };

  // Edit handlers
  const startEdit = (user) => {
    setEditingUserId(user._id || user.id);
    setEditUser({ name: user.name, email: user.email });
  };

  const cancelEdit = () => {
    setEditingUserId(null);
    setEditUser({ name: '', email: '' });
  };

  const handleEditInputChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const saveEdit = async (userId) => {
    setSavingEdit(true);
    try {
      const res = await api.put(`/users/${userId}`, editUser);
      setUsers(users.map(u =>
        (u._id || u.id) === userId ? { ...u, ...res.data } : u
      ));
      cancelEdit();
      toast.success('User updated!');
    } catch (err) {
      toast.error('Failed to update user');
    } finally {
      setSavingEdit(false);
    }
  };

  // Filter users by search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const paginatedUsers = filteredUsers.slice((page - 1) * usersPerPage, page * usersPerPage);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="users-page">
      <h1 className="dashboard-heading">Users</h1>

      {/* Create User Form */}
      {currentUserRole === 'admin' && (
        <form onSubmit={handleCreateUser} style={{ marginBottom: '2rem' }}>
          <input
            name="name"
            placeholder="Name"
            value={newUser.name}
            onChange={handleInputChange}
            required
            style={{ marginRight: '1rem' }}
          />
          <input
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleInputChange}
            required
            style={{ marginRight: '1rem' }}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={handleInputChange}
            required
            style={{ marginRight: '1rem' }}
          />
          <button type="submit" disabled={creating}>Add User</button>
        </form>
      )}

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{
          marginBottom: '1.5rem',
          padding: '0.5rem 1rem',
          borderRadius: 6,
          border: '1px solid #333',
          width: '100%',
          maxWidth: 320,
          background: '#18181b',
          color: '#fff'
        }}
      />

      {/* Users Table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map(user => (
            <tr key={user._id || user.id}>
              <td>
                {editingUserId === (user._id || user.id) ? (
                  <input
                    name="name"
                    value={editUser.name}
                    onChange={handleEditInputChange}
                    required
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUserId === (user._id || user.id) ? (
                  <input
                    name="email"
                    value={editUser.email}
                    onChange={handleEditInputChange}
                    required
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUserId === (user._id || user.id) ? (
                  <>
                    {(currentUserRole === 'admin' || currentUserRole === 'editor') && (
                      <button onClick={() => saveEdit(user._id || user.id)} disabled={savingEdit}>
                        Save
                      </button>
                    )}
                    <button onClick={cancelEdit} style={{ marginLeft: 8 }}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    {(currentUserRole === 'admin' || currentUserRole === 'editor') && (
                      <button
                        style={{
                          color: 'white',
                          background: '#3b82f6',
                          border: 'none',
                          borderRadius: 4,
                          padding: '4px 10px',
                          cursor: 'pointer',
                          marginRight: 8
                        }}
                        onClick={() => startEdit(user)}
                      >
                        Edit
                      </button>
                    )}
                    {currentUserRole === 'admin' && (
                      <button
                        style={{
                          color: 'white',
                          background: '#ef4444',
                          border: 'none',
                          borderRadius: 4,
                          padding: '4px 10px',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleDeleteUser(user._id || user.id)}
                      >
                        Delete
                      </button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: 16 }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
        <span style={{ margin: '0 8px' }}>Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page * usersPerPage >= filteredUsers.length}
        >
          Next
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}