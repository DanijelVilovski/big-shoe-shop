import './Navbar.css';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart } from "react-icons/fa"
import Dropdown from 'react-bootstrap/Dropdown';
import jwtDecode from 'jwt-decode'

export default function Navbar() {

    const [userInfo, setUserInfo] = useState({})

    var token = window.localStorage.getItem('LOCAL_STORAGE_TOKEN')
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.clear();
        navigate('/login')
    }

    useEffect(() => {
        try {
            setUserInfo(jwtDecode(token))   
        } catch (error) {
        }
    }, [token])

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
                    Men
                </Link>
                <Link to="/products" className="navbar_item">
                    Women
                </Link>
            </div>
            {token ? <div className="d-flex">
                <Dropdown>
                    <Link to="/cart">
                        <FaShoppingCart className="navbar_icon" id="dropdown-basic"/>                
                    </Link>
                    <Dropdown.Toggle>
                        <FaUser className="navbar_icon"/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="navbar_dropdown_menu">
                        <Dropdown.Item as={Link} to="/profile" className="navbar_dropdown_item">Profile</Dropdown.Item>
                        {token && userInfo.Role === 'admin' ? <div>
                            <Dropdown.Item as={Link} to="/admin/products" className="navbar_dropdown_item">Manage products</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/admin/orders" className="navbar_dropdown_item">Manage orders</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/admin/categories" className="navbar_dropdown_item">Manage categories</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/admin/users" className="navbar_dropdown_item">Manage users</Dropdown.Item>
                        </div>
                        : ""
                        }
                        <Dropdown.Item to="/login" className="navbar_dropdown_item" onClick={logOut}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div> 
            : 
            <div className="auth_buttons">
                <div className="login_btn">
                    <Link to="/login" className="navbar_item">Login</Link>
                </div>
                <div className="login_btn">
                    <Link to="/register" className="navbar_item">Register</Link>
                </div>
            </div>
            }    
        </div>
    )
}
