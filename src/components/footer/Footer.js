import './Footer.css';
import React from 'react'
import {FaFacebook, FaInstagram, FaTwitter, FaGithub} from "react-icons/fa"

export default function Footer() {
    return (           
        <div className="footer">
            <div className="footer_menu">
            <div className="col_1">
                <div className="title">
                    Company  
                </div>  
                <ul>
                    <li><a href="/#">About</a></li>
                    <li><a href="/#">Contact</a></li>
                    <li><a href="/#">Profile</a></li>
                    <li><a href="/#">Blog</a></li>
                </ul>
            </div>
            <div className="col_2">
                <div className="title">
                    Help & Support 
                </div>  
                <ul>
                    <li><a href="/#">Support Center</a></li>
                    <li><a href="/#">FAQ</a></li>
                    <li><a href="/#">Call Center</a></li>
                    <li><a href="/#">Terms & Conditions</a></li>
                </ul>
            </div>
            <div className="col_3">
                <div className="title">
                    Informations  
                </div>  
                <ul>
                    <li><a href="/#">About us</a></li>
                    <li><a href="/#">Contact</a></li>
                    <li><a href="/#">Mision and Vision</a></li>
                    <li><a href="/#">Values</a></li>
                    <li><a href="/#">Locations</a></li>
                    <li><a href="/#">Frequently asked</a></li>
                </ul>
            </div>
            <div className="col_4">
                <div className="title">
                    Shopping  
                </div>  
                <ul>
                    <li><a href="/#">Ordering instructions</a></li>
                    <li><a href="/#">Instructions for BSS card</a></li>
                    <li><a href="/#">Methods of payment</a></li>
                    <li><a href="/#">Delivery</a></li>
                    <li><a href="/#">Exchange and return</a></li>
                </ul>
            </div>
            </div>
            <div className="social_media">
                <ul>
                    <li><a className="facebook" href="/#"><FaFacebook/></a></li>
                    <li><a className="twitter" href="/#"><FaInstagram/></a></li>
                    <li><a className="instagram" href="/#"><FaTwitter/></a></li>
                    <li><a className="whatsapp" href="/#"><FaGithub/></a></li>
                </ul>
                <p>Copyright © Big Shoe Shop</p>
            </div>
        </div>
    )
}
