// src/components/StatCard.jsx

import React from 'react';

// This component takes a 'label' and a 'value' as props to display them.
const StatCard = ({ label, value }) => {
  return (
    <div style={{
      border: '1px solid #e0e0e0',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
      minWidth: '200px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3 style={{ margin: 0, color: '#555', fontSize: '1rem' }}>{label}</h3>
      <p style={{ fontSize: '2.5em', margin: '10px 0 0', fontWeight: 'bold', color: '#333' }}>
        {value}
      </p>
    </div>
  );
};

export default StatCard;