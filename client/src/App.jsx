// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* This sets the Dashboard as the default page */}
        <Route path="/" element={<Dashboard />} />
        {/* You can add more routes here later for other pages */}
      </Routes>
    </Router>
  );
}

export default App;