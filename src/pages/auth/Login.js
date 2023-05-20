import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        const object = {
            username,
            password,
        }
        fetch('https://localhost:7079/User/login', {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.status === 200) {
                localStorage.setItem('LOCAL_STORAGE_TOKEN', JSON.stringify(json.transferObject))
                navigate('/')
            } else if (json.status === 404){
                document.getElementById('login-username-span').innerHTML = json.message;
                document.getElementById('login-password-span').innerHTML = '';
                } else if (json.status === 401) {
                document.getElementById('login-password-span').innerHTML = json.message;
                document.getElementById('login-username-span').innerHTML = '';
            }
        });       
    }

    return (
        <div className="login_container">
                <form className="login_form" onSubmit={handleSubmit}>
                    <h3 className="login_form_title" >Login</h3>

                    <label className="login_form_label" htmlFor="username">Username</label>
                    <input className="login_form_input" type="text" placeholder="" id="username" onChange={e => setUsername(e.target.value)} value={username} required/>
                    <span className="login_form_span" id="login-username-span"></span>

                    <label className="login_form_label" htmlFor="password">Password</label>
                    <input className="login_form_input" type="password" placeholder="" id="password" onChange={e => setPassword(e.target.value)} value={password} required/>
                    <span className="login_form_span" id="login-password-span"></span>

                    <button className="login_form_button" type="submit">Log In</button>
                    <div className="social">
                    <div className="go"><i className="fab fa-google"></i>  Google</div>
                    <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
                    </div>
                </form>
        </div>
    )
}
