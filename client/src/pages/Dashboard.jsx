// src/pages/Dashboard.jsx

import React from 'react';
import StatCard from '../components/StatCard';

const Dashboard = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <header>
        <h1 style={{ color: '#333' }}>Crop Insurance Dashboard</h1>
      </header>
      <hr style={{ margin: '2rem 0' }} />
      <main style={{ display: 'flex', gap: '20px' }}>
        {/* Using the StatCard component with hardcoded dummy data */}
        <StatCard label="Total Farmers Enrolled" value="152" />
        <StatCard label="Pending Reports" value="34" />
        <StatCard label="Claims Approved" value="8" />
      </main>
    </div>
  );
};

export default Dashboard;