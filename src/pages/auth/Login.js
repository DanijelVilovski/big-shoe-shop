import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const LOCAL_STORAGE_TOKEN = '';

    //eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6Im5vdml1c2VyIiwiVXNlcklkIjoiMTIiLCJSb2xlIjoiY2xpZW50IiwiZXhwIjoxNjgzMTA3NDg2fQ.p7VWllmK6WLLU9fwVT7c-xPBJE_OiCm_fVYBuAOt_m7qcd6QYFz5_d-jBGpwLlAhvb9bG66LaLAzMeBe8X44xw
    //eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6Im5vdml1c2VyIiwiVXNlcklkIjoiMTIiLCJSb2xlIjoiY2xpZW50IiwiZXhwIjoxNjgzMTA4MjI1fQ.LuO2WadumQIC8lvqX-vrOHIYAn8txEUmwPCoQEeNZevh-VL5IVAQ_iEOUJxgGSbZvwg4vZut6ebv9qgz6I2a3w
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
                console.log(json)
                localStorage.setItem(LOCAL_STORAGE_TOKEN, JSON.stringify(json.transferObjects))
                //navigate('/')
            } else if (json.status === 404){
                console.log(json)
                document.getElementById('login-username-span').innerHTML = json.message;
                document.getElementById('login-password-span').innerHTML = '';
                } else if (json.status === 401) {
                console.log(json)
                document.getElementById('login-password-span').innerHTML = json.message;
                document.getElementById('login-username-span').innerHTML = '';

            }
        });
        
        
    }


    return (
        <div className="login_container">
                <form onSubmit={handleSubmit}>
                    <h3>Login</h3>

                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="" id="username" onChange={e => setUsername(e.target.value)} value={username} required/>
                    <span id="login-username-span"></span>

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="" id="password" onChange={e => setPassword(e.target.value)} value={password} required/>
                    <span id="login-password-span"></span>

                    <button type="submit">Log In</button>
                    <div className="social">
                    <div className="go"><i className="fab fa-google"></i>  Google</div>
                    <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
                    </div>
                </form>
        </div>
    )
}
