import React from 'react'; 
import Login from '../auth/Login'

export default function LoginAdmin() {
    const url = 'http://localhost:5000/admin/login'
    return (
        <div>
            <Login loginMsg="Log in as an admin" title="Admin Log in" signUp ={false} url={url}/> 
        </div>
    )
}
