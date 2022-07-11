import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./logoutButton.css";
import { toast } from "react-toastify";
import axios from 'axios';

function LogoutButton() {

    const navigate = useNavigate();

    const handleLogout = async() => {
        //Clear Local Storage
        localStorage.clear();
    
        const Loadtoast = toast.loading("Logging in Please wait !");
        try{
            const res = await axios.get(`${process.env.REACT_APP_BACKEND}/api/auth/logout`);
            console.log(res);
            toast.dismiss(Loadtoast);
            toast.success(res.data.message)
            navigate("/");
            window.location.reload();
        }
        catch(e) {
            toast.dismiss(Loadtoast);
            toast.error("Internal Server Error");
        }
    }

    return (
        <div className='LogoutButtonWrapper'>
            <button onClick={handleLogout} className='btn LogoutButton'>Logout</button>
        </div>
    )
}

export default LogoutButton;