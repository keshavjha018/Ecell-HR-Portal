import React from 'react';
import { Link } from 'react-router-dom';
import "./login.css";

function Login() {
    return (
        <div className='login'>
            <div className="loginRight">
            <span className="headText">Log In to Continue...</span>
                <form className="loginBox">
                    <input placeholder="Email" type="email" required className="loginInput "  name="email" />
                    <input placeholder="Password" type="password" required className="loginInput" name="password" />
                    <button className="loginBtn">Log In</button>

                    {/* <button onClick={handleForgotPassword} className="loginForgot">Forgot Password ?</button> */}

                    <hr className="hr" />
                    <span className="newText">New User?
                        <Link className="signUpBtn" to="/signup">Create Account</Link>
                    </span>

                </form>
            </div>
        </div>
    )
}

export default Login