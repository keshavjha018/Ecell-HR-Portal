import React from 'react';
import { Link } from "react-router-dom";
import "./loginButton.css";


function LoginButton() {
    return (
        <div className='LoginButtonWrapper'>
            <Link to="/login" className='btn LoginButton'>Login/Signup</Link>
        </div>
    )
}

export default LoginButton