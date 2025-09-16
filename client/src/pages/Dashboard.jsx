// src/pages/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalFarmers: '...',
    pendingReports: '...',
    claimsApproved: '...',
  });
  const [pendingReports, setPendingReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBlockchainData = async () => {
      console.log('Fetching live data from blockchain...');
      setTimeout(() => {
        setDashboardData({
          totalFarmers: '155',
          pendingReports: '42',
          claimsApproved: '10',
        });
        setPendingReports([
          { id: 1, event: 'Drought', date: '2023-09-01', farmerId: 101 },
          { id: 2, event: 'Flood', date: '2023-09-05', farmerId: 102 },
          { id: 3, event: 'Drought', date: '2023-09-06', farmerId: 103 },
        ]);
      }, 1000);
    };
    fetchBlockchainData();
  }, []);

  const filteredReports = pendingReports.filter(report =>
    report.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.farmerId.toString().includes(searchTerm)
  );

  const handleApproveClaim = () => {
    alert("Simulating transaction to approve claim on the blockchain...");
  };

  return (
    <div style={styles.dashboardContainer}>
      <header style={styles.header}>
        <h1 style={styles.heading}>Crop Insurance Dashboard</h1>
      </header>
      <div style={styles.mainContent}>
        <section style={styles.statsSection}>
          <h2 style={styles.sectionHeading}>Key Metrics</h2>
          <div style={styles.statsGrid}>
            <StatCard label="Total Farmers Enrolled" value={dashboardData.totalFarmers} />
            <StatCard label="Pending Reports" value={dashboardData.pendingReports} />
            <StatCard label="Claims Approved" value={dashboardData.claimsApproved} />
          </div>
        </section>

        <section style={styles.actionsSection}>
          <h2 style={styles.sectionHeading}>Admin Actions</h2>
          <button onClick={handleApproveClaim} style={styles.actionButton}>
            Approve Claims for an Event
          </button>
        </section>

        <section style={styles.reportsSection}>
          <h2 style={styles.sectionHeading}>Pending Reports</h2>
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <ul style={styles.reportList}>
            {filteredReports.map(report => (
              <li key={report.id} style={styles.reportItem}>
                <span>**Report ID:** {report.id}</span>
                <span>**Event:** {report.event}</span>
                <span>**Farmer ID:** {report.farmerId}</span>
                <span>**Date:** {report.date}</span>
              </li>
            ))}
            {filteredReports.length === 0 && <p style={styles.noReports}>No reports found.</p>}
          </ul>
        </section>
      </div>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    padding: '2rem',
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#1a1a2e',
    color: '#e0e0e0',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // This centers the child elements horizontally
  },
  header: {
    marginBottom: '2rem',
    width: '100%',
    textAlign: 'center',
  },
  heading: {
    color: '#b8c6ff',
    fontSize: '2.5rem',
    fontWeight: '300',
  },
  mainContent: {
    // This is the key change. We remove width: '100%' and let the parent container
    // handle the centering. The maxWidth ensures it doesn't get too wide.
    maxWidth: '1200px', 
    width: '100%', // Re-adding a width here for a responsive layout.
  },
  sectionHeading: {
    color: '#84aaff',
    fontSize: '1.5rem',
    marginBottom: '1rem',
    borderBottom: '1px solid #3e4468',
    paddingBottom: '0.5rem',
  },
  statsSection: {
    marginBottom: '3rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  actionsSection: {
    marginBottom: '3rem',
  },
  actionButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  reportsSection: {
    marginBottom: '3rem',
  },
  searchInput: {
    width: '100%',
    padding: '12px',
    marginBottom: '1.5rem',
    borderRadius: '8px',
    border: '1px solid #3e4468',
    backgroundColor: '#2e2e4a',
    color: '#fff',
    fontSize: '16px',
  },
  reportList: {
    listStyleType: 'none',
    padding: 0,
  },
  reportItem: {
    backgroundColor: '#2e2e4a',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  noReports: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#aaa',
  },
};

export default Dashboard;