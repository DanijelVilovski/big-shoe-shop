import React, { useState, useEffect } from 'react';
import './Register.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode'

export default function Register() {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const navigate = useNavigate();
    var token = "";

    const handleSubmit = (e) => {
        e.preventDefault()
        const response = {
            email,
            username,
            password,
            firstName,
            lastName
        }
        fetch('https://localhost:7079/User/register', {
        method: 'POST',
        body: JSON.stringify(response),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.status === 200) {
                token = jwtDecode(json.transferObject)
                setOrderAndAddress();
                navigate('/login');
            } else if (json.status === 409) {
                document.getElementById('register-username-span').innerHTML = json.message;        
                document.getElementById('register-email-span').innerHTML = "";        
            } else if (json.status === 400) {
                document.getElementById('register-email-span').innerHTML = json.message;  
                document.getElementById('register-username-span').innerHTML = "";        
            }
        })
        
    }

    const setOrderAndAddress = () => {
        axios.post('https://localhost:7079/UserAddress/addUserAddress', {
            userId: Number(token.UserId),
            address: null,
            city: null,
            postalCode: null,
            country: null,
            phone: null
        })
        .then(response => {
            if(response.status === 200) {
                axios.get(`https://localhost:7079/UserAddress/useraddress/${Number(token.UserId)}`)
                .then(response => {
                    axios.post('https://localhost:7079/Order/addOrder', {
                        userId: Number(token.UserId),
                        orderDate: '2023-05-14',
                        userAddressId: response.data.transferObject.id,
                        shippingMethodId: 1,
                        orderStatusId: 1,
                        orderTotal: 0
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                })
                .catch(err => {
                    console.log(err)
                })
            } 
        })
        .catch(function (error) {
            console.log(error);
        });


        // axios.get(`https://localhost:7079/UserAddress/useraddress/${Number(token.UserId)}`)
        // .then(response => {
        //     console.log(response.data)
        //     setAddedAddress(response.data)
        // })
        // .catch(err => {
        //     console.log(err)
        // })



        // axios.post('https://localhost:7079/Order/addOrder', {
        //     userId: Number(token.UserId),
        //     orderDate: '2023-05-14',
        //     userAddressId: addedAddress.transferObject.id,
        //     shippingMethodId: 1,
        //     orderStatusId: 1,
        //     orderTotal: 0
        // })
        // .then(function (response) {
        //     console.log(response);
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
    }

    return (
        <div className="register_container">
                <form className="register_form" onSubmit={handleSubmit}>
                    <h3 className="register_form_title" >Register</h3>

                    <label className="register_form_label" htmlFor="email">Email</label>
                    <input className="register_form_input" type="email" placeholder="" id="email" value={email}  onChange={e => setEmail(e.target.value)} required/>
                    <span className="register_form_span" id="register-email-span"></span>

                    <label className="register_form_label" htmlFor="username">Username</label>
                    <input className="register_form_input"  type="text" placeholder="" id="username" value={username} onChange={e => setUsername(e.target.value)} required/>
                    <span className="register_form_span" id="register-username-span"></span>

                    <label className="register_form_label" htmlFor="password">Password</label>
                    <input className="register_form_input"  type="password" placeholder="" id="password" value={password} onChange={e => setPassword(e.target.value)} required/>

                    <div className="login_row">
                        <div className="login_row_item">
                            <label className="register_form_label" htmlFor="firstname">First Name</label>
                            <input className="register_form_input"  type="text" placeholder="" id="firstname" value={firstName} onChange={e => setFirstName(e.target.value)} required/>
                        </div>
                        
                        <div className="login_row_item">
                            <label className="register_form_label" htmlFor="lastname">Last Name</label>
                            <input className="register_form_input"  type="text" placeholder="" id="lastname" value={lastName} onChange={e => setLastName(e.target.value)} required/>
                        </div>  
                    </div>
                    <button className="register_form_button" type="submit">Register</button>
                </form>
        </div>
    )
}
