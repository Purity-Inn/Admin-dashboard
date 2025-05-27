import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { name: 'Mon', users: 30 },
  { name: 'Tue', users: 45 },
  { name: 'Wed', users: 60 },
  { name: 'Thu', users: 40 },
  { name: 'Fri', users: 80 },
  { name: 'Sat', users: 55 },
  { name: 'Sun', users: 70 },
];

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1 className="dashboard-heading">Dashboard</h1>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Bar dataKey="users" fill="#00bcd4" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>


    </div>
  );
}

