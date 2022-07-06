import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import "./signup.css";
import axios from "axios";
// import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';

function Signup() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password:"",
        rePassword:""
    })
    const navigate = useNavigate();

    //e=> event
    const handleChange = e => {
        const {name, value} = e.target;         //stores changes
        setUser({ ...user, [name]:value });     //updates user
    }

    const Register= async()=>{

        if(user.password !== user.rePassword) {
            alert("Password and Confirm Password Must be Same !");
            return;
        }

        try{
            const res = await axios.post("http://localhost:8000/api/user/signup", user);
            console.log("Signup Successful", res);
            navigate('/login'); //issue here
        }
        catch(e) {
            console.log("something went wrong");
            // alert("Something went wrong!")
        }


    }

    return (
        <>
        <div className="signup">
            <div className="signupRight">
                <span className="headText">SignUp to Continue...</span>
                <form className="signupBox flex-col gap-2" >
                    <input type="text" required placeholder="Name" className="signupInput"  name="name" value={user.name} onChange={handleChange}/>
                    <input type="email" required placeholder="Email" className="signupInput"  name="email" value={user.email}  onChange={handleChange}/>
                    <input type="password" required placeholder="Password" className="signupInput"  name="password"  value={user.password} onChange={handleChange}/>
                    <input type="password" required placeholder="Re-Enter Password" className="signupInput" name="rePassword" value={user.rePassword} onChange={handleChange}/>
                    <button className="signupBtn" onClick={Register} >Sign Up</button>
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