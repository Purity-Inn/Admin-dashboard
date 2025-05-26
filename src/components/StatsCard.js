import React from 'react';
import './StatsCards.css';

const statsData = [
  { title: 'Users', value: '1,204', color: '#4e91fc' },
  { title: 'Tasks', value: '342', color: '#61d4b3' },
  { title: 'Revenue', value: '$12,340', color: '#fcbf49' },
  { title: 'Messages', value: '87', color: '#e76f51' },
];

export default function StatsCards() {
  return (
    <div className="stats-container">
      {statsData.map((card, index) => (
        <div
          key={index}
          className="stats-card"
          style={{ borderTop: `4px solid ${card.color}` }}
        >
          <h3>{card.title}</h3>
          <p>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
