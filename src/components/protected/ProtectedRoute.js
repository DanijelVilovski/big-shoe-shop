import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'

export default function ProtectedRoute (props) {

    const [userInfo, setUserInfo] = useState({})
    var token = JSON.parse(window.localStorage.getItem('LOCAL_STORAGE_TOKEN')); 

    const isAuth = props.auth

    useEffect(() => {
        try {
            setUserInfo(jwtDecode(token))   
        } catch (error) {
        }
    }, [token])

    return (<> 
        {isAuth === true ? (
            token && isAuth ? <div style={{ margin: 140, textAlign: 'center'}}><h1>Log out first!</h1></div> : <div>{props.component}</div>
        ) : (
            token && userInfo.Role === 'admin' ? <div>{props.component}</div> : <div style={{ margin: 140, textAlign: 'center'}}><h1>Access denied!</h1></div>
        )}  
    </>)
}

