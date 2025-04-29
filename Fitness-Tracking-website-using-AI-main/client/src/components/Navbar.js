import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isAuthenticated = localStorage.getItem('token');

    return (
        <header>
            <Link to="/" className="logo">Fitness<span>Tracker</span></Link>
            <ul className="navbar">
                <li><Link to="/">Home</Link></li>
                <li><a href="#features">Key Features</a></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/dietPlanner">Diet Planner</Link></li>
                <li><Link to="/exercise">Exercise</Link></li>
                <li><a href="#about-us">About Us</a></li>
            </ul>
            <div className="top-btn">
                {isAuthenticated ? (
                    <button className="nav-btn" onClick={handleLogout}>Sign Out</button>
                ) : (
                    <Link to="/login" className="nav-btn">Join Us</Link>
                )}
            </div>
        </header>
    );
};

export default Navbar;
