import React from 'react';
import UserTable from '../components/UserTable';

export default function Users() {
  return (
    <div className="users-page">
      <h1 className="dashboard-heading">Users</h1>
      <UserTable />
    </div>
  );
}