import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

function EmailVerify() {
    const navigate = useNavigate();
    const {search} = useLocation();
    const{userId, token} = queryString.parse(search);

    useEffect(()=>{
        const verifyUser = async ()=>{
            try {
                const {data} = await axios.post(`api/auth/mailverification`, {userId, token});
                if (data) {
                    localStorage.setItem("userInfo", JSON.stringify(data));
                    console.log("user verified");
                    navigate("/");
                } else {
                    console.log("error... in response data");
                }
            }
            catch (error) {
                console.log("error in verification ", error.message);
            }
        }
        verifyUser();
    },[userId, token]);

    return (
        <h2>Email Verified Successfully</h2>
    )
}

export default EmailVerify