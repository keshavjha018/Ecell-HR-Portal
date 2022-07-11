import React from 'react';
import { Link } from 'react-router-dom';
import "./login.css";
import {useRef,useState} from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";

function Login() {
    const email = useRef();
    const password = useRef();

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password:""
    })

    const handleChange = e => {
        const {name, value} = e.target;         //stores changes
        setUser({ ...user, [name]:value });     //updates user
    }

    const handleLogin = async()=>{

        const Loadtoast = toast.loading("Logging in Please wait !");
        try{
            const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/auth/userlogin`, user);
            if(res){
                toast.dismiss(Loadtoast);
                toast(res.data.message);
                
                // On Successful Login
                if(res.data.success) {
                
                    // Store User data in LocalStorage
                    let userInfoData = {
                        name: res.data.name,
                        id: res.data.userId,
                        email: res.data.email
                    }
                    localStorage.setItem("userInfo", JSON.stringify(userInfoData));
                
                    //Redirect to Homepage
                    navigate("/");
                    window.location.reload();       // Refresh page
                }
            }

        }
        catch(e) {
            toast.dismiss(Loadtoast);
            toast.error("Wrong credentials ! Try Again");
        }

    }

    return (
        <div className='login'>
            <div className="loginRight">
            <span className="headText">Log In to Continue...</span>
                <div className="loginBox">
                    <input placeholder="Email" type="email" required className="loginInput " ref={email}  name="email" value={user.email} onChange={handleChange}/>
                    <input placeholder="Password" type="password" required className="loginInput" ref={password} name="password" value={user.password} onChange={handleChange}/>
                    <button className="loginBtn" onClick={handleLogin}>Log In</button>

                    {/* <button onClick={handleForgotPassword} className="loginForgot">Forgot Password ?</button> */}

                    <hr className="hr" />
                    <span className="newTextLogin">New User?
                        <Link className="signUpBtn" to="/signup">Create Account</Link>
                    </span>

                </div>
            </div>
        </div>
    )
}

export default Login