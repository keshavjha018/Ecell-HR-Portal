import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

function EmailVerify() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const { userId, token } = queryString.parse(search);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const { data } = await axios.put("/api/auth/mailverification", {
                    userId,
                    token,
                });
                console.log(data);
                if (data) {
                    // localStorage.setItem("userInfo", JSON.stringify(data));
                    console.log("user verified");
                    navigate("/login");
                } else {
                    console.log("error... in response data");
                }
            } catch (error) {
                console.log("error in verification ", error.message);
            }
        };
        verifyUser();
    }, []);

    return (
        <>
            <div>
                <h1> User verification</h1>
                {/* <h3>There is an error in verification......</h3> */}
            </div>
        </>
    );
}

export default EmailVerify;
