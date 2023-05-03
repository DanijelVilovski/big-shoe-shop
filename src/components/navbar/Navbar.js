import './Navbar.css';
import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className="navbar">
            <Link to="/" className="logo">
                Big Shoe Shop
            </Link>
            <div className="links_container">
                <Link to="/products" className="navbar_item">
                    New
                </Link>
                <Link to="/products" className="navbar_item">
                    Sports
                </Link>
                <Link to="/products" className="navbar_item">
                    Men
                </Link>
                <Link to="/products" className="navbar_item">
                    Women
                </Link>
                <Link to="/products" className="navbar_item">
                    Kids
                </Link>
            </div>
            <div className="auth_buttons">
                <div className="login_btn">
                    <Link to="/login">Login</Link>
                </div>
                <div className="login_btn">
                    <Link to="/register">Register</Link>
                </div>
            </div>
            
        </div>
    )
}
