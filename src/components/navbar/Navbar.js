import './Navbar.css';
import React from 'react'
import { Link } from 'react-router-dom';
import AdminLinks from '../../pages/admin/adminLinks/AdminLinks'

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
                <Link className="navbar_item" to="/admin/orders">Orders</Link>
            </div>
            
            <AdminLinks />

            <div className="auth_buttons">
                <div className="login_btn">
                    <Link to="/login">Login</Link>
                </div>
                <div className="login_btn">
                    <Link to="/register">Register</Link>
                </div>
            </div>
            
        </div>


        // <Link className="navbar_item" to="/admin/products">Action</Link>
        // <Link className="navbar_item" to="/admin/orders">Orders</Link>
        // <Link className="navbar_item" to="/admin/categories">Categories</Link>
        // <Link className="navbar_item" to="/admin/categories">Categories</Link>
    )
}
