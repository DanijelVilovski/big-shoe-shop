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
                    <ul className="footer_list">
                        <li><a className="footer_item" href="/#">About</a></li>
                        <li><a className="footer_item" href="/#">Contact</a></li>
                        <li><a className="footer_item" href="/#">Profile</a></li>
                        <li><a className="footer_item" href="/#">Blog</a></li>
                    </ul>
                </div>
                <div className="col_2">
                    <div className="title">
                        Help & Support 
                    </div>  
                    <ul className="footer_list">
                        <li><a className="footer_item" href="/#">Support Center</a></li>
                        <li><a className="footer_item" href="/#">FAQ</a></li>
                        <li><a className="footer_item" href="/#">Call Center</a></li>
                        <li><a className="footer_item" href="/#">Terms & Conditions</a></li>
                    </ul>
                </div>
                <div className="col_3">
                    <div className="title">
                        Informations  
                    </div>  
                    <ul className="footer_list">
                        <li><a className="footer_item" href="/#">About us</a></li>
                        <li><a className="footer_item" href="/#">Contact</a></li>
                        <li><a className="footer_item" href="/#">Mision and Vision</a></li>
                        <li><a className="footer_item" href="/#">Values</a></li>
                        <li><a className="footer_item" href="/#">Locations</a></li>
                        <li><a className="footer_item" href="/#">Frequently asked</a></li>
                    </ul>
                </div>
                <div className="col_4">
                    <div className="title">
                        Shopping  
                    </div>  
                    <ul className="footer_list">
                        <li><a className="footer_item" href="/#">Ordering instructions</a></li>
                        <li><a className="footer_item" href="/#">Instructions for BSS card</a></li>
                        <li><a className="footer_item" href="/#">Methods of payment</a></li>
                        <li><a className="footer_item" href="/#">Delivery</a></li>
                        <li><a className="footer_item" href="/#">Exchange and return</a></li>
                    </ul>
                </div>
            </div>
            <div className="social_media">
                <ul className="footer_list">
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
