import React from 'react';
import { Link } from 'react-router-dom';
import "./login.css";
import {useRef,useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const email = useRef();
    const password = useRef();

    const navigate = useNavigate();

    // Submitted Email-Password
    const handleSubmit=(e)=>{
        e.preventDefault();         //prevents reloading page on Submit
    }

    const [user, setUser] = useState({
        email: "",
        password:""
    })

    const handleChange = e => {
        const {name, value} = e.target;         //stores changes
        setUser({ ...user, [name]:value });     //updates user
    }

    const handleLogin = async()=>{

        try{
            const res = await axios.post("http://localhost:8000/api/auth/userlogin", user);
            console.log("Success", res);
            navigate('/');
            // alert(res.data.message);
        }
        catch(e) {
            console.log("something went wrong");
            // alert("Something went wrong!")
        }

    }

    return (
        <div className='login'>
            <div className="loginRight">
            <span className="headText">Log In to Continue...</span>
                <form className="loginBox" onSubmit={handleSubmit}>
                    <input placeholder="Email" type="email" required className="loginInput " ref={email}  name="email" value={user.email} onChange={handleChange}/>
                    <input placeholder="Password" type="password" required className="loginInput" ref={password} name="password" value={user.password} onChange={handleChange}/>
                    <button className="loginBtn" onClick={handleLogin}>Log In</button>

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