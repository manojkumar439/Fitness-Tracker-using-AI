import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import DietPlanner from './components/DietPlanner';
import Exercise from './components/Exercise';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dietPlanner" element={<DietPlanner />} />
        <Route path="/exercise" element={<Exercise />} />
      </Routes>
    </Router>
  );
}

export default App;
