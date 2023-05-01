import './Navbar.css';
import React from 'react'

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="logo">
                Big Shoe Shop
            </div>
            <div className="navbar_container">
                <div className="navbar_item">
                    New
                </div>
                <div className="navbar_item">
                    Sports
                </div>
                <div className="navbar_item">
                    Men
                </div>
                <div className="navbar_item">
                    Women
                </div>
                <div className="navbar_item">
                    Kids
                </div>
            </div>
            <div className="login_btn">
                <a href="/#">Login</a>
            </div>
        </div>
    )
}
