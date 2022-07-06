import React from 'react';
import { Link } from 'react-router-dom'
import "./signup.css";

function Signup() {
    return (
        <>
        <div className="signup">
            <div className="signupRight">
                <span className="headText">SignUp to Continue...</span>
                <form className="signupBox flex-col gap-2" >
                    <input type="text" required placeholder="Name" className="signupInput"  name="name" />
                    <input type="email" required placeholder="Email" className="signupInput"  name="email"  />
                    <input type="password" required placeholder="Password" className="signupInput"  name="password"  />
                    <input type="password" required placeholder="Re-Enter Password" className="signupInput" name="confirmPassword" />
                    <button className="signupBtn" >Sign Up</button>
                    <hr className="hr" />
                    <span className="newText">Already have an Account?
                        <Link className="logInBtn" to="/login">Login</Link>
                    </span>
                </form>
            </div>
        </div>

        </>
    )
}

export default Signup