import React, { useState } from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const navigate = useNavigate();

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
                console.log(json) 
                navigate('/login');
            } else if (json.status === 409) {
                console.log(json) 
                document.getElementById('register-username-span').innerHTML = json.message;        
                document.getElementById('register-email-span').innerHTML = "";        
            } else if (json.status === 400) {
                console.log(json) 
                document.getElementById('register-email-span').innerHTML = json.message;  
                document.getElementById('register-username-span').innerHTML = "";        
            }
        })
        
    }

    return (
        <div className="register_container">
                <form onSubmit={handleSubmit}>
                    <h3>Register</h3>

                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="" id="email" value={email}  onChange={e => setEmail(e.target.value)} required/>
                    <span id="register-email-span"></span>

                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="" id="username" value={username} onChange={e => setUsername(e.target.value)} required/>
                    <span id="register-username-span"></span>

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="" id="password" value={password} onChange={e => setPassword(e.target.value)} required/>

                    <div className="login_row">
                        <div className="login_row_item">
                            <label htmlFor="firstname">First Name</label>
                            <input type="text" placeholder="" id="firstname" value={firstName} onChange={e => setFirstName(e.target.value)} required/>
                        </div>
                        
                        <div className="login_row_item">
                            <label htmlFor="lastname">Last Name</label>
                            <input type="text" placeholder="" id="lastname" value={lastName} onChange={e => setLastName(e.target.value)} required/>
                        </div>  
                    </div>
                    <button type="submit">Register</button>
                </form>
        </div>
    )
}
