import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import "./signup.css";
import axios from "axios";
import { toast } from 'react-toastify';
// import {useNavigate} from 'react-router-dom';

function Signup() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password:"",
        rePassword:""
    })
    // const navigate = useNavigate();

    //e=> event
    const handleChange = e => {
        const {name, value} = e.target;         //stores changes
        setUser({ ...user, [name]:value });     //updates user
    }

    const Register= async()=>{

        if(!user.email.includes("@iiitdwd.ac.in")){
            toast.error("Please use Institute E-Mail Id");
            return;
        }

        if(user.password !== user.rePassword) {
            toast.error("Password and Confirm Password Must be Same !");
            return;
        }

        //Start Waiting
        const loadToast = toast.loading("Signing Up. Please Wait !")

        try{
            const res = await axios.post("/api/user/signup", user);
            toast.dismiss(loadToast);

            if(res){
                toast(res.data.message);
            }
        }
        catch(e) {
            toast.dismiss(loadToast);
            toast.error("Something went wrong !");
        }
    }

    return (
        <>
        <div className="signup">
            <div className="signupRight">
                <span className="headText">SignUp to Continue...</span>
                <div className="signupBox flex-col gap-2" >
                    <input type="text" required placeholder="Name" className="signupInput"  name="name" value={user.name} onChange={handleChange}/>
                    <input type="email" required placeholder="Email" className="signupInput"  name="email" value={user.email}  onChange={handleChange}/>
                    <input type="password" required placeholder="Password" className="signupInput"  name="password"  value={user.password} onChange={handleChange}/>
                    <input type="password" required placeholder="Re-Enter Password" className="signupInput" name="rePassword" value={user.rePassword} onChange={handleChange}/>
                    <button className="signupBtn" onClick={Register} >Sign Up</button>
                    <hr className="hr" />
                    <span className="newText">Already have an Account?
                        <Link className="logInBtn" to="/login">Login</Link>
                    </span>
                </div>
            </div>
        </div>
        </>
    )
}

export default Signup